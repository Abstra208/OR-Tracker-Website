import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Head from 'next/head';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "OR Tracker",
  description: "OR Tracker V.2",
  robots: "follow, index",
  icons: [
    {
      rel: "icon",
      url: "/favicon.ico",
    },
  ],
  openGraph: {
    type: "website",
    url: "https://ortracker.app/",
    title: "OR Tracker",
    description: "OR Tracker is a bot designed specifically for the community of the OR server, facilitating the seamless tracking of current records.",
    images: [
      {
        url: "/record_tracker.png",
        alt: "Record Tracker Logo",
      },
    ],
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
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}