import type React from "react"
import { AdminSidebar } from "@/components/admin-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import AIAssistant from "@/components/ai-assistant"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <AdminSidebar />
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
