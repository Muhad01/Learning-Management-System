import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Upload, FileText, CheckCircle, Clock, XCircle } from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"

export default function StudentSubmissionsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div className="flex items-center space-x-2">
          <SidebarTrigger />
          <h2 className="text-3xl font-bold tracking-tight">Submissions</h2>
        </div>
      </div>

      <div className="grid gap-6">
        {/* Submission Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Submissions</p>
                  <p className="text-2xl font-bold">24</p>
                </div>
                <FileText className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Graded</p>
                  <p className="text-2xl font-bold text-green-600">18</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">4</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Late</p>
                  <p className="text-2xl font-bold text-red-600">2</p>
                </div>
                <XCircle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Submissions */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Submissions</CardTitle>
            <CardDescription>Your latest assignment submissions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  title: "Mathematical Analysis Essay",
                  course: "Advanced Mathematics",
                  submittedDate: "Dec 12, 2024 at 2:30 PM",
                  status: "Graded",
                  grade: "A",
                  feedback: "Excellent work on the differential equations analysis.",
                  fileName: "math_essay_final.pdf",
                  isLate: false,
                },
                {
                  title: "Programming Project",
                  course: "Computer Science",
                  submittedDate: "Dec 10, 2024 at 11:45 PM",
                  status: "Pending",
                  grade: "-",
                  feedback: "Under review",
                  fileName: "react_app_project.zip",
                  isLate: true,
                },
                {
                  title: "Lab Report",
                  course: "Physics",
                  submittedDate: "Dec 8, 2024 at 4:15 PM",
                  status: "Graded",
                  grade: "B+",
                  feedback: "Good experimental methodology, minor calculation errors.",
                  fileName: "physics_lab_report.pdf",
                  isLate: false,
                },
                {
                  title: "Chemical Analysis",
                  course: "Chemistry",
                  submittedDate: "Dec 6, 2024 at 1:20 PM",
                  status: "Graded",
                  grade: "A-",
                  feedback: "Thorough analysis, well-documented procedures.",
                  fileName: "chemistry_analysis.pdf",
                  isLate: false,
                },
                {
                  title: "Historical Timeline",
                  course: "History",
                  submittedDate: "Dec 5, 2024 at 3:50 PM",
                  status: "Pending",
                  grade: "-",
                  feedback: "Awaiting review",
                  fileName: "history_timeline.pptx",
                  isLate: false,
                },
              ].map((submission, index) => (
                <Card key={index} className="border-l-4 border-l-blue-500">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div
                          className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                            submission.status === "Graded" ? "bg-green-100" : "bg-yellow-100"
                          }`}
                        >
                          {submission.status === "Graded" ? (
                            <CheckCircle className="w-6 h-6 text-green-600" />
                          ) : (
                            <Clock className="w-6 h-6 text-yellow-600" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-lg">{submission.title}</h3>
                            {submission.isLate && (
                              <Badge variant="destructive" className="text-xs">
                                Late
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{submission.course}</p>
                          <p className="text-xs text-muted-foreground mt-1">Submitted: {submission.submittedDate}</p>
                          <p className="text-xs text-muted-foreground">File: {submission.fileName}</p>
                          {submission.feedback && (
                            <div className="mt-2 p-2 bg-gray-50 rounded text-sm">
                              <strong>Feedback:</strong> {submission.feedback}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <Badge variant={submission.status === "Graded" ? "default" : "secondary"}>
                            {submission.status}
                          </Badge>
                          {submission.grade !== "-" && (
                            <div className="text-2xl font-bold text-green-600 mt-1">{submission.grade}</div>
                          )}
                        </div>
                        <div className="flex flex-col space-y-2">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                          <Button variant="outline" size="sm">
                            <Upload className="w-4 h-4 mr-2" />
                            Resubmit
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
