"use client"

import { useEffect, useMemo, useState } from "react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Save, RefreshCw, Search } from "lucide-react"

type Student = { id: string; name: string }
type GradeRow = { studentId: string; assignments: number; quizzes: number; midterm: number; final: number }

export default function TeacherGradesPage() {
  const courses = useMemo(
    () => [
      { code: "MATH301", name: "Advanced Mathematics" },
      { code: "MATH101", name: "Calculus I" },
      { code: "MATH205", name: "Statistics" },
      { code: "MATH220", name: "Linear Algebra" },
    ],
    []
  )

  const [selectedCourse, setSelectedCourse] = useState<string>(courses[0]?.code || "")
  const [students, setStudents] = useState<Student[]>([])
  const [rows, setRows] = useState<GradeRow[]>([])
  const [isSaving, setIsSaving] = useState(false)
  const [search, setSearch] = useState("")

  // Placeholder: In a real app, fetch students of this course from API
  useEffect(() => {
    if (!selectedCourse) return
    const fetchCourse = async () => {
      const res = await fetch(`/api/grades?course=${encodeURIComponent(selectedCourse)}`)
      if (!res.ok) {
        setStudents([])
        setRows([])
        return
      }
      const data = await res.json()
      setStudents(data.students || [])
      setRows(data.rows || [])
    }
    fetchCourse()
  }, [selectedCourse])

  const save = async () => {
    if (!selectedCourse) return
    setIsSaving(true)
    try {
      await fetch(`/api/grades`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ course: selectedCourse, students, rows }),
      })
    } finally {
      setIsSaving(false)
    }
  }

  const updateCell = (studentId: string, key: keyof GradeRow, value: string) => {
    setRows((prev) =>
      prev.map((r) => (r.studentId === studentId ? { ...r, [key]: clampNumber(Number(value)) } : r))
    )
  }

  const filtered = students
    .filter((s) => s.name.toLowerCase().includes(search.toLowerCase()) || s.id.toLowerCase().includes(search.toLowerCase()))
    .map((s) => ({ s, g: rows.find((r) => r.studentId === s.id) }))

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div className="flex items-center space-x-2">
          <SidebarTrigger />
          <h2 className="text-3xl font-bold tracking-tight">Grades</h2>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search students..." className="pl-8 w-64" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <Select value={selectedCourse} onValueChange={setSelectedCourse}>
            <SelectTrigger>
              <SelectValue placeholder="Select course" />
            </SelectTrigger>
            <SelectContent>
              {courses.map((c) => (
                <SelectItem key={c.code} value={c.code}>
                  {c.code} • {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={() => setSelectedCourse((v) => v)}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button onClick={save} disabled={isSaving || !selectedCourse}>
            <Save className="w-4 h-4 mr-2" />
            {isSaving ? "Saving..." : "Save All"}
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Course Grades</CardTitle>
          <CardDescription>Assignments, Quizzes, Midterm, Final • Editable</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[260px]">Student</TableHead>
                  <TableHead>Assignments (0-100)</TableHead>
                  <TableHead>Quizzes (0-100)</TableHead>
                  <TableHead>Midterm (0-100)</TableHead>
                  <TableHead>Final (0-100)</TableHead>
                  <TableHead>Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(({ s, g }) => (
                  <TableRow key={s.id}>
                    <TableCell>
                      <div className="font-medium">{s.name}</div>
                      <div className="text-xs text-muted-foreground">{s.id}</div>
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        min={0}
                        max={100}
                        value={g?.assignments ?? 0}
                        onChange={(e) => updateCell(s.id, "assignments", e.target.value)}
                        className="w-28"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        min={0}
                        max={100}
                        value={g?.quizzes ?? 0}
                        onChange={(e) => updateCell(s.id, "quizzes", e.target.value)}
                        className="w-28"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        min={0}
                        max={100}
                        value={g?.midterm ?? 0}
                        onChange={(e) => updateCell(s.id, "midterm", e.target.value)}
                        className="w-28"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        min={0}
                        max={100}
                        value={g?.final ?? 0}
                        onChange={(e) => updateCell(s.id, "final", e.target.value)}
                        className="w-28"
                      />
                    </TableCell>
                    <TableCell className="font-medium">
                      {formatTotal(g)}
                    </TableCell>
                  </TableRow>
                ))}
                {!filtered.length && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-sm text-muted-foreground">
                      No students found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function clampNumber(n: number) {
  if (Number.isNaN(n)) return 0
  if (n < 0) return 0
  if (n > 100) return 100
  return Math.round(n)
}

function formatTotal(g?: GradeRow) {
  if (!g) return 0
  // Simple average for demo; adjust weighting as needed
  return Math.round((g.assignments + g.quizzes + g.midterm + g.final) / 4)
}


