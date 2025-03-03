import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppHeader } from "@/components/app-header";
import { AppFooter } from "@/components/app-footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "mockr.io - AI-Powered Mock Data Generator",
  description: "Generate realistic mock data for your applications with AI. Easy to use, simple and effective.",
  keywords: ["mock data", "data generator", "AI", "testing", "development", "API"],
  authors: [{ name: "mockr.io Team" }],
  creator: "mockr.io",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background font-sans antialiased`}
      >
        <div className="flex flex-col min-h-screen">
          <AppHeader />
          <div className="flex-1">
            {children}
          </div>
          <AppFooter />
        </div>
      </body>
    </html>
  );
}
