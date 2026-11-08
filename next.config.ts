import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Every image ships in /public, so no remote hosts are needed.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
