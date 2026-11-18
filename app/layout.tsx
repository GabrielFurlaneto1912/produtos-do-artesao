import type { Metadata } from "next";
import { Limelight } from "next/font/google";
import "./globals.css";

const limelight = Limelight({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Produtos do Artesão | Loja de Artesanato",
  description:
    "Produtos artesanais únicos, criados com dedicação, talento e criatividade.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={limelight.className}>{children}</body>
    </html>
  );
}