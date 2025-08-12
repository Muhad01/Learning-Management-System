import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Users, Plus, Search, Filter, MoreHorizontal, Mail, Phone } from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"

export default function AdminStudentsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div className="flex items-center space-x-2">
          <SidebarTrigger />
          <h2 className="text-3xl font-bold tracking-tight">Students</h2>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search students..." className="pl-8 w-64" />
          </div>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Student
          </Button>
        </div>
      </div>

      {/* Student Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                <p className="text-2xl font-bold">2,847</p>
              </div>
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active</p>
                <p className="text-2xl font-bold text-green-600">2,734</p>
              </div>
              <Users className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Inactive</p>
                <p className="text-2xl font-bold text-yellow-600">98</p>
              </div>
              <Users className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Graduated</p>
                <p className="text-2xl font-bold text-blue-600">15</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Students List */}
      <Card>
        <CardHeader>
          <CardTitle>All Students</CardTitle>
          <CardDescription>Manage and view all enrolled students</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                id: "STU001",
                name: "Alice Johnson",
                email: "alice.johnson@school.edu",
                phone: "+1 (555) 123-4567",
                program: "Computer Science",
                year: "3rd Year",
                gpa: 3.8,
                status: "Active",
                enrollDate: "Sep 2022",
                courses: 6,
              },
              {
                id: "STU002",
                name: "Bob Smith",
                email: "bob.smith@school.edu",
                phone: "+1 (555) 234-5678",
                program: "Mathematics",
                year: "2nd Year",
                gpa: 3.6,
                status: "Active",
                enrollDate: "Sep 2023",
                courses: 5,
              },
              {
                id: "STU003",
                name: "Carol Davis",
                email: "carol.davis@school.edu",
                phone: "+1 (555) 345-6789",
                program: "Physics",
                year: "4th Year",
                gpa: 3.9,
                status: "Active",
                enrollDate: "Sep 2021",
                courses: 4,
              },
              {
                id: "STU004",
                name: "David Wilson",
                email: "david.wilson@school.edu",
                phone: "+1 (555) 456-7890",
                program: "Chemistry",
                year: "1st Year",
                gpa: 3.4,
                status: "Active",
                enrollDate: "Sep 2024",
                courses: 6,
              },
            ].map((student, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-lg font-semibold text-blue-600">
                        {student.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{student.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {student.id} • {student.program}
                      </p>
                      <div className="flex items-center space-x-4 mt-1">
                        <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                          <Mail className="w-3 h-3" />
                          <span>{student.email}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                          <Phone className="w-3 h-3" />
                          <span>{student.phone}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6">
                    <div className="text-center">
                      <p className="text-sm font-medium">{student.year}</p>
                      <p className="text-xs text-muted-foreground">Year</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium">{student.gpa}</p>
                      <p className="text-xs text-muted-foreground">GPA</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium">{student.courses}</p>
                      <p className="text-xs text-muted-foreground">Courses</p>
                    </div>
                    <div className="text-center">
                      <Badge variant={student.status === "Active" ? "default" : "secondary"}>{student.status}</Badge>
                      <p className="text-xs text-muted-foreground mt-1">Since {student.enrollDate}</p>
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
