import { inputClassName } from '../inputComponents/InputField';

interface SelectFieldProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export default function SelectField({
  label,
  value,
  onChange,
  options,
  placeholder,
}: SelectFieldProps) {
  return (
    <div className='flex flex-col flex-1 gap-2 min-w-0'>
      {label ? (
        <label className='text text-md font-medium text-light-text-primary dark:text-dark-text-primary'>
          {label}
        </label>
      ) : null}
      <select
        className={inputClassName}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {placeholder ? <option value=''>{placeholder}</option> : null}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
