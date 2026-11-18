'use client';
import { inputClassName } from '@/components/builderSlug/resume-input/inputComponents/InputField';
import { splitBullets } from '@/lib/resumeDefaults';
import { useEffect, useRef, useState } from 'react';
import { FaXmark } from 'react-icons/fa6';

interface BulletEditorProps {
  label?: string;
  value?: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

export default function BulletEditor({
  label,
  value = '',
  placeholder = 'Add an achievement',
  onChange,
}: BulletEditorProps) {
  const [items, setItems] = useState<string[]>(() => splitBullets(value));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const pendingFocus = useRef<number | null>(null);
  const lastEmitted = useRef(value);

  useEffect(() => {
    if (value !== lastEmitted.current) {
      lastEmitted.current = value;
      setItems(splitBullets(value));
    }
  }, [value]);

  useEffect(() => {
    if (pendingFocus.current !== null) {
      inputRefs.current[pendingFocus.current]?.focus();
      pendingFocus.current = null;
    }
  }, [items]);

  const update = (next: string[]) => {
    const joined = next.join('\n');
    lastEmitted.current = joined;
    setItems(next);
    onChange(joined);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const next = [...items];
      next.splice(index + 1, 0, '');
      pendingFocus.current = index + 1;
      update(next);
    } else if (event.key === 'Backspace' && items[index] === '' && items.length > 1) {
      event.preventDefault();
      const next = items.filter((_, i) => i !== index);
      pendingFocus.current = Math.max(0, index - 1);
      update(next);
    }
  };

  const remove = (index: number) => {
    const next = items.length === 1 ? [''] : items.filter((_, i) => i !== index);
    pendingFocus.current = Math.max(0, index - 1);
    update(next);
  };

  return (
    <div className='flex flex-col flex-1 gap-2'>
      {label ? (
        <label className='text text-md font-medium text-light-text-primary dark:text-dark-text-primary'>
          {label}
        </label>
      ) : null}

      <div className='flex flex-col gap-2'>
        {items.map((item, index) => (
          <div key={index} className='flex flex-row items-center gap-2'>
            <span className='w-5 shrink-0 text-right text text-sm text-light-text-secondary dark:text-dark-text-secondary'>
              {index + 1}.
            </span>
            <input
              ref={(element) => {
                inputRefs.current[index] = element;
              }}
              className={inputClassName}
              value={item}
              placeholder={index === 0 ? placeholder : 'Next achievement'}
              onChange={(event) => {
                const next = [...items];
                next[index] = event.target.value;
                update(next);
              }}
              onKeyDown={(event) => handleKeyDown(event, index)}
            />
            <button
              type='button'
              aria-label={`Remove bullet ${index + 1}`}
              onClick={() => remove(index)}
              className='p-1 text-light-text-secondary dark:text-dark-text-secondary hover:text-red-500 dark:hover:text-red-500'
            >
              <FaXmark />
            </button>
          </div>
        ))}
      </div>

      <button
        type='button'
        onClick={() => {
          pendingFocus.current = items.length;
          update([...items, '']);
        }}
        className='self-start text text-sm text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text-primary dark:hover:text-dark-text-primary underline underline-offset-2'
      >
        + Add bullet
      </button>
    </div>
  );
}
