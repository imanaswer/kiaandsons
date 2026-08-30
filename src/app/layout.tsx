import type { Metadata } from "next";
import { Inter, Archivo, Fraunces } from "next/font/google";
import "./globals.css";

import { company, services } from "@/lib/content";
import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/Nav";
import FloatingActions from "@/components/FloatingActions";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["italic", "normal"],
  weight: ["400", "500"],
  display: "swap",
});

/* IMPORTANT: Your live domain */
const siteUrl = "https://www.kandkbuilders.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Top Builders in Trivandrum | K&K Builders",
    template: "%s | K&K Builders",
  },

  description:
    "K&K Builders is one of the top builders in Trivandrum, Kerala, offering architecture, construction, interiors, renovation, swimming pools, fabrication and waterproofing.",

  keywords: [
    "top builders in Trivandrum",
    "best builders in Trivandrum",
    "builders in Trivandrum",
    "best home builders Trivandrum",
    "construction company Trivandrum",
    "home construction Kerala",
    "interior designers Trivandrum",
    "3D home design Trivandrum",
    "builders in Kollam",
    "builders in Alappuzha",
    "K&K Builders",
  ],

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "K&K Builders",

    title: "Top Builders in Trivandrum | K&K Builders",

    description:
      "Architecture, construction, interiors, renovation, swimming pools, fabrication and waterproofing — all under one roof in Trivandrum.",

    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "K&K Builders - Top Builders in Trivandrum",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "Top Builders in Trivandrum | K&K Builders",

    description:
      "Architecture, construction, interiors and premium homes in Trivandrum.",

    images: ["/images/og-image.jpg"],
  },

  alternates: {
    canonical: siteUrl,
  },

  robots: {
    index: true,
    follow: true,
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",

  "@type": [
    "GeneralContractor",
    "HomeAndConstructionBusiness",
  ],

  "@id": `${siteUrl}/#business`,

  name: company.legal,

  alternateName: company.name,

  description:
    "K&K Builders is a full-service design-and-build company and one of the top builders in Trivandrum, Kerala, offering architecture, construction, interior design, renovation, swimming pools, fabrication and waterproofing.",

  url: siteUrl,

  telephone: company.phonePrimary,

  email: company.email,

  image: `${siteUrl}/images/og-image.jpg`,

  logo: `${siteUrl}/icon.svg`,

  hasMap: company.mapsUrl,

  address: {
    "@type": "PostalAddress",
    streetAddress: company.address.line1,
    addressLocality: company.address.city,
    postalCode: company.address.pin,
    addressRegion: "Kerala",
    addressCountry: "IN",
  },

  geo: {
    "@type": "GeoCoordinates",
    latitude: 8.5241,
    longitude: 76.9366,
  },

  areaServed: [
    {
      "@type": "City",
      name: "Trivandrum",
    },
    {
      "@type": "City",
      name: "Kollam",
    },
    {
      "@type": "City",
      name: "Alappuzha",
    },
    {
      "@type": "State",
      name: "Kerala",
    },
  ],

  sameAs: company.socials.map((s) => s.href),

  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services",

    itemListElement: services.map((s) => ({
      "@type": "Offer",

      itemOffered: {
        "@type": "Service",
        name: s.title,
        description: s.short,
        url: `${siteUrl}/services/${s.slug}`,
      },
    })),
  },
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${archivo.variable} ${fraunces.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-bone text-ink antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-2 focus:text-sm focus:text-bone"
        >
          Skip to content
        </a>

        <ScrollProgress />
        <Nav />
        <FloatingActions />

        <SmoothScroll>
          <main id="main">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}