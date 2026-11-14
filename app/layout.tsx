import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import DashboardNav from "@/components/DashboardNav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono", 
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StudyFlow",
  description: "Plan tasks, manage courses, and stay on track with your studies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {  
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-slate text-slate-900 antialiased`}
      >
        <div className="mx-auto flex min-h-screen max-w-7xl flex-col md:flex-row">
          <DashboardNav />
          <main className="flex-1 p-4 md:p-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
