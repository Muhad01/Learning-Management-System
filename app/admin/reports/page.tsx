import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  BarChart3,
  Download,
  Search,
  Filter,
  FileText,
  Users,
  BookOpen,
  GraduationCap,
  Calendar,
  TrendingUp,
  MoreHorizontal,
  Clock,
} from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"

export default function AdminReportsPage() {
  const reports = [
    {
      id: "RPT001",
      title: "Student Enrollment Report",
      type: "Student",
      description: "Comprehensive report on student enrollments and demographics",
      generatedDate: "2024-01-15",
      lastUpdated: "2024-01-20",
      records: 2847,
      status: "Active",
      icon: Users,
      color: "blue",
    },
    {
      id: "RPT002",
      title: "Course Performance Report",
      type: "Course",
      description: "Detailed analysis of course completion rates and student performance",
      generatedDate: "2024-01-18",
      lastUpdated: "2024-01-22",
      records: 156,
      status: "Active",
      icon: BookOpen,
      color: "green",
    },
    {
      id: "RPT003",
      title: "Teacher Activity Report",
      type: "Teacher",
      description: "Overview of teacher activities, classes, and student interactions",
      generatedDate: "2024-01-20",
      lastUpdated: "2024-01-22",
      records: 89,
      status: "Active",
      icon: GraduationCap,
      color: "purple",
    },
    {
      id: "RPT004",
      title: "Attendance Report",
      type: "Attendance",
      description: "Monthly attendance statistics and patterns",
      generatedDate: "2024-01-10",
      lastUpdated: "2024-01-15",
      records: 2847,
      status: "Active",
      icon: Calendar,
      color: "orange",
    },
    {
      id: "RPT005",
      title: "Academic Performance Report",
      type: "Academic",
      description: "GPA analysis, grade distribution, and academic trends",
      generatedDate: "2024-01-12",
      lastUpdated: "2024-01-18",
      records: 2847,
      status: "Active",
      icon: TrendingUp,
      color: "blue",
    },
    {
      id: "RPT006",
      title: "Financial Report",
      type: "Financial",
      description: "Tuition fees, payments, and financial transactions",
      generatedDate: "2024-01-05",
      lastUpdated: "2024-01-10",
      records: 2847,
      status: "Active",
      icon: FileText,
      color: "green",
    },
  ]

  const reportStats = [
    { label: "Total Reports", value: "24", icon: FileText, color: "text-blue-600" },
    { label: "Generated This Month", value: "12", icon: BarChart3, color: "text-green-600" },
    { label: "Active Reports", value: "18", icon: TrendingUp, color: "text-purple-600" },
    { label: "Records Processed", value: "8,547", icon: Clock, color: "text-orange-600" },
  ]

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div className="flex items-center space-x-2">
          <SidebarTrigger />
          <h2 className="text-3xl font-bold tracking-tight">Reports & Analytics</h2>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search reports..." className="pl-8 w-64" />
          </div>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button>
            <BarChart3 className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Report Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        {reportStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Report Actions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="cursor-pointer hover:bg-accent transition-colors">
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-600" />
              <CardTitle className="text-base">Student Report</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Generate student enrollment and performance reports</p>
            <Button className="w-full mt-4" size="sm">
              Generate
            </Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:bg-accent transition-colors">
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5 text-green-600" />
              <CardTitle className="text-base">Course Report</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Analyze course completion and performance metrics</p>
            <Button className="w-full mt-4" size="sm">
              Generate
            </Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:bg-accent transition-colors">
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-5 w-5 text-purple-600" />
              <CardTitle className="text-base">Teacher Report</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">View teacher activity and class statistics</p>
            <Button className="w-full mt-4" size="sm">
              Generate
            </Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:bg-accent transition-colors">
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-orange-600" />
              <CardTitle className="text-base">Attendance Report</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Track attendance patterns and statistics</p>
            <Button className="w-full mt-4" size="sm">
              Generate
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Available Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Available Reports</CardTitle>
          <CardDescription>Browse and manage all generated reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reports.map((report) => {
              const IconComponent = report.icon
              const getColorClasses = (color: string) => {
                const colorMap: Record<string, { bg: string; icon: string }> = {
                  blue: {
                    bg: "bg-blue-100 dark:bg-blue-900",
                    icon: "text-blue-600 dark:text-blue-400",
                  },
                  green: {
                    bg: "bg-green-100 dark:bg-green-900",
                    icon: "text-green-600 dark:text-green-400",
                  },
                  purple: {
                    bg: "bg-purple-100 dark:bg-purple-900",
                    icon: "text-purple-600 dark:text-purple-400",
                  },
                  orange: {
                    bg: "bg-orange-100 dark:bg-orange-900",
                    icon: "text-orange-600 dark:text-orange-400",
                  },
                }
                return colorMap[color] || colorMap.blue
              }
              const colorClasses = getColorClasses(report.color)
              return (
                <Card key={report.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 ${colorClasses.bg} rounded-lg flex items-center justify-center`}>
                        <IconComponent className={`w-6 h-6 ${colorClasses.icon}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-lg">{report.title}</h3>
                          <Badge variant="outline">{report.type}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{report.description}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                            <FileText className="w-3 h-3" />
                            <span>{report.records.toLocaleString()} records</span>
                          </div>
                          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            <span>Updated: {report.lastUpdated}</span>
                          </div>
                          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                            <span>Generated: {report.generatedDate}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={report.status === "Active" ? "default" : "secondary"}>{report.status}</Badge>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Export
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

