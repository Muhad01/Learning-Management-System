"use client"

import { useState, useEffect } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useColorTheme } from "@/components/color-theme-provider"
import {
  BRAND_COLOR_OPTIONS,
  type BrandColorId,
} from "@/lib/color-theme"
import { cn } from "@/lib/utils"

const PRESET_IDS: BrandColorId[] = ["green", "blue", "purple", "red", "orange", "teal"]

export function ColorSettings() {
  const { brandColor, customHex, setBrandColor, setCustomHex } = useColorTheme()
  const presets = BRAND_COLOR_OPTIONS.filter((o) => PRESET_IDS.includes(o.id))
  const displayHex = customHex || "#16a34a"
  const [hexInput, setHexInput] = useState(displayHex)

  useEffect(() => {
    setHexInput(displayHex)
  }, [displayHex])

  const applyCustomHex = (v: string) => {
    const normalized = (v.startsWith("#") ? v : v ? "#" + v : "").toLowerCase()
    if (/^#[0-9a-f]{6}$/.test(normalized)) {
      setCustomHex(normalized)
    }
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Brand color</Label>
        <p className="text-sm text-muted-foreground">
          Choose a color theme for buttons, links, and accents across the app.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {presets.map((option) => (
          <button
            key={option.id}
            type="button"
            aria-label={`Use ${option.name} color`}
            onClick={() => setBrandColor(option.id)}
            className={cn(
              "h-9 w-9 rounded-full border-2 transition-all focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
              brandColor === option.id
                ? "border-foreground scale-110"
                : "border-transparent hover:scale-105"
            )}
            style={{ backgroundColor: option.hex }}
          />
        ))}
        <button
          type="button"
          aria-label="Use custom color"
          onClick={() => setBrandColor("custom")}
          className={cn(
            "h-9 w-9 rounded-full border-2 flex items-center justify-center text-xs font-medium transition-all focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
            brandColor === "custom"
              ? "border-foreground scale-110 bg-muted"
              : "border-transparent bg-muted hover:bg-muted/80"
          )}
          title="Custom"
        >
          +
        </button>
      </div>

      {(brandColor === "custom" || customHex) && (
        <div className="space-y-2">
          <Label htmlFor="custom-color">Custom color</Label>
          <div className="flex gap-2 items-center">
            <input
              id="custom-color"
              type="color"
              value={displayHex}
              onChange={(e) => setCustomHex(e.target.value)}
              className="h-9 w-9 rounded border cursor-pointer bg-transparent"
            />
            <Input
              placeholder="#16a34a"
              value={hexInput}
              onChange={(e) => {
                const v = e.target.value
                if (v === "" || /^#?[0-9A-Fa-f]{0,6}$/.test(v.replace(/^#/, ""))) {
                  setHexInput(v.startsWith("#") ? v : v ? "#" + v : v)
                  if (/^#?[0-9A-Fa-f]{6}$/.test(v.replace(/^#/, ""))) {
                    setCustomHex((v.startsWith("#") ? v : "#" + v).toLowerCase())
                  }
                }
              }}
              onBlur={() => applyCustomHex(hexInput)}
              className="font-mono max-w-[8rem]"
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Enter a hex code (e.g. #16a34a) or use the picker.
          </p>
        </div>
      )}
    </div>
  )
}
