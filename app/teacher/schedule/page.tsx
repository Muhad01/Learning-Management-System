"use client"

import { useEffect, useMemo, useState } from "react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, RefreshCw, Search } from "lucide-react"

type Course = { code: string; name: string }
type ScheduleItem = {
  id: string
  courseCode: string
  title: string
  day: "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun"
  start: string // 09:00
  end: string // 10:30
  room: string
}

export default function TeacherSchedulePage() {
  // In a real app, teacherId comes from auth/session
  const teacherId = "TEACH001"

  const [courses, setCourses] = useState<Course[]>([])
  const [schedule, setSchedule] = useState<ScheduleItem[]>([])

  const [selectedCourse, setSelectedCourse] = useState<string>("ALL")
  const [selectedDay, setSelectedDay] = useState<string>("ALL")
  const [search, setSearch] = useState("")

  useEffect(() => {
    const load = async () => {
      const [cRes, sRes] = await Promise.all([
        fetch(`/api/teacher/courses?teacher=${encodeURIComponent(teacherId)}`),
        fetch(`/api/teacher/schedule?teacher=${encodeURIComponent(teacherId)}`),
      ])
      const cData = cRes.ok ? await cRes.json() : { courses: [] }
      const sData = sRes.ok ? await sRes.json() : { items: [] }
      setCourses(cData.courses || [])
      setSchedule(sData.items || [])
    }
    load()
  }, [])

  const days = useMemo(() => ["ALL", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], [])

  const filtered = schedule
    .filter((i) => selectedCourse === "ALL" || i.courseCode === selectedCourse)
    .filter((i) => selectedDay === "ALL" || i.day === selectedDay)
    .filter((i) =>
      `${i.title} ${i.courseCode} ${i.room}`.toLowerCase().includes(search.toLowerCase())
    )
    .sort(sortByDayTime)

  const todayShort = getTodayShort()
  const todayLong = shortToLongDay(todayShort)
  const todaysClasses = schedule
    .filter((i) => i.day === todayShort)
    .filter((i) => selectedCourse === "ALL" || i.courseCode === selectedCourse)
    .sort(sortByDayTime)

  // Build weekly grid like student page
  const timeSlots = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"]
  const longDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
  const itemsForGrid = schedule.map((i) => ({
    id: i.id,
    course: i.title,
    code: i.courseCode,
    day: shortToLongDay(i.day),
    time: i.start,
    endTime: i.end,
    duration: durationMinutes(i.start, i.end),
    room: i.room,
    type: "Lecture",
  }))

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div className="flex items-center space-x-2">
          <SidebarTrigger />
          <h2 className="text-3xl font-bold tracking-tight">My Schedule</h2>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search..." className="pl-8 w-64" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <Select value={selectedCourse} onValueChange={setSelectedCourse}>
            <SelectTrigger className="min-w-[220px]">
              <SelectValue placeholder="Course" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Courses</SelectItem>
              {courses.map((c) => (
                <SelectItem key={c.code} value={c.code}>
                  {c.code} • {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedDay} onValueChange={setSelectedDay}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Day" />
            </SelectTrigger>
            <SelectContent>
              {days.map((d) => (
                <SelectItem key={d} value={d}>{d}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={() => { setSelectedCourse("ALL"); setSelectedDay("ALL"); setSearch("") }}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Reset Filters
          </Button>
        </div>
      </div>

      {/* Today's Classes */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">Today&apos;s Classes</CardTitle>
              <CardDescription>
                {todayLong} • {todaysClasses.length} class{todaysClasses.length !== 1 ? "es" : ""} scheduled
              </CardDescription>
            </div>
            <Badge variant="outline" className="text-sm">
              {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {todaysClasses.map((c) => (
              <div key={c.id} className="p-4 border rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gradient-brand rounded-lg flex items-center justify-center">
                    <BookOpenIcon />
                  </div>
                  <div>
                    <div className="font-medium">{c.title}</div>
                    <div className="text-xs text-muted-foreground">{c.courseCode}</div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                      <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {c.start}-{c.end}</span>
                      <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {c.room}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {!todaysClasses.length && (
              <p className="text-sm text-muted-foreground">No classes today</p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Weekly Schedule</CardTitle>
          <CardDescription>Your complete class schedule for the week</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-24">Time</TableHead>
                  {longDays.map((day) => (
                    <TableHead key={day} className="min-w-[180px]">{day}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {timeSlots.map((time) => {
                  const hour = parseInt(time.split(":")[0])
                  return (
                    <TableRow key={time}>
                      <TableCell className="font-medium">{time}</TableCell>
                      {longDays.map((day) => {
                        const s = itemsForGrid.find(
                          (it) => it.day === day && parseInt(it.time.split(":")[0]) === hour && (selectedCourse === "ALL" || it.code === selectedCourse)
                        )
                        return (
                          <TableCell key={day} className="p-2">
                            {s ? (
                              <Card className="p-3 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
                                <div className="space-y-1">
                                  <div className="flex items-center justify-between">
                                    <Badge variant="default" className="text-xs">{s.code}</Badge>
                                    <Badge variant="outline" className="text-xs">{s.duration}min</Badge>
                                  </div>
                                  <p className="font-semibold text-sm">{s.course}</p>
                                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                                    <MapPin className="w-3 h-3" />
                                    <span>{s.room}</span>
                                  </div>
                                  <Badge variant="secondary" className="text-xs mt-1">{s.type}</Badge>
                                </div>
                              </Card>
                            ) : (
                              <div className="h-20 border border-dashed border-muted-foreground/20 rounded-md"></div>
                            )}
                          </TableCell>
                        )
                      })}
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

const dayOrder: Record<string, number> = { Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6, Sun: 7 }

function sortByDayTime(a: ScheduleItem, b: ScheduleItem) {
  const dayDiff = (dayOrder[a.day] || 0) - (dayOrder[b.day] || 0)
  if (dayDiff !== 0) return dayDiff
  return a.start.localeCompare(b.start)
}

function getTodayShort(): "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun" {
  const d = new Date().getDay() // 0 Sun ... 6 Sat
  return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][d] as any
}

function shortToLongDay(short: string) {
  const map: Record<string, string> = { Mon: "Monday", Tue: "Tuesday", Wed: "Wednesday", Thu: "Thursday", Fri: "Friday", Sat: "Saturday", Sun: "Sunday" }
  return map[short] || short
}

function BookOpenIcon() {
  // small inline icon to match style without extra imports
  return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h8a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-8a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h9z"></path></svg>
}

function durationMinutes(start: string, end: string) {
  const [sh, sm] = start.split(":").map(Number)
  const [eh, em] = end.split(":").map(Number)
  const startMin = sh * 60 + sm
  const endMin = eh * 60 + em
  const d = endMin - startMin
  return d > 0 ? d : 0
}


