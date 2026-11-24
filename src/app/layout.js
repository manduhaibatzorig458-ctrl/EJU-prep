import { ClerkProvider } from "@clerk/nextjs";
import { mnMN } from "@clerk/localizations";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "EJU Prep — Японд суралцах зам",
  description:
    "EJU бэлтгэл, Японы их сургуулийн мэдээлэл болон өргөдлийн төлөвлөгөөг нэг дороос.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="mn" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <ClerkProvider localization={mnMN}>
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
