import type { Metadata } from "next";
import "./globals.css";
import { Orbitron } from "next/font/google";
import { TopTicker } from "@/components/home/TopTicker";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: {
    default: "CyborgTI | Cursos de Tecnología y Ciberseguridad",
    template: "%s | CyborgTI",
  },
  description:
    "Plataforma de cursos online certificados en networking, ciberseguridad y programación.",
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
        <Footer />
      </body>
    </html>
  );
}
