import type { Metadata } from "next";
import { Playfair_Display, Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/constants";
import AudioPlayer from "@/components/ui/AudioPlayer";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} | ${SITE.tagline}`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  metadataBase: new URL(SITE.url),
  openGraph: {
    siteName: SITE.name,
    type: "website",
    title: SITE.tagline,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${playfairDisplay.variable} ${spaceMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-[#020812] text-white antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-[#55A2D2] focus:text-[#020812] focus:font-semibold"
        >
          Skip to main content
        </a>
        {children}
        <AudioPlayer src="/audio/ambient.mp3" />
      </body>
    </html>
  );
}
