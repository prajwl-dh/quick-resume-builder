export default function Footer() {
  return (
    <footer className='w-full border-t border-light-ring-secondary dark:border-dark-ring-secondary bg-light-foreground/50 dark:bg-dark-foreground/40'>
      <div className='mx-auto flex max-w-shell flex-col gap-3 px-5 py-6 text-[13px] text-light-text-secondary dark:text-dark-text-secondary sm:flex-row sm:items-center sm:justify-between md:px-10'>
        <p>Quick Resume — free and open source. Your documents stay with you.</p>
        <div className='flex items-center gap-6'>
          <a
            className='transition-colors hover:text-accent dark:hover:text-dark-accent'
            href='https://github.com/prajwl-dh/quick-resume-builder'
            target='_blank'
            rel='noreferrer'
          >
            Source
          </a>
          <a
            className='transition-colors hover:text-accent dark:hover:text-dark-accent'
            href='https://prajwalonline.com'
            target='_blank'
            rel='noreferrer'
          >
            prajwl-dh
          </a>
        </div>
      </div>
    </footer>
  );
}
