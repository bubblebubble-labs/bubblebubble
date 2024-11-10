'use client'

import { RecoilRoot } from 'recoil'
import './css/style.css'
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
})

const metadata = {
  title: '버블버블 - AI 법률 서비스',
  description: '버블버블 - AI 법률 서비스',
  openGraph: {
    title: '버블버블 - AI 법률 서비스',
    description: '버블버블 - AI 법률 서비스',
    images: [
      {
        url: '/images/og-image.png', // Update this path
        width: 1200,
        height: 630,
        alt: '버블버블',
      },
    ],
    type: 'website',
    url: 'https://yourwebsite.com',
    siteName: '버블버블',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '버블버블 - AI 법률 서비스',
    description: '버블버블 - AI 법률 서비스',
    images: ['/images/og-image.png'], // Update this path
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" className="scroll-smooth">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        
      </head>
      <body className={`${inter.variable} font-inter antialiased bg-slate-900 text-slate-100 tracking-tight`}>
        <div className="flex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip">
          <RecoilRoot>
            {children}
          </RecoilRoot>
        </div>
      </body>
    </html>
  )
}
