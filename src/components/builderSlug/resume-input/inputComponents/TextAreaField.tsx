// Textarea.tsx
import React from 'react';

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

const TextAreaField: React.FC<TextareaProps> = ({ label, ...props }) => (
  <div className='flex flex-col flex-1 gap-2'>
    <label className='text text-md font-medium text-light-text-primary dark:text-dark-text-primary'>
      {label}
    </label>

    <textarea
      className='p-2 rounded-md ring-1 focus:outline-none bg-light-foreground dark:bg-dark-foreground placeholder:text-light-form-placeholder placeholder:dark:text-dark-form-placeholder text-light-text-primary ring-light-ring-secondary dark:ring-dark-ring-secondary focus:ring-light-ring-primary focus:dark:ring-dark-ring-primary dark:text-dark-text-primary text-md'
      {...props}
    />
  </div>
);

export default TextAreaField;
