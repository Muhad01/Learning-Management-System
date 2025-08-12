import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Clock, Users, Play, Star } from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"

export default function StudentCoursesPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div className="flex items-center space-x-2">
          <SidebarTrigger />
          <h2 className="text-3xl font-bold tracking-tight">My Courses</h2>
        </div>
      </div>

      {/* Enrolled Courses */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[
          {
            name: "Advanced Mathematics",
            instructor: "Dr. Sarah Johnson",
            progress: 85,
            totalLessons: 24,
            completedLessons: 20,
            nextLesson: "Calculus Integration",
            rating: 4.8,
            image: "/placeholder.svg?height=200&width=300&text=Math",
          },
          {
            name: "Computer Science Fundamentals",
            instructor: "Prof. Mike Chen",
            progress: 72,
            totalLessons: 18,
            completedLessons: 13,
            nextLesson: "Data Structures",
            rating: 4.9,
            image: "/placeholder.svg?height=200&width=300&text=CS",
          },
          {
            name: "Physics",
            instructor: "Dr. Emily Davis",
            progress: 90,
            totalLessons: 20,
            completedLessons: 18,
            nextLesson: "Quantum Mechanics",
            rating: 4.7,
            image: "/placeholder.svg?height=200&width=300&text=Physics",
          },
          {
            name: "Chemistry",
            instructor: "Prof. Robert Wilson",
            progress: 68,
            totalLessons: 16,
            completedLessons: 11,
            nextLesson: "Organic Chemistry",
            rating: 4.6,
            image: "/placeholder.svg?height=200&width=300&text=Chemistry",
          },
          {
            name: "Literature",
            instructor: "Ms. Anna Thompson",
            progress: 45,
            totalLessons: 22,
            completedLessons: 10,
            nextLesson: "Shakespeare Analysis",
            rating: 4.8,
            image: "/placeholder.svg?height=200&width=300&text=Literature",
          },
          {
            name: "History",
            instructor: "Dr. James Miller",
            progress: 78,
            totalLessons: 15,
            completedLessons: 12,
            nextLesson: "World War II",
            rating: 4.5,
            image: "/placeholder.svg?height=200&width=300&text=History",
          },
        ].map((course, index) => (
          <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-video relative overflow-hidden">
              <img src={course.image || "/placeholder.svg"} alt={course.name} className="w-full h-full object-cover" />
              <div className="absolute top-2 right-2">
                <Badge className="bg-white/90 text-black">
                  <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
                  {course.rating}
                </Badge>
              </div>
            </div>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">{course.name}</CardTitle>
              <CardDescription className="flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span>{course.instructor}</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Progress</span>
                  <span>{course.progress}%</span>
                </div>
                <Progress value={course.progress} className="h-2" />
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>
                    {course.completedLessons} of {course.totalLessons} lessons
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Next:</span>
                  <span className="font-medium">{course.nextLesson}</span>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button className="flex-1">
                  <Play className="w-4 h-4 mr-2" />
                  Continue
                </Button>
                <Button variant="outline" size="icon">
                  <BookOpen className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
