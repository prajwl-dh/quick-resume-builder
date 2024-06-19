'use client';

import { useTheme } from 'next-themes';
export default function Home() {
  const { theme, setTheme } = useTheme();
  return (
    <div className='w-1/2 flex flex-col items-start gap-5 p-5 dark:bg-dark-foreground bg-light-foreground m-10 ring-1 ring-light-ring-secondary dark:ring-dark-ring-secondary hover:ring-light-ring-primary dark:hover:ring-dark-ring-primary transition duration-200 shadow-md rounded-md'>
      <p className='text text-light-text-primary dark:text-dark-text-primary text-3xl'>
        Home
      </p>
      <p className='text text-light-text-secondary dark:text-dark-text-secondary'>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita
        explicabo quo magnam nisi quae at officiis tempore vitae ex,
        voluptatibus beatae omnis praesentium labore nostrum, hic numquam
        assumenda saepe corrupti.
      </p>
      <div className='flex flex-row gap-5'>
        <button
          onClick={() => setTheme('dark')}
          className='text-light-button-primary-text dark:text-dark-button-primary-text bg-light-button-primary-background dark:bg-dark-button-primary-background hover:bg-light-button-primary-active dark:hover:bg-dark-button-primary-active ring-1 ring-light-button-primary-background dark:ring-dark-button-primary-background hover:ring-light-button-primary-active dark:hover:ring-dark-button-primary-active px-3 py-1.5 rounded-md outline-none transition duration-200 text-md shadow-sm'
        >
          Click Me
        </button>
        <button
          onClick={() => setTheme('light')}
          className='text-light-button-secondary-text dark:text-dark-button-secondary-text bg-light-button-secondary-background dark:bg-dark-button-secondary-background hover:bg-light-button-secondary-active dark:hover:bg-dark-button-secondary-active ring-1 ring-light-ring-secondary dark:ring-dark-ring-secondary dark:hover:ring-dark-ring-primary px-3 py-1.5 rounded-md outline-none transition duration-200 text-md shadow-sm'
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
