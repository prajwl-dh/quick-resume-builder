'use client';
import PrimaryButton from '@/components/buttons/PrimaryButton';
import Navbar from '@/components/navbar/Navbar';
import { deleteResume } from '@/lib/slices/resumeSlice';
import { useAppDispatch } from '@/lib/store/hooks';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useParams } from 'next/navigation';

export default function Error() {
  const params = useParams();
  const dispatch = useAppDispatch();

  function handleDelete() {
    dispatch(deleteResume(params.slug));
    window.location.replace('/builder');
  }

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
            className='p-2 flex mt-5'
            src={'/serverError.svg'}
            alt='Server Error Placeholder Image'
            height={800}
            width={800}
          />
          <div className='flex flex-col gap-4 justify-center items-center'>
            <p className='text-center !leading-relaxed sm:text-lg md:text-xl text-light-text-secondary dark:text-dark-text-secondary font-bold'>
              Oops! Something went wrong while trying to open your resume.
            </p>
            <p className='text-center !leading-relaxed sm:text-md md:text-lg text-light-text-secondary dark:text-dark-text-secondary'>
              It looks like this resume is corrupted or can&apos;t be loaded
              properly. Please delete it and create a new one to continue
              building without issues.
            </p>
            <PrimaryButton
              className='h-12 min-w-32 bg-red-500 border-none ring-0'
              onClick={() => handleDelete()}
            >
              Delete Resume
            </PrimaryButton>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
