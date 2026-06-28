import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RPP Editor - Rencana Pelaksanaan Pembelajaran",
  description: "Web-based editor for creating and editing RPP documents",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="antialiased">{children}</body>
    </html>
  );
}
