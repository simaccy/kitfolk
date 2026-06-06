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
  title: "SceneCircle - The trusted network for crew, kit and production",
  description:
    "Find, verify and book crew and equipment in film and TV. Verified professionals, real availability, built-in trust. Now opening early access.",
  metadataBase: new URL("https://scenecircle.com"),
  openGraph: {
    title: "SceneCircle - The trusted network for crew, kit and production",
    description:
      "Your Scene. Your Circle. Join the trusted network for crew, kit and production.",
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
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('sc-theme');if(t==='light')document.documentElement.setAttribute('data-theme','light');}catch(e){}})()`,
          }}
        />
        {children}
      </body>
    </html>
  );
}
