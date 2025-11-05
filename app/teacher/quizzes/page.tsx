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
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Users, BookOpen, Eye, Download, Save, CheckCircle2, Search, Filter, Plus, Clock, BarChart3 } from "lucide-react"

export default function TeacherQuizzesPage() {
  const courses = [
    { code: "MATH301", name: "Advanced Mathematics", semester: "Fall 2024" },
    { code: "MATH101", name: "Calculus I", semester: "Fall 2024" },
    { code: "MATH205", name: "Statistics", semester: "Fall 2024" },
    { code: "MATH220", name: "Linear Algebra", semester: "Fall 2024" },
  ]

  const [selectedCourse, setSelectedCourse] = useState<string>(courses[0].code)
  const [search, setSearch] = useState("")

  type Quiz = {
    id: string
    title: string
    courseCode: string
    dueAt: string
    totalQuestions: number
    submissions: number
    averageScore: number
    maxScore: number
    status: "Active" | "Closed" | "Draft"
  }

  const quizzes: Quiz[] = useMemo(
    () => [
      {
        id: "QUIZ001",
        title: "Quiz 1 - Limits",
        courseCode: "MATH101",
        dueAt: "2024-10-10 23:59",
        totalQuestions: 10,
        submissions: 35,
        averageScore: 16,
        maxScore: 20,
        status: "Active",
      },
      {
        id: "QUIZ002",
        title: "Quiz 2 - Derivatives",
        courseCode: "MATH101",
        dueAt: "2024-10-20 23:59",
        totalQuestions: 12,
        submissions: 28,
        averageScore: 17,
        maxScore: 24,
        status: "Draft",
      },
      {
        id: "QUIZ003",
        title: "Probability Basics",
        courseCode: "MATH205",
        dueAt: "2024-10-18 23:59",
        totalQuestions: 15,
        submissions: 44,
        averageScore: 21,
        maxScore: 30,
        status: "Active",
      },
    ],
    []
  )

  const visibleQuizzes = quizzes
    .filter((q) => q.courseCode === selectedCourse)
    .filter((q) => q.title.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div className="flex items-center space-x-2">
          <SidebarTrigger />
          <h2 className="text-3xl font-bold tracking-tight">Quizzes</h2>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search quizzes..." className="pl-8 w-64" value={search} onChange={(e) => setSearch(e.target.value)} />
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
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create Quiz
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
            <Stat label="Total Quizzes" value={visibleQuizzes.length.toString()} icon={<FileText className="w-4 h-4" />} />
            <Stat label="Active" value={visibleQuizzes.filter((q) => q.status === "Active").length.toString()} icon={<Clock className="w-4 h-4" />} />
            <Stat label="Avg Score" value={`${avg(visibleQuizzes.map((q) => (q.averageScore / q.maxScore) * 100)).toFixed(1)}%`} icon={<BarChart3 className="w-4 h-4" />} />
            <Stat label="Course Code" value={selectedCourse} icon={<BookOpen className="w-4 h-4" />} />
          </div>
        </CardContent>
      </Card>

      {/* Quizzes Table */}
      <Card>
        <CardHeader>
          <CardTitle>Quizzes</CardTitle>
          <CardDescription>Manage and review quizzes for the selected course</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[240px]">Quiz</TableHead>
                  <TableHead>Due</TableHead>
                  <TableHead>Questions</TableHead>
                  <TableHead>Submissions</TableHead>
                  <TableHead>Average</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[220px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {visibleQuizzes.map((q) => (
                  <TableRow key={q.id}>
                    <TableCell>
                      <div className="font-medium">{q.title}</div>
                      <div className="text-xs text-muted-foreground">{q.courseCode}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4" /> {q.dueAt}
                      </div>
                    </TableCell>
                    <TableCell>{q.totalQuestions}</TableCell>
                    <TableCell>{q.submissions}</TableCell>
                    <TableCell>
                      <span className="font-medium">{q.averageScore}/{q.maxScore}</span>
                      <span className="text-xs text-muted-foreground ml-2">({Math.round((q.averageScore / q.maxScore) * 100)}%)</span>
                    </TableCell>
                    <TableCell>
                      <Badge variant={q.status === "Active" ? "default" : q.status === "Draft" ? "secondary" : "outline"}>{q.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <QuizActions quiz={q} />
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

function avg(nums: number[]) {
  if (!nums.length) return 0
  return nums.reduce((a, b) => a + b, 0) / nums.length
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

function QuizActions({ quiz }: { quiz: {
  id: string
  title: string
  courseCode: string
  dueAt: string
  totalQuestions: number
  submissions: number
  averageScore: number
  maxScore: number
  status: "Active" | "Closed" | "Draft"
} }) {
  type Attempt = {
    id: string
    studentId: string
    studentName: string
    submittedAt: string
    score: number | null
    maxScore: number
    answers?: string
  }

  const attempts: Attempt[] = [
    { id: "ATT001", studentId: "STU001", studentName: "Alice Johnson", submittedAt: "2024-10-10 18:22", score: 18, maxScore: 20, answers: "Q1: A\nQ2: C\nQ3: B ..." },
    { id: "ATT002", studentId: "STU002", studentName: "Bob Smith", submittedAt: "2024-10-10 19:02", score: null, maxScore: 20, answers: "Q1: B\nQ2: C\nQ3: D ..." },
  ]

  const [selectedAttempt, setSelectedAttempt] = useState<Attempt | null>(null)
  const [score, setScore] = useState<number>(selectedAttempt?.score ?? 0)

  return (
    <Dialog onOpenChange={(open) => {
      if (!open) {
        setSelectedAttempt(null)
        setScore(0)
      }
    }}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Eye className="w-4 h-4 mr-2" />
          Review Submissions
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{quiz.title}</DialogTitle>
          <DialogDescription>
            {quiz.courseCode} • Due {quiz.dueAt}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Submissions</CardTitle>
              <CardDescription>All student attempts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {attempts.map((a) => (
                  <div key={a.id} className={`p-3 border rounded-lg ${selectedAttempt?.id === a.id ? "border-blue-500" : ""}`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{a.studentName}</div>
                        <div className="text-xs text-muted-foreground">{a.studentId} • {a.submittedAt}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={a.score !== null ? "default" : "secondary"}>{a.score !== null ? `Scored ${a.score}/${a.maxScore}` : "Pending"}</Badge>
                        <Button size="sm" onClick={() => { setSelectedAttempt(a); setScore(a.score ?? 0) }}>Open</Button>
                      </div>
                    </div>
                  </div>
                ))}
                {!attempts.length && (
                  <p className="text-sm text-muted-foreground">No submissions yet</p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Attempt Detail</CardTitle>
              <CardDescription>{selectedAttempt ? `${selectedAttempt.studentName} • ${selectedAttempt.studentId}` : "Select an attempt to review"}</CardDescription>
            </CardHeader>
            <CardContent>
              {selectedAttempt ? (
                <div className="space-y-4">
                  <div className="p-3 border rounded-md bg-muted/20 text-sm max-h-[50vh] overflow-auto">
                    <pre className="whitespace-pre-wrap break-words font-sans text-sm">
                      {selectedAttempt.answers || "No answers available"}
                    </pre>
                  </div>
                  <div className="flex items-center gap-3">
                    <Label htmlFor={`score-${selectedAttempt.id}`}>Score</Label>
                    <Input
                      id={`score-${selectedAttempt.id}`}
                      className="w-24"
                      type="number"
                      min={0}
                      max={selectedAttempt.maxScore}
                      value={score}
                      onChange={(e) => setScore(Number(e.target.value))}
                    />
                    <span className="text-sm text-muted-foreground">/ {selectedAttempt.maxScore}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={score !== null ? "default" : "secondary"}>{score !== null ? "Ready to publish" : "Pending"}</Badge>
                    <Button size="sm">
                      <Save className="w-4 h-4 mr-2" />
                      Publish Grade
                    </Button>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">Select a submission to view details and mark</p>
              )}
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}
