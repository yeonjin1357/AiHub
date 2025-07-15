/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
  },
  images: {
    domains: ['images.unsplash.com', 'avatars.githubusercontent.com', 'ui-avatars.com'],
  },
}

export default nextConfig