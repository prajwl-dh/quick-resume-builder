import type { Config } from 'tailwindcss';

const config: Config = {
  future: {
    hoverOnlyWhenSupported: true,
  },
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'light-foreground': '#FFF',
        'light-background': '#f9fafb',
        'light-text-primary': '#1f2937',
        'light-text-secondary': '#424b57',
        'light-form-placeholder': '#b6bec8',
        'light-ring-primary': '#4f5763',
        'light-ring-secondary': '#d1d5db',
        'light-button-primary-background': '#171717',
        'light-button-primary-active': '#595959',
        'light-button-primary-text': '#ffffff',
        'light-button-secondary-background': '#ffffff',
        'light-button-secondary-active': '#EBEBEB',
        'light-button-secondary-text': '#1f2937',
        'dark-foreground': '#262626',
        'dark-background': '#181818',
        'dark-text-primary': '#f2f2f2',
        'dark-text-secondary': '#bfbfbf',
        'dark-form-placeholder': '#595959',
        'dark-ring-primary': '#b3b3b3',
        'dark-ring-secondary': '#404040',
        'dark-button-primary-background': '#ffffff',
        'dark-button-primary-active': '#bfbfbf',
        'dark-button-primary-text': '#262626',
        'dark-button-secondary-background': '#181818',
        'dark-button-secondary-active': '#383838',
        'dark-button-secondary-text': '#ffffff',
      },
    },
  },
  plugins: [],
};
export default config;
