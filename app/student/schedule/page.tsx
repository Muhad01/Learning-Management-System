import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Users, BookOpen, ChevronRight, Bell } from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function StudentSchedulePage() {
  const timeSlots = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"]
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]

  const mySchedules = [
    {
      id: "SCH001",
      course: "Advanced Mathematics",
      code: "MATH301",
      instructor: "Dr. Sarah Johnson",
      day: "Monday",
      time: "09:00",
      endTime: "10:30",
      duration: 90,
      room: "Room 101",
      building: "Science Building",
      type: "Lecture",
      status: "Active",
    },
    {
      id: "SCH002",
      course: "Computer Science Fundamentals",
      code: "CS101",
      instructor: "Prof. Mike Chen",
      day: "Monday",
      time: "14:00",
      endTime: "15:30",
      duration: 90,
      room: "Room 205",
      building: "Tech Building",
      type: "Lecture",
      status: "Active",
    },
    {
      id: "SCH003",
      course: "Data Structures",
      code: "CS220",
      instructor: "Dr. Robert Wilson",
      day: "Tuesday",
      time: "10:00",
      endTime: "11:30",
      duration: 90,
      room: "Room 210",
      building: "Tech Building",
      type: "Lab",
      status: "Active",
    },
    {
      id: "SCH004",
      course: "Physics",
      code: "PHYS201",
      instructor: "Dr. Emily Davis",
      day: "Wednesday",
      time: "11:00",
      endTime: "12:30",
      duration: 90,
      room: "Lab 301",
      building: "Science Building",
      type: "Lab",
      status: "Active",
    },
    {
      id: "SCH005",
      course: "Chemistry",
      code: "CHEM101",
      instructor: "Prof. Robert Wilson",
      day: "Thursday",
      time: "09:00",
      endTime: "10:30",
      duration: 90,
      room: "Room 150",
      building: "Science Building",
      type: "Lecture",
      status: "Active",
    },
    {
      id: "SCH006",
      course: "History",
      code: "HIST101",
      instructor: "Dr. James Miller",
      day: "Friday",
      time: "13:00",
      endTime: "14:30",
      duration: 90,
      room: "Room 120",
      building: "Humanities Building",
      type: "Lecture",
      status: "Active",
    },
  ]

  // Get today's classes
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" })
  const todayClasses = mySchedules.filter((schedule) => schedule.day === today)

  // Upcoming classes section removed

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div className="flex items-center space-x-2">
          <SidebarTrigger />
          <h2 className="text-3xl font-bold tracking-tight">My Schedule</h2>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            View Calendar
          </Button>
        </div>
      </div>

      {/* Today's Schedule */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">Today&apos;s Classes</CardTitle>
              <CardDescription>
                {today} • {todayClasses.length} class{todayClasses.length !== 1 ? "es" : ""} scheduled
              </CardDescription>
            </div>
            <Badge variant="outline" className="text-sm">
              {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {todayClasses.length > 0 ? (
            <div className="space-y-4">
              {todayClasses.map((schedule) => (
                <Card key={schedule.id} className="p-4 border-l-4 border-l-blue-500">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                        <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{schedule.course}</h3>
                        <p className="text-sm text-muted-foreground">
                          {schedule.code} • {schedule.instructor}
                        </p>
                        <div className="flex items-center space-x-4 mt-2">
                          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            <span>
                              {schedule.time} - {schedule.endTime}
                            </span>
                          </div>
                          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                            <MapPin className="w-3 h-3" />
                            <span>
                              {schedule.room}, {schedule.building}
                            </span>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {schedule.type}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Bell className="w-4 h-4 mr-2" />
                        Remind
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Calendar className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>No classes scheduled for today</p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-1">
        {/* Weekly Schedule */}
        <Card className="md:col-span-1">
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
                    {days.map((day) => (
                      <TableHead key={day} className="min-w-[180px]">
                        {day}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {timeSlots.map((time) => {
                    const hour = parseInt(time.split(":")[0])
                    return (
                      <TableRow key={time}>
                        <TableCell className="font-medium">{time}</TableCell>
                        {days.map((day) => {
                          const schedule = mySchedules.find(
                            (s) => s.day === day && parseInt(s.time.split(":")[0]) === hour
                          )
                          return (
                            <TableCell key={day} className="p-2">
                              {schedule ? (
                                <Card className="p-3 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
                                  <div className="space-y-1">
                                    <div className="flex items-center justify-between">
                                      <Badge variant="default" className="text-xs">
                                        {schedule.code}
                                      </Badge>
                                      <Badge variant="outline" className="text-xs">
                                        {schedule.duration}min
                                      </Badge>
                                    </div>
                                    <p className="font-semibold text-sm">{schedule.course}</p>
                                    <p className="text-xs text-muted-foreground">{schedule.instructor}</p>
                                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                                      <MapPin className="w-3 h-3" />
                                      <span>{schedule.room}</span>
                                    </div>
                                    <Badge variant="secondary" className="text-xs mt-1">
                                      {schedule.type}
                                    </Badge>
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

      {/* All My Classes */}
      <Card>
        <CardHeader>
          <CardTitle>All My Classes</CardTitle>
          <CardDescription>Complete list of all your scheduled classes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mySchedules.map((schedule) => (
              <Card key={schedule.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{schedule.course}</h3>
                      <p className="text-sm text-muted-foreground">
                        {schedule.code} • {schedule.instructor}
                      </p>
                      <div className="flex items-center space-x-4 mt-2">
                        <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          <span>{schedule.day}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          <span>
                            {schedule.time} - {schedule.endTime}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                          <MapPin className="w-3 h-3" />
                          <span>
                            {schedule.room}, {schedule.building}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge variant="outline">{schedule.type}</Badge>
                    <Badge variant={schedule.status === "Active" ? "default" : "secondary"}>
                      {schedule.status}
                    </Badge>
                    <Button variant="ghost" size="sm">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

