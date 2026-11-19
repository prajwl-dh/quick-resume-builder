'use client';

import type {
  ResumeInterface,
  SectionKey,
} from '@/components/builder/previousResumes/ResumeInterface';
import { DEFAULT_SECTION_ORDER, sectionHasContent, sectionItemCount } from '@/lib/resumeDefaults';
import { LuLayoutTemplate, LuShieldCheck } from 'react-icons/lu';
import { SECTION_META } from '../editor/sectionMeta';

export type PanelKey = SectionKey | 'design' | 'check';

export default function SectionRail({
  resume,
  active,
  onSelect,
}: {
  resume: ResumeInterface;
  active: PanelKey;
  onSelect: (key: PanelKey) => void;
}) {
  const order = (resume.sectionOrder ?? DEFAULT_SECTION_ORDER).filter((section) =>
    DEFAULT_SECTION_ORDER.includes(section)
  );
  const hidden = resume.hiddenSections ?? [];
  const filled = order.filter((section) => sectionHasContent(resume, section)).length;

  return (
    <nav
      aria-label='Resume sections'
      className='hidden w-[220px] shrink-0 flex-col border-r border-line bg-surface/60 lg:flex'
    >
      <div className='px-4 pb-2 pt-4'>
        <p className='eyebrow'>Content</p>
        <p className='mt-1 text-[11.5px] text-ink-faint'>
          {filled} of {order.length} sections have something in them.
        </p>
      </div>

      <div className='min-h-0 flex-1 overflow-y-auto px-2 pb-3'>
        {order.map((section) => {
          const meta = SECTION_META[section];
          const Icon = meta.icon;
          const count = sectionItemCount(resume, section);
          const isHidden = hidden.includes(section);
          const hasContent = sectionHasContent(resume, section);
          return (
            <button
              key={section}
              type='button'
              onClick={() => onSelect(section)}
              aria-current={active === section ? 'true' : undefined}
              className={`group mb-0.5 flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left transition-colors duration-150 ${
                active === section
                  ? 'bg-accent-soft text-accent'
                  : 'text-ink-soft hover:bg-sunken hover:text-ink'
              }`}
            >
              <Icon
                className={`h-4 w-4 shrink-0 ${
                  active === section ? 'text-accent' : 'text-ink-faint group-hover:text-ink-soft'
                }`}
              />
              <span
                className={`min-w-0 flex-1 truncate text-[13px] font-medium ${
                  isHidden ? 'line-through decoration-ink-faint/60' : ''
                }`}
              >
                {meta.label}
              </span>
              {count > 0 ? (
                <span
                  className={`shrink-0 text-[10.5px] tabular-nums ${
                    active === section ? 'text-accent/80' : 'text-ink-faint'
                  }`}
                >
                  {count}
                </span>
              ) : (
                <span
                  aria-hidden='true'
                  className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                    hasContent ? 'bg-accent/50' : 'bg-line-strong'
                  }`}
                />
              )}
              {isHidden ? (
                <span className='shrink-0 rounded bg-sunken px-1 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-ink-faint'>
                  Off
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      <div className='border-t border-line p-2'>
        <button
          type='button'
          onClick={() => onSelect('design')}
          aria-current={active === 'design' ? 'true' : undefined}
          className={`mb-0.5 flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left transition-colors duration-150 ${
            active === 'design'
              ? 'bg-accent-soft text-accent'
              : 'text-ink-soft hover:bg-sunken hover:text-ink'
          }`}
        >
          <LuLayoutTemplate className='h-4 w-4 shrink-0' />
          <span className='text-[13px] font-medium'>Design</span>
        </button>
        <button
          type='button'
          onClick={() => onSelect('check')}
          aria-current={active === 'check' ? 'true' : undefined}
          className={`flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left transition-colors duration-150 ${
            active === 'check'
              ? 'bg-accent-soft text-accent'
              : 'text-ink-soft hover:bg-sunken hover:text-ink'
          }`}
        >
          <LuShieldCheck className='h-4 w-4 shrink-0' />
          <span className='text-[13px] font-medium'>Resume check</span>
        </button>
        <p className='px-2.5 pb-1 pt-3 text-[10.5px] leading-[1.5] text-ink-faint'>
          Saved in this browser as you type.
        </p>
      </div>
    </nav>
  );
}

export function MobileSectionTabs({
  active,
  onSelect,
}: {
  active: PanelKey;
  onSelect: (key: PanelKey) => void;
}) {
  const items: { key: PanelKey; label: string }[] = [
    ...(DEFAULT_SECTION_ORDER.map((section) => ({
      key: section as PanelKey,
      label: SECTION_META[section].label,
    }))),
    { key: 'design', label: 'Design' },
    { key: 'check', label: 'Check' },
  ];

  return (
    <div className='no-print flex shrink-0 items-center gap-1 overflow-x-auto border-b border-line bg-surface/80 px-3 py-2 no-scrollbar lg:hidden'>
      {items.map((item) => (
        <button
          key={item.key}
          type='button'
          onClick={() => onSelect(item.key)}
          aria-current={active === item.key ? 'true' : undefined}
          className={`shrink-0 rounded-full px-3 py-1.5 text-[12px] font-medium transition-colors ${
            active === item.key
              ? 'bg-accent-soft text-accent'
              : 'text-ink-soft hover:bg-sunken hover:text-ink'
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
