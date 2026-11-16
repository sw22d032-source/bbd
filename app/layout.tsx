import type { Metadata } from "next";
import { Manrope, Unbounded } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
  display: "swap",
});

const unbounded = Unbounded({
  subsets: ["latin"],
  variable: "--font-unbounded",
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Triflow — Digital Solutions",
  description:
    "App development, web design, software development — вэб сайт, мобайл апп, захиалгат програм хангамж.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="mn"
      className={`${manrope.variable} ${unbounded.variable}`}
      suppressHydrationWarning
    >
      <body>{children}</body>
    </html>
  );
}