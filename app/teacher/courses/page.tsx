import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Users, FileText, Plus, Settings, Eye } from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"

export default function TeacherCoursesPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div className="flex items-center space-x-2">
          <SidebarTrigger />
          <h2 className="text-3xl font-bold tracking-tight">My Courses</h2>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Course
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[
          {
            name: "Advanced Mathematics",
            code: "MATH301",
            semester: "Fall 2024",
            students: 45,
            assignments: 8,
            materials: 12,
            status: "Active",
            image: "/placeholder.svg?height=200&width=300&text=Advanced+Math",
          },
          {
            name: "Calculus I",
            code: "MATH101",
            semester: "Fall 2024",
            students: 38,
            assignments: 6,
            materials: 15,
            status: "Active",
            image: "/placeholder.svg?height=200&width=300&text=Calculus",
          },
          {
            name: "Statistics",
            code: "MATH205",
            semester: "Fall 2024",
            students: 52,
            assignments: 5,
            materials: 9,
            status: "Active",
            image: "/placeholder.svg?height=200&width=300&text=Statistics",
          },
          {
            name: "Linear Algebra",
            code: "MATH220",
            semester: "Fall 2024",
            students: 29,
            assignments: 7,
            materials: 11,
            status: "Active",
            image: "/placeholder.svg?height=200&width=300&text=Linear+Algebra",
          },
        ].map((course, index) => (
          <Card key={index} className="overflow-hidden">
            <div className="aspect-video relative overflow-hidden">
              <img src={course.image || "/placeholder.svg"} alt={course.name} className="w-full h-full object-cover" />
              <div className="absolute top-2 right-2">
                <Badge variant="secondary">{course.status}</Badge>
              </div>
            </div>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg">{course.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {course.code} • {course.semester}
                  </p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="flex items-center justify-center">
                    <Users className="w-4 h-4 mr-1" />
                    <span className="text-sm font-medium">{course.students}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Students</p>
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
                    <BookOpen className="w-4 h-4 mr-1" />
                    <span className="text-sm font-medium">{course.materials}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Materials</p>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button className="flex-1" size="sm">
                  <Eye className="w-4 h-4 mr-2" />
                  View Course
                </Button>
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
