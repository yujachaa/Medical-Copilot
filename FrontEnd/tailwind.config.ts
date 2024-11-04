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
        white: '#FFFFFF',
        black: '#000000',
        cancel: '#c4c4c4',
        placeholder: '#667085',
        'blue-logo': '#2380EC',
        'blue-base': '#EBF4FF',
        'blue-btn': '#1F9DFF',
        'blue-msg': '#5DA6F6',
        save: '#FFB703',
        purple: '#CFBAF0',
        mint: '#C6FFE7',
        'tab-bg': '#E8EAED',
        'sidebar-bg': '#404040',
        'admin-log-base': '#F2ECEE',
        'admin-log-text': '#DCDAF5',
        'admin-log-error': '#FF8090',
        'admin-main': '#6EA7E9',
        'admin-mint': '#A5DCE4',
        'rgb0.5': '#00000080',
        '2c2c2c': '#2C2C2C',
        clip: '#0D99FF',
        'gray-msg': '#f2f2f2',
      },
    },
  },
  plugins: [],
};
export default config;
