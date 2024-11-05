import withPWA from '@ducanh2912/next-pwa';

const nextConfig = {
  basePath: '/onpremise',
  /* config options here */
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
};

export default withPWA({
  dest: 'public',
})(nextConfig);
