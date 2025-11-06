import { NextResponse } from "next/server"

// Demo endpoint: returns a weekly schedule for a teacher
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const teacher = String(searchParams.get("teacher") || "").trim()
  // In a real app, fetch schedule from DB by teacher
  const items = [
    { id: "SCH-1", courseCode: "MATH101", title: "Calculus I", day: "Mon", start: "09:00", end: "10:30", room: "A-201" },
    { id: "SCH-2", courseCode: "MATH205", title: "Statistics", day: "Mon", start: "11:00", end: "12:30", room: "B-104" },
    { id: "SCH-3", courseCode: "MATH301", title: "Advanced Mathematics", day: "Tue", start: "10:00", end: "11:30", room: "C-310" },
    { id: "SCH-4", courseCode: "MATH101", title: "Calculus I", day: "Wed", start: "09:00", end: "10:30", room: "A-201" },
    { id: "SCH-5", courseCode: "MATH205", title: "Statistics", day: "Thu", start: "11:00", end: "12:30", room: "B-104" },
    { id: "SCH-6", courseCode: "MATH301", title: "Advanced Mathematics", day: "Fri", start: "10:00", end: "11:30", room: "C-310" },
  ]
  return NextResponse.json({ teacher, items })
}


