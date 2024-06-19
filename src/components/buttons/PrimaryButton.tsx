import React from 'react';

type PrimaryButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  onClick?: () => void;
};
export default function PrimaryButton({
  children,
  ...props
}: PrimaryButtonProps) {
  return (
    <button
      {...props}
      className='text-light-button-primary-text dark:text-dark-button-primary-text bg-light-button-primary-background dark:bg-dark-button-primary-background hover:bg-light-button-primary-active dark:hover:bg-dark-button-primary-active ring-1 ring-light-button-primary-background dark:ring-dark-button-primary-background hover:ring-light-button-primary-active dark:hover:ring-dark-button-primary-active px-3 py-1.5 rounded-md shadow-sm outline-none transition duration-200 text-md hover:-translate-y-0.5'
    >
      {children}
    </button>
  );
}
