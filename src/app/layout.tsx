import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next.js + Supabase Boilerplate",
  description: "Next.js + Supabase Boilerplate",
  keywords: [
    "Next.js",
    "Supabase",
    "React",
    "TypeScript",
    "Boilerplate",
    "보일러플레이트",
  ],
  authors: [{ name: "Aiden Ahn" }],
  creator: "Aiden Ahn",
  publisher: "demodev",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://demodev-boilerplate.vercel.app",
    title: "Next.js + Supabase Boilerplate",
    description: "Next.js + Supabase Boilerplate",
    siteName: "Next.js + Supabase Boilerplate",
    images: [
      {
        url: "og-image.png",
        width: 1200,
        height: 630,
        alt: "Next.js + Supabase Boilerplate",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Next.js + Supabase 보일러플레이트",
    description:
      "최신 Next.js와 Supabase를 활용한 풀스택 개발을 위한 보일러플레이트",
    images: ["og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
