import type { Metadata } from "next";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"

import Header from "./components/header";
import Footer from "./components/footer";

export const metadata: Metadata = {
  title: "OR Tracker",
  description: "OR Tracker is a bot designed specifically for the community of the OR server, facilitating the seamless tracking of current records.",
  robots: "follow, index",
  openGraph: {
    title: 'OR Tracker',
    description: 'OR Tracker is a bot designed specifically for the community of the OR server, facilitating the seamless tracking of current records.',
    url: 'https://ortracker.app',
    siteName: 'OR Tracker',
    images: [
      {
        url: 'https://ortracker.app/og.png',
        width: 800,
        height: 600,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="description" content="OR Tracker is a bot designed specifically for the community of the OR server, facilitating the seamless tracking of current records." />
        <SpeedInsights/>
        <Analytics />
      </head>
      <body>
        <Header />
        <div></div>
        {children}
        <Footer />
      </body>
    </html>
  );
}