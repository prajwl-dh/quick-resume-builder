'use client';
import {
  ResumeInterface,
  ResumeLanguage,
} from '@/components/builder/previousResumes/ResumeInterface';
import { Tooltip } from '@/components/tooltip/ToolTip';
import { PROFICIENCY_LEVELS } from '@/lib/resumeDefaults';
import { setLanguageItems } from '@/lib/slices/resumeSlice';
import { useAppDispatch } from '@/lib/store/hooks';
import { useState } from 'react';
import { FaArrowDown, FaArrowUp, FaGripVertical, FaXmark } from 'react-icons/fa6';
import { v4 as uuidv4 } from 'uuid';
import InputField from '../inputComponents/InputField';
import SelectField from './SelectField';
import useDragReorder from './useDragReorder';

const iconClass =
  'text text-lg text-light-text-secondary dark:text-dark-text-secondary cursor-pointer';

const proficiencyOptions = PROFICIENCY_LEVELS.map((level) => ({
  value: level,
  label: level,
}));

export default function LanguagePicker({
  resume,
}: {
  resume: ResumeInterface | undefined;
}) {
  const dispatch = useAppDispatch();
  const items = resume?.languageItems ?? [];
  const [newName, setNewName] = useState('');

  const save = (next: ResumeLanguage[]) =>
    dispatch(setLanguageItems({ id: resume?.id ?? '', items: next }));

  const move = (from: number, to: number) => {
    if (from === to) return;
    const next = [...items];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    save(next);
  };

  const { dragIndex, dragHandleProps, dropProps } = useDragReorder(move);

  const add = () => {
    const name = newName.trim();
    if (!name) return;
    if (items.some((item) => item.name.toLowerCase() === name.toLowerCase())) {
      return;
    }
    save([...items, { id: uuidv4(), name, proficiency: 'Intermediate' }]);
    setNewName('');
  };

  return (
    <div className='flex flex-col gap-4'>
      {items.map((item, index) => (
        <div
          key={item.id}
          {...dropProps(index)}
          className={`flex flex-row items-end gap-2 p-2 rounded-md ring-1 ring-light-ring-secondary dark:ring-dark-ring-secondary ${
            dragIndex === index ? 'opacity-40' : ''
          }`}
        >
          <Tooltip text='Drag to reorder language'>
            <span
              {...dragHandleProps(index)}
              aria-label='Drag to reorder language'
              className={`${iconClass} cursor-grab active:cursor-grabbing mb-2`}
            >
              <FaGripVertical />
            </span>
          </Tooltip>
          <InputField
            label='Language'
            value={item.name}
            placeholder='English'
            onChange={(event) =>
              save(
                items.map((entry) =>
                  entry.id === item.id
                    ? { ...entry, name: event.target.value }
                    : entry
                )
              )
            }
          />
          <SelectField
            label='Proficiency'
            value={item.proficiency}
            options={proficiencyOptions}
            onChange={(proficiency) =>
              save(
                items.map((entry) =>
                  entry.id === item.id ? { ...entry, proficiency } : entry
                )
              )
            }
          />
          {index === 0 ? null : (
            <FaArrowUp className={`${iconClass} mb-2`} onClick={() => move(index, index - 1)} />
          )}
          {index === items.length - 1 ? null : (
            <FaArrowDown className={`${iconClass} mb-2`} onClick={() => move(index, index + 1)} />
          )}
          <button
            type='button'
            aria-label={`Remove ${item.name}`}
            onClick={() => save(items.filter((entry) => entry.id !== item.id))}
            className='mb-2 p-1 text-light-text-secondary dark:text-dark-text-secondary hover:text-red-500 dark:hover:text-red-500'
          >
            <FaXmark />
          </button>
        </div>
      ))}

      <div className='flex flex-row items-end gap-2'>
        <InputField
          label='Add a language'
          value={newName}
          placeholder='e.g. Spanish'
          onChange={(event) => setNewName(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault();
              add();
            }
          }}
        />
        <button
          type='button'
          onClick={add}
          className='mb-0 px-3 py-2 rounded-md ring-1 ring-light-ring-secondary dark:ring-dark-ring-secondary text text-md text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text-primary dark:hover:text-dark-text-primary'
        >
          + Add
        </button>
      </div>
    </div>
  );
}
