'use client';

import type { ResumeInterface, SectionKey } from '@/components/builder/previousResumes/ResumeInterface';
import { analyzeResume } from '@/lib/resumeCheck';
import { LuArrowRight, LuCheck } from 'react-icons/lu';

export default function ResumeCheckPanel({
  resume,
  pageCount,
  onJump,
}: {
  resume: ResumeInterface;
  pageCount: number;
  onJump: (section: SectionKey) => void;
}) {
  const check = analyzeResume(resume, pageCount);
  const open = check.open;
  const done = check.items.filter((item) => item.done);
  const ringColor =
    check.score >= 85
      ? 'rgb(var(--c-accent))'
      : check.score >= 60
        ? 'rgb(var(--c-warn))'
        : 'rgb(var(--c-ink-faint))';

  return (
    <div className='mx-auto w-full max-w-[660px] px-4 pb-16 pt-6 sm:px-7 sm:pt-8'>
      <header className='mb-6'>
        <h1 className='text-[22px] font-semibold leading-tight tracking-[-0.02em] text-ink'>
          Resume check
        </h1>
        <p className='mt-1 max-w-lg text-[13px] leading-[1.55] text-ink-soft'>
          A short list of things a reader will look for. It checks the shape of the page, not your
          worth as a candidate.
        </p>
      </header>

      <div className='mb-6 flex items-center gap-5 rounded-2xl border border-line bg-surface p-5'>
        <div className='relative h-[86px] w-[86px] shrink-0'>
          <svg viewBox='0 0 36 36' className='h-full w-full -rotate-90' aria-hidden='true'>
            <circle
              cx='18'
              cy='18'
              r='15.5'
              fill='none'
              stroke='rgb(var(--c-line))'
              strokeWidth='3'
            />
            <circle
              cx='18'
              cy='18'
              r='15.5'
              fill='none'
              stroke={ringColor}
              strokeWidth='3'
              strokeLinecap='round'
              strokeDasharray={`${(check.score / 100) * 97.4} 97.4`}
              className='transition-all duration-500 ease-out'
            />
          </svg>
          <span className='absolute inset-0 flex items-center justify-center text-[22px] font-semibold tabular-nums tracking-[-0.03em] text-ink'>
            {check.score}
          </span>
        </div>
        <div className='min-w-0'>
          <p className='text-[15px] font-semibold text-ink'>{check.headline}</p>
          <p className='mt-1 text-[12.5px] leading-[1.5] text-ink-soft'>
            {open.length === 0
              ? 'Every check is in place. Read it once out loud, then send it.'
              : `${open.length} ${open.length === 1 ? 'thing' : 'things'} left to look at.`}
          </p>
          <p className='mt-2 inline-flex items-center rounded-full bg-sunken px-2.5 py-1 text-[11.5px] font-medium text-ink-soft'>
            {pageCount} {pageCount === 1 ? 'page' : 'pages'}
          </p>
        </div>
      </div>

      {open.length ? (
        <section aria-label='Things to improve' className='mb-6'>
          <h2 className='mb-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-ink-faint'>
            Worth a look
          </h2>
          <ul className='overflow-hidden rounded-xl border border-line bg-surface'>
            {open.map((item) => (
              <li key={item.id} className='flex items-start gap-3 border-b border-line p-3.5 last:border-b-0'>
                <span className='mt-0.5 h-4 w-4 shrink-0 rounded-full border border-line-strong' />
                <div className='min-w-0 flex-1'>
                  <p className='text-[13px] font-medium text-ink'>{item.label}</p>
                  <p className='mt-0.5 text-[12px] leading-[1.5] text-ink-soft'>{item.detail}</p>
                </div>
                {item.target ? (
                  <button
                    type='button'
                    onClick={() => onJump(item.target!)}
                    className='btn btn-secondary btn-sm mt-0.5 shrink-0'
                  >
                    Open
                    <LuArrowRight className='h-3 w-3' />
                  </button>
                ) : null}
              </li>
            ))}
          </ul>
        </section>
      ) : (
        <div className='mb-6 flex items-start gap-3 rounded-xl border border-accent/25 bg-accent-soft p-4'>
          <span className='mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-accent-ink'>
            <LuCheck className='h-3 w-3' />
          </span>
          <div>
            <p className='text-[13px] font-semibold text-ink'>Nothing missing.</p>
            <p className='mt-0.5 text-[12.5px] leading-[1.5] text-ink-soft'>
              Export the PDF and read the first page as if you were the hiring manager.
            </p>
          </div>
        </div>
      )}

      {done.length ? (
        <details className='group rounded-xl border border-line bg-surface'>
          <summary className='flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-[12.5px] font-medium text-ink-soft [&::-webkit-details-marker]:hidden'>
            <span>What is already in place · {done.length}</span>
            <span className='text-ink-faint transition-transform duration-200 group-open:rotate-180'>
              <svg width='14' height='14' viewBox='0 0 16 16' fill='none' aria-hidden='true'>
                <path d='m4 6 4 4 4-4' stroke='currentColor' strokeWidth='1.6' strokeLinecap='round' strokeLinejoin='round' />
              </svg>
            </span>
          </summary>
          <ul className='border-t border-line px-4 py-2'>
            {done.map((item) => (
              <li key={item.id} className='flex items-start gap-2.5 py-2'>
                <LuCheck className='mt-1 h-3.5 w-3.5 shrink-0 text-accent' />
                <div>
                  <p className='text-[12.5px] font-medium text-ink'>{item.label}</p>
                  <p className='text-[11.5px] text-ink-faint'>{item.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </details>
      ) : null}
    </div>
  );
}
