import {
  Geist,
  Geist_Mono,
  Poppins,
  Alegreya,
  Cormorant,
} from "next/font/google";
import { Providers } from "@/components/providers";
import "@repo/ui/globals.css";
import "./globals.css";

const fontSans = Poppins({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

// const fontSerif = Alegreya({
//   subsets: ["latin"],
//   variable: "--font-serif",
//   weight: ["400", "500", "600", "700"],
// });

const fontSerif = Cormorant({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700"],
});

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
