import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "mockr.io - Realistic Mock Data for Developers",
  description:
    "Generate context-aware, realistic mock data for your applications with semantic relationship mapping.",
  keywords: [
    "mock data",
    "testing",
    "development",
    "API mocking",
    "data generation",
  ],
  authors: [{ name: "mockr.io Team" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mockr.io",
    title: "mockr.io - Realistic Mock Data for Developers",
    description:
      "Generate context-aware, realistic mock data for your applications with semantic relationship mapping.",
    siteName: "mockr.io",
  },
  twitter: {
    card: "summary_large_image",
    title: "mockr.io - Realistic Mock Data for Developers",
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
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
