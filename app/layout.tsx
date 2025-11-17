import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Merriweather } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "sonner"; // 👈 importa aqui
import "./globals.css";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });
const _merriweather = Merriweather({
  weight: ["700"],
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "Presentei um Idoso neste Natal - Transforme Vidas com Amor",
  description:
    "Participe do projeto Presentei um Idoso neste Natal e leve alegria, carinho e esperança para quem mais precisa. Cada gesto de amor transforma vidas.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${_merriweather.variable} font-sans antialiased`}>
        {children}
        <Toaster richColors position="top-center" />
        <Analytics />
      </body>
    </html>
  );
}
