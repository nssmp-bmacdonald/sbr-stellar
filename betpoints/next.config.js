const path = require('node:path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  swcMinify: true,
  sassOptions: {
    includePaths: [path.join(__dirname, '🎨styles/sass')],
  },
  output: 'standalone',
  images: {
    minimumCacheTTL: 60,
    domains: ['img.sportsbookreview.com', 'www.sportsbookreview.com'],
    formats: ['image/avif', 'image/webp'],
  },
  assetPrefix: '/sbr-web', // used to support multiple apps on same domain
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@styles': path.resolve(__dirname, '🎨styles/sass'),
    };

    return config;
  },
  async rewrites() {
    const rewriteArray = [
      {
        source: `/login/api/logout`,
        destination: `${process.env.API_CLASSIC}/users/logout`,
      },
      {
        source: `/points/api/history/list/:query*`,
        destination: `${process.env.API_CLASSIC}/points/history/:query*`,
      },
      {
        source: '/points/api/balance/:id*',
        destination: `${process.env.API_CLASSIC}/points/balance/:id*`,
      },
      {
        source: '/points/api/loyalty-balance',
        destination: `${process.env.API_CLASSIC}/points/loyalty-balance`,
      },
      {
        source: '/points/api/loyalty-credit/:amount*',
        destination: `${process.env.API_CLASSIC}/points/loyalty-credit/:amount*`,
      },
      {
        source: '/points/api/loyalty-debit/:amount*',
        destination: `${process.env.API_CLASSIC}/points/loyalty-debit/:amount*`,
      },
      {
        /** ASSET PREFIX */
        source: '/sbr-web/_next/:path*',
        destination: '/_next/:path*',
      },
      {
        /** IMAGE PREFIX */
        source: '/sbr-web/images/:query*',
        destination: '/_next/image/:query*',
      },
      {
        source: '/healthz',
        destination: '/api/health',
      },
      {
        source: '/betting-sites-:slug/',
        destination: '/betting-sites/:slug/',
      },
    ];

    return rewriteArray;
  },
};

module.exports = nextConfig;
