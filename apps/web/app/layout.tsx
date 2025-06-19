import {
  Geist_Mono,
  Poppins,
  Cormorant,
  Overpass,
  Rakkas,
} from "next/font/google";
import { Providers } from "@/components/providers";
import "@repo/ui/globals.css";
import "./globals.css";
import { Metadata } from "next";

const fontSans = Overpass({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = Overpass({
  subsets: ["latin"],
  variable: "--font-mono",
});

// const fontSerif = Alegreya({
//   subsets: ["latin"],
//   variable: "--font-serif",
//   weight: ["400", "500", "600", "700"],
// });

const fontSerif = Rakkas({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: "400",
  // weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Laura & Isaac | 2025",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontMono.variable} ${fontSerif.variable} font-sans antialiased bg-[#fefefe]`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
