import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RPP Editor",
  description: "Rencana Pelaksanaan Pembelajaran - Deep Learning",
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
