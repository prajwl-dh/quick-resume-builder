'use client';
import Navbar from '@/components/navbar/Navbar';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();
  return (
    <div className='flex flex-col justify-between mt-[70px]'>
      <Navbar
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, type: 'spring' }}
      />
      <div className='w-screen px-1 md:px-14 flex flex-col items-center'>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, type: 'spring' }}
          className='w-full 2xl:w-10/12 px-1 xl:px-40 flex flex-col justify-center items-center gap-10 min-h-[70vh]'
        >
          <Image
            className='p-2 flex'
            src={'/notFound.svg'}
            alt='Not Found Image'
            height={800}
            width={800}
          />
          <div className='flex flex-col gap-2 justify-center items-center'>
            <p className='text-start md:text-center !leading-relaxed sm:text-lg md:text-xl text-light-text-secondary dark:text-dark-text-secondary font-bold'>
              404 - Sorry, Page Not Found
            </p>
            <p
              onClick={() => router.push('/')}
              className='cursor-pointer underline underline-offset-4 text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text-primary hover:dark:text-dark-text-primary'
            >
              &lt;-- Back To Home
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
