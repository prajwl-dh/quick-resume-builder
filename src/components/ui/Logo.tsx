import Link from 'next/link';

export function BrandMark({ className = '' }: { className?: string }) {
  return (
    <span
      className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-accent text-accent-ink shadow-[0_1px_2px_rgba(20,18,14,0.18)] ${className}`}
      aria-hidden='true'
    >
      <svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
        <path
          d='M3.5 2.2h6.2l2.8 2.9v8.7H3.5V2.2Z'
          stroke='currentColor'
          strokeWidth='1.35'
          strokeLinejoin='round'
        />
        <path
          d='M9.5 2.4v3h3M5.8 8h4.4M5.8 10.6h3.2'
          stroke='currentColor'
          strokeWidth='1.35'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    </span>
  );
}

export default function Logo({
  href = '/',
  compact = false,
  className = '',
}: {
  href?: string;
  compact?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2.5 whitespace-nowrap rounded-lg ${className}`}
      aria-label='Quick Resume home'
    >
      <BrandMark className='transition-transform duration-200 ease-out group-hover:-rotate-2' />
      {compact ? null : (
        <span className='whitespace-nowrap text-[15px] font-semibold tracking-[-0.015em] text-ink'>
          Quick Resume
        </span>
      )}
    </Link>
  );
}
