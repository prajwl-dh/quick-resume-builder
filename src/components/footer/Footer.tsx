import Logo from '@/components/ui/Logo';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className='border-t border-line bg-surface/50'>
      <div className='shell grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]'>
        <div className='max-w-xs'>
          <Logo href='/' />
          <p className='mt-3 text-[12.5px] leading-[1.65] text-ink-soft'>
            A resume builder that runs in your browser. Free, open source and quiet about
            it.
          </p>
        </div>

        <nav aria-label='Product' className='text-[12.5px]'>
          <p className='text-[10.5px] font-semibold uppercase tracking-[0.14em] text-ink-faint'>
            Product
          </p>
          <ul className='mt-3 space-y-2'>
            <li>
              <Link href='/builder' className='text-ink-soft transition-colors hover:text-ink'>
                Your resumes
              </Link>
            </li>
            <li>
              <a href='/#templates' className='text-ink-soft transition-colors hover:text-ink'>
                Templates
              </a>
            </li>
            <li>
              <a href='/#editor' className='text-ink-soft transition-colors hover:text-ink'>
                The editor
              </a>
            </li>
            <li>
              <Link
                href='/builder/example-resume'
                className='text-ink-soft transition-colors hover:text-ink'
              >
                Example resume
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label='Elsewhere' className='text-[12.5px]'>
          <p className='text-[10.5px] font-semibold uppercase tracking-[0.14em] text-ink-faint'>
            Elsewhere
          </p>
          <ul className='mt-3 space-y-2'>
            <li>
              <a href='/#privacy' className='text-ink-soft transition-colors hover:text-ink'>
                How saving works
              </a>
            </li>
            <li>
              <a href='/#questions' className='text-ink-soft transition-colors hover:text-ink'>
                Questions
              </a>
            </li>
            <li>
              <a
                href='https://github.com/prajwl-dh/quick-resume-builder'
                target='_blank'
                rel='noreferrer'
                className='text-ink-soft transition-colors hover:text-ink'
              >
                Source code
              </a>
            </li>
            <li>
              <a
                href='https://prajwalonline.com'
                target='_blank'
                rel='noreferrer'
                className='text-ink-soft transition-colors hover:text-ink'
              >
                Made by prajwl-dh
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <div className='border-t border-line'>
        <div className='shell flex flex-col gap-2 py-5 text-[11px] text-ink-faint sm:flex-row sm:items-center sm:justify-between'>
          <p>Quick Resume. Your documents stay with you.</p>
          <p>Typefaces from Google Fonts. No tracking scripts.</p>
        </div>
      </div>
    </footer>
  );
}
