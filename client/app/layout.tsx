import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

import Head from "next/head";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Sidebar from "./components/sidebar/Sidebar";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "カナダ在住、日本人のためのポータル Wacca",
  description: "Find your home in Canada",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
      </Head>
      <body className={`${inter.className}`}>
        <Header />
        <div className="flex h-screen overflow-hidden bg-white pt-16">
          <Sidebar />
          <div className="w-full bg-gray-50 relative overflow-y-auto md:ml-64">
            <main>
              <>{children}</>
            </main>
            <Footer />
          </div>
        </div>
        <Analytics />
      </body>
    </html>
  );
}
