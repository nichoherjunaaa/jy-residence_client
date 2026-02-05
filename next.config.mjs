/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.unsplash.com"], // Tetap pertahankan unsplash
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000', // Sesuaikan dengan port backend kamu
        pathname: '/uploads/**', // Hanya izinkan gambar dari folder uploads
      },
      {
        protocol: 'https',
        hostname: 'api.sandbox.midtrans.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.public.blob.vercel-storage.com',
      },
    ],
  },
  /* config options here */
};

export default nextConfig;