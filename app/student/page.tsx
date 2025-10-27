import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BookOpen, FileText, Clock, Award, TrendingUp } from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"

export default function StudentDashboard() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div className="flex items-center space-x-2">
          <SidebarTrigger />
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Welcome back, Alex!</h2>
            <p className="text-muted-foreground">Here&apos;s what&apos;s happening with your courses today.</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Enrolled Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6</div>
            <p className="text-xs text-muted-foreground">This semester</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">Due this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Grade</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">A-</div>
            <p className="text-xs text-muted-foreground">+0.2 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-muted-foreground">+5% from last week</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Course Progress */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Course Progress</CardTitle>
            <CardDescription>Your progress in enrolled courses</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {[
              { name: "Advanced Mathematics", progress: 85, grade: "A", instructor: "Dr. Sarah Johnson" },
              { name: "Computer Science", progress: 72, grade: "B+", instructor: "Prof. Mike Chen" },
              { name: "Physics", progress: 90, grade: "A-", instructor: "Dr. Emily Davis" },
              { name: "Chemistry", progress: 68, grade: "B", instructor: "Prof. Robert Wilson" },
            ].map((course, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{course.name}</h4>
                    <p className="text-sm text-muted-foreground">{course.instructor}</p>
                  </div>
                  <Badge variant="outline">{course.grade}</Badge>
                </div>
                <Progress value={course.progress} className="h-2" />
                <p className="text-xs text-muted-foreground">{course.progress}% complete</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Upcoming Deadlines */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Upcoming Deadlines</CardTitle>
            <CardDescription>Don&apos;t miss these important dates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Math Assignment #3</p>
                <p className="text-xs text-muted-foreground">Due tomorrow</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Physics Lab Report</p>
                <p className="text-xs text-muted-foreground">Due in 3 days</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Chemistry Quiz</p>
                <p className="text-xs text-muted-foreground">Due in 5 days</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">CS Project</p>
                <p className="text-xs text-muted-foreground">Due next week</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Assignments */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Assignments</CardTitle>
          <CardDescription>Your latest assignment submissions and grades</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                name: "Calculus Problem Set",
                course: "Advanced Mathematics",
                grade: "A",
                status: "Graded",
                submitted: "3 days ago",
              },
              {
                name: "Data Structures Quiz",
                course: "Computer Science",
                grade: "B+",
                status: "Graded",
                submitted: "5 days ago",
              },
              {
                name: "Lab Experiment Report",
                course: "Physics",
                grade: "-",
                status: "Pending",
                submitted: "2 days ago",
              },
              {
                name: "Organic Chemistry Essay",
                course: "Chemistry",
                grade: "A-",
                status: "Graded",
                submitted: "1 week ago",
              },
            ].map((assignment, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium">{assignment.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {assignment.course} • {assignment.submitted}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge variant={assignment.status === "Graded" ? "default" : "secondary"}>{assignment.status}</Badge>
                  {assignment.grade !== "-" && <Badge variant="outline">{assignment.grade}</Badge>}
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
