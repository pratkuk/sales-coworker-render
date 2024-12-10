import './globals.css'
import { Metadata } from 'next'

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
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}