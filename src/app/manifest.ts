import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "K&K Company — Architecture, Construction & Interiors",
    short_name: "K&K Company",
    description:
      "Full-service design-and-build company in Kochi, Kerala — architecture, construction and interior design under one roof.",
    start_url: "/",
    display: "standalone",
    background_color: "#0e0e0d",
    theme_color: "#0e0e0d",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
