import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ColorThemeProvider } from "@/components/color-theme-provider"
import { Toaster } from "@/components/ui/toaster"
import WebNavigation from "@/components/web-navigation"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "EduFlow - Learning Management System",
  description: "Modern LMS for educational institutions",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var k='lms-brand-color',c=localStorage.getItem(k);if(c&&['green','blue','purple','red','orange','teal','custom'].indexOf(c)!==-1){document.documentElement.setAttribute('data-brand',c);}else{document.documentElement.setAttribute('data-brand','green');}})();`,
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <ColorThemeProvider>
            {children}
            <Toaster />
            {/* Gesture control on every page (global integration) */}
            <WebNavigation />
          </ColorThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
