import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RPP Editor - Rencana Pelaksanaan Pembelajaran",
  description: "Editor RPP untuk Kurikulum Merdeka Deep Learning",
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
