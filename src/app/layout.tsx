import type { Metadata } from "next";
import "./globals.css";
import { Orbitron } from "next/font/google";
import { TopTicker } from "@/components/home/TopTicker";
import { Navbar } from "@/components/common/Navbar";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "CyborgTI",
  description: "Cursos Cisco y formación IT - CyborgTI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${orbitron.variable} dark`}>
      <body className="scrollbar-thin">
        <TopTicker />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
