/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ubiquitous-waffle-pj9x6rvj54rqhxrq-3000.app.github.dev",
        pathname: "/images/**",
      },
    ],
  },
}

export default nextConfig
