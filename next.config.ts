import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
      {
        protocol: "https",
        hostname: "scontent.fcmb11-3.fna.fbcdn.net",
      },
    ],
  },
};

export default nextConfig;
