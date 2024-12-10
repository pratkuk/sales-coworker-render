import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sales Coworker',
  description: 'A modern UI for sales professionals',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        {children}
      </body>
    </html>
  )
}