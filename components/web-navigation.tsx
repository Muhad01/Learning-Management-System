"use client"

import { useEffect, useRef, useState } from "react"
import * as tf from "@tensorflow/tfjs"
import * as handPoseDetection from "@tensorflow-models/hand-pose-detection"
import { useRouter } from "next/navigation"

type Keypoint = { x: number; y: number; name?: string }

function dist(a: Keypoint, b: Keypoint): number {
  return Math.hypot(a.x - b.x, a.y - b.y)
}

function avgFingerDistToWrist(keypoints: Keypoint[]): number {
  const wrist = keypoints[0]
  const tips = [4, 8, 12, 16, 20]
  let sum = 0
  for (const i of tips) {
    if (keypoints[i]) sum += dist(keypoints[i], wrist)
  }
  return sum / tips.length
}

function getScrollTarget(): HTMLElement | (Element & { scrollTop: number }) | null {
  if (typeof document === "undefined") return null
  const centerX = window.innerWidth / 2
  const centerY = window.innerHeight / 2
  const el = document.elementFromPoint(centerX, centerY)
  let node: Element | null = el
  while (node && node !== document.body) {
    if (node instanceof HTMLElement) {
      const style = getComputedStyle(node)
      const oy = style.overflowY
      if (
        (oy === "auto" || oy === "scroll" || oy === "overlay") &&
        node.scrollHeight > node.clientHeight
      ) {
        return node
      }
      if (node.hasAttribute("data-gesture-scroll")) return node
    }
    node = node.parentElement
  }
  const scrollingEl = document.scrollingElement
  return scrollingEl as HTMLElement | null
}

