import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";

import "./globals.css";

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
      <body className={`${inter.className}`}>
        <div className="flex flex-col h-screen">
          <Navbar />
          <div className="flex-1 overflow-y-auto">
            <>{children}</>
          </div>
          <Footer />
        </div>
        <script src="./node_modules/preline/dist/preline.js"></script>
      </body>
    </html>
  );
}
