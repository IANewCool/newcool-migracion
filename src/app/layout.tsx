import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Migracion Chile - Visas y Residencia | NewCooltura Informada",
  description: "Buscador de oficinas de migraciones, tipos de visa, calculadora de costos migratorios y proceso de residencia en Chile",
  keywords: ["migracion Chile", "visas Chile", "residencia definitiva", "extranjeria", "permisos trabajo"],
  openGraph: {
    title: "Migracion Chile - NewCooltura Informada",
    description: "Visas, residencia y tramites migratorios",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
