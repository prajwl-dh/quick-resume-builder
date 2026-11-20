'use client';

import ScaledSheet from '@/components/resume/ScaledSheet';
import { createExampleResume } from '@/lib/resumeDefaults';
import type {
  ResumeFont,
  ResumeTemplate,
} from '@/components/builder/previousResumes/ResumeInterface';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { LuArrowRight, LuCheck } from 'react-icons/lu';

const templates: { id: ResumeTemplate; name: string }[] = [
  { id: 'meridian', name: 'Meridian' },
  { id: 'ivory', name: 'Ivory' },
  { id: 'folio', name: 'Folio' },
  { id: 'ledger', name: 'Ledger' },
];

const inks = [
  { name: 'Evergreen', value: '#1E5B49' },
  { name: 'Harbor', value: '#1F4E72' },
  { name: 'Brick', value: '#8C332B' },
  { name: 'Graphite', value: '#1B1A17' },
];

const fonts: { id: ResumeFont; name: string; label: string }[] = [
  { id: 'source', name: 'Source Serif', label: 'Serif' },
  { id: 'inter', name: 'Inter', label: 'Sans' },
  { id: 'plex-mono', name: 'Plex Mono', label: 'Mono' },
];

export default function Hero({
  onBrowseTemplates,
}: {
  onBrowseTemplates?: () => void;
}) {
  const base = useMemo(() => createExampleResume(), []);
  const [template, setTemplate] = useState<ResumeTemplate>('meridian');
  const [color, setColor] = useState('#1E5B49');
  const [font, setFont] = useState<ResumeFont>('source');

  const resume = useMemo(
    () => ({
      ...base,
      theme: { ...base.theme, template, color, font },
    }),
    [base, color, font, template]
  );

  return (
    <section className='relative overflow-hidden pb-16 pt-28 sm:pt-32 lg:pb-28 lg:pt-36'>
      <div
        aria-hidden='true'
        className='pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(60%_100%_at_70%_0%,rgb(var(--c-accent)/0.10),transparent_70%)]'
      />
      <div className='shell relative grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.02fr)] lg:gap-14'>
        <div className='min-w-0 max-w-[540px] animate-fade-up'>
          <p className='eyebrow'>Resume builder · no account needed</p>
          <h1 className='mt-4 font-display text-[46px] leading-[0.98] tracking-[-0.025em] text-ink sm:text-[62px] lg:text-[68px]'>
            A resume builder that stays out of the way.
          </h1>
          <p className='mt-5 max-w-[470px] text-[15px] leading-[1.7] text-ink-soft sm:text-[16px]'>
            Twelve templates, twelve typefaces and twenty-eight inks. The page updates as
            you type, and the PDF downloads with real, selectable text. Everything stays in
            this browser.
          </p>

          <div className='mt-7 flex flex-col gap-2.5 sm:flex-row sm:items-center'>
            <Link href='/builder' className='btn btn-primary btn-lg w-full sm:w-auto'>
              Start a resume
              <LuArrowRight className='h-4 w-4' />
            </Link>
            <button
              type='button'
              onClick={onBrowseTemplates}
              className='btn btn-secondary btn-lg w-full sm:w-auto'
            >
              Browse the templates
            </button>
          </div>

          <ul className='mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[12px] text-ink-faint'>
            {['Free to use', 'No watermark', 'Saved as you type'].map((item) => (
              <li key={item} className='inline-flex items-center gap-1.5'>
                <LuCheck className='h-3.5 w-3.5 text-accent' />
                {item}
              </li>
            ))}
          </ul>

          <div className='mt-10 max-w-[430px] border-t border-line pt-4'>
            <p className='text-[12px] leading-[1.6] text-ink-faint'>
              <span className='font-semibold text-ink-soft'>A4 or US Letter.</span> One
              page or several. Margins at 11, 15 or 19mm, with the page in view the whole
              time.
            </p>
          </div>
        </div>

        <div className='min-w-0 animate-fade-up [animation-delay:120ms]'>
          <div className='overflow-hidden rounded-2xl border border-line bg-surface shadow-lift'>
            <div className='flex h-11 items-center gap-2 border-b border-line bg-sunken/50 px-3'>
              <span className='flex gap-1.5' aria-hidden='true'>
                <span className='h-2 w-2 rounded-full bg-line-strong' />
                <span className='h-2 w-2 rounded-full bg-line-strong' />
                <span className='h-2 w-2 rounded-full bg-line-strong' />
              </span>
              <span className='ml-1 truncate text-[11.5px] font-medium text-ink-soft'>
                Senior frontend engineer
              </span>
              <span className='ml-auto inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-2 py-0.5 text-[10px] font-medium text-ink-faint'>
                <span className='h-1.5 w-1.5 rounded-full bg-accent animate-pulse-soft' />
                Live preview
              </span>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-[196px_minmax(0,1fr)]'>
              <div className='hidden border-r border-line p-4 lg:block'>
                <div>
                  <p className='text-[10.5px] font-semibold uppercase tracking-[0.12em] text-ink-faint'>
                    Template · 4 of 12
                  </p>
                  <div className='mt-2 grid grid-cols-2 gap-1.5'>
                    {templates.map((item) => (
                      <button
                        key={item.id}
                        type='button'
                        onClick={() => setTemplate(item.id)}
                        aria-pressed={template === item.id}
                        className={`rounded-lg border px-1.5 py-1.5 text-[11.5px] font-medium transition-colors ${
                          template === item.id
                            ? 'border-accent bg-accent-soft text-accent'
                            : 'border-line bg-surface text-ink-soft hover:border-line-strong hover:text-ink'
                        }`}
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className='mt-5'>
                  <p className='text-[10.5px] font-semibold uppercase tracking-[0.12em] text-ink-faint'>
                    Ink · 4 of 28
                  </p>
                  <div className='mt-2 flex gap-1.5'>
                    {inks.map((ink) => (
                      <button
                        key={ink.value}
                        type='button'
                        onClick={() => setColor(ink.value)}
                        aria-label={ink.name}
                        aria-pressed={color === ink.value}
                        title={ink.name}
                        className={`relative h-6 w-6 rounded-full border transition-transform hover:scale-110 ${
                          color === ink.value
                            ? 'border-ink ring-2 ring-ink/15 ring-offset-2 ring-offset-surface'
                            : 'border-white/20'
                        }`}
                        style={{ backgroundColor: ink.value }}
                      />
                    ))}
                  </div>
                </div>

                <div className='mt-5'>
                  <p className='text-[10.5px] font-semibold uppercase tracking-[0.12em] text-ink-faint'>
                    Typeface · 3 of 12
                  </p>
                  <div className='mt-2 space-y-1'>
                    {fonts.map((item) => (
                      <button
                        key={item.id}
                        type='button'
                        onClick={() => setFont(item.id)}
                        aria-pressed={font === item.id}
                        className={`flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left text-[11.5px] transition-colors ${
                          font === item.id
                            ? 'bg-accent-soft text-accent'
                            : 'text-ink-soft hover:bg-sunken hover:text-ink'
                        }`}
                      >
                        <span>{item.name}</span>
                        <span className='text-[9.5px] uppercase tracking-[0.08em] text-ink-faint'>
                          {item.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <p className='mt-5 border-t border-line pt-3 text-[10.5px] leading-[1.5] text-ink-faint'>
                  Try it. This is the real resume renderer, not a screenshot.
                </p>
              </div>

              <div className='bg-sunken/40 p-3 sm:p-4'>
                <div className='mb-3 space-y-2 lg:hidden'>
                  <div className='flex flex-wrap items-center gap-1.5'>
                    {templates.map((item) => (
                      <button
                        key={item.id}
                        type='button'
                        onClick={() => setTemplate(item.id)}
                        aria-pressed={template === item.id}
                        className={`rounded-full border px-2.5 py-1 text-[11px] font-medium transition-colors ${
                          template === item.id
                            ? 'border-accent bg-accent-soft text-accent'
                            : 'border-line bg-surface text-ink-soft'
                        }`}
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>
                  <div className='flex flex-wrap items-center gap-1.5'>
                    <span className='mr-0.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-ink-faint'>
                      Ink
                    </span>
                    {inks.map((ink) => (
                      <button
                        key={ink.value}
                        type='button'
                        onClick={() => setColor(ink.value)}
                        aria-label={ink.name}
                        aria-pressed={color === ink.value}
                        className={`h-5 w-5 rounded-full border ${
                          color === ink.value
                            ? 'border-ink ring-1 ring-ink/20 ring-offset-1 ring-offset-sunken'
                            : 'border-white/20'
                        }`}
                        style={{ backgroundColor: ink.value }}
                      />
                    ))}
                  </div>
                </div>

                <div className='mx-auto w-full min-w-0 max-w-[408px] overflow-hidden rounded-sm bg-[#fffdf9] shadow-sheet transition-shadow duration-300'>
                  <ScaledSheet resume={resume} crop rounded={false} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