export default function WebNavigation() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const router = useRouter()
  const [paused, setPaused] = useState(false)
  const [active, setActive] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const detectorRef = useRef<handPoseDetection.HandDetector | null>(null)
  const lastWristRef = useRef<{ x: number; y: number; t: number } | null>(null)
  const swipeCooldownRef = useRef(0)
  const wasPinchingRef = useRef(false)
  const pinchClickCooldownRef = useRef(0)
  const lastPalmYRef = useRef<number | null>(null)
  const scrollCooldownRef = useRef(0)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    let mounted = true

    async function setupCamera(): Promise<HTMLVideoElement> {
      const video = videoRef.current
      if (!video) throw new Error("No video ref")
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480, facingMode: "user" },
      })
      video.srcObject = stream
      await new Promise<void>((resolve, reject) => {
        video.onloadedmetadata = () => resolve()
        video.onerror = () => reject(new Error("Video load failed"))
      })
      await video.play()
      return video
    }

    async function init() {
      try {
        await tf.ready()
        const detector = await handPoseDetection.createDetector(
          handPoseDetection.SupportedModels.MediaPipeHands,
          { runtime: "tfjs", maxHands: 1 }
        )
        if (!mounted) return
        detectorRef.current = detector
        const video = await setupCamera()
        if (!mounted) return
        setActive(true)
        setError(null)
        runDetection(video)
      } catch (e) {
        if (mounted) {
          setError(e instanceof Error ? e.message : "Camera or model failed")
          setActive(false)
        }
      }
    }

    function runDetection(video: HTMLVideoElement) {
      if (!detectorRef.current || !mounted) return

      const SWIPE_THRESHOLD = 50
      const SWIPE_COOLDOWN_MS = 600
      const PINCH_CLICK_COOLDOWN_MS = 400
      const SCROLL_SENSITIVITY = 2

      async function tick() {
        if (!detectorRef.current || !videoRef.current || !mounted) return

        const now = Date.now()
        swipeCooldownRef.current = Math.max(0, swipeCooldownRef.current - 50)
        pinchClickCooldownRef.current = Math.max(0, pinchClickCooldownRef.current - 50)

        const hands = await detectorRef.current.estimateHands(videoRef.current, {
          flipHorizontal: true,
        })

        if (hands.length === 0) {
          lastWristRef.current = null
          lastPalmYRef.current = null
          wasPinchingRef.current = false
          rafRef.current = requestAnimationFrame(tick)
          return
        }

        const hand = hands[0]
        const kp = hand.keypoints as Keypoint[]
        const wrist = kp[0]
        const thumbTip = kp[4]
        const indexTip = kp[8]

        if (!wrist || wrist.x == null || wrist.y == null) {
          rafRef.current = requestAnimationFrame(tick)
          return
        }

        const avgDist = avgFingerDistToWrist(kp)
        const middleMcp = kp[9]
        const rawScale =
          middleMcp && wrist ? dist(middleMcp, wrist) : avgDist * 0.4
        const isNormalized =
          kp.some((p) => p && (p.x > 1 || p.y > 1)) === false &&
          kp.some((p) => p && (p.x !== 0 || p.y !== 0))
        const handScale = isNormalized
          ? Math.max(rawScale, 0.08)
          : Math.max(rawScale, 25)

        const isOpenPalm = avgDist > handScale * 1.1
        const isFist = avgDist < handScale * 0.65
        const pinchDist = thumbTip && indexTip ? dist(thumbTip, indexTip) : 999
        const isPinching = pinchDist < handScale * 0.4

        // Closed fist → Pause interaction
        if (isFist) {
          setPaused(true)
          lastWristRef.current = null
          lastPalmYRef.current = null
          rafRef.current = requestAnimationFrame(tick)
          return
        }
        setPaused(false)

        if (paused) {
          rafRef.current = requestAnimationFrame(tick)
          return
        }

        // Swipe left → router.back() / Swipe right → router.push("/next")
        const last = lastWristRef.current
        lastWristRef.current = { x: wrist.x, y: wrist.y, t: now }
        if (last && swipeCooldownRef.current <= 0) {
          const dx = wrist.x - last.x
          const dt = now - last.t
          if (dt > 0 && dt < 300) {
            if (dx > SWIPE_THRESHOLD) {
              swipeCooldownRef.current = SWIPE_COOLDOWN_MS
              router.push("/next")
            } else if (dx < -SWIPE_THRESHOLD) {
              swipeCooldownRef.current = SWIPE_COOLDOWN_MS
              router.back()
            }
          }
        }

        // Pinch → Click
        if (isPinching) {
          if (!wasPinchingRef.current && pinchClickCooldownRef.current <= 0) {
            pinchClickCooldownRef.current = PINCH_CLICK_COOLDOWN_MS
            const vw = videoRef.current.videoWidth
            const vh = videoRef.current.videoHeight
            const centerX = (thumbTip.x + indexTip.x) / 2
            const centerY = (thumbTip.y + indexTip.y) / 2
            const viewportX = (centerX / vw) * window.innerWidth
            const viewportY = (centerY / vh) * window.innerHeight
            const el = document.elementFromPoint(
              viewportX,
              viewportY
            ) as HTMLElement | null
            if (el) el.click()
          }
          wasPinchingRef.current = true
          lastPalmYRef.current = null
        } else {
          wasPinchingRef.current = false
        }

        // Open palm → Scroll
        if (isOpenPalm && !isPinching) {
          const py = wrist.y
          const prevY = lastPalmYRef.current
          lastPalmYRef.current = py
          if (prevY != null && scrollCooldownRef.current <= 0) {
            const delta = (py - prevY) * SCROLL_SENSITIVITY
            const target = getScrollTarget()
            if (target) {
              if (target === document.scrollingElement) {
                window.scrollBy({ top: delta, behavior: "auto" })
              } else if (target instanceof HTMLElement) {
                target.scrollTop += delta
              }
            } else {
              window.scrollBy({ top: delta, behavior: "auto" })
            }
          }
          scrollCooldownRef.current = 60
        } else {
          lastPalmYRef.current = null
        }
        if (scrollCooldownRef.current > 0) scrollCooldownRef.current--

        rafRef.current = requestAnimationFrame(tick)
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    init()
    return () => {
      mounted = false
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream
        stream.getTracks().forEach((t) => t.stop())
      }
      detectorRef.current?.dispose()
    }
  }, [router])

  return (
    <>
      <video
        ref={videoRef}
        playsInline
        muted
        className="fixed bottom-4 right-4 z-50 h-24 w-32 rounded-lg border-2 border-border bg-muted object-cover shadow-lg md:h-32 md:w-40"
        style={{ transform: "scaleX(-1)" }}
      />
      {active && (
        <div className="fixed bottom-4 left-4 z-50 flex items-center gap-2 rounded-lg border border-border bg-background/95 px-2 py-1 text-xs shadow-lg">
          <span className="h-2 w-2 rounded-full bg-green-500" />
          <span className="font-medium">Gesture control on</span>
          {paused && <span className="text-amber-600">(paused)</span>}
        </div>
      )}
      {error && (
        <div className="fixed bottom-4 left-4 z-50 max-w-xs rounded-lg border border-destructive/50 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {error}
        </div>
      )}
    </>
  )
}
