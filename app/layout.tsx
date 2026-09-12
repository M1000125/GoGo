import type { Metadata } from "next";
import { Fredoka, Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-brand",
  display: "swap",
});

export const metadata: Metadata = {
  title: "GoGo — Courier orders",
  description: "Fast delivery decisions for couriers in Distrito Tec",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${nunito.variable} ${fredoka.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        />
      </head>
      <body className="antialiased min-h-screen bg-[var(--gogo-bg)] text-[var(--gogo-ink)]">
        {children}
      </body>
    </html>
  );
}
