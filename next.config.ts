import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    // disable built-in image optimization in dev to avoid internal optimizer failures
    unoptimized: true
  }
};

export default nextConfig;
