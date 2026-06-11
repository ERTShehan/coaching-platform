import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Private Coaching",
  description: "One-on-one confidential sessions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} antialiased`}>
      <body className="font-outfit bg-[#f4f5f0] text-[#1a2e15] min-h-screen flex flex-col items-center justify-center p-4">
        {children}
      </body>
    </html>
  );
}
