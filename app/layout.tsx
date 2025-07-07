import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Sahayak AI - Teaching Assistant',
  description: 'Created with love by Sahayak AI Team',
  generator: 'Sahayak AI',
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
