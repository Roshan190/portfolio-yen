import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/portfolio-yen',
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
  reactStrictMode: true,
  experimental: {
    // The stylesheet is render-blocking. Inlining it keeps the same rules
    // and drops a round trip before first paint.
    inlineCss: true,
  },
}

export default nextConfig
