'use client';

import { useRouter } from 'next/navigation';
import PrimaryButton from '../buttons/PrimaryButton';
import ResumeMock from './ResumeMock';

const steps = [
  {
    number: '01',
    title: 'Start with the essentials',
    body: 'Your name, how to reach you, and a short summary of what you do.',
  },
  {
    number: '02',
    title: 'Shape each section',
    body: 'Add, reorder or hide sections. Work, projects, skills — only what matters.',
  },
  {
    number: '03',
    title: 'Take it with you',
    body: 'Download a clean PDF that reads well for people and parses cleanly in ATS software.',
  },
];

export default function Home() {
  const router = useRouter();

  return (
    <>
      <section className='mx-auto grid max-w-shell items-start gap-14 px-5 pb-20 pt-14 md:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:pb-28 lg:pt-24'>
        <div className='max-w-xl'>
          <div className='eyebrow flex items-center gap-2.5'>
            <span className='inline-block h-1.5 w-1.5 rounded-full bg-accent dark:bg-dark-accent' />
            Local-first resume builder
          </div>

          <h1 className='mt-6 font-display text-[clamp(2.75rem,6vw,4.5rem)] leading-[1.04] tracking-[-0.025em]'>
            A good resume,
            <br />
            <span className='italic text-accent dark:text-dark-accent'>
              without the noise.
            </span>
          </h1>

          <p className='mt-6 max-w-lg text-[16px] leading-[1.75] text-light-text-secondary dark:text-dark-text-secondary sm:text-[17px]'>
            Fill in the fields, watch the page take shape, and download a clean
            PDF. Everything runs in your browser — no account, no uploads,
            nothing stored on a server.
          </p>

          <div className='mt-9 flex flex-wrap items-center gap-x-7 gap-y-4'>
            <PrimaryButton
              className='px-5 py-3 text-[14px]'
              onClick={() => router.push('/builder')}
            >
              Start building
            </PrimaryButton>
            <button
              type='button'
              onClick={() => router.push('/builder/example-resume')}
              className='group inline-flex items-center gap-2 text-sm font-medium text-light-text-secondary transition-colors duration-150 hover:text-accent dark:text-dark-text-secondary dark:hover:text-dark-accent'
            >
              See a finished example
              <span className='transition-transform duration-150 group-hover:translate-x-0.5'>
                →
              </span>
            </button>
          </div>

          <p className='mt-6 text-[13px] text-light-text-secondary dark:text-dark-text-secondary'>
            Free and open source. Your work is saved on this device.
          </p>
        </div>

        <ResumeMock />
      </section>

      <section className='border-t border-light-ring-secondary dark:border-dark-ring-secondary'>
        <div className='mx-auto max-w-shell px-5 py-16 md:px-10 lg:py-20'>
          <h2 className='font-display text-3xl tracking-[-0.02em] sm:text-4xl'>
            Three steps. One PDF.
          </h2>
          <div className='mt-10 grid gap-10 sm:grid-cols-3 sm:gap-8'>
            {steps.map((step) => (
              <div key={step.number} className='border-t border-light-ring-primary/70 pt-4 dark:border-dark-ring-primary/70'>
                <span className='text-[12px] font-semibold tabular-nums text-accent dark:text-dark-accent'>
                  {step.number}
                </span>
                <h3 className='mt-3 text-[15px] font-semibold tracking-[-0.01em]'>
                  {step.title}
                </h3>
                <p className='mt-2 text-[14px] leading-[1.65] text-light-text-secondary dark:text-dark-text-secondary'>
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
