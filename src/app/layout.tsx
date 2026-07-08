import type { Metadata } from "next";
import { PT_Sans } from "next/font/google";
import "./globals.css";

const ptSans = PT_Sans({
  variable: "--font-pt-sans",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SellAlleS — Punto de Venta en la nube para tu negocio en RD",
  description: "POS web multi-sucursal con inventario, crédito, reportes y facturación electrónica DGII. Empieza gratis.",
  openGraph: {
    title: "SellAlleS — Punto de Venta en la nube para tu negocio en RD",
    description: "POS web multi-sucursal con inventario, crédito, reportes y facturación electrónica DGII. Empieza gratis.",
    type: "website",
    locale: "es_DO",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${ptSans.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">{children}</body>
    </html>
  );
}
