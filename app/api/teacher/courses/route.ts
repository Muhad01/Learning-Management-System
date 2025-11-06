import { NextResponse } from "next/server"

// Demo endpoint: returns courses assigned to a teacher
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const teacher = String(searchParams.get("teacher") || "").trim()
  // In a real app, use teacher to filter from DB
  const courses = [
    { code: "MATH301", name: "Advanced Mathematics" },
    { code: "MATH101", name: "Calculus I" },
    { code: "MATH205", name: "Statistics" },
  ]
  return NextResponse.json({ teacher, courses })
}


