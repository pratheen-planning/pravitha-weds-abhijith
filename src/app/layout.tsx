import type { Metadata, Viewport } from "next";
import { Playfair_Display, Cormorant_Garamond, Poppins, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
  display: "swap"
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap"
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-poppins",
  display: "swap"
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pravithawedsabhijith.in"),
  title: "Pravitha P V & Abhijith Roy | Wedding Invitation",
  description:
    "Join Pravitha P V and Abhijith Roy for their wedding on 18 August 2026 at N.S.S Auditorium, Chengannur, Kerala.",
  applicationName: "Pravitha Weds Abhijith",
  keywords: [
    "Pravitha Abhijith wedding",
    "Kerala wedding invitation",
    "Pravitha weds Abhijith",
    "NSS Auditorium Chengannur"
  ],
  openGraph: {
    title: "Pravitha P V & Abhijith Roy | Wedding Invitation",
    description:
      "With love and gratitude, Pravitha P V and Abhijith Roy invite you to celebrate their wedding.",
    url: "https://pravithawedsabhijith.in",
    siteName: "Pravitha Weds Abhijith",
    images: [
      {
        url: "/images/hero-photo.jpg",
        width: 1023,
        height: 1537,
        alt: "Pravitha P V and Abhijith Roy"
      }
    ],
    locale: "en_IN",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Pravitha P V & Abhijith Roy | Wedding Invitation",
    description: "Wedding on 18 August 2026 at N.S.S Auditorium, Chengannur.",
    images: ["/images/hero-photo.jpg"]
  },
  alternates: {
    canonical: "https://pravithawedsabhijith.in"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F7F1E3"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-IN"
      className={`${playfair.variable} ${cormorant.variable} ${poppins.variable} ${inter.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
