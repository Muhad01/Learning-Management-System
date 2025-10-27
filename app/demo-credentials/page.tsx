"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, ArrowLeft, Copy, Users, GraduationCap, Shield } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

export default function DemoCredentialsPage() {
  const credentials = [
    {
      role: "Administrator",
      email: "admin@eduflow.com",
      password: "admin123",
      description: "Full system access - manage users, courses, and system settings",
      icon: Shield,
      color: "bg-red-500",
      features: [
        "User Management",
        "Course Creation",
        "System Analytics",
        "Schedule Management",
        "Reports & Analytics",
      ],
    },
    {
      role: "Teacher",
      email: "teacher@eduflow.com",
      password: "teacher123",
      description: "Teaching tools - create assignments, grade students, manage courses",
      icon: GraduationCap,
      color: "bg-blue-500",
      features: ["Course Management", "Assignment Creation", "Student Grading", "Material Upload", "Progress Tracking"],
    },
    {
      role: "Student",
      email: "student@eduflow.com",
      password: "student123",
      description: "Learning experience - access courses, submit assignments, track progress",
      icon: Users,
      color: "bg-green-500",
      features: ["Course Access", "Assignment Submission", "Grade Tracking", "Material Download", "AI Study Assistant"],
    },
  ]

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-between mb-6">
            <Link href="/" className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
            <ThemeToggle />
          </div>

          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-7 h-7 text-white" />
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              EduFlow
            </span>
          </div>

          <h1 className="text-4xl font-bold mb-4">Demo Credentials</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Use these temporary credentials to explore different user roles and features in the EduFlow LMS system.
          </p>
        </div>

        {/* Credentials Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {credentials.map((cred, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 dark:bg-gray-800 dark:border-gray-700">
              <CardHeader className="text-center pb-4">
                <div className={`w-16 h-16 ${cred.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <cred.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl">{cred.role}</CardTitle>
                <CardDescription className="text-base">{cred.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Credentials */}
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Email:</span>
                    <Button variant="ghost" size="sm" onClick={() => copyToClipboard(cred.email)} className="h-6 px-2">
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>
                  <p className="text-sm font-mono bg-white p-2 rounded border">{cred.email}</p>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Password:</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(cred.password)}
                      className="h-6 px-2"
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>
                  <p className="text-sm font-mono bg-white p-2 rounded border">{cred.password}</p>
                </div>

                {/* Features */}
                <div>
                  <h4 className="text-sm font-medium mb-2">Key Features:</h4>
                  <div className="space-y-1">
                    {cred.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                        <span className="text-xs text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Login Button */}
                <Link href="/login">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    Login as {cred.role}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Instructions */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-center">How to Use Demo Credentials</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Step 1: Choose Your Role</h3>
                <p className="text-sm text-gray-600">
                  Select the role you want to explore. Each role has different permissions and features available.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Step 2: Login</h3>
                <p className="text-sm text-gray-600">
                  Go to the login page and enter the credentials for your chosen role. Make sure to select the correct
                  role in the dropdown.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Step 3: Explore Features</h3>
                <p className="text-sm text-gray-600">
                  Once logged in, explore the dashboard and features available for that role. Try creating courses,
                  assignments, or using the AI assistant.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Step 4: Switch Roles</h3>
                <p className="text-sm text-gray-600">
                  Log out and try a different role to see how the system works from different perspectives.
                </p>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
              <div className="flex items-start space-x-2">
                <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-white">!</span>
                </div>
                <div>
                  <h4 className="font-semibold text-yellow-800">Important Notes</h4>
                  <ul className="text-sm text-yellow-700 mt-1 space-y-1">
                    <li>• These are temporary demo credentials for testing purposes only</li>
                    <li>• All data is simulated and will reset periodically</li>
                    <li>• The AI assistant requires an active internet connection</li>
                    <li>• Some features may be limited in the demo version</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="text-center pt-4">
              <Link href="/login">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  Start Testing Now
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
