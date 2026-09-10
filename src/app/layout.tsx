import type { Metadata, Viewport } from "next";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0C1222",
};

export const metadata: Metadata = {
  title: "Trax Jobs: Curated Tech Opportunities in Africa",
  description:
    "Curated tech opportunities and elite talent from Ogun State and across Africa. Verified listings, direct hiring, and transparent compensation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
