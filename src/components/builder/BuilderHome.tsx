'use client';
import { useAppSelector } from '@/lib/store/hooks';
import { useState } from 'react';
import PrimaryButton from '../buttons/PrimaryButton';
import CreateConfirmationPopup from './createNew/CreateConfirmationPopup';
import ExampleResume from './createExampleResume/ExampleResume';
import PreviousResumes from './previousResumes/PreviousResumes';

export default function BuilderHome() {
  const resumes = useAppSelector((state) => state.resumeReducer.value);
  const [open, setOpen] = useState<boolean>(false);

  const savedResumes = resumes.filter((resume) => !resume.isExample);

  return (
    <div className='mx-auto max-w-shell px-5 py-12 md:px-10 md:py-16'>
      <header className='flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between'>
        <div>
          <div className='eyebrow'>Workspace</div>
          <h1 className='mt-3 font-display text-4xl tracking-[-0.02em] sm:text-5xl'>
            Your resumes
          </h1>
          <p className='mt-2 text-[14px] text-light-text-secondary dark:text-dark-text-secondary'>
            Saved on this device. Nothing leaves your browser.
          </p>
        </div>
        <div className='flex flex-wrap items-center gap-3'>
          <ExampleResume />
          <PrimaryButton onClick={() => setOpen(true)}>New resume</PrimaryButton>
        </div>
      </header>

      {savedResumes.length === 0 ? (
        <div className='mt-12 rounded-xl border border-dashed border-light-ring-secondary bg-light-foreground/50 px-6 py-16 text-center dark:border-[#454B53] dark:bg-dark-foreground/40'>
          <div className='mx-auto flex h-11 w-11 items-center justify-center rounded-lg bg-accent-soft text-accent dark:bg-dark-accent-soft dark:text-dark-accent'>
            <svg width='22' height='22' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
              <path
                d='M7 3.5h6.5L18 8v11a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 19V5a1.5 1.5 0 0 1 1-1.5Z'
                stroke='currentColor'
                strokeWidth='1.6'
                strokeLinejoin='round'
              />
              <path
                d='M13.5 3.5V8H18M9.5 13h5M9.5 16.5h3.5'
                stroke='currentColor'
                strokeWidth='1.6'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </div>
          <h2 className='mt-5 text-[17px] font-semibold tracking-[-0.01em]'>
            No resumes yet
          </h2>
          <p className='mx-auto mt-2 max-w-sm text-[14px] leading-[1.65] text-light-text-secondary dark:text-dark-text-secondary'>
            Use “New resume” above to start from a blank page, or open the
            example to see how a finished resume is put together.
          </p>
        </div>
      ) : (
        <div className='mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3'>
          <PreviousResumes />
        </div>
      )}

      <CreateConfirmationPopup open={open} setOpen={setOpen} />
    </div>
  );
}
