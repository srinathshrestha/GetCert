import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Updated for Next.js 15: serverComponentsExternalPackages moved to serverExternalPackages
  serverExternalPackages: ["puppeteer-core", "@sparticuz/chromium"],
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push("@sparticuz/chromium");
    }
    return config;
  },
};

export default nextConfig;
