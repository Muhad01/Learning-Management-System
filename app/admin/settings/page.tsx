"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Settings, Save, Bell, Shield, Mail, Globe, Database, User } from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { useState } from "react"

export default function AdminSettingsPage() {
  const [generalSettings, setGeneralSettings] = useState({
    institutionName: "EduFlow Learning Management System",
    institutionEmail: "admin@eduflow.com",
    institutionPhone: "+1 (555) 123-4567",
    address: "123 Education Street, Learning City, LC 12345",
    timezone: "America/New_York",
    language: "en",
    description: "A comprehensive learning management system for educational institutions.",
  })

  const [systemSettings, setSystemSettings] = useState({
    maintenanceMode: false,
    registrationEnabled: true,
    emailVerification: true,
    twoFactorAuth: false,
    sessionTimeout: "30",
    maxLoginAttempts: "5",
    passwordMinLength: "8",
    requireStrongPassword: true,
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    studentEnrollment: true,
    courseUpdates: true,
    gradeSubmissions: true,
    systemAlerts: true,
    weeklyDigest: true,
  })

  const [emailSettings, setEmailSettings] = useState({
    smtpHost: "smtp.example.com",
    smtpPort: "587",
    smtpUser: "noreply@eduflow.com",
    smtpPassword: "••••••••",
    fromEmail: "noreply@eduflow.com",
    fromName: "EduFlow LMS",
  })

  const handleSave = (section: string) => {
    console.log(`Saving ${section} settings...`)
    // Add save logic here
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
        {/* General Settings */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Globe className="h-5 w-5" />
              <CardTitle>General Settings</CardTitle>
            </div>
            <CardDescription>Configure your institution's basic information and preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="institutionName">Institution Name</Label>
              <Input
                id="institutionName"
                value={generalSettings.institutionName}
                onChange={(e) =>
                  setGeneralSettings({ ...generalSettings, institutionName: e.target.value })
                }
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="institutionEmail">Institution Email</Label>
                <Input
                  id="institutionEmail"
                  type="email"
                  value={generalSettings.institutionEmail}
                  onChange={(e) =>
                    setGeneralSettings({ ...generalSettings, institutionEmail: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="institutionPhone">Institution Phone</Label>
                <Input
                  id="institutionPhone"
                  type="tel"
                  value={generalSettings.institutionPhone}
                  onChange={(e) =>
                    setGeneralSettings({ ...generalSettings, institutionPhone: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                value={generalSettings.address}
                onChange={(e) =>
                  setGeneralSettings({ ...generalSettings, address: e.target.value })
                }
                rows={2}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select
                  value={generalSettings.timezone}
                  onValueChange={(value) =>
                    setGeneralSettings({ ...generalSettings, timezone: value })
                  }
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
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select
                  value={generalSettings.language}
                  onValueChange={(value) =>
                    setGeneralSettings({ ...generalSettings, language: value })
                  }
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
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={generalSettings.description}
                onChange={(e) =>
                  setGeneralSettings({ ...generalSettings, description: e.target.value })
                }
                rows={3}
                placeholder="Enter a brief description of your institution..."
              />
            </div>

            <div className="flex justify-end">
              <Button onClick={() => handleSave("general")}>
                <Save className="mr-2 h-4 w-4" />
                Save General Settings
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* System Status */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Database className="h-5 w-5" />
              <CardTitle>System Status</CardTitle>
            </div>
            <CardDescription>Current system information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">System Version</span>
                <span className="text-sm font-medium">v2.1.0</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Database Status</span>
                <span className="text-sm font-medium text-green-600">Online</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Last Backup</span>
                <span className="text-sm font-medium">2 hours ago</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Uptime</span>
                <span className="text-sm font-medium">99.9%</span>
              </div>
            </div>
            <Separator />
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Users</span>
                <span className="text-sm font-medium">3,024</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Active Courses</span>
                <span className="text-sm font-medium">156</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Settings */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Settings className="h-5 w-5" />
              <CardTitle>System Settings</CardTitle>
            </div>
            <CardDescription>Configure system behavior and security options</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Enable maintenance mode to restrict access to the system
                </p>
              </div>
              <Switch
                id="maintenanceMode"
                checked={systemSettings.maintenanceMode}
                onCheckedChange={(checked) =>
                  setSystemSettings({ ...systemSettings, maintenanceMode: checked })
                }
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="registrationEnabled">Enable Registration</Label>
                <p className="text-sm text-muted-foreground">
                  Allow new users to register for accounts
                </p>
              </div>
              <Switch
                id="registrationEnabled"
                checked={systemSettings.registrationEnabled}
                onCheckedChange={(checked) =>
                  setSystemSettings({ ...systemSettings, registrationEnabled: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="emailVerification">Email Verification</Label>
                <p className="text-sm text-muted-foreground">
                  Require users to verify their email addresses
                </p>
              </div>
              <Switch
                id="emailVerification"
                checked={systemSettings.emailVerification}
                onCheckedChange={(checked) =>
                  setSystemSettings({ ...systemSettings, emailVerification: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="twoFactorAuth">Two-Factor Authentication</Label>
                <p className="text-sm text-muted-foreground">
                  Require 2FA for admin accounts
                </p>
              </div>
              <Switch
                id="twoFactorAuth"
                checked={systemSettings.twoFactorAuth}
                onCheckedChange={(checked) =>
                  setSystemSettings({ ...systemSettings, twoFactorAuth: checked })
                }
              />
            </div>

            <Separator />

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                <Input
                  id="sessionTimeout"
                  type="number"
                  value={systemSettings.sessionTimeout}
                  onChange={(e) =>
                    setSystemSettings({ ...systemSettings, sessionTimeout: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
                <Input
                  id="maxLoginAttempts"
                  type="number"
                  value={systemSettings.maxLoginAttempts}
                  onChange={(e) =>
                    setSystemSettings({ ...systemSettings, maxLoginAttempts: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="passwordMinLength">Minimum Password Length</Label>
                <Input
                  id="passwordMinLength"
                  type="number"
                  value={systemSettings.passwordMinLength}
                  onChange={(e) =>
                    setSystemSettings({ ...systemSettings, passwordMinLength: e.target.value })
                  }
                />
              </div>
              <div className="flex items-center justify-between pt-8">
                <div className="space-y-0.5">
                  <Label htmlFor="requireStrongPassword">Require Strong Password</Label>
                  <p className="text-sm text-muted-foreground">
                    Enforce complex password requirements
                  </p>
                </div>
                <Switch
                  id="requireStrongPassword"
                  checked={systemSettings.requireStrongPassword}
                  onCheckedChange={(checked) =>
                    setSystemSettings({ ...systemSettings, requireStrongPassword: checked })
                  }
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button onClick={() => handleSave("system")}>
                <Save className="mr-2 h-4 w-4" />
                Save System Settings
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <CardTitle>Notifications</CardTitle>
            </div>
            <CardDescription>Configure notification preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="emailNotifications">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Enable email notifications</p>
              </div>
              <Switch
                id="emailNotifications"
                checked={notificationSettings.emailNotifications}
                onCheckedChange={(checked) =>
                  setNotificationSettings({ ...notificationSettings, emailNotifications: checked })
                }
              />
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="studentEnrollment">Student Enrollment</Label>
                  <p className="text-sm text-muted-foreground">Notify on new enrollments</p>
                </div>
                <Switch
                  id="studentEnrollment"
                  checked={notificationSettings.studentEnrollment}
                  onCheckedChange={(checked) =>
                    setNotificationSettings({ ...notificationSettings, studentEnrollment: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="courseUpdates">Course Updates</Label>
                  <p className="text-sm text-muted-foreground">Notify on course changes</p>
                </div>
                <Switch
                  id="courseUpdates"
                  checked={notificationSettings.courseUpdates}
                  onCheckedChange={(checked) =>
                    setNotificationSettings({ ...notificationSettings, courseUpdates: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="gradeSubmissions">Grade Submissions</Label>
                  <p className="text-sm text-muted-foreground">Notify on grade submissions</p>
                </div>
                <Switch
                  id="gradeSubmissions"
                  checked={notificationSettings.gradeSubmissions}
                  onCheckedChange={(checked) =>
                    setNotificationSettings({ ...notificationSettings, gradeSubmissions: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="systemAlerts">System Alerts</Label>
                  <p className="text-sm text-muted-foreground">Critical system notifications</p>
                </div>
                <Switch
                  id="systemAlerts"
                  checked={notificationSettings.systemAlerts}
                  onCheckedChange={(checked) =>
                    setNotificationSettings({ ...notificationSettings, systemAlerts: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="weeklyDigest">Weekly Digest</Label>
                  <p className="text-sm text-muted-foreground">Weekly summary email</p>
                </div>
                <Switch
                  id="weeklyDigest"
                  checked={notificationSettings.weeklyDigest}
                  onCheckedChange={(checked) =>
                    setNotificationSettings({ ...notificationSettings, weeklyDigest: checked })
                  }
                />
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <Button onClick={() => handleSave("notifications")}>
                <Save className="mr-2 h-4 w-4" />
                Save Notifications
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Email Settings */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Mail className="h-5 w-5" />
              <CardTitle>Email Configuration</CardTitle>
            </div>
            <CardDescription>Configure SMTP settings for sending emails</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="smtpHost">SMTP Host</Label>
                <Input
                  id="smtpHost"
                  value={emailSettings.smtpHost}
                  onChange={(e) =>
                    setEmailSettings({ ...emailSettings, smtpHost: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="smtpPort">SMTP Port</Label>
                <Input
                  id="smtpPort"
                  type="number"
                  value={emailSettings.smtpPort}
                  onChange={(e) =>
                    setEmailSettings({ ...emailSettings, smtpPort: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="smtpUser">SMTP Username</Label>
                <Input
                  id="smtpUser"
                  value={emailSettings.smtpUser}
                  onChange={(e) =>
                    setEmailSettings({ ...emailSettings, smtpUser: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="smtpPassword">SMTP Password</Label>
                <Input
                  id="smtpPassword"
                  type="password"
                  value={emailSettings.smtpPassword}
                  onChange={(e) =>
                    setEmailSettings({ ...emailSettings, smtpPassword: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="fromEmail">From Email</Label>
                <Input
                  id="fromEmail"
                  type="email"
                  value={emailSettings.fromEmail}
                  onChange={(e) =>
                    setEmailSettings({ ...emailSettings, fromEmail: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fromName">From Name</Label>
                <Input
                  id="fromName"
                  value={emailSettings.fromName}
                  onChange={(e) =>
                    setEmailSettings({ ...emailSettings, fromName: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button onClick={() => handleSave("email")}>
                <Save className="mr-2 h-4 w-4" />
                Save Email Settings
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Account Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <CardTitle>Account Settings</CardTitle>
            </div>
            <CardDescription>Manage your admin account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="adminEmail">Admin Email</Label>
              <Input id="adminEmail" type="email" value="admin@eduflow.com" readOnly />
            </div>
            <div className="space-y-2">
              <Label htmlFor="adminName">Admin Name</Label>
              <Input id="adminName" value="Admin User" readOnly />
            </div>
            <Separator />
            <Button variant="outline" className="w-full">
              Change Password
            </Button>
            <Button variant="outline" className="w-full">
              Update Profile
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

