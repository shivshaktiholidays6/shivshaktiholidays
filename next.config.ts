import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    imageSizes: [32, 44, 56, 96, 160, 256, 384],
  },
};

export default nextConfig;
