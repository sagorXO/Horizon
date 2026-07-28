import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import { ClickToComponent } from "@/components/ClickToComponent";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "HORIZON — Modern Luxury Residences",
  description: "Experience the construction sequence of Horizon, an architectural landmark of luxury, resilience, and sustainability.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable} h-full antialiased bg-[#0B0C0E] text-[#F2F0EC]`}
    >
      <body className="min-h-full flex flex-col bg-[#0B0C0E] selection:bg-[#5C7A99] selection:text-[#0B0C0E]">
        <ClickToComponent />
        {children}
      </body>
    </html>
  );
}


