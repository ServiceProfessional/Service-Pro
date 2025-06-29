const withMarkdoc = require('@markdoc/next.js')

const isProd = process.env.NODE_ENV === 'production'


/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: isProd ? "/Service-Pro" : "",
  assetPrefix: isProd ? "/Service-Pro" : "",
  trailingSlash: true,
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'md'],
  experimental: {
    scrollRestoration: true,
  },
  webpack(config) {
    config.experiments = { ...config.experiments, topLevelAwait: true }
    return config
  },
  images: {
    loader: 'akamai',
    path: '/',
    unoptimized: true,
  },
}

module.exports = withMarkdoc()(nextConfig)
