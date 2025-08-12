import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ClipboardList, Clock, Target, Play, CheckCircle } from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"

export default function StudentQuizzesPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div className="flex items-center space-x-2">
          <SidebarTrigger />
          <h2 className="text-3xl font-bold tracking-tight">Quizzes</h2>
        </div>
      </div>

      <div className="grid gap-6">
        {/* Available Quizzes */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-blue-600">Available Quizzes</CardTitle>
            <CardDescription>Quizzes ready to take</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  title: "Calculus Fundamentals",
                  course: "Advanced Mathematics",
                  questions: 15,
                  timeLimit: "30 minutes",
                  attempts: "2 remaining",
                  difficulty: "Medium",
                  points: 50,
                  description: "Test your understanding of basic calculus concepts",
                },
                {
                  title: "Data Structures Quiz",
                  course: "Computer Science",
                  questions: 20,
                  timeLimit: "45 minutes",
                  attempts: "3 remaining",
                  difficulty: "Hard",
                  points: 75,
                  description: "Arrays, linked lists, stacks, and queues",
                },
                {
                  title: "Organic Chemistry Basics",
                  course: "Chemistry",
                  questions: 10,
                  timeLimit: "20 minutes",
                  attempts: "1 remaining",
                  difficulty: "Easy",
                  points: 30,
                  description: "Introduction to organic molecular structures",
                },
              ].map((quiz, index) => (
                <Card key={index} className="border-l-4 border-l-blue-500">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <ClipboardList className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{quiz.title}</h3>
                          <p className="text-sm text-muted-foreground">{quiz.course}</p>
                          <p className="text-xs text-muted-foreground mt-1">{quiz.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-center">
                          <div className="flex items-center space-x-2 text-sm">
                            <Target className="w-4 h-4" />
                            <span>{quiz.questions} questions</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            <span>{quiz.timeLimit}</span>
                          </div>
                        </div>
                        <div className="text-center">
                          <Badge
                            variant={
                              quiz.difficulty === "Hard"
                                ? "destructive"
                                : quiz.difficulty === "Medium"
                                  ? "default"
                                  : "secondary"
                            }
                          >
                            {quiz.difficulty}
                          </Badge>
                          <p className="text-sm text-muted-foreground mt-1">{quiz.points} points</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm">{quiz.attempts}</p>
                          <Button className="mt-2">
                            <Play className="w-4 h-4 mr-2" />
                            Start Quiz
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

        {/* Completed Quizzes */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-green-600">Completed Quizzes</CardTitle>
            <CardDescription>Your quiz results and scores</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  title: "Physics Motion Quiz",
                  course: "Physics",
                  score: 85,
                  maxScore: 100,
                  grade: "B+",
                  completedDate: "Dec 10, 2024",
                  attempts: "1 of 3",
                  timeUsed: "25 min",
                },
                {
                  title: "Literature Analysis",
                  course: "Literature",
                  score: 92,
                  maxScore: 100,
                  grade: "A-",
                  completedDate: "Dec 8, 2024",
                  attempts: "2 of 3",
                  timeUsed: "18 min",
                },
                {
                  title: "World War History",
                  course: "History",
                  score: 78,
                  maxScore: 100,
                  grade: "B",
                  completedDate: "Dec 5, 2024",
                  attempts: "1 of 2",
                  timeUsed: "22 min",
                },
              ].map((quiz, index) => (
                <Card key={index} className="border-l-4 border-l-green-500">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                          <CheckCircle className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{quiz.title}</h3>
                          <p className="text-sm text-muted-foreground">{quiz.course}</p>
                          <p className="text-xs text-muted-foreground">Completed {quiz.completedDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">{quiz.grade}</div>
                          <p className="text-sm text-muted-foreground">
                            {quiz.score}/{quiz.maxScore}
                          </p>
                        </div>
                        <div className="w-32">
                          <Progress value={(quiz.score / quiz.maxScore) * 100} className="h-2" />
                          <div className="flex justify-between text-xs text-muted-foreground mt-1">
                            <span>{quiz.attempts}</span>
                            <span>{quiz.timeUsed}</span>
                          </div>
                        </div>
                        <Button variant="outline">View Results</Button>
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
