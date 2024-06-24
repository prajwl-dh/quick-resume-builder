'use client';
import { updateLastAccessed } from '@/lib/slices/resumeSlice';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import SecondaryButton from '../buttons/SecondaryButton';
import DeleteConfirmationPopup from './DeleteConfirmationPopup';
import { DeleteSvg } from './DeleteSvg';
import { ResumeSvg } from './ResumeSvg';

export default function PreviousResumes() {
  const router = useRouter();
  const resumes = useAppSelector((state) => state.resumeReducer.value);
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  return (
    <>
      {resumes.map((resume) => {
        return (
          <div
            key={resume.id}
            className='h-60 md:h-80 w-full md:w-72 p-3 gap-1 flex flex-col justify-between items-center rounded-md ring-1 ring-light-ring-secondary dark:ring-dark-ring-secondary hover:ring-light-ring-primary hover:dark:ring-dark-ring-primary bg-light-foreground dark:bg-dark-foreground hover:shadow-sm group'
          >
            <div className='flex-grow flex justify-center items-center'>
              <ResumeSvg className='text text-5xl md:text-7xl text-light-text-primary dark:text-dark-text-primary group-hover:scale-125 transition duration-300' />
            </div>
            <p className='text text-md font-bold self-start text-light-text-primary dark:text-dark-text-primary'>
              {resume.title}
            </p>
            <p className='text text-sm text-light-text-secondary self-start dark:text-dark-text-secondary'>
              Last Accessed - {resume.last_accessed?.slice(0, 16)}
            </p>
            <div className='mt-2 self-start flex flex-row w-full justify-between items-center'>
              <SecondaryButton
                onClick={() => {
                  dispatch(updateLastAccessed(resume.id));
                  router.push(`/builder/${resume.id}`);
                }}
                className='dark:bg-dark-foreground'
              >
                Edit Resume
              </SecondaryButton>
              <DeleteSvg
                onClick={() => setOpen(true)}
                className='text text-2xl text-light-text-secondary dark:text-dark-text-secondary cursor-pointer hover:text-red-600 dark:hover:text-red-600'
              />
            </div>
            <DeleteConfirmationPopup
              open={open}
              setOpen={setOpen}
              id={resume.id}
            />
          </div>
        );
      })}
    </>
  );
}
