import type React from "react"
import { StudentSidebar } from "@/components/student-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AIAssistant } from "@/components/ai-assistant"

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <StudentSidebar />
      <SidebarInset>
        {children}
        <AIAssistant />
      </SidebarInset>
    </SidebarProvider>
  )
}
