/** @type {import('next').NextConfig} */
import withPWA from "next-pwa";

const isProd = process.env.NODE_ENV === "production";

const nextPWAConfig = withPWA({
  dest: "public",
  disable: !isProd,
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
