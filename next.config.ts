import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'media.guim.co.uk',
      'static01.nyt.com',
      'www.nytimes.com',
      'newsapi.org',
      'cdn.cnn.com',
      'www.washingtonpost.com',
      'www.bbc.co.uk',
      'bbc.com',
      'media.cnn.com',
      'www.reuters.com',
      'reuters.com',
      'i.guim.co.uk',
      'guardian.ng',
      'images.unsplash.com'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      }
    ],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
