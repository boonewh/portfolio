import type { Metadata } from "next";
import { Geist, Geist_Mono, Kaushan_Script } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const kaushanScript = Kaushan_Script({
  variable: "--font-kaushan-script",
  subsets: ["latin"],
  weight: "400",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.willboone.dev';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Will Boone — Software Developer',
    template: '%s — Will Boone',
  },
  description:
    'Software developer building modern web platforms and AI-driven applications. Specializing in LLM and RAG systems that turn data into useful products.',
  keywords: [
    'software developer',
    'web developer',
    'AI developer',
    'Next.js',
    'React',
    'TypeScript',
    'LLM',
    'RAG',
    'PathSix Solutions',
    'full stack',
  ],
  authors: [{ name: 'Will Boone', url: siteUrl }],
  creator: 'Will Boone',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Will Boone',
    title: 'Will Boone — Software Developer',
    description:
      'Software developer building modern web platforms and AI-driven applications. Specializing in LLM and RAG systems.',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Will Boone — Software Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Will Boone — Software Developer',
    description:
      'Software developer building modern web platforms and AI-driven applications.',
    images: ['/og-image.svg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${kaushanScript.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
