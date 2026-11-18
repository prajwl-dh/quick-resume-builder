import type { Config } from 'tailwindcss';

/**
 * Visual language: "ink on warm paper".
 * A quiet, editorial system for a tool people use to get hired.
 * Neutral tokens keep their historical names so existing components adopt
 * the new palette; accent tokens carry the single brand colour.
 */
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
        // Light surfaces
        'light-foreground': '#FFFFFF',
        'light-background': '#F7F6F2',
        'light-text-primary': '#1B1D20',
        'light-text-secondary': '#5D626B',
        'light-form-placeholder': '#9BA0A8',
        'light-ring-primary': '#1B1D20',
        'light-ring-secondary': '#E4E2DB',
        'light-button-primary-background': '#1B1D20',
        'light-button-primary-active': '#353A42',
        'light-button-primary-text': '#FFFFFF',
        'light-button-secondary-background': '#FFFFFF',
        'light-button-secondary-active': '#F1F0EB',
        'light-button-secondary-text': '#1B1D20',

        // Dark surfaces
        'dark-foreground': '#17191C',
        'dark-background': '#0F1012',
        'dark-text-primary': '#F2F2EE',
        'dark-text-secondary': '#9EA3AC',
        'dark-form-placeholder': '#6B7079',
        'dark-ring-primary': '#F2F2EE',
        'dark-ring-secondary': '#2C3036',
        'dark-button-primary-background': '#F2F2EE',
        'dark-button-primary-active': '#CBCFC8',
        'dark-button-primary-text': '#17191C',
        'dark-button-secondary-background': '#17191C',
        'dark-button-secondary-active': '#23262B',
        'dark-button-secondary-text': '#F2F2EE',

        // The one accent: deep green, derived tones for states.
        'accent': '#1E6B54',
        'accent-hover': '#175440',
        'accent-soft': '#E8F1EC',
        'accent-contrast': '#FFFFFF',
        'dark-accent': '#63C7A7',
        'dark-accent-hover': '#82D8BC',
        'dark-accent-soft': '#143229',
        'dark-accent-contrast': '#0F1012',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'Georgia', 'serif'],
      },
      boxShadow: {
        paper: '0 1px 2px rgba(27,29,32,0.04), 0 12px 32px -16px rgba(27,29,32,0.18)',
        'paper-lg': '0 2px 4px rgba(27,29,32,0.04), 0 28px 64px -28px rgba(27,29,32,0.28)',
      },
      maxWidth: {
        shell: '76rem',
      },
    },
  },
  plugins: [],
};
export default config;
