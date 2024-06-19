import React from 'react';

type SecondaryButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  onClick?: () => void;
};

export default function SecondaryButton({
  children,
  ...props
}: SecondaryButtonProps) {
  return (
    <button
      className='text-light-button-secondary-text dark:text-dark-button-secondary-text bg-light-button-secondary-background dark:bg-dark-button-secondary-background hover:bg-light-button-secondary-active dark:hover:bg-dark-button-secondary-active ring-1 ring-light-ring-secondary dark:ring-dark-ring-secondary dark:hover:ring-dark-ring-primary px-3 py-1.5 rounded-md outline-none transition duration-200 text-md shadow-sm hover:-translate-y-0.5'
      {...props}
    >
      {children}
    </button>
  );
}
