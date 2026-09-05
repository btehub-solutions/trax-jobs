import type { Metadata } from "next";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Trax Jobs — Curated Tech Opportunities in Africa",
  description:
    "Curated tech jobs, talent, and companies across the African startup ecosystem.",
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
