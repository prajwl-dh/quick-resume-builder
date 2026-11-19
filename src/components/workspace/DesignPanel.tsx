'use client';

import type {
  ResumeInterface,
  ResumeMargin,
  ResumePaper,
  ResumeTemplate,
  SectionKey,
} from '@/components/builder/previousResumes/ResumeInterface';
import ScaledSheet from '@/components/resume/ScaledSheet';
import { DEFAULT_SECTION_ORDER, sectionItemCount } from '@/lib/resumeDefaults';
import {
  COLOR_GROUPS,
  DEFAULT_THEME,
  FONTS,
  FONT_MAP,
  MARGIN_SIZES,
  PAPER_SIZES,
  TEMPLATES,
} from '@/lib/resumeDesign';
import {
  reorderSections,
  toggleSectionVisibility,
  updateResumeTheme,
} from '@/lib/slices/resumeSlice';
import { useAppDispatch } from '@/lib/store/hooks';
import { useState } from 'react';
import {
  LuCheck,
  LuEye,
  LuEyeOff,
  LuGripVertical,
  LuRotateCcw,
} from 'react-icons/lu';
import { SECTION_META } from '../editor/sectionMeta';
import useSortableList from '../editor/useSortableList';
import { Segmented, Slider } from '../editor/fields';

type Tab = 'template' | 'type' | 'layout';

const tabs: { value: Tab; label: string }[] = [
  { value: 'template', label: 'Template' },
  { value: 'type', label: 'Type & colour' },
  { value: 'layout', label: 'Layout' },
];

