import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Add your image CDN / DMS photo host here.
    remotePatterns: [{ protocol: "https", hostname: "placehold.co" }],
    dangerouslyAllowSVG: false,
  },
};

export default nextConfig;
