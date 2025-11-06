import { NextResponse } from "next/server"
import { readdir, stat, unlink } from "fs/promises"
import path from "path"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const course = String(searchParams.get("course") || "").trim()
  if (!course) return NextResponse.json({ items: [] })

  const baseDir = path.join(process.cwd(), "public", "materials", course)
  try {
    const names = await readdir(baseDir)
    const items = await Promise.all(
      names.map(async (name) => {
        const full = path.join(baseDir, name)
        const s = await stat(full)
        const ext = name.split(".").pop()?.toLowerCase() || ""
        const type = inferType(ext)
        return {
          name,
          url: `/materials/${course}/${name}`,
          size: s.size,
          uploadedAt: s.mtime.toISOString(),
          type,
        }
      })
    )
    return NextResponse.json({ items })
  } catch {
    return NextResponse.json({ items: [] })
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const course = String(searchParams.get("course") || "").trim()
  const name = String(searchParams.get("name") || "").trim()
  if (!course || !name) return NextResponse.json({ ok: false }, { status: 400 })
  const full = path.join(process.cwd(), "public", "materials", course, name)
  try {
    await unlink(full)
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false }, { status: 404 })
  }
}

function inferType(ext: string) {
  if (["mp4", "mov", "mkv", "webm"].includes(ext)) return "video"
  if (["mp3", "wav", "aac", "ogg"].includes(ext)) return "audio"
  if (["png", "jpg", "jpeg", "gif", "webp"].includes(ext)) return "image"
  if (ext === "pdf") return "pdf"
  return ext || "file"
}


