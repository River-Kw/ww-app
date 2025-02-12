/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/u/**',
      },
      {
        protocol: 'https', 
        hostname: 'cdn.discordapp.com', 
        port: '',         
        pathname: '/avatars/**', 
      }
    ]
  }
}

module.exports = nextConfig;
