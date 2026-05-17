import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "test.innova.candoit.com.ar",
      },
    ],
  },
};

export default nextConfig;
