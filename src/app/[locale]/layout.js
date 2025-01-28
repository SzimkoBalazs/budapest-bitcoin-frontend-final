import { Fredoka, Exo } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import Navbar from "@/components/Navbar";

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-fredoka",
});

const exo = Exo({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-exo",
});

export const metadata = {
  metadataBase: new URL("https://www.budapestbitcoin.com/"),

  title: {
    default: "Budapest Bitcoin",
    template: "%s | Budapest Bitcoin",
  },
  description: "The Bitcoin Conference with a bit of difference",
  openGraph: {
    title: "Budapest Bitcoin",
    description: "The Bitcoin Conference with a bit of difference",
    type: "website",
    url: "https://www.budapestbitcoin.com/",
    sitename: "Budapest Bitcoin",
    images: [
      {
        url: "https://www.budapestbitcoin.com/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "Budapest Bitcoin Conference",
      },
    ],
  },
  icons: {
    icon: "/bpconflogo.svg",
    shortcut: "/bpconflogo.svg",
    apple: "/bpconflogo.svg",
  },
};

export default async function RootLayout({ children, params }) {
  const { locale } = await params;
  return (
    <html lang={locale}>
      <head>
        {/*COOKIEBOT*/}
        <Script
          id="Cookiebot"
          src="https://consent.cookiebot.com/uc.js"
          data-cbid={process.env.COKKIEBOT_DOMAIN_GROUPID}
          data-blockingmode="auto"
          type="text/javascript"
        ></Script>

        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': 
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0], 
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src= 
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f); 
            })(window,document,'script','dataLayer','GTM-WKNK93HV');
          `}
        </Script>
      </head>
      <body className={`${fredoka.variable} ${exo.variable} antialiased flex`}>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${process.env.GOOGLE_TAG_MANAGER_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <Navbar locale={locale} />
        <main className="w-full min-h-screen bg-neutral-900">{children}</main>
      </body>
    </html>
  );
}
