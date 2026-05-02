import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const instrument = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "KitFolk — The trusted network for crew, kit and production",
  description:
    "Find, verify and book crew and equipment in film and TV. Verified professionals, real availability, built-in trust. Now opening early access.",
  metadataBase: new URL("https://kitfolk.com"),
  openGraph: {
    title: "KitFolk — The trusted network for crew, kit and production",
    description:
      "Production moves fast. Trust needs to move faster. Join early access.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0b0a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${instrument.variable} ${mono.variable}`}
    >
      <body className="bg-bg text-ink min-h-screen overflow-x-hidden antialiased">
        {children}
      </body>
    </html>
  );
}
