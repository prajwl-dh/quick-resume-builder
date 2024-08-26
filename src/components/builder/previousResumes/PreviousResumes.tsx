'use client';
import { duplicateResume, updateLastAccessed } from '@/lib/slices/resumeSlice';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import SecondaryButton from '../../buttons/SecondaryButton';
import DeleteConfirmationPopup from './DeleteConfirmationPopup';
import { DeleteSvg } from './DeleteSvg';
import { DuplicateSvg } from './DuplicateSvg';
import { OptionsSvg } from './OptionsSvg';
import RenameConfirmationPopup from './RenameConfirmationPopup';
import { RenameSvg } from './RenameSvg';
import { ResumeInterface } from './ResumeInterface';
import { ResumeSvg } from './ResumeSvg';

export default function PreviousResumes() {
  const router = useRouter();
  const resumes = useAppSelector((state) => state.resumeReducer.value);
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [openRenamePopup, setOpenRenamePopup] = useState(false);

  const sortedResumes = [...resumes].sort(
    (a: ResumeInterface, b: ResumeInterface) =>
      new Date(b.last_accessed).getTime() - new Date(a.last_accessed).getTime()
  );

  return (
    <>
      {sortedResumes?.map((resume: ResumeInterface, index: number) => {
        return (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 100 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', delay: index - index / 1.2 }}
            key={resume.id}
            className='min-h-60 md:min-h-80 w-full md:w-72 p-3 gap-1 flex flex-col justify-between items-center rounded-md ring-1 ring-light-ring-secondary dark:ring-dark-ring-secondary hover:ring-light-ring-primary hover:dark:ring-dark-ring-primary bg-light-foreground dark:bg-dark-foreground hover:shadow-sm group'
          >
            <div
              onClick={() => {
                dispatch(updateLastAccessed(resume.id));
                router.push(`/builder/${resume.id}`);
              }}
              className='min-h-40 md:min-h-60 w-full md:w-72 p-3 gap-1 flex flex-col justify-between items-center cursor-pointer'
            >
              <div className='flex-grow flex justify-center items-center'>
                <ResumeSvg className='text text-5xl md:text-7xl text-light-text-primary dark:text-dark-text-primary group-hover:scale-125 transition duration-300' />
              </div>
              <p className='text text-md line-clamp-2 font-bold self-start text-light-text-primary dark:text-dark-text-primary'>
                {resume.fileName}
              </p>
              <p className='text text-sm text-light-text-secondary self-start dark:text-dark-text-secondary'>
                Last Accessed -{' '}
                {format(resume.last_accessed, 'HH:mm a eee, MM/dd/yyyy')}
              </p>
            </div>
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
              <Menu>
                <MenuButton>
                  <OptionsSvg className='text text-2xl text-light-text-secondary dark:text-dark-text-secondary cursor-pointer' />
                </MenuButton>
                <MenuItems
                  anchor='bottom start'
                  className='[--anchor-gap:8px] [--anchor-padding:8px] flex flex-col gap-1 justify-between items-start rounded-md ring-1 ring-light-ring-secondary dark:ring-dark-ring-secondary hover:ring-light-ring-primary hover:dark:ring-dark-ring-primary bg-light-background dark:bg-dark-background p-3 w-40'
                >
                  <MenuItem>
                    <div
                      onClick={() => setOpenRenamePopup(true)}
                      className='flex flex-row gap-1 cursor-pointer w-full text-light-text-secondary dark:text-dark-text-secondary py-2 rounded-md hover:bg-[#e5e7eb] dark:hover:bg-dark-foreground'
                    >
                      <RenameSvg className='text text-2xl text-light-text-secondary dark:text-dark-text-secondary' />
                      <button className='text text-md text-light-text-secondary self-start dark:text-dark-text-secondary'>
                        Rename
                      </button>
                    </div>
                  </MenuItem>
                  <MenuItem>
                    <div
                      onClick={() => dispatch(duplicateResume(resume.id))}
                      className='flex flex-row gap-1 cursor-pointer w-full text-light-text-secondary dark:text-dark-text-secondary py-2 rounded-md hover:bg-[#e5e7eb] dark:hover:bg-dark-foreground'
                    >
                      <DuplicateSvg className='text text-2xl text-light-text-secondary dark:text-dark-text-secondary' />
                      <button className='text text-md text-light-text-secondary self-start dark:text-dark-text-secondary'>
                        Duplicate
                      </button>
                    </div>
                  </MenuItem>
                  <MenuItem>
                    <div
                      onClick={() => setOpen(true)}
                      className='flex flex-row gap-1 cursor-pointer w-full text-light-text-secondary dark:text-dark-text-secondary py-2 rounded-md hover:bg-[#e5e7eb] dark:hover:bg-dark-foreground'
                    >
                      <DeleteSvg className='text text-2xl text-light-text-secondary dark:text-dark-text-secondary' />
                      <button className='text text-md text-light-text-secondary self-start dark:text-dark-text-secondary'>
                        Delete
                      </button>
                    </div>
                  </MenuItem>
                </MenuItems>
              </Menu>
            </div>
            <DeleteConfirmationPopup
              open={open}
              setOpen={setOpen}
              id={resume.id}
            />
            <RenameConfirmationPopup
              openRenamePopup={openRenamePopup}
              setOpenRenamePopup={setOpenRenamePopup}
              id={resume.id}
              fileName={resume.fileName}
            />
          </motion.div>
        );
      })}
    </>
  );
}
