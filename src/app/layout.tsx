import '~/styles/globals.css'
import * as React from 'react'
import { GeistSans } from 'geist/font/sans'

export const metadata = {
  title: 'Sinai - Carbon calculator',
  description: 'Carbon calculator for take home project',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>{children}</body>
    </html>
  )
}
