'use client';

import { useTheme } from 'next-themes';
import PrimaryButton from './components/buttons/PrimaryButton';
export default function Home() {
  const { theme, setTheme } = useTheme();
  return (
    <div className='flex flex-col items-start w-1/2 gap-5 p-5 m-10 transition duration-200 rounded-md shadow-md dark:bg-dark-foreground bg-light-foreground ring-1 ring-light-ring-secondary dark:ring-dark-ring-secondary hover:ring-light-ring-primary dark:hover:ring-dark-ring-primary'>
      <p className='text-3xl text text-light-text-primary dark:text-dark-text-primary'>
        Home
      </p>
      <p className='text text-light-text-secondary dark:text-dark-text-secondary'>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita
        explicabo quo magnam nisi quae at officiis tempore vitae ex,
        voluptatibus beatae omnis praesentium labore nostrum, hic numquam
        assumenda saepe corrupti.
      </p>
      <div className='flex flex-row gap-5'>
        <PrimaryButton onClick={() => setTheme('dark')}>Click Me</PrimaryButton>
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
