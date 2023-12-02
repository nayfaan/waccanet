import type { Metadata } from "next";
import { Inter } from "next/font/google";

import ClientOnly from "./ClientOnly";
import Navbar from "./components/navbar/Navbar";

import "./globals.css";
import Sidebar from "./components/sidebar/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ShareCanadaHome",
  description: "Find your home in Canada",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex h-full`}>
        <ClientOnly>
          <Navbar />
          {/* <Sidebar /> */}
        </ClientOnly>
        <>{children}</>
      </body>
    </html>
  );
}
