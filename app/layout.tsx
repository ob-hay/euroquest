import type { Metadata, Viewport } from "next";
import { Exo, Cairo , Jost} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/navbar";
import QueryProvider from "@/providers/query-provider";
import { Toaster } from "sonner";
import Footer from "@/components/shared/footer";
import PopupProvider from "@/components/popups/popup-provider";


const exo = Exo({
  variable: "--font-exo",
  subsets: ["latin"],
  display: "swap",
});
const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["latin"],
  display: "swap",
});
const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://euroqst.com"),
  title: "EuroQuest International",
  description: "EuroQuest International - Professional Training and Certification Courses",
  keywords: "training, certification, courses, professional development, EuroQuest",
  // robots: "noindex, nofollow",
  openGraph: {
    title: "EuroQuest International",
    description: "EuroQuest International - Professional Training and Certification Courses",
    siteName: "EuroQest International",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/assets/images/logo.webp",
        width: 1200,
        height: 630,
        alt: "EuroQuest International",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EuroQuest International",
    description: "EuroQuest International - Professional Training and Certification Courses",
    images: ["/assets/images/logo.webp"],
    site: "@EuroQest",
  },
  icons: {
    icon: "/assets/images/mini-logo.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${exo.variable} ${cairo.variable} antialiased font-exo`}
      >
        <QueryProvider>
            <Navbar/>
            {children}
            <Footer/>
            <PopupProvider />
            <Toaster position="top-right" richColors />
        </QueryProvider>
      </body>
    </html>
  );
}
