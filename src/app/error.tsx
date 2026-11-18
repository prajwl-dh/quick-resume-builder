'use client';
import Navbar from '@/components/navbar/Navbar';
import { deleteResume } from '@/lib/slices/resumeSlice';
import { useAppDispatch } from '@/lib/store/hooks';
import { useParams, useRouter } from 'next/navigation';

export default function Error() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();

  function handleDelete() {
    dispatch(deleteResume(params.slug));
    router.push('/builder');
  }

  return (
    <div className='flex min-h-dvh flex-col'>
      <Navbar />
      <main className='flex flex-1 items-center justify-center px-5 pt-16'>
        <div className='max-w-md text-center'>
          <div className='mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400'>
            <svg width='24' height='24' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
              <path
                d='M12 8v5m0 3h.01M10.3 3.9 2.6 17.3A2 2 0 0 0 4.3 20h15.4a2 2 0 0 0 1.7-2.7L13.7 3.9a2 2 0 0 0-3.4 0Z'
                stroke='currentColor'
                strokeWidth='1.7'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </div>
          <h1 className='mt-5 text-xl font-semibold tracking-[-0.02em]'>
            This resume couldn&apos;t be opened
          </h1>
          <p className='mt-2 text-[14px] leading-relaxed text-light-text-secondary dark:text-dark-text-secondary'>
            Its saved data looks incomplete or damaged. Remove it and start a
            fresh one — your other resumes are unaffected.
          </p>
          <div className='mt-7 flex flex-wrap items-center justify-center gap-5'>
            <button
              type='button'
              onClick={handleDelete}
              className='inline-flex items-center justify-center rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-red-700'
            >
              Delete this resume
            </button>
            <button
              type='button'
              onClick={() => router.push('/builder')}
              className='text-sm font-medium text-light-text-secondary transition-colors hover:text-accent dark:text-dark-text-secondary dark:hover:text-dark-accent'
            >
              Back to all resumes
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
