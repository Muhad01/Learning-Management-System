"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BookOpen, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { ThemeToggle } from "@/components/theme-toggle"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Demo credentials validation
    const demoCredentials = {
      admin: { email: "admin@eduflow.com", password: "admin123" },
      teacher: { email: "teacher@eduflow.com", password: "teacher123" },
      student: { email: "student@eduflow.com", password: "student123" },
    }

    // Check if credentials match demo accounts
    const selectedRole = role as keyof typeof demoCredentials
    const validCredentials = demoCredentials[selectedRole]

    if (!validCredentials || email !== validCredentials.email || password !== validCredentials.password) {
      setIsLoading(false)
      toast({
        title: "Invalid Credentials",
        description: "Please use the demo credentials provided below or check your login details.",
        variant: "destructive",
      })
      return
    }

    // Simulate login process
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Login Successful",
        description: `Welcome back! Redirecting to ${role} dashboard...`,
      })

      // Redirect based on role
      switch (role) {
        case "admin":
          router.push("/admin")
          break
        case "teacher":
          router.push("/teacher")
          break
        case "student":
          router.push("/student")
          break
        default:
          router.push("/student")
      }
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-between mb-4">
            <Link href="/" className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
            <ThemeToggle />
          </div>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-gradient-brand rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gradient-brand">
              EduFlow
            </span>
          </div>
        </div>

        <Card className="border-0 shadow-xl dark:bg-gray-800 dark:border-gray-700">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <CardDescription>Sign in to your account to continue</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Login As</Label>
                <Select value={role} onValueChange={setRole} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Administrator</SelectItem>
                    <SelectItem value="teacher">Teacher</SelectItem>
                    <SelectItem value="student">Student</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-brand bg-gradient-brand-hover text-white hover:text-white border-0"
                disabled={isLoading}
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-semibold mb-3 text-gray-700">Demo Credentials</h3>
              <div className="space-y-3 text-xs">
                <div className="bg-white p-3 rounded border">
                  <p className="font-medium text-red-600">Admin Access</p>
                  <p>Email: admin@eduflow.com</p>
                  <p>Password: admin123</p>
                </div>
                <div className="bg-white p-3 rounded border">
                  <p className="font-medium text-blue-600">Teacher Access</p>
                  <p>Email: teacher@eduflow.com</p>
                  <p>Password: teacher123</p>
                </div>
                <div className="bg-white p-3 rounded border">
                  <p className="font-medium text-green-600">Student Access</p>
                  <p>Email: student@eduflow.com</p>
                  <p>Password: student123</p>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">Use these credentials to test different user roles</p>
            </div>

            <div className="text-center">
              <Link href="/demo-credentials" className="text-sm text-blue-600 hover:underline">
                View detailed demo credentials guide
              </Link>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                {"Don't have an account? "}
                <Link href="/register" className="text-blue-600 hover:underline">
                  Sign up here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
