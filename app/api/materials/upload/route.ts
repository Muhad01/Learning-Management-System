import { NextResponse } from "next/server"
import { mkdir, writeFile } from "fs/promises"
import path from "path"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const courseCode = String(formData.get("courseCode") || "").trim()
    if (!courseCode) {
      return NextResponse.json({ error: "Missing courseCode" }, { status: 400 })
    }

    const files = formData.getAll("files") as File[]
    if (!files.length) {
      return NextResponse.json({ error: "No files provided" }, { status: 400 })
    }

    const baseDir = path.join(process.cwd(), "public", "materials", courseCode)
    await mkdir(baseDir, { recursive: true })

    const saved: { name: string; url: string; size: number; type: string }[] = []

    for (const file of files) {
      const arrayBuffer = await file.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)
      const safeName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9\._-]/g, "_")}`
      const target = path.join(baseDir, safeName)
      await writeFile(target, buffer)
      saved.push({
        name: safeName,
        url: `/materials/${courseCode}/${safeName}`,
        size: buffer.length,
        type: file.type || "application/octet-stream",
      })
    }

    return NextResponse.json({ ok: true, items: saved })
  } catch (err) {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 })
  }
}


