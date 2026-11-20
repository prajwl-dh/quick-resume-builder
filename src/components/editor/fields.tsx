'use client';

import { MONTHS, YEARS } from '@/lib/resumeDefaults';
import type { DateRange } from '@/components/builder/previousResumes/ResumeInterface';
import type { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from 'react';
import { useId } from 'react';
import { LuCheck, LuPlus } from 'react-icons/lu';

/* --------------------------------- field -------------------------------- */

export function TextField({
  label,
  hint,
  className = '',
  ...props
}: InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  hint?: string;
  className?: string;
}) {
  const id = useId();
  return (
    <div className={`min-w-0 ${className}`}>
      <label htmlFor={id} className='label'>
        {label}
      </label>
      <input id={id} className='input' {...props} />
      {hint ? <p className='mt-1.5 text-[12px] leading-[1.5] text-ink-faint'>{hint}</p> : null}
    </div>
  );
}

/* -------------------------------- textarea ------------------------------ */

export function TextAreaField({
  label,
  hint,
  counter,
  className = '',
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  hint?: string;
  counter?: boolean;
  className?: string;
}) {
  const id = useId();
  const length = typeof props.value === 'string' ? props.value.length : 0;
  return (
    <div className={`min-w-0 ${className}`}>
      <div className='flex items-end justify-between gap-3'>
        <label htmlFor={id} className='label'>
          {label}
        </label>
        {counter ? (
          <span className='mb-1.5 text-[11px] tabular-nums text-ink-faint'>{length}</span>
        ) : null}
      </div>
      <textarea id={id} className='textarea' {...props} />
      {hint ? <p className='mt-1.5 text-[12px] leading-[1.5] text-ink-faint'>{hint}</p> : null}
    </div>
  );
}

/* -------------------------------- buttons ------------------------------- */

export function AddButton({
  children,
  onClick,
  className = '',
}: {
  children: ReactNode;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type='button'
      onClick={onClick}
      className={`group inline-flex h-10 w-full items-center justify-center gap-2 rounded-[10px] border border-dashed border-line-strong bg-surface/60 px-3 text-[13px] font-medium text-ink-soft transition-colors duration-150 hover:border-accent/50 hover:bg-accent-soft/50 hover:text-accent ${className}`}
    >
      <LuPlus className='h-4 w-4 transition-transform duration-150 group-hover:rotate-90' />
      {children}
    </button>
  );
}

/* ------------------------------- checkbox ------------------------------- */

export function Checkbox({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}) {
  return (
    <label className='inline-flex cursor-pointer select-none items-center gap-2 text-[13px] text-ink-soft'>
      <span className='relative flex h-[18px] w-[18px] items-center justify-center'>
        <input
          type='checkbox'
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
          className='peer h-[18px] w-[18px] cursor-pointer appearance-none rounded-[5px] border border-line-strong bg-surface transition-colors checked:border-accent checked:bg-accent'
        />
        <LuCheck className='pointer-events-none absolute h-3 w-3 scale-75 text-accent-ink opacity-0 transition-all duration-150 peer-checked:scale-100 peer-checked:opacity-100' />
      </span>
      {label}
    </label>
  );
}

/* ------------------------------- date range ----------------------------- */

export function DateRangeField({
  value,
  onChange,
  label = 'Dates',
}: {
  value?: DateRange;
  onChange: (value: DateRange) => void;
  label?: string;
}) {
  const current: DateRange = {
    startMonth: value?.startMonth ?? '',
    startYear: value?.startYear ?? '',
    endMonth: value?.endMonth ?? '',
    endYear: value?.endYear ?? '',
    present: Boolean(value?.present),
  };

  const update = (patch: Partial<DateRange>) => onChange({ ...current, ...patch });

  return (
    <fieldset className='min-w-0'>
      <legend className='label'>{label}</legend>
      <div className='grid gap-2 sm:grid-cols-2'>
        <div className='flex gap-2'>
          <select
            aria-label='Start month'
            className='select min-w-0 flex-1'
            value={current.startMonth}
            onChange={(event) => update({ startMonth: event.target.value })}
          >
            <option value=''>Month</option>
            {MONTHS.map((month) => (
              <option key={month.value} value={month.value}>
                {month.short}
              </option>
            ))}
          </select>
          <select
            aria-label='Start year'
            className='select w-[5.6rem] shrink-0'
            value={current.startYear}
            onChange={(event) => update({ startYear: event.target.value })}
          >
            <option value=''>Year</option>
            {YEARS.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div className='flex gap-2'>
          <select
            aria-label='End month'
            className='select min-w-0 flex-1 disabled:opacity-40'
            value={current.endMonth}
            disabled={current.present}
            onChange={(event) => update({ endMonth: event.target.value })}
          >
            <option value=''>Month</option>
            {MONTHS.map((month) => (
              <option key={month.value} value={month.value}>
                {month.short}
              </option>
            ))}
          </select>
          <select
            aria-label='End year'
            className='select w-[5.6rem] shrink-0 disabled:opacity-40'
            value={current.endYear}
            disabled={current.present}
            onChange={(event) => update({ endYear: event.target.value })}
          >
            <option value=''>Year</option>
            {YEARS.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className='mt-2.5'>
        <Checkbox
          checked={current.present}
          onChange={(present) => update({ present })}
          label='I currently work here'
        />
      </div>
    </fieldset>
  );
}

/* --------------------------------- slider ------------------------------- */

export function Slider({
  label,
  value,
  min,
  max,
  step,
  display,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  onChange: (value: number) => void;
}) {
  return (
    <label className='block'>
      <span className='mb-2 flex items-center justify-between text-[12.5px] font-medium text-ink-soft'>
        {label}
        <span className='tabular-nums text-ink-faint'>{display}</span>
      </span>
      <input
        type='range'
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className='h-1.5 w-full cursor-pointer appearance-none rounded-full bg-line-strong accent-accent'
        style={{ accentColor: 'rgb(var(--c-accent))' }}
      />
    </label>
  );
}

/* ------------------------------- segmented ------------------------------ */

export function Segmented<T extends string>({
  options,
  value,
  onChange,
  label,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
  label: string;
}) {
  return (
    <div className='segmented w-full' role='group' aria-label={label}>
      {options.map((option) => (
        <button
          key={option.value}
          type='button'
          data-active={value === option.value}
          onClick={() => onChange(option.value)}
          className='segmented-item flex-1'
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
