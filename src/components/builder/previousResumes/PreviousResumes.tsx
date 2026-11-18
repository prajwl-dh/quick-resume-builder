'use client';
import { duplicateResume, updateLastAccessed } from '@/lib/slices/resumeSlice';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { format } from 'date-fns';
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

  const sortedResumes = resumes
    .filter((resume: ResumeInterface) => !resume.isExample)
    .sort(
      (a: ResumeInterface, b: ResumeInterface) =>
        new Date(b.last_accessed).getTime() - new Date(a.last_accessed).getTime()
    );

  const openResume = (id: string) => {
    dispatch(updateLastAccessed(id));
    router.push(`/builder/${id}`);
  };

  return (
    <>
      {sortedResumes.map((resume: ResumeInterface) => (
        <article
          key={resume.id}
          className='flex min-h-[210px] flex-col justify-between rounded-xl border border-light-ring-secondary bg-light-foreground p-5 shadow-paper transition-colors duration-150 hover:border-light-ring-primary dark:border-dark-ring-secondary dark:bg-dark-foreground dark:hover:border-dark-ring-primary'
        >
          <div>
            <div className='flex items-start justify-between gap-3'>
              <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-accent-soft text-accent dark:bg-dark-accent-soft dark:text-dark-accent'>
                <ResumeSvg className='h-5 w-5' />
              </div>
              <Menu as='div' className='relative'>
                <MenuButton
                  aria-label={`Options for ${resume.fileName}`}
                  className='inline-flex h-8 w-8 items-center justify-center rounded-lg text-light-text-secondary transition-colors hover:bg-light-background hover:text-light-text-primary dark:text-dark-text-secondary dark:hover:bg-dark-background dark:hover:text-dark-text-primary'
                >
                  <OptionsSvg className='h-5 w-5' />
                </MenuButton>
                <MenuItems
                  anchor='bottom end'
                  className='z-50 w-44 rounded-lg border border-light-ring-secondary bg-light-foreground p-1.5 shadow-paper-lg [--anchor-gap:6px] dark:border-dark-ring-secondary dark:bg-dark-foreground'
                >
                  <MenuItem>
                    <button
                      type='button'
                      onClick={() => setOpenRenamePopup(true)}
                      className='flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-left text-[13px] text-light-text-secondary transition-colors hover:bg-light-background hover:text-light-text-primary dark:text-dark-text-secondary dark:hover:bg-dark-background dark:hover:text-dark-text-primary'
                    >
                      <RenameSvg className='h-4 w-4' />
                      Rename
                    </button>
                  </MenuItem>
                  <MenuItem>
                    <button
                      type='button'
                      onClick={() => dispatch(duplicateResume(resume.id))}
                      className='flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-left text-[13px] text-light-text-secondary transition-colors hover:bg-light-background hover:text-light-text-primary dark:text-dark-text-secondary dark:hover:bg-dark-background dark:hover:text-dark-text-primary'
                    >
                      <DuplicateSvg className='h-4 w-4' />
                      Duplicate
                    </button>
                  </MenuItem>
                  <div className='my-1 h-px bg-light-ring-secondary dark:bg-dark-ring-secondary' />
                  <MenuItem>
                    <button
                      type='button'
                      onClick={() => setOpen(true)}
                      className='flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-left text-[13px] text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40'
                    >
                      <DeleteSvg className='h-4 w-4' />
                      Delete
                    </button>
                  </MenuItem>
                </MenuItems>
              </Menu>
            </div>

            <button
              type='button'
              onClick={() => openResume(resume.id)}
              className='mt-8 block w-full text-left'
            >
              <h3 className='line-clamp-2 text-[16px] font-semibold leading-snug tracking-[-0.01em]'>
                {resume.fileName}
              </h3>
              <p className='mt-1.5 text-[13px] text-light-text-secondary dark:text-dark-text-secondary'>
                Edited {format(resume.last_accessed, 'PP')}
              </p>
            </button>
          </div>

          <SecondaryButton
            onClick={() => openResume(resume.id)}
            className='mt-6 self-start'
          >
            Open editor
            <span aria-hidden='true'>→</span>
          </SecondaryButton>

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
        </article>
      ))}
    </>
  );
}
