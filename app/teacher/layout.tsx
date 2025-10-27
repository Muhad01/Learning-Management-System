import type React from "react"
import { TeacherSidebar } from "@/components/teacher-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import AIAssistant from "@/components/ai-assistant"

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <TeacherSidebar />
      <SidebarInset>
        {children}
        <AIAssistant />
      </SidebarInset>
    </SidebarProvider>
  )
}
