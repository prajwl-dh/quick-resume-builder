'use client';
import {
  DateRange,
  DEFAULT_EMPTY_RANGE,
} from '@/components/builder/previousResumes/ResumeInterface';
import { MONTHS, YEARS } from '@/lib/resumeDefaults';
import SelectField from './SelectField';

const monthOptions = MONTHS.map((month) => ({
  value: month.value,
  label: month.short,
}));

export default function DateRangePicker({
  value,
  onChange,
}: {
  value?: DateRange;
  onChange: (value: DateRange) => void;
}) {
  const range = value ?? DEFAULT_EMPTY_RANGE;
  const years = YEARS.includes(range.startYear)
    ? YEARS
    : [...YEARS, range.startYear].filter(Boolean).sort().reverse();
  const endYears = YEARS.includes(range.endYear)
    ? YEARS
    : [...YEARS, range.endYear].filter(Boolean).sort().reverse();

  const update = (partial: Partial<DateRange>) =>
    onChange({ ...range, ...partial });

  return (
    <div className='flex flex-col gap-2 w-full'>
      <div className='flex flex-row gap-2'>
        <SelectField
          label='From'
          value={range.startMonth}
          placeholder='Month'
          options={monthOptions}
          onChange={(startMonth) => update({ startMonth })}
        />
        <SelectField
          label='Year'
          value={range.startYear}
          placeholder='Year'
          options={years.map((year) => ({ value: year, label: year }))}
          onChange={(startYear) => update({ startYear })}
        />
      </div>

      <label className='flex flex-row items-center gap-2 text text-md text-light-text-primary dark:text-dark-text-primary cursor-pointer'>
        <input
          type='checkbox'
          checked={range.present}
          onChange={(event) =>
            update({
              present: event.target.checked,
              endMonth: event.target.checked ? '' : range.endMonth,
              endYear: event.target.checked ? '' : range.endYear,
            })
          }
          className='h-4 w-4 accent-current ring-1 ring-light-ring-secondary dark:ring-dark-ring-secondary rounded'
        />
        Present
      </label>

      {!range.present ? (
        <div className='flex flex-row gap-2'>
          <SelectField
            label='To'
            value={range.endMonth}
            placeholder='Month'
            options={monthOptions}
            onChange={(endMonth) => update({ endMonth })}
          />
          <SelectField
            label='Year'
            value={range.endYear}
            placeholder='Year'
            options={endYears.map((year) => ({ value: year, label: year }))}
            onChange={(endYear) => update({ endYear })}
          />
        </div>
      ) : null}
    </div>
  );
}
