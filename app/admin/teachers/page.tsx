import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { GraduationCap, Plus, Search, Filter, MoreHorizontal, Mail, Phone, BookOpen, Users } from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"

export default function AdminTeachersPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div className="flex items-center space-x-2">
          <SidebarTrigger />
          <h2 className="text-3xl font-bold tracking-tight">Teachers</h2>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search teachers..." className="pl-8 w-64" />
          </div>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Teacher
          </Button>
        </div>
      </div>

      {/* Teacher Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Teachers</p>
                <p className="text-2xl font-bold">89</p>
              </div>
              <GraduationCap className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active</p>
                <p className="text-2xl font-bold text-green-600">82</p>
              </div>
              <GraduationCap className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">On Leave</p>
                <p className="text-2xl font-bold text-yellow-600">5</p>
              </div>
              <GraduationCap className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Part-time</p>
                <p className="text-2xl font-bold text-blue-600">12</p>
              </div>
              <GraduationCap className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Teachers List */}
      <Card>
        <CardHeader>
          <CardTitle>All Teachers</CardTitle>
          <CardDescription>Manage and view all faculty members</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                id: "TCH001",
                name: "Dr. Sarah Johnson",
                email: "sarah.johnson@school.edu",
                phone: "+1 (555) 123-4567",
                department: "Computer Science",
                specialization: "Artificial Intelligence",
                experience: "8 years",
                status: "Active",
                hireDate: "Sep 2018",
                courses: 4,
                students: 120,
                qualification: "Ph.D. Computer Science",
              },
              {
                id: "TCH002",
                name: "Prof. Michael Chen",
                email: "michael.chen@school.edu",
                phone: "+1 (555) 234-5678",
                department: "Mathematics",
                specialization: "Applied Mathematics",
                experience: "12 years",
                status: "Active",
                hireDate: "Sep 2014",
                courses: 3,
                students: 95,
                qualification: "Ph.D. Mathematics",
              },
              {
                id: "TCH003",
                name: "Dr. Emily Rodriguez",
                email: "emily.rodriguez@school.edu",
                phone: "+1 (555) 345-6789",
                department: "Physics",
                specialization: "Quantum Mechanics",
                experience: "6 years",
                status: "Active",
                hireDate: "Sep 2020",
                courses: 5,
                students: 140,
                qualification: "Ph.D. Physics",
              },
              {
                id: "TCH004",
                name: "Prof. James Wilson",
                email: "james.wilson@school.edu",
                phone: "+1 (555) 456-7890",
                department: "Chemistry",
                specialization: "Organic Chemistry",
                experience: "15 years",
                status: "Active",
                hireDate: "Sep 2011",
                courses: 3,
                students: 85,
                qualification: "Ph.D. Chemistry",
              },
              {
                id: "TCH005",
                name: "Dr. Lisa Thompson",
                email: "lisa.thompson@school.edu",
                phone: "+1 (555) 567-8901",
                department: "Biology",
                specialization: "Molecular Biology",
                experience: "7 years",
                status: "On Leave",
                hireDate: "Sep 2019",
                courses: 2,
                students: 60,
                qualification: "Ph.D. Biology",
              },
            ].map((teacher, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-lg font-semibold text-purple-600">
                        {teacher.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{teacher.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {teacher.id} • {teacher.department} • {teacher.specialization}
                      </p>
                      <div className="flex items-center space-x-4 mt-1">
                        <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                          <Mail className="w-3 h-3" />
                          <span>{teacher.email}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                          <Phone className="w-3 h-3" />
                          <span>{teacher.phone}</span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {teacher.qualification} • {teacher.experience} experience
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6">
                    <div className="text-center">
                      <p className="text-sm font-medium">{teacher.courses}</p>
                      <p className="text-xs text-muted-foreground">Courses</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium">{teacher.students}</p>
                      <p className="text-xs text-muted-foreground">Students</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium">{teacher.experience}</p>
                      <p className="text-xs text-muted-foreground">Experience</p>
                    </div>
                    <div className="text-center">
                      <Badge variant={teacher.status === "Active" ? "default" : "secondary"}>{teacher.status}</Badge>
                      <p className="text-xs text-muted-foreground mt-1">Since {teacher.hireDate}</p>
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


