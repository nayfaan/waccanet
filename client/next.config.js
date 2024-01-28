/** @type {import('next').NextConfig} */
const nextConfig = {
  // images: {
  //   // domains: ["172.30.0.3"],
  //   domains: ['localhost'],
  // },

  images: {
    domains: ['172.30.0.3'], // この行を追加して対象のホスト名を設定
         domains: ['localhost'],

  },
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: 'http',
  //       hostname: '172.30.0.3',
  //       port: '8000',
  //       // pathname: '/account123/**',
  //     },
  //   ],
  // },
};

module.exports = nextConfig;
