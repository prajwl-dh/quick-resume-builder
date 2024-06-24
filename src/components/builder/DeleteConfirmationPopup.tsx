'use client';
import { deleteResume } from '@/lib/slices/resumeSlice';
import { useAppDispatch } from '@/lib/store/hooks';
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import SecondaryButton from '../buttons/SecondaryButton';
import { DeleteSvg } from './DeleteSvg';

export default function DeleteConfirmationPopup({ ...props }) {
  const { open, setOpen, id } = props;
  const dispatch = useAppDispatch();

  return (
    <Dialog className='relative z-50' open={open} onClose={setOpen}>
      <DialogBackdrop
        transition
        className='fixed inset-0 bg-light-background dark:bg-dark-background bg-opacity-60 backdrop-blur-md transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in'
      />

      <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
        <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
          <DialogPanel
            transition
            className='relative transform overflow-hidden text-left transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg da</div>ta-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95 rounded-md ring-1 ring-light-ring-secondary dark:ring-dark-ring-secondary hover:ring-light-ring-primary hover:dark:ring-dark-ring-primary bg-light-foreground dark:bg-dark-foreground hover:shadow-sm'
          >
            <div className='bg-light-foreground dark:bg-dark-foreground px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
              <div className='sm:flex sm:items-start'>
                <div className='mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10'>
                  <DeleteSvg
                    className='h-6 w-6 text-light-text-primary dark:text-dark-text-primary'
                    aria-hidden='true'
                  />
                </div>
                <div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left'>
                  <DialogTitle
                    as='h3'
                    className='text-base font-semibold leading-6 text-light-text-primary dark:text-dark-text-primary'
                  >
                    Delete Resume
                  </DialogTitle>
                  <div className='mt-2'>
                    <p className='text-sm text-light-text-secondary dark:text-dark-text-secondary'>
                      Are you sure you want to delete this resume? This action
                      cannot be undone.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className='bg-light-foreground dark:bg-dark-foreground px-4 py-3 flex flex-row sm:px-6 gap-2 w-full justify-end'>
              <SecondaryButton
                className='h-10'
                onClick={() => setOpen(false)}
                data-autofocus
              >
                Cancel
              </SecondaryButton>
              <SecondaryButton
                className='h-10 bg-red-600 dark:bg-red-600 hover:bg-red-500 dark:hover:bg-red-500 text-white'
                onClick={() => {
                  dispatch(deleteResume(id));
                  setOpen(false);
                }}
              >
                Delete
              </SecondaryButton>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
