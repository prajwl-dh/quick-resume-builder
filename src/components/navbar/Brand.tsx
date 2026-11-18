type BrandProps = {
  onClick?: () => void;
  compact?: boolean;
};

/** A small document mark paired with an editorial wordmark. */
export function Brand({ onClick, compact = false }: BrandProps) {
  return (
    <div
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                onClick();
              }
            }
          : undefined
      }
      className='flex select-none items-center gap-2.5 outline-none'
    >
      <svg
        width='30'
        height='30'
        viewBox='0 0 32 32'
        fill='none'
        aria-hidden='true'
        className='shrink-0'
      >
        <rect width='32' height='32' rx='8' fill='#1E6B54' />
        <path
          d='M10 9.5h8.6L22 12.9v9.6a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1v-12a1 1 0 0 1 1-1Z'
          stroke='#fff'
          strokeWidth='1.6'
          strokeLinejoin='round'
        />
        <path
          d='M18.6 9.6v3.4H22'
          stroke='#fff'
          strokeWidth='1.6'
          strokeLinejoin='round'
        />
        <path
          d='M12.6 17h6.8M12.6 20h4.6'
          stroke='#fff'
          strokeWidth='1.6'
          strokeLinecap='round'
        />
      </svg>
      {!compact && (
        <span className='flex items-baseline gap-1'>
          <span className='text-[17px] font-semibold tracking-[-0.035em]'>
            Quick
          </span>
          <span className='font-display text-[19px] italic tracking-[-0.01em] text-accent dark:text-dark-accent'>
            Resume
          </span>
        </span>
      )}
    </div>
  );
}
