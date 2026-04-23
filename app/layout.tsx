import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ASPERO — Будівельна компанія | Львів",
  description: "Повний цикл будівництва житлових та комерційних об'єктів. Проектування, будівництво, ремонт — під ключ. З 2002 року у Львові.",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk">
      <body>{children}</body>
    </html>
  );
}
