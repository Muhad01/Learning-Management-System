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
import { FileText, Users, BookOpen, Eye, Download, Save, CheckCircle2, Search, Filter } from "lucide-react"

export default function TeacherAssignmentsPage() {
  const courses = [
    { code: "MATH301", name: "Advanced Mathematics", semester: "Fall 2024" },
    { code: "MATH101", name: "Calculus I", semester: "Fall 2024" },
    { code: "MATH205", name: "Statistics", semester: "Fall 2024" },
    { code: "MATH220", name: "Linear Algebra", semester: "Fall 2024" },
  ]

  const [selectedCourse, setSelectedCourse] = useState<string>(courses[0].code)
  const [search, setSearch] = useState("")

  type Submission = {
    id: string
    studentId: string
    studentName: string
    courseCode: string
    assignmentTitle: string
    submittedAt: string
    fileUrl?: string
    textContent?: string
    score: number | null
    maxScore: number
    status: "Pending" | "Graded"
  }

  const submissions: Submission[] = useMemo(
    () => [
      {
        id: "SUB001",
        studentId: "STU001",
        studentName: "Alice Johnson",
        courseCode: "MATH301",
        assignmentTitle: "Differential Equations Essay",
        submittedAt: "2024-10-02 14:30",
        fileUrl: "/placeholder.pdf",
        score: 88,
        maxScore: 100,
        status: "Graded",
      },
      {
        id: "SUB002",
        studentId: "STU002",
        studentName: "Bob Smith",
        courseCode: "MATH301",
        assignmentTitle: "Series & Sequences",
        submittedAt: "2024-10-15 10:05",
        textContent: "This is my assignment explaining convergence tests...",
        score: null,
        maxScore: 100,
        status: "Pending",
      },
      {
        id: "SUB003",
        studentId: "STU003",
        studentName: "Carol Davis",
        courseCode: "MATH101",
        assignmentTitle: "Integration Problems Set",
        submittedAt: "2024-10-11 09:12",
        fileUrl: "/placeholder.pdf",
        score: 92,
        maxScore: 100,
        status: "Graded",
      },
    ],
    []
  )

  const visibleSubmissions = submissions
    .filter((s) => s.courseCode === selectedCourse)
    .filter((s) =>
      [s.studentName, s.studentId, s.assignmentTitle].some((v) => v.toLowerCase().includes(search.toLowerCase()))
    )

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div className="flex items-center space-x-2">
          <SidebarTrigger />
          <h2 className="text-3xl font-bold tracking-tight">Assignments</h2>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search submissions..." className="pl-8 w-64" value={search} onChange={(e) => setSearch(e.target.value)} />
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
            <Stat label="Total Submissions" value={visibleSubmissions.length.toString()} icon={<FileText className="w-4 h-4" />} />
            <Stat label="Pending" value={visibleSubmissions.filter((s) => s.status === "Pending").length.toString()} icon={<Users className="w-4 h-4" />} />
            <Stat label="Graded" value={visibleSubmissions.filter((s) => s.status === "Graded").length.toString()} icon={<CheckCircle2 className="w-4 h-4" />} />
            <Stat label="Course Code" value={selectedCourse} icon={<BookOpen className="w-4 h-4" />} />
          </div>
        </CardContent>
      </Card>

      {/* Submissions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Submitted Assignments</CardTitle>
          <CardDescription>All student submissions for the selected course</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[220px]">Student</TableHead>
                  <TableHead>Assignment</TableHead>
                  <TableHead>Submitted At</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[220px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {visibleSubmissions.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-semibold text-blue-600">
                            {s.studentName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium">{s.studentName}</div>
                          <div className="text-xs text-muted-foreground">{s.studentId}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{s.assignmentTitle}</div>
                        <div className="text-xs text-muted-foreground">{s.courseCode}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{s.submittedAt}</span>
                    </TableCell>
                    <TableCell>
                      {s.score !== null ? (
                        <span className="font-medium">{s.score} / {s.maxScore}</span>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant={s.status === "Graded" ? "default" : "secondary"}>{s.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <SubmissionActions submission={s} />
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

function SubmissionActions({ submission }: { submission: {
  id: string
  studentId: string
  studentName: string
  courseCode: string
  assignmentTitle: string
  submittedAt: string
  fileUrl?: string
  textContent?: string
  score: number | null
  maxScore: number
  status: "Pending" | "Graded"
} }) {
  const [score, setScore] = useState<number>(submission.score ?? 0)
  const [status, setStatus] = useState<"Pending" | "Graded">(submission.status)

  const publish = () => {
    setStatus("Graded")
    // Persist to backend here
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Eye className="w-4 h-4 mr-2" />
          Review
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{submission.assignmentTitle}</DialogTitle>
          <DialogDescription>
            {submission.studentName} • {submission.studentId} • {submission.submittedAt}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue={submission.fileUrl ? "file" : "text"}>
          <TabsList>
            {submission.fileUrl && <TabsTrigger value="file">File</TabsTrigger>}
            {submission.textContent && <TabsTrigger value="text">Text</TabsTrigger>}
            <TabsTrigger value="mark">Mark</TabsTrigger>
          </TabsList>

          {submission.fileUrl && (
            <TabsContent value="file">
              <div className="space-y-3">
                <div className="border rounded-md overflow-hidden">
                  <iframe
                    src={submission.fileUrl}
                    title={`${submission.assignmentTitle} - ${submission.studentName}`}
                    className="w-full h-[70vh] bg-background"
                  />
                </div>
                <a href={submission.fileUrl} download className="inline-block">
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </a>
              </div>
            </TabsContent>
          )}

          {submission.textContent && (
            <TabsContent value="text">
              <div className="p-3 border rounded-md bg-muted/20 text-sm max-h-[70vh] overflow-auto">
                <pre className="whitespace-pre-wrap break-words font-sans text-sm">
                  {submission.textContent}
                </pre>
              </div>
            </TabsContent>
          )}

          <TabsContent value="mark">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Label htmlFor={`score-${submission.id}`}>Score</Label>
                <Input
                  id={`score-${submission.id}`}
                  className="w-24"
                  type="number"
                  min={0}
                  max={submission.maxScore}
                  value={score}
                  onChange={(e) => setScore(Number(e.target.value))}
                />
                <span className="text-sm text-muted-foreground">/ {submission.maxScore}</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={status === "Graded" ? "default" : "secondary"}>{status}</Badge>
                <Button size="sm" onClick={publish}>
                  <Save className="w-4 h-4 mr-2" />
                  Publish Grade
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
