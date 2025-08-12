import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, Award, Target } from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"

export default function StudentGradesPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div className="flex items-center space-x-2">
          <SidebarTrigger />
          <h2 className="text-3xl font-bold tracking-tight">Grades</h2>
        </div>
      </div>

      {/* Overall Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Overall GPA</p>
                <p className="text-3xl font-bold text-green-600">3.7</p>
              </div>
              <Award className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">This Semester</p>
                <p className="text-3xl font-bold">3.8</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed Credits</p>
                <p className="text-3xl font-bold">45</p>
              </div>
              <Target className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Class Rank</p>
                <p className="text-3xl font-bold">15/247</p>
              </div>
              <Award className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Course Grades */}
      <Card>
        <CardHeader>
          <CardTitle>Course Grades</CardTitle>
          <CardDescription>Your grades for each enrolled course</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {[
              {
                course: "Advanced Mathematics",
                instructor: "Dr. Sarah Johnson",
                currentGrade: "A",
                percentage: 92,
                credits: 4,
                assignments: [
                  { name: "Midterm Exam", grade: "A", percentage: 94, weight: "30%" },
                  { name: "Assignment 1", grade: "A-", percentage: 88, weight: "15%" },
                  { name: "Assignment 2", grade: "A", percentage: 95, weight: "15%" },
                  { name: "Quiz 1", grade: "B+", percentage: 85, weight: "10%" },
                ],
              },
              {
                course: "Computer Science Fundamentals",
                instructor: "Prof. Mike Chen",
                currentGrade: "B+",
                percentage: 87,
                credits: 3,
                assignments: [
                  { name: "Project 1", grade: "A", percentage: 92, weight: "25%" },
                  { name: "Midterm", grade: "B", percentage: 82, weight: "25%" },
                  { name: "Lab Reports", grade: "B+", percentage: 86, weight: "20%" },
                ],
              },
              {
                course: "Physics",
                instructor: "Dr. Emily Davis",
                currentGrade: "A-",
                percentage: 89,
                credits: 4,
                assignments: [
                  { name: "Lab Practicals", grade: "A", percentage: 93, weight: "40%" },
                  { name: "Theory Exam", grade: "B+", percentage: 85, weight: "35%" },
                  { name: "Homework", grade: "A-", percentage: 88, weight: "25%" },
                ],
              },
            ].map((course, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{course.course}</CardTitle>
                      <CardDescription>
                        {course.instructor} • {course.credits} Credits
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">{course.currentGrade}</div>
                      <div className="text-sm text-muted-foreground">{course.percentage}%</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Progress value={course.percentage} className="h-2" />
                    <div className="grid gap-3 md:grid-cols-2">
                      {course.assignments.map((assignment, assignmentIndex) => (
                        <div
                          key={assignmentIndex}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        >
                          <div>
                            <h4 className="font-medium text-sm">{assignment.name}</h4>
                            <p className="text-xs text-muted-foreground">Weight: {assignment.weight}</p>
                          </div>
                          <div className="text-right">
                            <Badge variant="outline">{assignment.grade}</Badge>
                            <p className="text-xs text-muted-foreground mt-1">{assignment.percentage}%</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
