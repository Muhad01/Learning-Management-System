import { NextResponse } from "next/server"
import { mkdir, readFile, writeFile } from "fs/promises"
import path from "path"

type Student = { id: string; name: string }
type GradeRow = { studentId: string; assignments: number; quizzes: number; midterm: number; final: number }

function coursePath(course: string) {
  return path.join(process.cwd(), "data", "grades", `${course}.json`)
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const course = String(searchParams.get("course") || "").trim()
  if (!course) return NextResponse.json({ students: [], rows: [] })
  try {
    const file = await readFile(coursePath(course), "utf8")
    const parsed = JSON.parse(file) as { students: Student[]; rows: GradeRow[] }
    return NextResponse.json(parsed)
  } catch {
    // Return demo placeholders for empty/new courses
    const demo: { students: Student[]; rows: GradeRow[] } = {
      students: [
        { id: "STU001", name: "Alice Johnson" },
        { id: "STU002", name: "Bob Smith" },
        { id: "STU003", name: "Charlie Brown" },
      ],
      rows: [
        { studentId: "STU001", assignments: 80, quizzes: 75, midterm: 78, final: 0 },
        { studentId: "STU002", assignments: 88, quizzes: 82, midterm: 85, final: 0 },
        { studentId: "STU003", assignments: 92, quizzes: 90, midterm: 87, final: 0 },
      ],
    }
    return NextResponse.json(demo)
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { course: string; students: Student[]; rows: GradeRow[] }
    const course = String(body.course || "").trim()
    if (!course) return NextResponse.json({ ok: false, error: "Missing course" }, { status: 400 })
    const payload = {
      students: (body.students || []).map((s) => ({ id: String(s.id), name: String(s.name) })),
      rows: (body.rows || []).map((r) => ({
        studentId: String(r.studentId),
        assignments: clamp(r.assignments),
        quizzes: clamp(r.quizzes),
        midterm: clamp(r.midterm),
        final: clamp(r.final),
      })),
    }
    const dir = path.dirname(coursePath(course))
    await mkdir(dir, { recursive: true })
    await writeFile(coursePath(course), JSON.stringify(payload, null, 2), "utf8")
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false, error: "Save failed" }, { status: 500 })
  }
}

function clamp(n: number) {
  if (Number.isNaN(n)) return 0
  if (n < 0) return 0
  if (n > 100) return 100
  return Math.round(n)
}


