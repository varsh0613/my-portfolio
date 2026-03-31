import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { DotCursor } from '@/components/dot-cursor'

export const metadata: Metadata = {
  title: 'VS Lab — Varshitha Sirigiri',
  description: 'Healthcare Analytics & Risk Analysis Research Lab - MBA Business Analytics Portfolio',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=DM+Mono:wght@300;400;500&family=Outfit:wght@300;400;500;600&display=swap"
        />
      </head>
      <body className="font-sans antialiased">
        {children}
        <DotCursor />
        <Analytics />
      </body>
    </html>
  )
}
