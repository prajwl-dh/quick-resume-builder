import { inputClassName } from './InputField';

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

const TextAreaField: React.FC<TextareaProps> = ({ label, ...props }) => (
  <div className='flex min-w-0 flex-1 flex-col gap-1.5'>
    <label className='field-label'>{label}</label>
    <textarea className={inputClassName} {...props} />
  </div>
);

export default TextAreaField;
