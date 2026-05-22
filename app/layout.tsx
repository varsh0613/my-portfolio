import type { Metadata } from "next"
import type { ReactNode } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "Sirigiri Varshitha — Portfolio",
  description: "One-page portfolio",
  icons: {
    icon: "/api/assets/components/logo.png",
    shortcut: "/api/assets/components/logo.png",
    apple: "/api/assets/components/logo.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
