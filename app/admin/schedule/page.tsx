import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  Calendar, 
  Plus, 
  Clock, 
  MapPin, 
  Users, 
  Filter,
  Download,
  Upload,
  Edit,
  Trash2
} from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AdminSchedulePage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div className="flex items-center space-x-2">
          <SidebarTrigger />
          <h2 className="text-3xl font-bold tracking-tight">Schedule</h2>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Event
          </Button>
        </div>
      </div>

      {/* Schedule Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Classes</p>
                <p className="text-2xl font-bold">78</p>
              </div>
              <Calendar className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Today&apos;s Events</p>
                <p className="text-2xl font-bold text-blue-600">12</p>
              </div>
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Rooms in Use</p>
                <p className="text-2xl font-bold text-green-600">24</p>
              </div>
              <MapPin className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Available Rooms</p>
                <p className="text-2xl font-bold text-purple-600">18</p>
              </div>
              <MapPin className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="calendar" className="space-y-4">
        <TabsList>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="week">This Week</TabsTrigger>
          <TabsTrigger value="month">This Month</TabsTrigger>
        </TabsList>

        <TabsContent value="calendar" className="space-y-4">
          {/* Weekly Schedule View */}
          <div className="grid gap-4 md:grid-cols-7">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
              <Card key={index}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">{day}</CardTitle>
                  <CardDescription className="text-xs">
                    {index === 0 ? 'Jan 15' : index === 1 ? 'Jan 16' : index === 2 ? 'Jan 17' : 
                     index === 3 ? 'Jan 18' : index === 4 ? 'Jan 19' : index === 5 ? 'Jan 20' : 'Jan 21'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {index === 0 && (
                    <>
                      <div className="p-2 bg-blue-50 rounded-md border border-blue-200">
                        <p className="text-xs font-medium">Data Structures</p>
                        <p className="text-xs text-muted-foreground">10:00 AM - 11:30 AM</p>
                        <p className="text-xs text-muted-foreground">Room 101</p>
                      </div>
                      <div className="p-2 bg-purple-50 rounded-md border border-purple-200">
                        <p className="text-xs font-medium">Math Seminar</p>
                        <p className="text-xs text-muted-foreground">02:00 PM - 03:30 PM</p>
                        <p className="text-xs text-muted-foreground">Room 205</p>
                      </div>
                    </>
                  )}
                  {index === 1 && (
                    <div className="p-2 bg-green-50 rounded-md border border-green-200">
                      <p className="text-xs font-medium">CS Fundamentals</p>
                      <p className="text-xs text-muted-foreground">09:00 AM - 10:30 AM</p>
                      <p className="text-xs text-muted-foreground">Lab A</p>
                    </div>
                  )}
                  {index === 2 && (
                    <>
                      <div className="p-2 bg-orange-50 rounded-md border border-orange-200">
                        <p className="text-xs font-medium">Digital Marketing</p>
                        <p className="text-xs text-muted-foreground">11:00 AM - 12:30 PM</p>
                        <p className="text-xs text-muted-foreground">Room 305</p>
                      </div>
                      <div className="p-2 bg-pink-50 rounded-md border border-pink-200">
                        <p className="text-xs font-medium">Physics Lab</p>
                        <p className="text-xs text-muted-foreground">02:00 PM - 04:00 PM</p>
                        <p className="text-xs text-muted-foreground">Lab B</p>
                      </div>
                    </>
                  )}
                  {index === 3 && (
                    <div className="p-2 bg-teal-50 rounded-md border border-teal-200">
                      <p className="text-xs font-medium">History Lecture</p>
                      <p className="text-xs text-muted-foreground">10:00 AM - 11:30 AM</p>
                      <p className="text-xs text-muted-foreground">Auditorium</p>
                    </div>
                  )}
                  {index === 4 && (
                    <div className="p-2 bg-indigo-50 rounded-md border border-indigo-200">
                      <p className="text-xs font-medium">Chemistry Lab</p>
                      <p className="text-xs text-muted-foreground">01:00 PM - 03:00 PM</p>
                      <p className="text-xs text-muted-foreground">Lab C</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>Next scheduled classes and events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    title: "Data Structures - Lab Session",
                    time: "9:00 AM - 11:00 AM",
                    location: "Lab A, Building 1",
                    instructor: "Dr. Robert Wilson",
                    students: 28,
                    room: "Available",
                  },
                  {
                    title: "Digital Marketing Workshop",
                    time: "2:00 PM - 4:00 PM",
                    location: "Room 305, Building 2",
                    instructor: "Ms. Emily Davis",
                    students: 32,
                    room: "Reserved",
                  },
                  {
                    title: "Mathematics Seminar",
                    time: "3:00 PM - 5:00 PM",
                    location: "Auditorium",
                    instructor: "Dr. Sarah Johnson",
                    students: 45,
                    room: "Reserved",
                  },
                ].map((event, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4 flex-1">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Clock className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{event.title}</h4>
                        <p className="text-sm text-muted-foreground">{event.instructor}</p>
                        <div className="flex items-center space-x-4 mt-1">
                          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                            <MapPin className="w-3 h-3" />
                            <span>{event.location}</span>
                          </div>
                          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                            <Users className="w-3 h-3" />
                            <span>{event.students} students</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={event.room === "Available" ? "default" : "secondary"}>
                        {event.room}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="today" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Today&apos;s Schedule</CardTitle>
              <CardDescription>All classes and events scheduled for today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    time: "09:00 AM - 10:30 AM",
                    title: "CS Fundamentals",
                    room: "Lab A",
                    instructor: "Prof. Mike Chen",
                    students: 67,
                  },
                  {
                    time: "10:00 AM - 11:30 AM",
                    title: "Data Structures",
                    room: "Room 101",
                    instructor: "Dr. Robert Wilson",
                    students: 28,
                  },
                  {
                    time: "02:00 PM - 03:30 PM",
                    title: "Math Seminar",
                    room: "Room 205",
                    instructor: "Dr. Sarah Johnson",
                    students: 45,
                  },
                ].map((event, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 border rounded-lg">
                    <div className="text-center min-w-[120px]">
                      <p className="text-sm font-medium">{event.time}</p>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{event.title}</h4>
                      <p className="text-sm text-muted-foreground">{event.instructor}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium">{event.room}</p>
                      <p className="text-xs text-muted-foreground">{event.students} students</p>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="week" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>This Week&apos;s Schedule</CardTitle>
              <CardDescription>Overview of all classes and events this week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Weekly schedule view will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="month" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>This Month&apos;s Schedule</CardTitle>
              <CardDescription>Complete overview of scheduled events this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Monthly calendar view will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
