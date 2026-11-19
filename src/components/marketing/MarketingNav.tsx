'use client';

import Logo from '@/components/ui/Logo';
import ThemeToggle from '@/components/ui/ThemeToggle';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { LuArrowRight, LuMenu, LuX } from 'react-icons/lu';

const links = [
  { href: '#templates', label: 'Templates' },
  { href: '#editor', label: 'The editor' },
  { href: '#privacy', label: 'Privacy' },
  { href: '#questions', label: 'Questions' },
];

export default function MarketingNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : '';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <header className='fixed inset-x-0 top-0 z-50 border-b border-line/80 bg-canvas/80 backdrop-blur-xl'>
        <div className='shell flex h-16 items-center justify-between gap-4'>
          <Logo href='/' />

          <nav aria-label='Main' className='hidden items-center gap-0.5 lg:flex'>
            {links.map((link) => (
              <a key={link.href} href={link.href} className='nav-link'>
                {link.label}
              </a>
            ))}
          </nav>

          <div className='flex items-center gap-1.5 sm:gap-2'>
            <ThemeToggle />
            <Link href='/builder' className='btn btn-primary btn-sm hidden sm:inline-flex'>
              Open the builder
              <LuArrowRight className='h-3.5 w-3.5' />
            </Link>
            <button
              type='button'
              onClick={() => setOpen((value) => !value)}
              className='icon-btn lg:hidden'
              aria-expanded={open}
              aria-controls='mobile-menu'
              aria-label={open ? 'Close menu' : 'Open menu'}
            >
              {open ? <LuX className='h-[18px] w-[18px]' /> : <LuMenu className='h-[18px] w-[18px]' />}
            </button>
          </div>
        </div>
      </header>

      {open ? (
        <div
          id='mobile-menu'
          className='fixed inset-0 top-16 z-40 flex flex-col bg-canvas px-5 pb-8 pt-6 lg:hidden'
        >
          <nav aria-label='Mobile' className='flex flex-col'>
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className='flex items-center justify-between border-b border-line py-4 text-[17px] font-medium text-ink'
              >
                {link.label}
                <LuArrowRight className='h-4 w-4 text-ink-faint' />
              </a>
            ))}
          </nav>
          <div className='mt-auto space-y-3 pt-8'>
            <Link
              href='/builder'
              className='btn btn-primary btn-lg w-full'
              onClick={() => setOpen(false)}
            >
              Open the builder
              <LuArrowRight className='h-4 w-4' />
            </Link>
            <p className='text-center text-[11.5px] text-ink-faint'>
              No account. Your resumes stay in this browser.
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
}
