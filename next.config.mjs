/** @type {import('next').NextConfig} */
import withPWA from "next-pwa";

const nextPWAConfig = withPWA({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
});

const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: [],
  },
  swcMinify: true,
};

export default nextPWAConfig(nextConfig);
