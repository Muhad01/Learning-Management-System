import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Calendar, Clock, Upload, Eye } from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"

export default function StudentAssignmentsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div className="flex items-center space-x-2">
          <SidebarTrigger />
          <h2 className="text-3xl font-bold tracking-tight">Assignments</h2>
        </div>
      </div>

      {/* Assignment Categories */}
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-red-600">Pending Assignments</CardTitle>
            <CardDescription>Assignments that need to be completed</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  title: "Mathematical Analysis Essay",
                  course: "Advanced Mathematics",
                  dueDate: "Tomorrow",
                  timeLeft: "18 hours",
                  priority: "high",
                  description: "Write a comprehensive analysis of differential equations",
                  points: 100,
                },
                {
                  title: "Programming Project",
                  course: "Computer Science",
                  dueDate: "Dec 20, 2024",
                  timeLeft: "3 days",
                  priority: "medium",
                  description: "Create a web application using React and Node.js",
                  points: 150,
                },
                {
                  title: "Lab Report",
                  course: "Physics",
                  dueDate: "Dec 22, 2024",
                  timeLeft: "5 days",
                  priority: "low",
                  description: "Submit lab findings on electromagnetic fields",
                  points: 75,
                },
              ].map((assignment, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        assignment.priority === "high"
                          ? "bg-red-100"
                          : assignment.priority === "medium"
                            ? "bg-yellow-100"
                            : "bg-green-100"
                      }`}
                    >
                      <FileText
                        className={`w-5 h-5 ${
                          assignment.priority === "high"
                            ? "text-red-600"
                            : assignment.priority === "medium"
                              ? "text-yellow-600"
                              : "text-green-600"
                        }`}
                      />
                    </div>
                    <div>
                      <h4 className="font-medium">{assignment.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {assignment.course} • {assignment.points} points
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">{assignment.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="flex items-center space-x-2 text-sm">
                        <Calendar className="w-4 h-4" />
                        <span>Due {assignment.dueDate}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>{assignment.timeLeft} left</span>
                      </div>
                    </div>
                    <Badge
                      variant={
                        assignment.priority === "high"
                          ? "destructive"
                          : assignment.priority === "medium"
                            ? "default"
                            : "secondary"
                      }
                    >
                      {assignment.priority}
                    </Badge>
                    <Button size="sm">
                      <Upload className="w-4 h-4 mr-2" />
                      Submit
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-green-600">Completed Assignments</CardTitle>
            <CardDescription>Your submitted assignments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  title: "Organic Chemistry Lab",
                  course: "Chemistry",
                  submittedDate: "Dec 10, 2024",
                  grade: "A",
                  points: "85/100",
                  status: "Graded",
                },
                {
                  title: "Historical Timeline Project",
                  course: "History",
                  submittedDate: "Dec 8, 2024",
                  grade: "B+",
                  points: "88/100",
                  status: "Graded",
                },
                {
                  title: "Poetry Analysis",
                  course: "Literature",
                  submittedDate: "Dec 5, 2024",
                  grade: "Pending",
                  points: "-/75",
                  status: "Under Review",
                },
              ].map((assignment, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">{assignment.title}</h4>
                      <p className="text-sm text-muted-foreground">{assignment.course}</p>
                      <p className="text-xs text-muted-foreground">Submitted {assignment.submittedDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <Badge variant={assignment.status === "Graded" ? "default" : "secondary"}>
                        {assignment.status}
                      </Badge>
                      {assignment.grade !== "Pending" && (
                        <div className="text-sm font-medium mt-1">
                          {assignment.grade} ({assignment.points})
                        </div>
                      )}
                    </div>
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
