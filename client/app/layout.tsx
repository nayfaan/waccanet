import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

import Head from "next/head";
// import Header from "./components/header/Header";

import "./globals.css";
import Header from "./components/header/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: " カナダに住む日本人のための情報サイト Waccanet",
  description: "カナダ在住の日本人必見！家探しや仕事探しはWaccanetで！",
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
      <body className={`${inter.className} w-screen min-h-screen`}>
        <Header />
        <div className="bg-white">
          <main>
            <>{children}</>
          </main>
        </div>
        <Analytics />
      </body>
    </html>
  );
}
