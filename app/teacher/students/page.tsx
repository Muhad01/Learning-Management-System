"use client"

import { useMemo, useState } from "react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Users, BookOpen, FileText, ClipboardList, Upload, Save, Download, Pencil, CheckCircle2 } from "lucide-react"

export default function TeacherStudentsPage() {
  const courses = [
    { code: "MATH301", name: "Advanced Mathematics", semester: "Fall 2024" },
    { code: "MATH101", name: "Calculus I", semester: "Fall 2024" },
    { code: "MATH205", name: "Statistics", semester: "Fall 2024" },
    { code: "MATH220", name: "Linear Algebra", semester: "Fall 2024" },
  ]

  const [selectedCourse, setSelectedCourse] = useState<string>(courses[0].code)

  const students = useMemo(
    () =>
      [
        { id: "STU001", name: "Alice Johnson", assignmentAvg: 88, quizAvg: 92, final: 90, status: "In Progress" },
        { id: "STU002", name: "Bob Smith", assignmentAvg: 76, quizAvg: 81, final: 79, status: "In Progress" },
        { id: "STU003", name: "Carol Davis", assignmentAvg: 93, quizAvg: 89, final: 91, status: "Completed" },
        { id: "STU004", name: "David Wilson", assignmentAvg: 84, quizAvg: 77, final: 80, status: "In Progress" },
        { id: "STU005", name: "Emily Clark", assignmentAvg: 97, quizAvg: 94, final: 96, status: "Completed" },
      ],
    [selectedCourse]
  )

  const [editedGrades, setEditedGrades] = useState<Record<string, number>>({})

  const handleGradeChange = (studentId: string, value: string) => {
    const num = Number(value)
    if (Number.isNaN(num)) return
    setEditedGrades((prev) => ({ ...prev, [studentId]: num }))
  }

  const saveGrades = () => {
    // Implement save to backend here
    console.log("Saving grades:", editedGrades)
    setEditedGrades({})
  }

  const submissionsByStudent: Record<string, { assignments: Submission[]; quizzes: Submission[] }> = {
    STU001: {
      assignments: [
        { title: "Differential Equations", submittedAt: "2024-10-02", max: 100, score: 88, status: "Graded" },
        { title: "Series & Sequences", submittedAt: "2024-10-15", max: 100, score: 0, status: "Pending" },
      ],
      quizzes: [
        { title: "Quiz 1 - Limits", submittedAt: "2024-09-20", max: 20, score: 18, status: "Graded" },
        { title: "Quiz 2 - Derivatives", submittedAt: "2024-10-08", max: 20, score: 0, status: "Pending" },
      ],
    },
    STU002: {
      assignments: [
        { title: "Differential Equations", submittedAt: "2024-10-02", max: 100, score: 75, status: "Graded" },
      ],
      quizzes: [
        { title: "Quiz 1 - Limits", submittedAt: "2024-09-20", max: 20, score: 16, status: "Graded" },
      ],
    },
  }

  type Submission = {
    title: string
    submittedAt: string
    max: number
    score: number
    status: "Pending" | "Graded"
  }

  const [activeStudentId, setActiveStudentId] = useState<string | null>(null)

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div className="flex items-center space-x-2">
          <SidebarTrigger />
          <h2 className="text-3xl font-bold tracking-tight">Students & Grades</h2>
        </div>
        <div className="flex items-center space-x-2">
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
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Import Grades
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
          <Button onClick={saveGrades} disabled={Object.keys(editedGrades).length === 0}>
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      {/* Course Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Course Overview</CardTitle>
          <CardDescription>
            {courses.find((c) => c.code === selectedCourse)?.name} • {courses.find((c) => c.code === selectedCourse)?.semester}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <Stat label="Enrolled Students" value="45" icon={<Users className="w-4 h-4" />} />
            <Stat label="Assignments" value="8" icon={<FileText className="w-4 h-4" />} />
            <Stat label="Quizzes" value="6" icon={<ClipboardList className="w-4 h-4" />} />
            <Stat label="Materials" value="12" icon={<BookOpen className="w-4 h-4" />} />
          </div>
        </CardContent>
      </Card>

      {/* Students Table */}
      <Card>
        <CardHeader>
          <CardTitle>Student Grades</CardTitle>
          <CardDescription>View and update student grades for this course</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[220px]">Student</TableHead>
                  <TableHead>Assignment Avg</TableHead>
                  <TableHead>Quiz Avg</TableHead>
                  <TableHead>Final Grade</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[220px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-semibold text-blue-600">
                            {s.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium">{s.name}</div>
                          <div className="text-xs text-muted-foreground">{s.id}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">{s.assignmentAvg}%</span>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">{s.quizAvg}%</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Input
                          className="w-20"
                          type="number"
                          min={0}
                          max={100}
                          value={editedGrades[s.id] ?? s.final}
                          onChange={(e) => handleGradeChange(s.id, e.target.value)}
                        />
                        <span className="text-xs text-muted-foreground">/100</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={s.status === "Completed" ? "default" : "secondary"}>{s.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Dialog onOpenChange={(open) => !open && setActiveStudentId(null)}>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => setActiveStudentId(s.id)}>
                              <Pencil className="w-4 h-4 mr-2" />
                              View Submissions
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Submissions • {s.name}</DialogTitle>
                              <DialogDescription>Review and mark assignments and quizzes</DialogDescription>
                            </DialogHeader>
                            <Tabs defaultValue="assignments">
                              <TabsList>
                                <TabsTrigger value="assignments">Assignments</TabsTrigger>
                                <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
                              </TabsList>
                              <TabsContent value="assignments">
                                <div className="space-y-3">
                                  {(submissionsByStudent[activeStudentId ?? s.id]?.assignments ?? []).map((sub, idx) => (
                                    <SubmissionRow key={idx} submission={sub} />
                                  ))}
                                  {!(submissionsByStudent[activeStudentId ?? s.id]?.assignments ?? []).length && (
                                    <p className="text-sm text-muted-foreground">No assignment submissions</p>
                                  )}
                                </div>
                              </TabsContent>
                              <TabsContent value="quizzes">
                                <div className="space-y-3">
                                  {(submissionsByStudent[activeStudentId ?? s.id]?.quizzes ?? []).map((sub, idx) => (
                                    <SubmissionRow key={idx} submission={sub} />
                                  ))}
                                  {!(submissionsByStudent[activeStudentId ?? s.id]?.quizzes ?? []).length && (
                                    <p className="text-sm text-muted-foreground">No quiz submissions</p>
                                  )}
                                </div>
                              </TabsContent>
                            </Tabs>
                          </DialogContent>
                        </Dialog>
                        <Button size="sm" onClick={saveGrades} disabled={editedGrades[s.id] === undefined}>
                          <CheckCircle2 className="w-4 h-4 mr-2" />
                          Save Row
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function Stat({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="p-4 border rounded-lg flex items-center justify-between">
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-xl font-semibold">{value}</p>
      </div>
      <div className="w-9 h-9 bg-muted rounded-md flex items-center justify-center">{icon}</div>
    </div>
  )
}

function SubmissionRow({ submission }: { submission: { title: string; submittedAt: string; max: number; score: number; status: "Pending" | "Graded" } }) {
  const [score, setScore] = useState<number>(submission.score)
  const [status, setStatus] = useState<"Pending" | "Graded">(submission.status)

  const publishMark = () => {
    setStatus("Graded")
    // Persist to backend
  }

  return (
    <div className="flex items-center justify-between p-3 border rounded-lg">
      <div>
        <div className="font-medium">{submission.title}</div>
        <div className="text-xs text-muted-foreground">Submitted {submission.submittedAt}</div>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <Label htmlFor={`score-${submission.title}`} className="text-xs">Score</Label>
          <Input
            id={`score-${submission.title}`}
            className="w-20 h-8"
            type="number"
            min={0}
            max={submission.max}
            value={score}
            onChange={(e) => setScore(Number(e.target.value))}
          />
          <span className="text-xs text-muted-foreground">/ {submission.max}</span>
        </div>
        <Badge variant={status === "Graded" ? "default" : "secondary"}>{status}</Badge>
        <Button size="sm" onClick={publishMark}>
          <Save className="w-4 h-4 mr-2" />
          Mark
        </Button>
      </div>
    </div>
  )
}
