import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import { Bricolage_Grotesque, Instrument_Serif, JetBrains_Mono } from 'next/font/google'
import { description, jsonLd, title } from '@/lib/site'
import { SITE } from '@/lib/content'
import './globals.css'

const display = Bricolage_Grotesque({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  axes: ['wdth'],
})

const serif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: 'italic',
  display: 'swap',
  variable: '--font-instrument',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title,
  description,
  applicationName: 'Roshan Shikhare',
  authors: [{ name: 'Roshan Shikhare', url: 'https://github.com/Roshan190' }],
  creator: 'Roshan Shikhare',
  keywords: [
    'Roshan Shikhare',
    'frontend engineer',
    'fullstack engineer',
    'React',
    'Next.js',
    'Mumbai',
    'HealthShield',
    'Form Ninja',
  ],
  alternates: { canonical: '/' },
  icons: {
    icon: [{ url: `${SITE}/icon.svg`, type: 'image/svg+xml' }],
    apple: [{ url: `${SITE}/apple-touch-icon.png`, sizes: '180x180', type: 'image/png' }],
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: '/',
    siteName: 'Roshan Shikhare',
    title,
    description,
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Roshan Shikhare, senior frontend and fullstack engineer in Mumbai' }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/og.png'],
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  colorScheme: 'light',
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${serif.variable} ${mono.variable}`}>
      <head>
        <meta id="theme-color" name="theme-color" content="#F4EFE6" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      </head>
      <body>{children}</body>
    </html>
  )
}
