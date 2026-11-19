'use client';

import type { ResumeInterface, ResumeLanguage } from '@/components/builder/previousResumes/ResumeInterface';
import { PROFICIENCY_LEVELS } from '@/lib/resumeDefaults';
import { setLanguageItems } from '@/lib/slices/resumeSlice';
import { useAppDispatch } from '@/lib/store/hooks';
import { LuGripVertical, LuPlus, LuX } from 'react-icons/lu';
import useSortableList from '../useSortableList';

function newId() {
  return `lang-${Math.random().toString(36).slice(2, 9)}`;
}

export default function LanguagesEditor({ resume }: { resume: ResumeInterface }) {
  const dispatch = useAppDispatch();
  const items = resume.languageItems ?? [];

  const save = (next: ResumeLanguage[]) => {
    dispatch(setLanguageItems({ id: resume.id, items: next }));
  };

  const { dragIndex, overIndex, handleProps, itemProps } = useSortableList((from, to) => {
    const next = [...items];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    save(next);
  });

  return (
    <div className='space-y-4'>
      <p className='text-[13px] leading-[1.6] text-ink-soft'>
        What you speak and how well. Drag a row by its handle to move it.
      </p>

      <div className='space-y-2'>
        {items.map((item, index) => (
          <div
            key={item.id}
            {...itemProps(index)}
            data-over={overIndex === index && dragIndex !== index}
            className={`drop-target flex items-center gap-2 rounded-xl border border-line bg-surface p-2 ${
              dragIndex === index ? 'opacity-45' : ''
            }`}
          >
            <span
              {...handleProps(index)}
              className='cursor-grab rounded-md p-1 text-ink-faint hover:text-ink active:cursor-grabbing'
              aria-hidden='true'
            >
              <LuGripVertical className='h-4 w-4' />
            </span>
            <input
              aria-label='Language'
              className='input h-9 min-w-0 flex-1'
              value={item.name}
              placeholder='English'
              onChange={(event) =>
                save(
                  items.map((entry) =>
                    entry.id === item.id ? { ...entry, name: event.target.value } : entry
                  )
                )
              }
            />
            <select
              aria-label={`Proficiency in ${item.name || 'this language'}`}
              className='select h-9 w-36 shrink-0'
              value={item.proficiency}
              onChange={(event) =>
                save(
                  items.map((entry) =>
                    entry.id === item.id
                      ? { ...entry, proficiency: event.target.value }
                      : entry
                  )
                )
              }
            >
              {PROFICIENCY_LEVELS.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
            <button
              type='button'
              aria-label={`Remove ${item.name || 'language'}`}
              onClick={() => save(items.filter((entry) => entry.id !== item.id))}
              className='icon-btn h-9 w-9 shrink-0'
            >
              <LuX className='h-4 w-4' />
            </button>
          </div>
        ))}
      </div>

      {items.length === 0 ? (
        <div className='rounded-xl border border-dashed border-line-strong bg-surface/60 px-4 py-6 text-center'>
          <p className='text-[13.5px] font-medium text-ink'>No languages yet.</p>
          <p className='mx-auto mt-1 max-w-xs text-[12.5px] leading-[1.5] text-ink-faint'>
            Useful when the role works across borders, or when it is simply part of who you are.
          </p>
        </div>
      ) : null}

      <button
        type='button'
        onClick={() => save([...items, { id: newId(), name: '', proficiency: 'Fluent' }])}
        className='group inline-flex h-10 w-full items-center justify-center gap-2 rounded-[10px] border border-dashed border-line-strong bg-surface/60 px-3 text-[13px] font-medium text-ink-soft transition-colors hover:border-accent/50 hover:bg-accent-soft/50 hover:text-accent'
      >
        <LuPlus className='h-4 w-4 transition-transform duration-150 group-hover:rotate-90' />
        Add a language
      </button>
    </div>
  );
}
