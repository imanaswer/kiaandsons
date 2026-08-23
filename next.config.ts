import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Supabase Storage (uploaded project/post images)
      { protocol: "https", hostname: "*.supabase.co" },
    ],
  },
};

export default nextConfig;
