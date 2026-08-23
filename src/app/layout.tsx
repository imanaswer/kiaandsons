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

const siteUrl = "https://kjasons.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "K&K Builders — Architecture, Engineering & Construction · Trivandrum",
    template: "%s · K&K Builders",
  },
  description:
    "K&K Builders is a full-service design-and-build company in Trivandrum, Kerala. From architecture and structural design to construction, interior design, renovation, pools, fabrication and waterproofing — concept to completion, built with intent.",
  keywords: [
    "builders in Trivandrum",
    "best home builders Trivandrum",
    "construction company Trivandrum",
    "builders in Kollam",
    "builders in Alappuzha",
    "home construction Kerala",
    "interior designers Trivandrum",
    "3D home design Trivandrum",
    "furniture import from China Kerala",
    "K&K Builders",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: company.legal,
    title: "K&K Builders — Built with intent.",
    description:
      "A full-service civil contracting company in Trivandrum. Architecture, construction, renovation, pools, fabrication and waterproofing.",
    images: [{ url: "/images/projects/villa-dusk.jpg", width: 1200, height: 800 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "K&K Builders — Built with intent.",
    description:
      "Full-service civil contracting in Trivandrum. Architecture · Construction · Craft.",
    images: ["/images/projects/villa-dusk.jpg"],
  },
  alternates: { canonical: siteUrl },
  robots: { index: true, follow: true },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["GeneralContractor", "HomeAndConstructionBusiness"],
  "@id": `${siteUrl}/#business`,
  name: company.legal,
  alternateName: company.name,
  description:
    "Full-service design-and-build company in Trivandrum, Kerala — architecture, construction, interior design, renovation, pools, fabrication and waterproofing under one roof.",
  url: siteUrl,
  telephone: company.phonePrimary,
  email: company.email,
  image: `${siteUrl}/images/projects/villa-dusk.jpg`,
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
  geo: { "@type": "GeoCoordinates", latitude: 8.5241, longitude: 76.9366 },
  areaServed: [
    { "@type": "City", name: "Trivandrum" },
    { "@type": "City", name: "Kollam" },
    { "@type": "City", name: "Alappuzha" },
    { "@type": "State", name: "Kerala" },
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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${archivo.variable} ${fraunces.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-bone text-ink antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
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
