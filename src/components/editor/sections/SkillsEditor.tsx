'use client';

import type { ResumeInterface, SkillGroup } from '@/components/builder/previousResumes/ResumeInterface';
import { COMMON_SKILLS } from '@/lib/resumeDefaults';
import { setSkillGroups } from '@/lib/slices/resumeSlice';
import { useAppDispatch } from '@/lib/store/hooks';
import { useMemo, useState } from 'react';
import { LuGripVertical, LuPlus, LuTrash2, LuX } from 'react-icons/lu';
import { AddButton } from '../fields';
import useSortableList from '../useSortableList';

function newId() {
  return `group-${Math.random().toString(36).slice(2, 9)}`;
}

function SkillGroupCard({
  group,
  groups,
  save,
  groupHandleProps,
  groupDragging,
  groupOver,
  groupDropProps,
}: {
  group: SkillGroup;
  groups: SkillGroup[];
  save: (groups: SkillGroup[]) => void;
  groupHandleProps: {
    draggable: boolean;
    onDragStart: (event: React.DragEvent<HTMLElement>) => void;
    onDragEnd: () => void;
  };
  groupDragging: boolean;
  groupOver: boolean;
  groupDropProps: {
    onDragOver: (event: React.DragEvent<HTMLElement>) => void;
    onDragLeave: () => void;
    onDrop: (event: React.DragEvent<HTMLElement>) => void;
  };
}) {
  const [draft, setDraft] = useState('');
  const [focused, setFocused] = useState(false);
  const { dragIndex, handleProps, itemProps } = useSortableList((from, to) => {
    const next = groups.map((item) => ({ ...item, skills: [...item.skills] }));
    const target = next.find((item) => item.id === group.id);
    if (!target) return;
    const [moved] = target.skills.splice(from, 1);
    target.skills.splice(to, 0, moved);
    save(next);
  });

  const addSkill = (value: string) => {
    const clean = value.trim().replace(/,$/, '');
    if (!clean) return;
    const exists = group.skills.some(
      (skill) => skill.toLowerCase() === clean.toLowerCase()
    );
    if (!exists) {
      save(
        groups.map((item) =>
          item.id === group.id ? { ...item, skills: [...item.skills, clean] } : item
        )
      );
    }
    setDraft('');
  };

  const suggestions = useMemo(() => {
    if (!focused) return [];
    const owned = new Set(
      groups.flatMap((item) => item.skills.map((skill) => skill.toLowerCase()))
    );
    const query = draft.trim().toLowerCase();
    return COMMON_SKILLS.filter(
      (skill) => !owned.has(skill.toLowerCase()) && (!query || skill.toLowerCase().includes(query))
    ).slice(0, 5);
  }, [draft, focused, groups]);

  return (
    <div
      {...groupDropProps}
      data-over={groupOver}
      className={`drop-target rounded-xl border border-line bg-surface p-3.5 transition-opacity ${
        groupDragging ? 'opacity-45' : ''
      }`}
    >
      <div className='flex items-center gap-2'>
        <span
          {...groupHandleProps}
          title='Drag to reorder group'
          className='cursor-grab rounded-md p-0.5 text-ink-faint hover:text-ink active:cursor-grabbing'
          aria-hidden='true'
        >
          <LuGripVertical className='h-4 w-4 shrink-0' />
        </span>
        <input
          aria-label='Skill group name'
          value={group.name}
          placeholder='Group name'
          onChange={(event) =>
            save(
              groups.map((item) =>
                item.id === group.id ? { ...item, name: event.target.value } : item
              )
            )
          }
          className='min-w-0 flex-1 border-0 bg-transparent p-0 text-[13.5px] font-semibold text-ink placeholder:text-ink-faint focus:outline-none'
        />
        <span className='text-[11.5px] tabular-nums text-ink-faint'>
          {group.skills.length}
        </span>
        <button
          type='button'
          aria-label={`Delete ${group.name || 'skill group'}`}
          title='Delete group'
          onClick={() => save(groups.filter((item) => item.id !== group.id))}
          className='icon-btn h-7 w-7 text-ink-faint hover:text-danger'
        >
          <LuTrash2 className='h-3.5 w-3.5' />
        </button>
      </div>

      <div className='mt-3 flex flex-wrap gap-1.5'>
        {group.skills.map((skill, index) => (
          <span
            key={`${skill}-${index}`}
            {...itemProps(index)}
            className={`chip group cursor-grab active:cursor-grabbing ${
              dragIndex === index ? 'opacity-40' : ''
            }`}
            title='Drag to reorder'
          >
            <span {...handleProps(index)} aria-hidden='true' className='flex items-center'>
              <LuGripVertical className='-ml-1 mr-0.5 h-3 w-3 text-ink-faint' />
            </span>
            {skill}
            <button
              type='button'
              aria-label={`Remove ${skill}`}
              onClick={() =>
                save(
                  groups.map((item) =>
                    item.id === group.id
                      ? { ...item, skills: item.skills.filter((_, i) => i !== index) }
                      : item
                  )
                )
              }
              className='-mr-1 ml-0.5 rounded-full p-0.5 text-ink-faint transition-colors hover:bg-danger/10 hover:text-danger'
            >
              <LuX className='h-3 w-3' />
            </button>
          </span>
        ))}
        {group.skills.length === 0 ? (
          <span className='text-[12px] text-ink-faint'>No skills in this group yet.</span>
        ) : null}
      </div>

      <div className='relative mt-3'>
        <div className='flex items-center gap-1.5'>
          <input
            aria-label={`Add a skill to ${group.name || 'this group'}`}
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => {
              window.setTimeout(() => setFocused(false), 120);
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ',') {
                event.preventDefault();
                addSkill(draft);
              }
              if (event.key === 'Backspace' && !draft && group.skills.length) {
                save(
                  groups.map((item) =>
                    item.id === group.id
                      ? { ...item, skills: item.skills.slice(0, -1) }
                      : item
                  )
                );
              }
            }}
            placeholder='Type a skill, then press Enter'
            className='h-8 min-w-0 flex-1 rounded-md border border-transparent bg-sunken/70 px-2.5 text-[12.5px] text-ink placeholder:text-ink-faint focus:border-accent/40 focus:bg-surface focus:outline-none'
          />
          <button
            type='button'
            onClick={() => addSkill(draft)}
            disabled={!draft.trim()}
            className='icon-btn h-8 w-8 disabled:opacity-30'
            aria-label='Add skill'
          >
            <LuPlus className='h-3.5 w-3.5' />
          </button>
        </div>

        {focused && suggestions.length ? (
          <div className='absolute inset-x-0 top-9 z-20 flex flex-wrap gap-1 rounded-lg border border-line bg-surface p-2 shadow-lift'>
            {suggestions.map((skill) => (
              <button
                key={skill}
                type='button'
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => addSkill(skill)}
                className='chip hover:border-accent/40 hover:text-accent'
              >
                {skill}
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default function SkillsEditor({ resume }: { resume: ResumeInterface }) {
  const dispatch = useAppDispatch();
  const groups = resume.skillGroups ?? [];

  const save = (next: SkillGroup[]) => {
    dispatch(setSkillGroups({ id: resume.id, groups: next }));
  };

  const {
    dragIndex: groupDrag,
    overIndex: groupOver,
    handleProps: groupHandleProps,
    itemProps: groupItemProps,
  } = useSortableList((from, to) => {
    const next = [...groups];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    save(next);
  });

  return (
    <div className='space-y-4'>
      <p className='text-[13px] leading-[1.6] text-ink-soft'>
        Group skills by what they are for. Drag a chip to reorder it. Six to twelve skills is
        usually enough for one page.
      </p>

      {groups.map((group, index) => (
        <SkillGroupCard
          key={group.id}
          group={group}
          groups={groups}
          save={save}
          groupHandleProps={groupHandleProps(index)}
          groupDragging={groupDrag === index}
          groupOver={groupOver === index && groupDrag !== index}
          groupDropProps={groupItemProps(index)}
        />
      ))}

      {groups.length === 0 ? (
        <div className='rounded-xl border border-dashed border-line-strong bg-surface/60 px-4 py-6 text-center'>
          <p className='text-[13.5px] font-medium text-ink'>No skills yet.</p>
          <p className='mx-auto mt-1 max-w-xs text-[12.5px] leading-[1.5] text-ink-faint'>
            Start with one group. You can add more when the first one is full.
          </p>
        </div>
      ) : null}

      <AddButton
        onClick={() =>
          save([...groups, { id: newId(), name: groups.length ? 'Another group' : 'Skills', skills: [] }])
        }
      >
        Add a skill group
      </AddButton>
    </div>
  );
}
