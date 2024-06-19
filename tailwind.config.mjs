import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'light-foreground': '#FFF',
        'light-background': '#FAFAFA',
        'light-primary-text': '#171717',
        'light-secondary-text': '#66',
      },
    },
  },
  plugins: [],
};
export default config;
