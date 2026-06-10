import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  turbopack: {
    // expliciet: deze repo is de workspace-root (er staat een losse
    // package-lock.json hoger in de home-map die anders wint)
    root: __dirname,
  },
};

export default nextConfig;
