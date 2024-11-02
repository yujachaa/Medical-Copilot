import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './stories/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      rotate: {
        '135': '135deg',
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        white: '#ffffff',
        'rgb0.5': '#00000080',
        '2c2c2c': '#2C2C2C',
        clip: '#0D99FF',
        'blue-logo': '#2380EC',
      },
    },
  },
  plugins: [],
};
export default config;
