"use client"

import { useState } from "react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Save, Bell, Shield, User, Globe } from "lucide-react"
import { ColorSettings } from "@/components/color-settings"

export default function TeacherSettingsPage() {
  const [profile, setProfile] = useState({
    fullName: "Dr. Sarah Johnson",
    email: "teacher@eduflow.com",
    phone: "+1 (555) 111-2222",
    title: "Associate Professor, Mathematics",
    officeHours: "Mon/Wed 2:00–4:00 PM",
    timezone: "America/New_York",
    language: "en",
    bio: "Research interests in applied mathematics and statistics.",
  })

  const [preferences, setPreferences] = useState({
    theme: "system",
    showEmail: true,
    showPhone: false,
    weeklySummary: true,
    showOfficeHours: true,
  })

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    assignmentSubmissions: true,
    quizSubmissions: true,
    discussionReplies: true,
    newEnrollments: false,
  })

  const [security, setSecurity] = useState({
    twoFactorAuth: false,
    loginAlerts: true,
  })

  const handleSave = (section: string) => {
    console.log(`Saving ${section} settings...`)
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div className="flex items-center space-x-2">
          <SidebarTrigger />
          <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        </div>
        <Button>
          <Save className="mr-2 h-4 w-4" />
          Save All Changes
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Profile Settings */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <CardTitle>Profile</CardTitle>
            </div>
            <CardDescription>Update your public instructor profile</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" value={profile.fullName} onChange={(e) => setProfile({ ...profile, fullName: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" type="tel" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select value={profile.timezone} onValueChange={(v) => setProfile({ ...profile, timezone: v })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="America/New_York">America/New_York (EST)</SelectItem>
                    <SelectItem value="America/Chicago">America/Chicago (CST)</SelectItem>
                    <SelectItem value="America/Denver">America/Denver (MST)</SelectItem>
                    <SelectItem value="America/Los_Angeles">America/Los_Angeles (PST)</SelectItem>
                    <SelectItem value="Europe/London">Europe/London (GMT)</SelectItem>
                    <SelectItem value="Asia/Tokyo">Asia/Tokyo (JST)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Academic Title</Label>
              <Input id="title" value={profile.title} onChange={(e) => setProfile({ ...profile, title: e.target.value })} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="officeHours">Office Hours</Label>
              <Input id="officeHours" value={profile.officeHours} onChange={(e) => setProfile({ ...profile, officeHours: e.target.value })} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select value={profile.language} onValueChange={(v) => setProfile({ ...profile, language: v })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                  <SelectItem value="zh">Chinese</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea id="bio" rows={3} value={profile.bio} onChange={(e) => setProfile({ ...profile, bio: e.target.value })} placeholder="Tell students about your expertise, interests, and courses..." />
            </div>

            <div className="flex justify-end">
              <Button onClick={() => handleSave("profile")}>
                <Save className="mr-2 h-4 w-4" />
                Save Profile
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Preferences */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Globe className="h-5 w-5" />
              <CardTitle>Preferences</CardTitle>
            </div>
            <CardDescription>Appearance and public details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="theme">Theme</Label>
                <p className="text-sm text-muted-foreground">Choose your display theme</p>
              </div>
              <Select value={preferences.theme} onValueChange={(v) => setPreferences({ ...preferences, theme: v })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            <ColorSettings />

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="showEmail">Show Email on Profile</Label>
                <p className="text-sm text-muted-foreground">Visible to enrolled students</p>
              </div>
              <Switch id="showEmail" checked={preferences.showEmail} onCheckedChange={(checked) => setPreferences({ ...preferences, showEmail: checked })} />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="showPhone">Show Phone on Profile</Label>
                <p className="text-sm text-muted-foreground">Visible to enrolled students</p>
              </div>
              <Switch id="showPhone" checked={preferences.showPhone} onCheckedChange={(checked) => setPreferences({ ...preferences, showPhone: checked })} />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="showOfficeHours">Show Office Hours</Label>
                <p className="text-sm text-muted-foreground">Display in course pages</p>
              </div>
              <Switch id="showOfficeHours" checked={preferences.showOfficeHours} onCheckedChange={(checked) => setPreferences({ ...preferences, showOfficeHours: checked })} />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="weeklySummary">Weekly Summary Email</Label>
                <p className="text-sm text-muted-foreground">Overview of upcoming week</p>
              </div>
              <Switch id="weeklySummary" checked={preferences.weeklySummary} onCheckedChange={(checked) => setPreferences({ ...preferences, weeklySummary: checked })} />
            </div>

            <div className="flex justify-end">
              <Button onClick={() => handleSave("preferences")}>
                <Save className="mr-2 h-4 w-4" />
                Save Preferences
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <CardTitle>Notifications</CardTitle>
            </div>
            <CardDescription>Choose which emails you want to receive</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="emailNotifications">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Enable email notifications</p>
              </div>
              <Switch id="emailNotifications" checked={notifications.emailNotifications} onCheckedChange={(checked) => setNotifications({ ...notifications, emailNotifications: checked })} />
            </div>

            <Separator />

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="assignmentSubmissions">Assignment Submissions</Label>
                    <p className="text-sm text-muted-foreground">When students submit assignments</p>
                  </div>
                  <Switch id="assignmentSubmissions" checked={notifications.assignmentSubmissions} onCheckedChange={(checked) => setNotifications({ ...notifications, assignmentSubmissions: checked })} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="quizSubmissions">Quiz Submissions</Label>
                    <p className="text-sm text-muted-foreground">When students submit quizzes</p>
                  </div>
                  <Switch id="quizSubmissions" checked={notifications.quizSubmissions} onCheckedChange={(checked) => setNotifications({ ...notifications, quizSubmissions: checked })} />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="discussionReplies">Discussion Replies</Label>
                    <p className="text-sm text-muted-foreground">New replies in your courses</p>
                  </div>
                  <Switch id="discussionReplies" checked={notifications.discussionReplies} onCheckedChange={(checked) => setNotifications({ ...notifications, discussionReplies: checked })} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="newEnrollments">New Enrollments</Label>
                    <p className="text-sm text-muted-foreground">Students joining your courses</p>
                  </div>
                  <Switch id="newEnrollments" checked={notifications.newEnrollments} onCheckedChange={(checked) => setNotifications({ ...notifications, newEnrollments: checked })} />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button onClick={() => handleSave("notifications")}>
                <Save className="mr-2 h-4 w-4" />
                Save Notifications
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <CardTitle>Security</CardTitle>
            </div>
            <CardDescription>Secure your account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="twoFactorAuth">Two-Factor Authentication</Label>
                <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
              </div>
              <Switch id="twoFactorAuth" checked={security.twoFactorAuth} onCheckedChange={(checked) => setSecurity({ ...security, twoFactorAuth: checked })} />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="loginAlerts">Login Alerts</Label>
                <p className="text-sm text-muted-foreground">Email me when a new device logs in</p>
              </div>
              <Switch id="loginAlerts" checked={security.loginAlerts} onCheckedChange={(checked) => setSecurity({ ...security, loginAlerts: checked })} />
            </div>

            <Separator />

            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input id="currentPassword" type="password" placeholder="••••••••" />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type="password" placeholder="Create a strong password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input id="confirmPassword" type="password" placeholder="Re-enter your password" />
              </div>
            </div>

            <div className="flex justify-end">
              <Button onClick={() => handleSave("security")}>
                <Save className="mr-2 h-4 w-4" />
                Update Security
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


