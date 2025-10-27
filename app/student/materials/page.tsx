import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Download, FileText, Video, ImageIcon, Music, Search, Filter } from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"

export default function StudentMaterialsPage() {
  const getFileIcon = (type: string) => {
    switch (type) {
      case "video":
        return Video
      case "pdf":
        return FileText
      case "image":
        return ImageIcon
      case "audio":
        return Music
      default:
        return FileText
    }
  }

  const getFileColor = (type: string) => {
    switch (type) {
      case "video":
        return "bg-red-100 text-red-600"
      case "pdf":
        return "bg-blue-100 text-blue-600"
      case "image":
        return "bg-green-100 text-green-600"
      case "audio":
        return "bg-purple-100 text-purple-600"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div className="flex items-center space-x-2">
          <SidebarTrigger />
          <h2 className="text-3xl font-bold tracking-tight">Course Materials</h2>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search materials..." className="pl-8 w-64" />
          </div>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        {/* Course Materials by Subject */}
        {[
          {
            course: "Advanced Mathematics",
            instructor: "Dr. Sarah Johnson",
            materials: [
              { name: "Calculus Lecture Notes.pdf", type: "pdf", size: "2.3 MB", uploadDate: "Dec 10, 2024" },
              { name: "Integration Examples Video", type: "video", size: "45.2 MB", uploadDate: "Dec 8, 2024" },
              { name: "Practice Problems Set 1.pdf", type: "pdf", size: "1.8 MB", uploadDate: "Dec 5, 2024" },
              { name: "Equation Formulas Chart.png", type: "image", size: "875 KB", uploadDate: "Dec 3, 2024" },
            ],
          },
          {
            course: "Computer Science Fundamentals",
            instructor: "Prof. Mike Chen",
            materials: [
              { name: "Data Structures Presentation.pdf", type: "pdf", size: "5.1 MB", uploadDate: "Dec 9, 2024" },
              { name: "Algorithm Tutorial Video", type: "video", size: "67.8 MB", uploadDate: "Dec 7, 2024" },
              { name: "Code Examples.zip", type: "pdf", size: "3.2 MB", uploadDate: "Dec 4, 2024" },
              { name: "Programming Audio Guide", type: "audio", size: "12.4 MB", uploadDate: "Dec 1, 2024" },
            ],
          },
          {
            course: "Physics",
            instructor: "Dr. Emily Davis",
            materials: [
              { name: "Quantum Mechanics Notes.pdf", type: "pdf", size: "4.7 MB", uploadDate: "Dec 11, 2024" },
              { name: "Lab Experiment Demo", type: "video", size: "78.3 MB", uploadDate: "Dec 6, 2024" },
              { name: "Physics Diagrams.jpg", type: "image", size: "2.1 MB", uploadDate: "Dec 2, 2024" },
            ],
          },
        ].map((courseData, courseIndex) => (
          <Card key={courseIndex}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl">{courseData.course}</h3>
                  <CardDescription>{courseData.instructor}</CardDescription>
                </div>
                <Badge variant="secondary">{courseData.materials.length} files</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {courseData.materials.map((material, materialIndex) => {
                  const FileIcon = getFileIcon(material.type)
                  return (
                    <div
                      key={materialIndex}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center ${getFileColor(material.type)}`}
                        >
                          <FileIcon className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-medium">{material.name}</h4>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span>{material.size}</span>
                            <span>•</span>
                            <span>Uploaded {material.uploadDate}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="capitalize">
                          {material.type}
                        </Badge>
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Downloads */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Downloads</CardTitle>
          <CardDescription>Files you&apos;ve downloaded recently</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { name: "Calculus Lecture Notes.pdf", course: "Advanced Mathematics", downloadDate: "2 hours ago" },
              { name: "Data Structures Presentation.pdf", course: "Computer Science", downloadDate: "5 hours ago" },
              { name: "Physics Diagrams.jpg", course: "Physics", downloadDate: "1 day ago" },
              { name: "Algorithm Tutorial Video", course: "Computer Science", downloadDate: "2 days ago" },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Download className="w-5 h-5 text-green-600" />
                  <div>
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">{item.course}</p>
                  </div>
                </div>
                <span className="text-sm text-muted-foreground">{item.downloadDate}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
