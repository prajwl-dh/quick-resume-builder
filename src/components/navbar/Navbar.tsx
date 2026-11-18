'use client';

import { motion, type Transition } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import React from 'react';
import Moon from '../theme-switcher/Moon';
import Sun from '../theme-switcher/Sun';
import { Brand } from './Brand';

type NavbarType = {
  children?: React.ReactNode;
  initial?: { opacity: number; y: number };
  animate?: { opacity: number; y: number };
  transition?: Transition;
};

export default function Navbar({
  children,
  initial,
  animate,
  transition,
}: NavbarType) {
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <motion.header
      initial={initial}
      animate={animate}
      transition={transition}
      className='fixed inset-x-0 top-0 z-50 h-16 border-b border-light-ring-secondary/80 bg-light-background/85 backdrop-blur-xl dark:border-dark-ring-secondary/80 dark:bg-dark-background/85'
    >
      <div className='mx-auto flex h-full max-w-shell items-center justify-between px-5 md:px-10'>
        <Brand onClick={() => router.push('/')} />
        <div className='flex items-center gap-1'>
          {children}
          {resolvedTheme === 'dark' ? (
            <Sun setTheme={setTheme} />
          ) : (
            <Moon setTheme={setTheme} />
          )}
        </div>
      </div>
    </motion.header>
  );
}
