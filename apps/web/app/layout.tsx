import type { Metadata } from "next";
import { Manrope, DM_Mono } from "next/font/google";
import "./globals.css";
import { FileProvider } from "../context/FileContext";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "PrintPanda - Print from anywhere",
  description: "Skip the queue. Print, pay, pick up.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${dmMono.variable}`}>
      <body>
        <FileProvider>{children}</FileProvider>
      </body>
    </html>
  );
}
