/** One field style, used by inputs, selects, textareas and pickers. */
export const inputClassName =
  'w-full rounded-lg border border-light-ring-secondary bg-light-foreground px-3 py-2.5 text-sm text-light-text-primary placeholder:text-light-form-placeholder transition-colors duration-150 hover:border-light-ring-primary focus:border-accent focus:outline-none disabled:opacity-50 dark:border-dark-ring-secondary dark:bg-dark-background dark:text-dark-text-primary dark:placeholder:text-dark-form-placeholder dark:hover:border-dark-ring-primary dark:focus:border-dark-accent';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const InputField: React.FC<InputProps> = ({ label, ...props }) => (
  <div className='flex min-w-0 flex-1 flex-col gap-1.5'>
    {label ? <label className='field-label'>{label}</label> : null}
    <input className={inputClassName} {...props} />
  </div>
);

export default InputField;
