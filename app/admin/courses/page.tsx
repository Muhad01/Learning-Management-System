import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { BookOpen, Plus, Search, Filter, Users, FileText, MoreHorizontal } from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"

export default function AdminCoursesPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div className="flex items-center space-x-2">
          <SidebarTrigger />
          <h2 className="text-3xl font-bold tracking-tight">Courses</h2>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search courses..." className="pl-8 w-64" />
          </div>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Course
          </Button>
        </div>
      </div>

      {/* Course Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Courses</p>
                <p className="text-2xl font-bold">156</p>
              </div>
              <BookOpen className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active</p>
                <p className="text-2xl font-bold text-green-600">134</p>
              </div>
              <BookOpen className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Draft</p>
                <p className="text-2xl font-bold text-yellow-600">18</p>
              </div>
              <BookOpen className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Archived</p>
                <p className="text-2xl font-bold text-gray-600">4</p>
              </div>
              <BookOpen className="h-8 w-8 text-gray-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Courses List */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[
          {
            name: "Advanced Mathematics",
            code: "MATH301",
            instructor: "Dr. Sarah Johnson",
            students: 45,
            capacity: 50,
            assignments: 8,
            status: "Active",
            department: "Mathematics",
            credits: 4,
            image: "/placeholder.svg?height=200&width=300&text=Advanced+Math",
          },
          {
            name: "Computer Science Fundamentals",
            code: "CS101",
            instructor: "Prof. Mike Chen",
            students: 67,
            capacity: 70,
            assignments: 6,
            status: "Active",
            department: "Computer Science",
            credits: 3,
            image: "/placeholder.svg?height=200&width=300&text=CS+Fundamentals",
          },
          {
            name: "Digital Marketing",
            code: "MKT205",
            instructor: "Ms. Emily Davis",
            students: 32,
            capacity: 40,
            assignments: 5,
            status: "Draft",
            department: "Business",
            credits: 3,
            image: "/placeholder.svg?height=200&width=300&text=Digital+Marketing",
          },
          {
            name: "Data Structures",
            code: "CS220",
            instructor: "Dr. Robert Wilson",
            students: 28,
            capacity: 35,
            assignments: 7,
            status: "Active",
            department: "Computer Science",
            credits: 4,
            image: "/placeholder.svg?height=200&width=300&text=Data+Structures",
          },
          {
            name: "Organic Chemistry",
            code: "CHEM301",
            instructor: "Dr. Lisa Anderson",
            students: 41,
            capacity: 45,
            assignments: 9,
            status: "Active",
            department: "Chemistry",
            credits: 4,
            image: "/placeholder.svg?height=200&width=300&text=Organic+Chemistry",
          },
          {
            name: "World History",
            code: "HIST101",
            instructor: "Prof. James Miller",
            students: 55,
            capacity: 60,
            assignments: 4,
            status: "Active",
            department: "History",
            credits: 3,
            image: "/placeholder.svg?height=200&width=300&text=World+History",
          },
        ].map((course, index) => (
          <Card key={index} className="overflow-hidden">
            <div className="aspect-video relative overflow-hidden">
              <img src={course.image || "/placeholder.svg"} alt={course.name} className="w-full h-full object-cover" />
              <div className="absolute top-2 right-2">
                <Badge
                  variant={course.status === "Active" ? "default" : course.status === "Draft" ? "secondary" : "outline"}
                >
                  {course.status}
                </Badge>
              </div>
            </div>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">{course.name}</CardTitle>
              <CardDescription>
                {course.code} • {course.department} • {course.credits} Credits
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Instructor</span>
                <span className="font-medium">{course.instructor}</span>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="flex items-center justify-center">
                    <Users className="w-4 h-4 mr-1" />
                    <span className="text-sm font-medium">
                      {course.students}/{course.capacity}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">Enrolled</p>
                </div>
                <div>
                  <div className="flex items-center justify-center">
                    <FileText className="w-4 h-4 mr-1" />
                    <span className="text-sm font-medium">{course.assignments}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Assignments</p>
                </div>
                <div>
                  <div className="flex items-center justify-center">
                    <span className="text-sm font-medium">
                      {Math.round((course.students / course.capacity) * 100)}%
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">Capacity</p>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button className="flex-1" size="sm">
                  Manage Course
                </Button>
                <Button variant="outline" size="sm">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
