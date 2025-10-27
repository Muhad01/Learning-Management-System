import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Download,
  Filter,
  Calendar,
  Users,
  BookOpen,
  GraduationCap,
  Award,
  FileText
} from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AdminReportsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div className="flex items-center space-x-2">
          <SidebarTrigger />
          <h2 className="text-3xl font-bold tracking-tight">Reports & Analytics</h2>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            Date Range
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Enrollment Rate</p>
                <p className="text-2xl font-bold">94.2%</p>
                <div className="flex items-center space-x-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-600" />
                  <span className="text-xs text-green-600">+2.1%</span>
                </div>
              </div>
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Course Completion</p>
                <p className="text-2xl font-bold">87.5%</p>
                <div className="flex items-center space-x-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-600" />
                  <span className="text-xs text-green-600">+1.8%</span>
                </div>
              </div>
              <BookOpen className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Average GPA</p>
                <p className="text-2xl font-bold">3.68</p>
                <div className="flex items-center space-x-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-600" />
                  <span className="text-xs text-green-600">+0.12</span>
                </div>
              </div>
              <Award className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Teacher Satisfaction</p>
                <p className="text-2xl font-bold">4.6/5</p>
                <div className="flex items-center space-x-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-600" />
                  <span className="text-xs text-green-600">+0.2</span>
                </div>
              </div>
              <GraduationCap className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Enrollment Trends */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Enrollment Trends</CardTitle>
                <CardDescription>Student enrollment over the past 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-center justify-center border rounded-lg">
                  <div className="text-center">
                    <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Chart visualization</p>
                  </div>
                </div>
                <div className="grid grid-cols-6 gap-2 mt-4">
                  {['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, index) => (
                    <div key={index} className="text-center">
                      <div className="h-20 bg-blue-100 rounded mb-1" style={{ height: `${60 + index * 10}px` }}></div>
                      <p className="text-xs text-muted-foreground">{month}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Course Distribution</CardTitle>
                <CardDescription>Courses by department</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { department: 'Computer Science', courses: 42, percentage: 27 },
                    { department: 'Mathematics', courses: 28, percentage: 18 },
                    { department: 'Business', courses: 35, percentage: 22 },
                    { department: 'Chemistry', courses: 24, percentage: 15 },
                    { department: 'Physics', courses: 27, percentage: 17 },
                  ].map((dept, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">{dept.department}</span>
                        <span className="text-sm text-muted-foreground">{dept.courses} courses</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-600 transition-all"
                          style={{ width: `${dept.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity Report */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity Report</CardTitle>
              <CardDescription>System activities and updates over the last 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { activity: "New students enrolled", count: 45, change: "+12%" },
                  { activity: "Courses created", count: 8, change: "+3" },
                  { activity: "Assignments submitted", count: 342, change: "+28%" },
                  { activity: "Grades updated", count: 156, change: "+15%" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{item.activity}</p>
                      <p className="text-sm text-muted-foreground">Last 7 days</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold">{item.count}</p>
                      <div className="flex items-center space-x-1">
                        <TrendingUp className="h-3 w-3 text-green-600" />
                        <span className="text-xs text-green-600">{item.change}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="students" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Student Demographics</CardTitle>
                <CardDescription>Student distribution by year</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { year: '1st Year', students: 712, color: 'bg-blue-500' },
                    { year: '2nd Year', students: 689, color: 'bg-green-500' },
                    { year: '3rd Year', students: 724, color: 'bg-purple-500' },
                    { year: '4th Year', students: 722, color: 'bg-orange-500' },
                  ].map((item, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">{item.year}</span>
                        <span className="text-sm font-bold">{item.students} students</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className={`h-full ${item.color} transition-all`} style={{ width: '25%' }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>GPA Distribution</CardTitle>
                <CardDescription>Student performance overview</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { range: '3.5 - 4.0', students: 1245, percentage: 43.8 },
                    { range: '3.0 - 3.49', students: 987, percentage: 34.7 },
                    { range: '2.5 - 2.99', students: 445, percentage: 15.6 },
                    { range: 'Below 2.5', students: 170, percentage: 6.0 },
                  ].map((item, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm">{item.range}</span>
                        <span className="text-sm font-medium">{item.students} students</span>
                      </div>
                      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all"
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{item.percentage}%</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Student Reports</CardTitle>
              <CardDescription>Generate detailed student reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                {[
                  { title: 'Enrollment Report', icon: FileText, count: '2,847', desc: 'Total enrolled students' },
                  { title: 'Academic Report', icon: Award, count: '2,734', desc: 'Students with active status' },
                  { title: 'Attendance Report', icon: Users, count: '98.2%', desc: 'Average attendance rate' },
                ].map((report, index) => (
                  <Card key={index} className="border-dashed">
                    <CardHeader className="pb-3">
                      <report.icon className="w-8 h-8 text-muted-foreground" />
                      <CardTitle className="text-lg">{report.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">{report.count}</p>
                      <p className="text-xs text-muted-foreground">{report.desc}</p>
                      <Button className="w-full mt-4" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="courses" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Course Performance</CardTitle>
                <CardDescription>Top performing courses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { course: 'Computer Science Fundamentals', rating: 4.8, students: 67, completion: 92 },
                    { course: 'Data Structures', rating: 4.7, students: 28, completion: 89 },
                    { course: 'Advanced Mathematics', rating: 4.6, students: 45, completion: 87 },
                    { course: 'Digital Marketing', rating: 4.5, students: 32, completion: 85 },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{item.course}</p>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-xs text-muted-foreground">{item.students} students</span>
                          <span className="text-xs text-muted-foreground">{item.completion}% completion</span>
                        </div>
                      </div>
                      <Badge variant="default">{item.rating}/5</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Course Status</CardTitle>
                <CardDescription>Course status overview</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-green-900">Active Courses</p>
                        <p className="text-2xl font-bold text-green-700">134</p>
                      </div>
                      <BookOpen className="w-8 h-8 text-green-600" />
                    </div>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-yellow-900">Draft Courses</p>
                        <p className="text-2xl font-bold text-yellow-700">18</p>
                      </div>
                      <FileText className="w-8 h-8 text-yellow-600" />
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">Archived Courses</p>
                        <p className="text-2xl font-bold text-gray-700">4</p>
                      </div>
                      <BookOpen className="w-8 h-8 text-gray-600" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="financial" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Financial Reports</CardTitle>
              <CardDescription>Revenue and financial overview</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <p className="text-2xl font-bold">$2,847,500</p>
                  <div className="flex items-center space-x-1 mt-1">
                    <TrendingUp className="h-3 w-3 text-green-600" />
                    <span className="text-xs text-green-600">+12.5%</span>
                  </div>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-muted-foreground">Tuition Fees</p>
                  <p className="text-2xl font-bold">$2,450,000</p>
                  <div className="flex items-center space-x-1 mt-1">
                    <TrendingUp className="h-3 w-3 text-green-600" />
                    <span className="text-xs text-green-600">+8.2%</span>
                  </div>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <p className="text-sm text-muted-foreground">Other Income</p>
                  <p className="text-2xl font-bold">$397,500</p>
                  <div className="flex items-center space-x-1 mt-1">
                    <TrendingUp className="h-3 w-3 text-green-600" />
                    <span className="text-xs text-green-600">+15.3%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Performance Metrics</CardTitle>
              <CardDescription>Platform usage and performance indicators</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  { metric: 'Active Users', value: '2,847', change: '+12%', trend: 'up' },
                  { metric: 'Daily Logins', value: '1,543', change: '+8%', trend: 'up' },
                  { metric: 'Course Views', value: '12,456', change: '+25%', trend: 'up' },
                  { metric: 'Assignment Submissions', value: '3,421', change: '+15%', trend: 'up' },
                ].map((item, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-muted-foreground">{item.metric}</p>
                      {item.trend === 'up' ? (
                        <TrendingUp className="h-4 w-4 text-green-600" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-600" />
                      )}
                    </div>
                    <p className="text-2xl font-bold mt-2">{item.value}</p>
                    <p className={`text-xs mt-1 ${item.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {item.change} from last month
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
