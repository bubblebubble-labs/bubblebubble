import './css/style.css'
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
})

export const metadata = {
  title: 'AI빵요미 - 성심당 빵 AI 추천 서비스',
  description: '성심당의 개인화된 AI 추천 서비스, AI빵요미와 함께 당신의 취향에 맞는 최고의 빵을 찾아보세요!',
  openGraph: {
    title: 'AI빵요미 - 성심당 빵 AI 추천 서비스',
    description: '개인 취향과 건강 목표에 맞춘 맞춤형 빵 추천 서비스, AI빵요미로 특별한 빵을 발견하세요!',
    images: [
      {
        url: '/images/og-image.png', // Update this path
        width: 1200,
        height: 630,
        alt: 'AI빵요미',
      },
    ],
    type: 'website',
    url: 'https://yourwebsite.com',
    siteName: 'AI빵요미',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI빵요미 - 성심당 AI 추천 서비스',
    description: '당신만의 AI 빵 소믈리에와 함께, 개인화된 빵 추천을 경험하세요!',
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
          {children}
        </div>
      </body>
    </html>
  )
}
