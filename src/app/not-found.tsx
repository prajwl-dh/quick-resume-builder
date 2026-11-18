'use client';
import Navbar from '@/components/navbar/Navbar';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();
  return (
    <div className='flex min-h-dvh flex-col'>
      <Navbar />
      <main className='flex flex-1 items-center justify-center px-5 pt-16'>
        <div className='max-w-md text-center'>
          <div className='font-display text-[96px] leading-none tracking-[-0.04em] text-accent dark:text-dark-accent'>
            404
          </div>
          <h1 className='mt-4 text-xl font-semibold tracking-[-0.02em]'>
            This page isn&apos;t here
          </h1>
          <p className='mt-2 text-[14px] leading-relaxed text-light-text-secondary dark:text-dark-text-secondary'>
            The link may be old, or the resume may have been removed from this
            device.
          </p>
          <button
            type='button'
            onClick={() => router.push('/')}
            className='mt-7 inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-accent-hover dark:text-dark-accent dark:hover:text-dark-accent-hover'
          >
            <span aria-hidden='true'>←</span> Back to home
          </button>
        </div>
      </main>
    </div>
  );
}
