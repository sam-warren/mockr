import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "mockr - Realistic Mock Data for Developers",
  description:
    "Generate context-aware, realistic mock data for your applications with semantic relationship mapping.",
  keywords: [
    "mock data",
    "testing",
    "development",
    "API mocking",
    "data generation",
  ],
  authors: [{ name: "mockr Team" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mockr.io",
    title: "mockr - Realistic Mock Data for Developers",
    description:
      "Generate context-aware, realistic mock data for your applications with semantic relationship mapping.",
    siteName: "mockr.io",
  },
  twitter: {
    card: "summary_large_image",
    title: "mockr - Realistic Mock Data for Developers",
    description:
      "Generate context-aware, realistic mock data for your applications with semantic relationship mapping.",
    creator: "@mockrio",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
