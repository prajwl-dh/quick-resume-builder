export default function Footer() {
  return (
    <div className='w-full h-[60px] px-3 md:px-14 justify-center items-center flex flex-row bg-light-foreground dark:bg-dark-foreground backdrop-blur-sm bg-opacity-60 border-t-[1px] border-slate-200 dark:border-stone-700'>
      <div className='flex flex-row gap-0.5 justify-center items-center font-mono'>
        <p className='text text-md text-light-text-primary dark:text-dark-text-primary'>
          Made with &#9829; By @
        </p>
        <a
          className='text text-md font-bold underline underline-offset-4 text-light-text-primary dark:text-dark-text-primary'
          href='https://prajwalonline.com'
          target='_blank'
        >
          prajwl-dh
        </a>
      </div>
    </div>
  );
}
