'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import PrimaryButton from '../buttons/PrimaryButton';
import SecondaryButton from '../buttons/SecondaryButton';
import { GitHubIcon } from './GitHubIcon';

export default function Home() {
  const router = useRouter();
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, type: 'spring' }}
      className='w-full 2xl:w-10/12 px-1 xl:px-40 flex flex-col justify-center items-start md:items-center gap-10 min-h-[75vh]'
    >
      <p className='text-3xl text-start md:text-center font-bold leading-tight text-light-text-primary dark:text-dark-text-primary sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight mt-5 lg:mt-10'>
        Build Your Professional Resume in Minutes with Quick Resume - Fast,
        Easy, Free, and Open Source
      </p>
      <p className='text-start md:text-center !leading-relaxed sm:text-lg md:text-xl text-light-text-secondary dark:text-dark-text-secondary'>
        Quick Resume is the free and open-source app for building professional,
        eye-catching resumes effortlessly. No login or signup required. Use
        easy-to-use tools and customizable templates to create a standout resume
        tailored to your career goals.
      </p>
      <div className='flex gap-2'>
        <PrimaryButton
          className='h-12 min-w-32'
          onClick={() => router.push('/builder')}
        >
          Get Started 🔥
        </PrimaryButton>
        <SecondaryButton
          onClick={() =>
            router.push('https://github.com/prajwl-dh/quick-resume-builder')
          }
          className='h-12 min-w-32 flex flex-row gap-1 items-center'
        >
          <p>Contribute</p>
          <GitHubIcon />
        </SecondaryButton>
      </div>
    </motion.div>
  );
}
