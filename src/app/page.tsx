'use client';

import { useTheme } from 'next-themes';
import PrimaryButton from './components/buttons/PrimaryButton';
import SecondaryButton from './components/buttons/SecondaryButton';
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
        <SecondaryButton onClick={() => setTheme('light')}>
          Go Back
        </SecondaryButton>
      </div>
    </div>
  );
}
