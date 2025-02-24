import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Music Web App',
  description: 'Created by Didintle Mokgoro',
  generator: 'null',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
