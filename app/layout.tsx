import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NEXUS CARGO — Международная логистика | 180+ стран",
  description:
    "NEXUS CARGO — международный логистический холдинг. Авиа, море, авто, железная дорога. 16 лет на рынке, 180+ стран, 12 000 клиентов.",
  keywords:
    "международная логистика, грузоперевозки, авиаперевозки, морские перевозки, таможенное оформление",
  openGraph: {
    title: "NEXUS CARGO — Международная логистика",
    description: "Ваш груз. Любая точка мира.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Inter:wght@400;500&display=swap&subset=latin,cyrillic"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
