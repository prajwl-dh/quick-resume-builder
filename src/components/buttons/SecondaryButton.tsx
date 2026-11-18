import classNames from 'classnames';
import React from 'react';

type SecondaryButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

export default function SecondaryButton({
  children,
  className,
  ...props
}: SecondaryButtonProps) {
  return (
    <button
      {...props}
      className={classNames(
        'inline-flex items-center justify-center gap-2 rounded-lg border border-light-ring-secondary bg-light-button-secondary-background px-4 py-2.5 text-sm font-medium text-light-button-secondary-text transition-colors duration-150 hover:border-light-ring-primary hover:bg-light-button-secondary-active disabled:pointer-events-none disabled:opacity-40 dark:border-dark-ring-secondary dark:bg-dark-button-secondary-background dark:text-dark-button-secondary-text dark:hover:border-dark-ring-primary dark:hover:bg-dark-button-secondary-active',
        className
      )}
    >
      {children}
    </button>
  );
}
