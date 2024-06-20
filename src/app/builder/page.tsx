import Link from 'next/link';

export default function Builder() {
  return (
    <div className='w-full 2xl:w-10/12 px-1 xl:px-40 flex flex-col justify-center items-center text-center min-h-[80vh] mt-[70px]'>
      <h1 className='text-5xl font-bold mb-8 animate-pulse text-light-text-primary dark:text-dark-text-primary'>
        Coming Soon
      </h1>
      <p className='text-lg mb-8 px-5 text-light-text-secondary dark:text-dark-text-secondary'>
        We&apos;re working hard to bring you something amazing. Stay tuned!
      </p>
      <Link
        className='text underline-offset-4 text-light-text-primary dark:text-dark-text-primary hover:underline'
        href={'/'}
      >
        {' '}
        &lt;-- Go Back
      </Link>
    </div>
  );
}
