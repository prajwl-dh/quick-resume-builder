'use client';

import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import React from 'react';
import Moon from '../theme-switcher/Moon';
import Sun from '../theme-switcher/Sun';
import { Logo } from './Logo';

type NavbarType = {
  children?: React.ReactNode;
  initial?: { opacity: number; y: number };
  animate?: { opacity: number; y: number };
  transition?: { delay: number; type: string };
};

export default function Navbar({
  children,
  initial,
  animate,
  transition,
}: NavbarType) {
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  return (
    <motion.div
      initial={initial}
      animate={animate}
      transition={transition}
      className={`w-full h-[70px] px-1 md:px-14 flex flex-row justify-between shadow-sm items-center fixed left-0 top-0 z-50 bg-light-foreground dark:bg-dark-foreground backdrop-blur-md bg-opacity-50 dark:bg-opacity-50 border-b-[1px] border-slate-200 dark:border-stone-700`}
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
          priority
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
        {children}
      </div>
    </motion.div>
  );
}
