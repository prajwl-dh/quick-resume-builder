'use client';
import { renameResume } from '@/lib/slices/resumeSlice';
import { useAppDispatch } from '@/lib/store/hooks';
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import { useState } from 'react';
import PrimaryButton from '../../buttons/PrimaryButton';
import SecondaryButton from '../../buttons/SecondaryButton';
import { RenameSvg } from './RenameSvg';

export default function RenameConfirmationPopup({ ...props }) {
  const { openRenamePopup, setOpenRenamePopup, id, fileName } = props;
  const [formData, setFormData] = useState<{
    fileName: string;
  }>({ fileName: fileName || '' });
  const dispatch = useAppDispatch();

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.fileName?.length > 0) {
      dispatch(renameResume({ id: id, fileName: formData.fileName }));
      setOpenRenamePopup(false);
    }
  };

  return (
    <Dialog
      className='relative z-50'
      open={openRenamePopup}
      onClose={setOpenRenamePopup}
    >
      <DialogBackdrop
        transition
        className='fixed inset-0 bg-light-background dark:bg-dark-background bg-opacity-60 backdrop-blur-md transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in'
      />

      <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
        <form
          onSubmit={(e) => handleFormSubmit(e)}
          className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'
        >
          <DialogPanel
            transition
            className='relative transform overflow-hidden text-left transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg da</div>ta-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95 rounded-md ring-1 ring-light-ring-secondary dark:ring-dark-ring-secondary hover:ring-light-ring-primary hover:dark:ring-dark-ring-primary bg-light-foreground dark:bg-dark-foreground hover:shadow-sm'
          >
            <div className='bg-light-foreground dark:bg-dark-foreground px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
              <div className='sm:flex sm:items-start'>
                <div className='mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10'>
                  <RenameSvg
                    className='h-10 w-10 text-light-text-primary dark:text-dark-text-primary'
                    aria-hidden='true'
                  />
                </div>
                <div className='mt-3 text sm:ml-4 sm:mt-0 text-left'>
                  <DialogTitle
                    as='h3'
                    className='text-md font-semibold leading-6 text-light-text-primary dark:text-dark-text-primary'
                  >
                    Rename Resume
                  </DialogTitle>
                  <div className='mt-2'>
                    <p className='text-md text-light-text-secondary dark:text-dark-text-secondary'>
                      Please provide the new name for your resume
                    </p>
                    <div className='flex flex-col gap-2 py-2'>
                      <div className='flex flex-col gap-1'>
                        <label className='text text-md text-light-text-primary dark:text-dark-text-primary'>
                          New Name <sup>*</sup>
                        </label>
                        <input
                          className={`p-2 rounded-md ring-1 focus:outline-none bg-light-foreground dark:bg-dark-foreground placeholder:text-light-text-secondary placeholder:dark:text-dark-text-secondary text-light-text-primary ring-light-ring-secondary dark:ring-dark-ring-secondary hover:ring-light-ring-primary hover:dark:ring-dark-ring-primary focus:ring-light-ring-primary focus:dark:ring-dark-ring-primary dark:text-dark-text-primary text-md `}
                          name='fileName'
                          type='text'
                          value={formData.fileName || ''}
                          onChange={(e) => handleFormChange(e)}
                          placeholder='John Doe Smith - Software Engineer'
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='bg-light-foreground dark:bg-dark-foreground px-4 py-3 flex flex-row sm:px-6 gap-2 w-full justify-end'>
              <SecondaryButton
                className='h-10'
                onClick={() => {
                  setOpenRenamePopup(false);
                  setFormData({ fileName: fileName });
                }}
                data-autofocus
              >
                Cancel
              </SecondaryButton>
              <PrimaryButton
                className={`h-10 ${
                  formData.fileName?.length > 0 ? 'null' : 'cursor-not-allowed'
                }`}
                type='submit'
                disabled={formData.fileName?.length > 0 ? false : true}
              >
                Rename
              </PrimaryButton>
            </div>
          </DialogPanel>
        </form>
      </div>
    </Dialog>
  );
}
