import type React from "react"
import { StudentSidebar } from "@/components/student-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import AIAssistant from "@/components/ai-assistant"

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <StudentSidebar />
      <SidebarInset>
        <div
          className="flex min-h-0 flex-1 flex-col overflow-auto"
          data-gesture-scroll
        >
          {children}
          <AIAssistant />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
