import withPWA from '@ducanh2912/next-pwa';

const nextConfig = {
  /* config options here */
  reactStrictMode: false,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  images: {
    domains: ['newmes.s3.ap-northeast-2.amazonaws.com'],
  },
  // productionBrowserSourceMaps: true,
};

export default withPWA({
  dest: 'public',
  buildExcludes: [/middleware-manifest.json$/], // middleware 관련 파일 제외
})(nextConfig);
