import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Calendar, Plus, Search, Filter, Clock, MapPin, Users, BookOpen, MoreHorizontal } from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function AdminSchedulePage() {
  const timeSlots = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"]
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]

  const schedules = [
    {
      id: "SCH001",
      course: "Advanced Mathematics",
      code: "MATH301",
      instructor: "Dr. Sarah Johnson",
      day: "Monday",
      time: "09:00",
      duration: 90,
      room: "Room 101",
      building: "Science Building",
      students: 45,
      status: "Active",
    },
    {
      id: "SCH002",
      course: "Computer Science Fundamentals",
      code: "CS101",
      instructor: "Prof. Mike Chen",
      day: "Monday",
      time: "14:00",
      duration: 90,
      room: "Room 205",
      building: "Tech Building",
      students: 67,
      status: "Active",
    },
    {
      id: "SCH003",
      course: "Data Structures",
      code: "CS220",
      instructor: "Dr. Robert Wilson",
      day: "Tuesday",
      time: "10:00",
      duration: 90,
      room: "Room 210",
      building: "Tech Building",
      students: 28,
      status: "Active",
    },
    {
      id: "SCH004",
      course: "Organic Chemistry",
      code: "CHEM301",
      instructor: "Dr. Lisa Anderson",
      day: "Wednesday",
      time: "11:00",
      duration: 120,
      room: "Lab 301",
      building: "Science Building",
      students: 41,
      status: "Active",
    },
    {
      id: "SCH005",
      course: "World History",
      code: "HIST101",
      instructor: "Prof. James Miller",
      day: "Thursday",
      time: "09:00",
      duration: 90,
      room: "Room 120",
      building: "Humanities Building",
      students: 55,
      status: "Active",
    },
    {
      id: "SCH006",
      course: "Digital Marketing",
      code: "MKT205",
      instructor: "Ms. Emily Davis",
      day: "Friday",
      time: "13:00",
      duration: 90,
      room: "Room 305",
      building: "Business Building",
      students: 32,
      status: "Active",
    },
  ]

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div className="flex items-center space-x-2">
          <SidebarTrigger />
          <h2 className="text-3xl font-bold tracking-tight">Schedule Management</h2>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search schedules..." className="pl-8 w-64" />
          </div>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Schedule
          </Button>
        </div>
      </div>

      {/* Schedule Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Schedules</p>
                <p className="text-2xl font-bold">156</p>
              </div>
              <Calendar className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Classes</p>
                <p className="text-2xl font-bold text-green-600">142</p>
              </div>
              <Calendar className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">This Week</p>
                <p className="text-2xl font-bold text-blue-600">78</p>
              </div>
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Rooms Used</p>
                <p className="text-2xl font-bold text-brand">24</p>
              </div>
              <MapPin className="h-8 w-8 text-brand" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Schedule View */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Schedule View</CardTitle>
          <CardDescription>Overview of all classes scheduled for the week</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-24">Time</TableHead>
                  {days.map((day) => (
                    <TableHead key={day} className="min-w-[200px]">
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
                        const schedule = schedules.find(
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
                                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                                    <Users className="w-3 h-3" />
                                    <span>{schedule.students} students</span>
                                  </div>
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

      {/* Schedule List */}
      <Card>
        <CardHeader>
          <CardTitle>All Schedules</CardTitle>
          <CardDescription>Complete list of all scheduled classes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {schedules.map((schedule) => (
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
                          <Clock className="w-3 h-3" />
                          <span>
                            {schedule.day}, {schedule.time} ({schedule.duration} min)
                          </span>
                        </div>
                        <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                          <MapPin className="w-3 h-3" />
                          <span>
                            {schedule.room}, {schedule.building}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                          <Users className="w-3 h-3" />
                          <span>{schedule.students} students</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <Badge variant={schedule.status === "Active" ? "default" : "secondary"}>
                        {schedule.status}
                      </Badge>
                    </div>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
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

