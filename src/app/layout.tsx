import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const inter = Inter({ subsets: ["latin"] });

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
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
