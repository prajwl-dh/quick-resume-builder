import type { Config } from 'tailwindcss';

/**
 * "Paper and ink" system.
 * Warm paper surfaces, ink-black type, one green accent.
 * Everything is rounded, but never bubbly.
 */
const config: Config = {
  future: { hoverOnlyWhenSupported: true },
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        canvas: 'rgb(var(--c-canvas) / <alpha-value>)',
        surface: 'rgb(var(--c-surface) / <alpha-value>)',
        raised: 'rgb(var(--c-raised) / <alpha-value>)',
        sunken: 'rgb(var(--c-sunken) / <alpha-value>)',
        ink: {
          DEFAULT: 'rgb(var(--c-ink) / <alpha-value>)',
          soft: 'rgb(var(--c-ink-soft) / <alpha-value>)',
          faint: 'rgb(var(--c-ink-faint) / <alpha-value>)',
        },
        line: {
          DEFAULT: 'rgb(var(--c-line) / <alpha-value>)',
          strong: 'rgb(var(--c-line-strong) / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'rgb(var(--c-accent) / <alpha-value>)',
          hover: 'rgb(var(--c-accent-hover) / <alpha-value>)',
          soft: 'rgb(var(--c-accent-soft) / <alpha-value>)',
          ink: 'rgb(var(--c-accent-ink) / <alpha-value>)',
        },
        danger: 'rgb(var(--c-danger) / <alpha-value>)',
        warn: 'rgb(var(--c-warn) / <alpha-value>)',
        success: 'rgb(var(--c-success) / <alpha-value>)',

        // Legacy aliases so any older surface still resolves to the new palette.
        'light-foreground': 'rgb(var(--c-surface) / <alpha-value>)',
        'light-background': 'rgb(var(--c-canvas) / <alpha-value>)',
        'light-text-primary': 'rgb(var(--c-ink) / <alpha-value>)',
        'light-text-secondary': 'rgb(var(--c-ink-soft) / <alpha-value>)',
        'light-form-placeholder': 'rgb(var(--c-ink-faint) / <alpha-value>)',
        'light-ring-secondary': 'rgb(var(--c-line) / <alpha-value>)',
        'light-ring-primary': 'rgb(var(--c-line-strong) / <alpha-value>)',
        'light-button-primary-background': 'rgb(var(--c-ink) / <alpha-value>)',
        'light-button-primary-active': '#35322b',
        'light-button-primary-text': 'rgb(var(--c-canvas) / <alpha-value>)',
        'light-button-secondary-background': 'rgb(var(--c-surface) / <alpha-value>)',
        'light-button-secondary-active': 'rgb(var(--c-sunken) / <alpha-value>)',
        'light-button-secondary-text': 'rgb(var(--c-ink) / <alpha-value>)',
        'dark-foreground': 'rgb(var(--c-surface) / <alpha-value>)',
        'dark-background': 'rgb(var(--c-canvas) / <alpha-value>)',
        'dark-text-primary': 'rgb(var(--c-ink) / <alpha-value>)',
        'dark-text-secondary': 'rgb(var(--c-ink-soft) / <alpha-value>)',
        'dark-form-placeholder': 'rgb(var(--c-ink-faint) / <alpha-value>)',
        'dark-ring-secondary': 'rgb(var(--c-line) / <alpha-value>)',
        'dark-ring-primary': 'rgb(var(--c-line-strong) / <alpha-value>)',
        'dark-button-primary-background': 'rgb(var(--c-ink) / <alpha-value>)',
        'dark-button-primary-active': '#d8d2c4',
        'dark-button-primary-text': 'rgb(var(--c-canvas) / <alpha-value>)',
        'dark-button-secondary-background': 'rgb(var(--c-surface) / <alpha-value>)',
        'dark-button-secondary-active': 'rgb(var(--c-sunken) / <alpha-value>)',
        'dark-button-secondary-text': 'rgb(var(--c-ink) / <alpha-value>)',
        'accent-hover': 'rgb(var(--c-accent-hover) / <alpha-value>)',
        'accent-soft': 'rgb(var(--c-accent-soft) / <alpha-value>)',
        'accent-contrast': 'rgb(var(--c-accent-ink) / <alpha-value>)',
        'dark-accent': 'rgb(var(--c-accent) / <alpha-value>)',
        'dark-accent-hover': 'rgb(var(--c-accent-hover) / <alpha-value>)',
        'dark-accent-soft': 'rgb(var(--c-accent-soft) / <alpha-value>)',
        'dark-accent-contrast': 'rgb(var(--c-accent-ink) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['var(--font-ui)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'Georgia', 'serif'],
        mono: ['var(--font-plex-mono)', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        sm: '6px',
        DEFAULT: '10px',
        md: '12px',
        lg: '16px',
        xl: '20px',
        '2xl': '26px',
        '3xl': '32px',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(20,18,14,0.04), 0 10px 30px -18px rgba(20,18,14,0.22)',
        lift: '0 2px 4px rgba(20,18,14,0.05), 0 24px 60px -30px rgba(20,18,14,0.32)',
        sheet: '0 1px 1px rgba(20,18,14,0.06), 0 26px 80px -32px rgba(20,18,14,0.42)',
        inset: 'inset 0 1px 0 rgba(255,255,255,0.45)',
      },
      maxWidth: {
        shell: '76rem',
        prose: '38rem',
      },
      spacing: {
        18: '4.5rem',
      },
      transitionTimingFunction: {
        ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(14px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s cubic-bezier(0.22,1,0.36,1) both',
        shimmer: 'shimmer 2.4s linear infinite',
        'pulse-soft': 'pulse-soft 2.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
