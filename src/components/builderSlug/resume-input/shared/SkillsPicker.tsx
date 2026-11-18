'use client';
import { SkillGroup } from '@/components/builder/previousResumes/ResumeInterface';
import { ResumeInterface } from '@/components/builder/previousResumes/ResumeInterface';
import { Tooltip } from '@/components/tooltip/ToolTip';
import { COMMON_SKILLS } from '@/lib/resumeDefaults';
import { setSkillGroups } from '@/lib/slices/resumeSlice';
import { useAppDispatch } from '@/lib/store/hooks';
import { useState } from 'react';
import { FaArrowDown, FaArrowUp, FaGripVertical, FaXmark } from 'react-icons/fa6';
import { v4 as uuidv4 } from 'uuid';
import { inputClassName } from '../inputComponents/InputField';
import useDragReorder from './useDragReorder';

const iconClass =
  'text text-lg text-light-text-secondary dark:text-dark-text-secondary cursor-pointer';

export default function SkillsPicker({
  resume,
}: {
  resume: ResumeInterface | undefined;
}) {
  const dispatch = useAppDispatch();
  const groups = resume?.skillGroups ?? [];
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [notice, setNotice] = useState('');

  const save = (next: SkillGroup[]) =>
    dispatch(setSkillGroups({ id: resume?.id ?? '', groups: next }));

  const moveGroup = (from: number, to: number) => {
    if (from === to) return;
    const next = [...groups];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    save(next);
  };

  const { dragIndex, dragHandleProps, dropProps } = useDragReorder(moveGroup);

  const existingSkills = new Set(
    groups.flatMap((group) => group.skills.map((skill) => skill.toLowerCase()))
  );

  const addSkill = (groupId: string, raw: string) => {
    const skill = raw.trim().replace(/,$/, '').trim();
    if (!skill) return;
    if (existingSkills.has(skill.toLowerCase())) {
      setNotice(`"${skill}" is already added`);
      return;
    }
    setNotice('');
    save(
      groups.map((group) =>
        group.id === groupId
          ? { ...group, skills: [...group.skills, skill] }
          : group
      )
    );
    setDrafts((current) => ({ ...current, [groupId]: '' }));
  };

  const handleDraftKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    groupId: string
  ) => {
    const draft = drafts[groupId] ?? '';
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault();
      addSkill(groupId, draft);
    } else if (event.key === 'Backspace' && draft === '' && groups.length > 1) {
      // Keep the last group even if empty, but let Backspace on an empty
      // draft remove an empty group as a convenience.
      const group = groups.find((item) => item.id === groupId);
      if (group && group.skills.length === 0) {
        event.preventDefault();
        save(groups.filter((item) => item.id !== groupId));
      }
    }
  };

  const suggestionsFor = (groupId: string) =>
    COMMON_SKILLS.filter((skill) => {
      const draft = (drafts[groupId] ?? '').toLowerCase();
      return (
        !existingSkills.has(skill.toLowerCase()) &&
        (!draft || skill.toLowerCase().includes(draft))
      );
    }).slice(0, 8);

  return (
    <div className='flex flex-col gap-6'>
      {groups.map((group, index) => (
        <div
          key={group.id}
          {...dropProps(index)}
          className={`flex flex-col gap-3 p-3 rounded-md ring-1 ring-light-ring-secondary dark:ring-dark-ring-secondary ${
            dragIndex === index ? 'opacity-40' : ''
          }`}
        >
          <div className='flex flex-row items-center gap-2'>
            <Tooltip text='Drag to reorder group'>
              <span
                {...dragHandleProps(index)}
                aria-label='Drag to reorder group'
                className={`${iconClass} cursor-grab active:cursor-grabbing`}
              >
                <FaGripVertical />
              </span>
            </Tooltip>
            <input
              aria-label='Skill group name'
              className={`${inputClassName} font-medium`}
              value={group.name}
              placeholder='Group name'
              onChange={(event) =>
                save(
                  groups.map((item) =>
                    item.id === group.id
                      ? { ...item, name: event.target.value }
                      : item
                  )
                )
              }
            />
            {index === 0 ? null : (
              <FaArrowUp
                className={iconClass}
                onClick={() => moveGroup(index, index - 1)}
              />
            )}
            {index === groups.length - 1 ? null : (
              <FaArrowDown
                className={iconClass}
                onClick={() => moveGroup(index, index + 1)}
              />
            )}
            <Tooltip text='Delete group'>
              <button
                type='button'
                aria-label='Delete skill group'
                onClick={() => save(groups.filter((item) => item.id !== group.id))}
                className='text text-lg text-light-text-secondary dark:text-dark-text-secondary hover:text-red-500 dark:hover:text-red-500'
              >
                <FaXmark />
              </button>
            </Tooltip>
          </div>

          <div className='flex flex-row flex-wrap gap-2'>
            {group.skills.length === 0 ? (
              <span className='text text-sm text-light-text-secondary dark:text-dark-text-secondary'>
                No skills in this group yet
              </span>
            ) : null}
            {group.skills.map((skill) => (
              <span
                key={skill}
                className='flex flex-row items-center gap-1 px-2 py-1 rounded-full bg-light-background dark:bg-dark-background ring-1 ring-light-ring-secondary dark:ring-dark-ring-secondary text text-sm text-light-text-primary dark:text-dark-text-primary'
              >
                {skill}
                <button
                  type='button'
                  aria-label={`Remove ${skill}`}
                  onClick={() =>
                    save(
                      groups.map((item) =>
                        item.id === group.id
                          ? {
                              ...item,
                              skills: item.skills.filter((entry) => entry !== skill),
                            }
                          : item
                      )
                    )
                  }
                  className='hover:text-red-500 dark:hover:text-red-500'
                >
                  <FaXmark />
                </button>
              </span>
            ))}
          </div>

          <div className='flex flex-col gap-2'>
            <input
              className={inputClassName}
              value={drafts[group.id] ?? ''}
              placeholder='Type a skill, then press Enter or comma'
              onChange={(event) =>
                setDrafts((current) => ({
                  ...current,
                  [group.id]: event.target.value,
                }))
              }
              onKeyDown={(event) => handleDraftKeyDown(event, group.id)}
            />
            {notice && drafts[group.id] ? (
              <p className='text text-xs text-red-500'>{notice}</p>
            ) : null}
            <div className='flex flex-row flex-wrap gap-1'>
              {suggestionsFor(group.id).map((skill) => (
                <button
                  key={skill}
                  type='button'
                  onClick={() => addSkill(group.id, skill)}
                  className='px-2 py-0.5 rounded-full text text-xs text-light-text-secondary dark:text-dark-text-secondary ring-1 ring-light-ring-secondary dark:ring-dark-ring-secondary hover:text-light-text-primary dark:hover:text-dark-text-primary'
                >
                  + {skill}
                </button>
              ))}
            </div>
          </div>
        </div>
      ))}

      <button
        type='button'
        onClick={() => save([...groups, { id: uuidv4(), name: 'New Group', skills: [] }])}
        className='self-start flex flex-row items-center gap-2 text text-md text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text-primary dark:hover:text-dark-text-primary underline underline-offset-2'
      >
        + Add skill group
      </button>
    </div>
  );
}
