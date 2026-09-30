import type React from "react";
import type { Metadata } from "next";
import { Bricolage_Grotesque, Hanken_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "sonner";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  weight: ["500", "700"],
});
const body = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
});

export const metadata: Metadata = {
  title: "Presentear um Idoso neste Natal",
  description:
    "Participe do projeto Presentear um Idoso neste Natal e leve alegria, carinho e esperança para quem mais precisa. Cada gesto de amor transforma vidas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${display.variable} ${body.variable} font-sans antialiased`}
      >
        {children}
        <Toaster position="top-center" />
        <Analytics />
      </body>
    </html>
  );
}
