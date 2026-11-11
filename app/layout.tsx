import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./sections.css";
import "./dial.css";
import "./insights.css";
import "./mobile.css";
import "./carousel.css";
import "./about.css";
import "./social.css";
import "./bubble.css";
import Script from "next/script";
import BubbleHover from "@/components/BubbleHover";
import { SITE_URL } from "@/lib/site";

/** Google Analytics 4 measurement ID (public, not a secret): Analytics > Admin > Data streams. */
const GA_ID = "G-4XET7ZMETW";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Mirsal | Senior Frontend & Full-Stack Developer",
  description:
    "I build fast, accessible websites and web apps with React, Next.js, and AEM Edge Delivery Services. Based in Makassar, Indonesia, with 10+ years of experience.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Mirsal | Senior Frontend & Full-Stack Developer",
    description:
      "I build fast, accessible websites and web apps with React, Next.js, and AEM Edge Delivery Services. Based in Makassar, Indonesia, with 10+ years of experience.",
    siteName: "Mirsal Portfolio",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Mirsal - Senior Frontend & Full-Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mirsal | Senior Frontend & Full-Stack Developer",
    description:
      "I build fast, accessible websites and web apps with React, Next.js, and AEM Edge Delivery Services. Based in Makassar, Indonesia, with 10+ years of experience.",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} data-theme="light" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("theme");if(!t)t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";document.documentElement.dataset.theme=t}catch(e){}`,
          }}
        />
      </head>
      <body>
        {children}
        <BubbleHover />
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
        <Script id="google-tag" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag("js",new Date());gtag("config","${GA_ID}");`}</Script>
      </body>
    </html>
  );
}
