'use client';

import ScaledSheet from '@/components/resume/ScaledSheet';
import { createExampleResume, normalizeTheme } from '@/lib/resumeDefaults';
import { TEMPLATES } from '@/lib/resumeDesign';
import type { ResumeTemplate } from '@/components/builder/previousResumes/ResumeInterface';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { LuArrowRight, LuCheck } from 'react-icons/lu';

export default function TemplateShowcase() {
  const base = useMemo(() => createExampleResume(), []);
  const [selected, setSelected] = useState<ResumeTemplate>('folio');
  const template = TEMPLATES.find((item) => item.id === selected) ?? TEMPLATES[0];

  const resume = useMemo(
    () => ({
      ...base,
      theme: { ...normalizeTheme(base.theme), template: selected, color: '#1E5B49' },
    }),
    [base, selected]
  );

  return (
    <section id='templates' className='scroll-mt-16 border-y border-line bg-surface/50 py-16 lg:py-20'>
      <div className='shell'>
        <div className='flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between'>
          <div className='max-w-xl'>
            <p className='eyebrow'>Templates</p>
            <h2 className='mt-3 font-display text-[38px] leading-[1.02] tracking-[-0.02em] text-ink sm:text-[46px]'>
              Twelve ways to set the same words.
            </h2>
            <p className='mt-3 text-[14px] leading-[1.7] text-ink-soft'>
              Every template starts from one set of content, not a separate form. Switch
              whenever you like; not a word is retyped. All twelve are included.
            </p>
          </div>
          <Link href='/builder' className='btn btn-secondary btn-sm shrink-0 self-start'>
            Open the builder
            <LuArrowRight className='h-3.5 w-3.5' />
          </Link>
        </div>

        <div className='mt-8 flex gap-1.5 overflow-x-auto pb-1 no-scrollbar lg:hidden'>
          {TEMPLATES.map((item) => (
            <button
              key={item.id}
              type='button'
              onClick={() => setSelected(item.id)}
              aria-pressed={selected === item.id}
              className={`shrink-0 rounded-full border px-3 py-1.5 text-[12px] font-medium transition-colors ${
                selected === item.id
                  ? 'border-accent bg-accent-soft text-accent'
                  : 'border-line bg-surface text-ink-soft'
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>

        <div className='mt-6 grid grid-cols-1 gap-8 lg:mt-9 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:gap-12'>
          <div className='hidden content-start gap-x-8 gap-y-1 lg:grid lg:grid-cols-2'>
            {TEMPLATES.map((item) => {
              const active = item.id === selected;
              return (
                <button
                  key={item.id}
                  type='button'
                  onClick={() => setSelected(item.id)}
                  aria-pressed={active}
                  className={`group flex items-center justify-between gap-3 border-b border-line py-2.5 text-left transition-colors ${
                    active ? 'text-ink' : 'text-ink-soft hover:text-ink'
                  }`}
                >
                  <span className='min-w-0'>
                    <span className='flex items-center gap-2'>
                      <span className='text-[13.5px] font-semibold'>{item.name}</span>
                      {active ? (
                        <span className='flex h-4 w-4 items-center justify-center rounded-full bg-accent text-accent-ink'>
                          <LuCheck className='h-2.5 w-2.5' />
                        </span>
                      ) : null}
                    </span>
                    <span className='mt-0.5 block truncate text-[11.5px] text-ink-faint'>
                      {item.note}
                    </span>
                  </span>
                  <span
                    aria-hidden='true'
                    className={`h-8 w-6 shrink-0 rounded-[3px] border transition-colors ${
                      active
                        ? 'border-accent/40 bg-accent-soft'
                        : 'border-line bg-sunken group-hover:border-line-strong'
                    }`}
                  >
                    <span className='mx-auto mt-1.5 block h-0.5 w-3.5 rounded-full bg-current opacity-40' />
                    <span className='mx-auto mt-1 block h-0.5 w-2.5 rounded-full bg-current opacity-20' />
                    <span className='mx-auto mt-1 block h-0.5 w-3 rounded-full bg-current opacity-20' />
                  </span>
                </button>
              );
            })}
          </div>

          <div className='min-w-0 rounded-2xl border border-line bg-sunken/50 p-3 sm:p-4'>
            <div className='mb-3 flex items-center justify-between gap-3 px-0.5'>
              <div className='flex items-baseline gap-2'>
                <span className='text-[13px] font-semibold text-ink'>{template.name}</span>
                <span className='text-[11px] capitalize text-ink-faint'>{template.layout}</span>
              </div>
              <span className='rounded-full border border-line bg-surface px-2 py-0.5 text-[10px] font-medium text-ink-faint'>
                A4 · letter
              </span>
            </div>
            <div className='mx-auto w-full min-w-0 max-w-[380px] overflow-hidden rounded-sm bg-[#fffdf9] shadow-sheet'>
              <ScaledSheet resume={resume} crop rounded={false} />
            </div>
            <p className='mt-3 text-center text-[11.5px] leading-[1.5] text-ink-faint lg:text-left'>
              {template.note}. Switch templates in the editor without losing content.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
