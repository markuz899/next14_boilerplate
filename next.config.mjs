/** @type {import('next').NextConfig} */
import withPWA from "next-pwa";

const nextPWAConfig = withPWA({
  dest: "public",
  disable: true,
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
