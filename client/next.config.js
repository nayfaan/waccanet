/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // domains: ['172.30.1.2'], // この行を追加して対象のホスト名を設定
     domains: ['web-api.waccanet.com'],
  },
};

module.exports = nextConfig;
