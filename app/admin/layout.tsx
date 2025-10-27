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
        {children}
        <AIAssistant />
      </SidebarInset>
    </SidebarProvider>
  )
}
