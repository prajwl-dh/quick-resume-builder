'use client';

interface MoonProps {
  setTheme: (theme: string) => void;
}

export default function Moon({ setTheme }: MoonProps) {
  return (
    <button
      type='button'
      aria-label='Switch to dark theme'
      title='Dark theme'
      onClick={() => setTheme('dark')}
      className='inline-flex h-9 w-9 items-center justify-center rounded-lg text-light-text-secondary transition-colors duration-150 hover:bg-light-foreground hover:text-light-text-primary dark:text-dark-text-secondary dark:hover:bg-dark-foreground dark:hover:text-dark-text-primary'
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='18'
        height='18'
        viewBox='0 0 24 24'
        fill='currentColor'
        aria-hidden='true'
      >
        <path d='M11.01 3.05C6.51 3.54 3 7.36 3 12a9 9 0 0 0 9 9c4.63 0 8.45-3.5 8.95-8c.09-.79-.78-1.42-1.54-.95A5.403 5.403 0 0 1 11.1 7.5c0-1.06.31-2.06.84-2.89c.45-.67-.04-1.63-.93-1.56' />
      </svg>
    </button>
  );
}
