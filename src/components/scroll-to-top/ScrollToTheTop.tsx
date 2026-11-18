'use client';
import { useEffect, useState } from 'react';

export default function ScrollToTheTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => setVisible(window.scrollY > 240);
    toggleVisibility();
    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  if (!visible) return null;

  return (
    <button
      type='button'
      aria-label='Back to top'
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className='fixed bottom-5 right-5 z-40 inline-flex h-10 w-10 items-center justify-center rounded-full border border-light-ring-secondary bg-light-foreground text-light-text-secondary shadow-paper transition-colors duration-150 hover:border-accent hover:text-accent dark:border-dark-ring-secondary dark:bg-dark-foreground dark:text-dark-text-secondary dark:hover:border-dark-accent dark:hover:text-dark-accent'
    >
      <svg
        width='18'
        height='18'
        viewBox='0 0 24 24'
        fill='currentColor'
        aria-hidden='true'
      >
        <path d='m12 10.8l-4.6 4.6L6 14l6-6l6 6l-1.4 1.4z' />
      </svg>
    </button>
  );
}
