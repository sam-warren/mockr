import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import { Providers } from "@/app/providers";
import { Metadata } from "next";
import { Inter } from "next/font/google";

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
        <Providers>
          {children}
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