export default function DesignPanel({ resume }: { resume: ResumeInterface }) {
  const dispatch = useAppDispatch();
  const [tab, setTab] = useState<Tab>('template');
  const theme = { ...DEFAULT_THEME, ...(resume.theme ?? {}) };
  const order = (resume.sectionOrder ?? DEFAULT_SECTION_ORDER).filter((section) =>
    DEFAULT_SECTION_ORDER.includes(section)
  );
  const hidden = resume.hiddenSections ?? [];

  const update = (patch: Partial<typeof theme>) => {
    dispatch(updateResumeTheme({ id: resume.id, value: patch }));
  };

  const { dragIndex, overIndex, handleProps, itemProps } = useSortableList((from, to) => {
    dispatch(reorderSections({ id: resume.id, from, to }));
  });

  return (
    <div className='mx-auto w-full max-w-[660px] px-4 pb-16 pt-6 sm:px-7 sm:pt-8'>
      <header className='mb-5'>
        <h1 className='text-[22px] font-semibold leading-tight tracking-[-0.02em] text-ink'>
          Design
        </h1>
        <p className='mt-1 max-w-lg text-[13px] leading-[1.55] text-ink-soft'>
          Changes apply to the page immediately. Your words stay exactly as you wrote them.
        </p>
      </header>

      <div className='segmented mb-6 w-full'>
        {tabs.map((item) => (
          <button
            key={item.value}
            type='button'
            data-active={tab === item.value}
            onClick={() => setTab(item.value)}
            className='segmented-item flex-1'
          >
            {item.label}
          </button>
        ))}
      </div>

      {tab === 'template' ? (
        <section aria-label='Resume templates'>
          <div className='grid grid-cols-2 gap-3'>
            {TEMPLATES.map((template) => {
              const active = theme.template === template.id;
              return (
                <button
                  key={template.id}
                  type='button'
                  onClick={() => update({ template: template.id as ResumeTemplate })}
                  title={template.note}
                  aria-pressed={active}
                  className={`group relative overflow-hidden rounded-xl border bg-sunken p-1.5 text-left transition-all duration-200 ${
                    active
                      ? 'border-accent ring-2 ring-accent/20'
                      : 'border-line hover:-translate-y-0.5 hover:border-line-strong hover:shadow-soft'
                  }`}
                >
                  <div className='overflow-hidden rounded-[8px] bg-white shadow-[0_1px_2px_rgba(20,18,14,0.12)]'>
                    <ScaledSheet
                      resume={{ ...resume, theme: { ...theme, template: template.id } }}
                      crop
                      rounded={false}
                    />
                  </div>
                  <div className='flex items-center justify-between gap-2 px-1 pb-0.5 pt-2'>
                    <span className='truncate text-[12.5px] font-semibold text-ink'>
                      {template.name}
                    </span>
                    {active ? (
                      <span className='flex h-4 w-4 items-center justify-center rounded-full bg-accent text-accent-ink'>
                        <LuCheck className='h-2.5 w-2.5' />
                      </span>
                    ) : null}
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      ) : null}

      {tab === 'type' ? (
        <section aria-label='Type and colour options' className='space-y-7'>
          <div>
            <div className='mb-3 flex items-center justify-between'>
              <h2 className='text-[13.5px] font-semibold text-ink'>Ink colour</h2>
              <button
                type='button'
                onClick={() => update({ color: DEFAULT_THEME.color })}
                className='inline-flex items-center gap-1.5 text-[12px] font-medium text-ink-faint transition-colors hover:text-ink'
              >
                <LuRotateCcw className='h-3 w-3' /> Reset
              </button>
            </div>
            <div className='space-y-3 rounded-xl border border-line bg-surface p-3.5'>
              {COLOR_GROUPS.map((group) => (
                <div key={group.name}>
                  <p className='mb-1.5 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-ink-faint'>
                    {group.name}
                  </p>
                  <div className='flex flex-wrap gap-1.5'>
                    {group.colors.map((color) => {
                      const active = theme.color.toLowerCase() === color.value.toLowerCase();
                      return (
                        <button
                          key={color.value}
                          type='button'
                          onClick={() => update({ color: color.value })}
                          title={color.name}
                          aria-label={color.name}
                          aria-pressed={active}
                          className={`relative h-7 w-7 rounded-full border transition-transform duration-150 hover:scale-110 ${
                            active
                              ? 'border-ink ring-2 ring-ink/20 ring-offset-2 ring-offset-surface'
                              : 'border-white/20'
                          }`}
                          style={{ backgroundColor: color.value }}
                        >
                          {active ? (
                            <LuCheck className='absolute inset-0 m-auto h-3.5 w-3.5 text-white mix-blend-difference' />
                          ) : null}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

              <div className='flex items-center gap-2 border-t border-line pt-3'>
                <label
                  htmlFor='custom-ink'
                  className='flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-line-strong'
                  style={{ backgroundColor: theme.color }}
                  title='Pick any colour'
                >
                  <input
                    id='custom-ink'
                    type='color'
                    value={theme.color}
                    onChange={(event) => update({ color: event.target.value })}
                    className='h-0 w-0 opacity-0'
                  />
                </label>
                <span className='text-[12px] text-ink-soft'>Custom</span>
                <input
                  aria-label='Custom colour hex value'
                  value={theme.color}
                  onChange={(event) => {
                    const value = event.target.value;
                    if (/^#[0-9a-f]{0,6}$/i.test(value)) update({ color: value });
                  }}
                  className='input ml-auto h-8 w-24 font-mono text-[12px] uppercase'
                />
              </div>
            </div>
          </div>

          <div>
            <h2 className='mb-3 text-[13.5px] font-semibold text-ink'>Typeface</h2>
            <div className='grid grid-cols-2 gap-2'>
              {FONTS.map((font) => {
                const active = theme.font === font.id;
                return (
                  <button
                    key={font.id}
                    type='button'
                    onClick={() => update({ font: font.id })}
                    aria-pressed={active}
                    className={`flex items-center gap-2.5 rounded-xl border p-2.5 text-left transition-colors duration-150 ${
                      active
                        ? 'border-accent bg-accent-soft/60'
                        : 'border-line bg-surface hover:border-line-strong'
                    }`}
                  >
                    <span
                      className='flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sunken text-[16px] font-semibold text-ink'
                      style={{ fontFamily: font.family }}
                    >
                      Aa
                    </span>
                    <span className='min-w-0'>
                      <span className='block truncate text-[12.5px] font-medium text-ink'>
                        {font.name}
                      </span>
                      <span className='text-[10.5px] text-ink-faint'>{font.group}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className='space-y-5 rounded-xl border border-line bg-surface p-4'>
            <h2 className='text-[13.5px] font-semibold text-ink'>Type size & rhythm</h2>
            <Slider
              label='Text size'
              value={theme.scale}
              min={0.85}
              max={1.2}
              step={0.01}
              display={`${Math.round(theme.scale * 100)}%`}
              onChange={(value) => update({ scale: value })}
            />
            <Slider
              label='Line height'
              value={theme.leading}
              min={1.25}
              max={1.75}
              step={0.01}
              display={theme.leading.toFixed(2)}
              onChange={(value) => update({ leading: value })}
            />
            <Slider
              label='Section spacing'
              value={theme.spacing}
              min={0.7}
              max={1.5}
              step={0.01}
              display={theme.spacing.toFixed(2)}
              onChange={(value) => update({ spacing: value })}
            />
            <button
              type='button'
              onClick={() =>
                update({
                  scale: DEFAULT_THEME.scale,
                  leading: DEFAULT_THEME.leading,
                  spacing: DEFAULT_THEME.spacing,
                })
              }
              className='inline-flex items-center gap-1.5 text-[12px] font-medium text-ink-faint transition-colors hover:text-ink'
            >
              <LuRotateCcw className='h-3 w-3' /> Restore defaults
            </button>
          </div>
        </section>
      ) : null}

      {tab === 'layout' ? (
        <section aria-label='Page and section layout' className='space-y-7'>
          <div className='rounded-xl border border-line bg-surface p-4'>
            <h2 className='mb-3 text-[13.5px] font-semibold text-ink'>Paper</h2>
            <Segmented<ResumePaper>
              label='Paper size'
              value={theme.paper}
              onChange={(value) => update({ paper: value })}
              options={[
                { value: 'a4', label: `A4 · ${PAPER_SIZES.a4.width}×${PAPER_SIZES.a4.height}mm` },
                { value: 'letter', label: 'US Letter' },
              ]}
            />
            <h2 className='mb-3 mt-5 text-[13.5px] font-semibold text-ink'>Page margins</h2>
            <Segmented<ResumeMargin>
              label='Page margins'
              value={theme.margin}
              onChange={(value) => update({ margin: value })}
              options={(
                Object.entries(MARGIN_SIZES) as [ResumeMargin, { label: string; mm: number }][]
              ).map(([value, item]) => ({ value, label: item.label }))}
            />
            <p className='mt-3 text-[12px] text-ink-faint'>
              Margins are {MARGIN_SIZES[theme.margin].mm}mm on every page.
            </p>
          </div>

          <div>
            <div className='mb-1 flex items-end justify-between'>
              <h2 className='text-[13.5px] font-semibold text-ink'>Section order</h2>
              <span className='text-[11.5px] text-ink-faint'>Drag to reorder</span>
            </div>
            <p className='mb-3 text-[12px] leading-[1.5] text-ink-faint'>
              Hidden sections keep their content. They simply do not appear in the PDF.
            </p>
            <div className='overflow-hidden rounded-xl border border-line bg-surface'>
              {order.map((section, index) => {
                const meta = SECTION_META[section];
                const Icon = meta.icon;
                const isHidden = hidden.includes(section);
                return (
                  <div
                    key={section}
                    {...itemProps(index)}
                    data-section-row={index}
                    data-over={overIndex === index && dragIndex !== index}
                    className={`drop-target flex items-center gap-2 border-b border-line px-2.5 py-2 last:border-b-0 ${
                      dragIndex === index ? 'opacity-45' : ''
                    }`}
                  >
                    <span
                      {...handleProps(index)}
                      role='button'
                      tabIndex={0}
                      aria-label={`Reorder ${meta.label}`}
                      title='Drag to move, or use the up and down arrow keys'
                      onKeyDown={(event) => {
                        if (event.key !== 'ArrowUp' && event.key !== 'ArrowDown') return;
                        event.preventDefault();
                        const to = event.key === 'ArrowUp' ? index - 1 : index + 1;
                        if (to < 0 || to >= order.length) return;
                        dispatch(reorderSections({ id: resume.id, from: index, to }));
                        window.requestAnimationFrame(() => {
                          const rows = document.querySelectorAll(
                            '[data-section-row] [role="button"]'
                          );
                          (rows[to] as HTMLElement | undefined)?.focus();
                        });
                      }}
                      className='cursor-grab rounded p-1 text-ink-faint hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 active:cursor-grabbing'
                    >
                      <LuGripVertical className='h-3.5 w-3.5' />
                    </span>
                    <Icon className='h-4 w-4 shrink-0 text-ink-faint' />
                    <span
                      className={`min-w-0 flex-1 truncate text-[13px] ${
                        isHidden ? 'text-ink-faint line-through' : 'text-ink'
                      }`}
                    >
                      {meta.label}
                    </span>
                    <span className='text-[11px] tabular-nums text-ink-faint'>
                      {sectionItemCount(resume, section)}
                    </span>
                    <button
                      type='button'
                      aria-label={isHidden ? `Show ${meta.label}` : `Hide ${meta.label}`}
                      aria-pressed={!isHidden}
                      onClick={() =>
                        dispatch(toggleSectionVisibility({ id: resume.id, section }))
                      }
                      className='icon-btn h-7 w-7'
                    >
                      {isHidden ? <LuEyeOff className='h-3.5 w-3.5' /> : <LuEye className='h-3.5 w-3.5' />}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          <p className='rounded-xl bg-sunken px-3.5 py-3 text-[12px] leading-[1.55] text-ink-soft'>
            A two-page resume is fine when the second page is earned. If you are squeezing, try
            Ledger or tighten the section spacing in Type &amp; colour.
          </p>
        </section>
      ) : null}
    </div>
  );
}
