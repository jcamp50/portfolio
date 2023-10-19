/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
    
        protocol: 'https',
        hostname: 'ghchart.rshah.org',
        port: '',
        pathname: '/jcamp50/**',
      },
    ],
  },
}


module.exports = nextConfig
