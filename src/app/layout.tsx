import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OR Tracker",
  description: "OR Tracker V.2",
  robots: "follow, index",
  icons: [
    {
      rel: "icon",
      url: "or_records.png",
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
        <link rel="shortcut icon" href="/or_records.png" type="image/x-icon" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}