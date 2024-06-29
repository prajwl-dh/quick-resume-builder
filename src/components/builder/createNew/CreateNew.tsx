'use client';
import SecondaryButton from '@/components/buttons/SecondaryButton';
import { motion } from 'framer-motion';
import { useState } from 'react';
import CreateConfirmationPopup from './CreateConfirmationPopup';
import { CreateSvg } from './CreateSvg';

export default function CreateNew() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 100 }}
      viewport={{ once: true }}
      transition={{ type: 'spring' }}
      onClick={() => setOpen(true)}
      className='h-60 md:h-80 w-full md:w-72 p-3 gap-1 flex flex-col justify-between items-center rounded-md ring-1 ring-light-ring-secondary dark:ring-dark-ring-secondary hover:ring-light-ring-primary hover:dark:ring-dark-ring-primary bg-light-foreground dark:bg-dark-foreground cursor-pointer hover:shadow-sm group'
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
      <CreateConfirmationPopup open={open} setOpen={setOpen} />
    </motion.div>
  );
}
