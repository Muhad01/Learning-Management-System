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
import { Save, Bell, Shield, User, Globe, Mail, Lock } from "lucide-react"

export default function StudentSettingsPage() {
  const [profile, setProfile] = useState({
    fullName: "Alex Thompson",
    email: "student@eduflow.com",
    phone: "+1 (555) 987-6543",
    about: "Undergraduate student passionate about Computer Science and Mathematics.",
    timezone: "America/New_York",
    language: "en",
  })

  const [preferences, setPreferences] = useState({
    theme: "system",
    showEmail: false,
    showPhone: false,
    weeklySummary: true,
  })

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    assignmentDue: true,
    gradePosted: true,
    courseAnnouncement: true,
    newMaterial: true,
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
            <CardDescription>Update your personal information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  value={profile.fullName}
                  onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select
                  value={profile.timezone}
                  onValueChange={(value) => setProfile({ ...profile, timezone: value })}
                >
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
              <Label htmlFor="language">Language</Label>
              <Select
                value={profile.language}
                onValueChange={(value) => setProfile({ ...profile, language: value })}
              >
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
              <Label htmlFor="about">About</Label>
              <Textarea
                id="about"
                rows={3}
                value={profile.about}
                onChange={(e) => setProfile({ ...profile, about: e.target.value })}
                placeholder="Tell others a little about yourself..."
              />
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
            <CardDescription>Control appearance and privacy</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="theme">Theme</Label>
                <p className="text-sm text-muted-foreground">Choose your display theme</p>
              </div>
              <Select
                value={preferences.theme}
                onValueChange={(v) => setPreferences({ ...preferences, theme: v })}
              >
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

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="showEmail">Show Email on Profile</Label>
                <p className="text-sm text-muted-foreground">Visible to course instructors</p>
              </div>
              <Switch
                id="showEmail"
                checked={preferences.showEmail}
                onCheckedChange={(checked) => setPreferences({ ...preferences, showEmail: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="showPhone">Show Phone on Profile</Label>
                <p className="text-sm text-muted-foreground">Visible to course instructors</p>
              </div>
              <Switch
                id="showPhone"
                checked={preferences.showPhone}
                onCheckedChange={(checked) => setPreferences({ ...preferences, showPhone: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="weeklySummary">Weekly Summary Email</Label>
                <p className="text-sm text-muted-foreground">Overview of the upcoming week</p>
              </div>
              <Switch
                id="weeklySummary"
                checked={preferences.weeklySummary}
                onCheckedChange={(checked) => setPreferences({ ...preferences, weeklySummary: checked })}
              />
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
              <Switch
                id="emailNotifications"
                checked={notifications.emailNotifications}
                onCheckedChange={(checked) => setNotifications({ ...notifications, emailNotifications: checked })}
              />
            </div>

            <Separator />

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="assignmentDue">Assignment Due</Label>
                    <p className="text-sm text-muted-foreground">Reminders for upcoming deadlines</p>
                  </div>
                  <Switch
                    id="assignmentDue"
                    checked={notifications.assignmentDue}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, assignmentDue: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="gradePosted">Grade Posted</Label>
                    <p className="text-sm text-muted-foreground">When grades are published</p>
                  </div>
                  <Switch
                    id="gradePosted"
                    checked={notifications.gradePosted}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, gradePosted: checked })}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="courseAnnouncement">Course Announcements</Label>
                    <p className="text-sm text-muted-foreground">News and changes from instructors</p>
                  </div>
                  <Switch
                    id="courseAnnouncement"
                    checked={notifications.courseAnnouncement}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, courseAnnouncement: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="newMaterial">New Materials</Label>
                    <p className="text-sm text-muted-foreground">When new resources are uploaded</p>
                  </div>
                  <Switch
                    id="newMaterial"
                    checked={notifications.newMaterial}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, newMaterial: checked })}
                  />
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
              <Switch
                id="twoFactorAuth"
                checked={security.twoFactorAuth}
                onCheckedChange={(checked) => setSecurity({ ...security, twoFactorAuth: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="loginAlerts">Login Alerts</Label>
                <p className="text-sm text-muted-foreground">Email me when a new device logs in</p>
              </div>
              <Switch
                id="loginAlerts"
                checked={security.loginAlerts}
                onCheckedChange={(checked) => setSecurity({ ...security, loginAlerts: checked })}
              />
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
