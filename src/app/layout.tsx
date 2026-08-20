import type { Metadata } from "next";
import { Inter, Archivo, Fraunces } from "next/font/google";
import "./globals.css";
import { company } from "@/lib/content";
import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/Nav";
import WhatsAppFab from "@/components/WhatsAppFab";
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
    default: "K&K Company — Architecture, Engineering & Construction · Kochi",
    template: "%s · K&K Company",
  },
  description:
    "K&K Company is a full-service design-and-build company in Kochi, Kerala. From architecture and structural design to construction, interior design, renovation, pools, fabrication and waterproofing — concept to completion, built with intent.",
  keywords: [
    "civil contractor Kochi",
    "construction company Kerala",
    "architecture Kochi",
    "interior designers Kochi",
    "interior design Kerala",
    "swimming pool construction Kerala",
    "renovation Kochi",
    "K&K Company",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: company.legal,
    title: "K&K Company — Built with intent.",
    description:
      "A full-service civil contracting company in Kochi. Architecture, construction, renovation, pools, fabrication and waterproofing.",
    images: [{ url: "/images/projects/villa-dusk.jpg", width: 1200, height: 800 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "K&K Company — Built with intent.",
    description:
      "Full-service civil contracting in Kochi. Architecture · Construction · Craft.",
    images: ["/images/projects/villa-dusk.jpg"],
  },
  alternates: { canonical: siteUrl },
  robots: { index: true, follow: true },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  name: company.legal,
  description:
    "Full-service civil contracting company in Kochi, Kerala — architecture, construction, renovation, pools, fabrication and waterproofing.",
  url: siteUrl,
  telephone: company.phonePrimary,
  email: company.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: company.address.line1,
    addressLocality: company.address.city,
    postalCode: company.address.pin,
    addressRegion: "Kerala",
    addressCountry: "IN",
  },
  areaServed: "Kochi, Kerala",
  sameAs: company.socials.map((s) => s.href),
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
        <WhatsAppFab />
        <SmoothScroll>
          <main id="main">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
