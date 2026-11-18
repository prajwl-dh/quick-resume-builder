import classNames from 'classnames';
import React from 'react';

type PrimaryButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

export default function PrimaryButton({
  children,
  className,
  ...props
}: PrimaryButtonProps) {
  return (
    <button
      {...props}
      className={classNames(
        'inline-flex items-center justify-center gap-2 rounded-lg bg-light-button-primary-background px-4 py-2.5 text-sm font-medium text-light-button-primary-text shadow-sm transition-colors duration-150 hover:bg-light-button-primary-active active:bg-light-button-primary-background disabled:pointer-events-none disabled:opacity-40 dark:bg-dark-button-primary-background dark:text-dark-button-primary-text dark:hover:bg-dark-button-primary-active dark:active:bg-dark-button-primary-background',
        className
      )}
    >
      {children}
    </button>
  );
}
