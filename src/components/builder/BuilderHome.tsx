'use client';
import { useAppSelector } from '@/lib/store/hooks';
import { motion } from 'framer-motion';
import { useState } from 'react';
import SecondaryButton from '../buttons/SecondaryButton';
import CreateConfirmationPopup from './createNew/CreateConfirmationPopup';
import CreateNew from './createNew/CreateNew';
import { CreateSvg } from './createNew/CreateSvg';
import ImportResumeJSON from './importResumeJSON/ImportResumeJSON';
import PreviousResumes from './previousResumes/PreviousResumes';

export default function BuilderHome() {
  const resume = useAppSelector((state) => state.resumeReducer.value);
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className='w-full 2xl:w-11/12 px-5 md:px-1 py-5 md:py-10 flex flex-col justify-center items-center mb-10'>
      <div className='flex flex-row justify-end items-center gap-4 w-full mb-6'>
        <ImportResumeJSON />
        <CreateNew />
      </div>

      {resume.length === 0 ? (
        <>
          <div className='w-full flex justify-start'>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 100 }}
              viewport={{ once: true }}
              transition={{ type: 'spring' }}
              onClick={() => setOpen(true)}
              className='h-60 md:h-80 w-full md:w-72 p-3 gap-1 flex flex-col justify-start items-center rounded-md ring-1 ring-light-ring-secondary dark:ring-dark-ring-secondary hover:ring-light-ring-primary hover:dark:ring-dark-ring-primary bg-light-foreground dark:bg-dark-foreground cursor-pointer hover:shadow-sm group'
            >
              <div className='flex-grow flex justify-center items-center'>
                <CreateSvg className='text text-5xl md:text-7xl text-light-text-primary dark:text-dark-text-primary group-hover:scale-125 transition duration-300' />
              </div>
              <p className='text text-md font-bold self-start text-light-text-primary dark:text-dark-text-primary'>
                Create New Resume
              </p>
              <p className='text text-sm text-light-text-secondary self-start dark:text-dark-text-secondary'>
                Create a brand new resume from scratch
              </p>
              <SecondaryButton className='dark:bg-dark-foreground self-start mt-2'>
                Create Resume
              </SecondaryButton>
            </motion.div>
          </div>
          <CreateConfirmationPopup open={open} setOpen={setOpen} />
        </>
      ) : (
        <div className='w-full grid grid-cols-1 md:grid-cols-[repeat(auto-fill,minmax(270px,1fr))] gap-10'>
          <PreviousResumes />
        </div>
      )}
    </div>
  );
}
