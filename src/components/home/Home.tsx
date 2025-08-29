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
      className='w-full 2xl:w-10/12 px-4 xl:px-40 flex flex-col justify-center items-center gap-10 min-h-[75vh]'
    >
      <p className='text-3xl text-start md:text-center font-bold leading-tight text-light-text-primary dark:text-dark-text-primary sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight mt-5 lg:mt-10'>
        Create Your Professional ATS Friendly Resume in Minutes. Fast, Easy,
        Free and Open Source
      </p>
      <p className='text-start md:text-center !leading-relaxed sm:text-lg md:text-xl text-light-text-secondary dark:text-dark-text-secondary'>
        Quick Resume is a free and open-source app that helps you build
        professional, eye-catching resumes with ease. No login or sign-up
        required. It runs entirely in your browser, and all data stays on your
        device. Your privacy is fully respected — nothing is ever uploaded to a
        server. Start now and create a resume tailored to your career goals.
      </p>
      <div className='flex flex-col md:flex-row gap-4 w-full md:w-auto'>
        <PrimaryButton
          className='h-12 w-full min-w-36 flex flex-row gap-1 items-center self-center justify-center'
          onClick={() => router.push('/builder')}
        >
          Get Started
          <span>🔥</span>
        </PrimaryButton>
        <SecondaryButton
          onClick={() =>
            router.push('https://github.com/prajwl-dh/quick-resume-builder')
          }
          className='h-12 w-full min-w-36 flex flex-row gap-1 items-center self-center justify-center'
        >
          <p>Contribute</p>
          <GitHubIcon />
        </SecondaryButton>
      </div>
    </motion.div>
  );
}
