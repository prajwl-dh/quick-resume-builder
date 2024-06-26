'use client';

import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import React from 'react';
import Moon from '../theme-switcher/Moon';
import Sun from '../theme-switcher/Sun';
import { Logo } from './Logo';

export default function Navbar() {
  const router = useRouter();
  const [sticky, setSticky] = React.useState<boolean>(false);
  const { theme, setTheme } = useTheme();

  const handleScroll = (): void => {
    if (scrollY <= 0) {
      setSticky(false);
    } else {
      setSticky(true);
    }
  };

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, type: 'spring' }}
      className={`w-full h-[70px] px-1 md:px-14 flex flex-row justify-between items-center fixed left-0 top-0 z-50 scale-50 md:scale-100x border-b-[1px] border-slate-200 dark:border-stone-700 ${
        sticky
          ? 'bg-light-foreground dark:bg-dark-foreground shadow-sm backdrop-blur-sm bg-opacity-40 dark:bg-opacity-40'
          : 'bg-transparent'
      }`}
    >
      <div
        onClick={() => router.push('/')}
        className='flex flex-row items-center cursor-pointer -space-x-1'
      >
        <Logo
          src={'/logo.png'}
          alt='logo'
          height={800}
          width={800}
          quality={100}
          className='h-10 w-10'
        />
        <div className='flex flex-col items-center -space-y-1'>
          <p className='text text-xl font-bold text-light-text-primary dark:text-dark-text-primary p-0'>
            Quick
          </p>
          <p className='text text-md text-light-text-primary dark:text-dark-text-primary p-0'>
            &nbsp;Resume
          </p>
        </div>
      </div>
      <div className='flex flex-row gap-4 items-center mr-3 md:mr-0'>
        {theme === 'dark' ? (
          <Sun setTheme={setTheme} />
        ) : (
          <Moon setTheme={setTheme} />
        )}
      </div>
    </motion.div>
  );
}
