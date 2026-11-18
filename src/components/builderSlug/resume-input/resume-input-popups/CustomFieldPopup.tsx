import { CreateSvg } from '@/components/builder/createNew/CreateSvg';
import { inputClassName } from '@/components/builderSlug/resume-input/inputComponents/InputField';
import PrimaryButton from '@/components/buttons/PrimaryButton';
import SecondaryButton from '@/components/buttons/SecondaryButton';
import { addCustomProfileField } from '@/lib/slices/resumeSlice';
import { useAppDispatch } from '@/lib/store/hooks';
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import React from 'react';

export default function CustomFieldPopup({ ...props }) {
  const { open, setOpen, source, resume } = props;
  const [formData, setFormData] = React.useState<{
    fieldName: string;
    fieldValue: string;
  }>({ fieldName: '', fieldValue: '' });

  const dispatch = useAppDispatch();

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmission = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    formData.fieldName.length > 0 && formData.fieldValue.length > 0
      ? dispatch(
          addCustomProfileField({
            id: resume.id || '',
            key: 'profileCustomField',
            value: {
              fieldName: formData.fieldName,
              fieldValue: formData.fieldValue,
            },
          })
        )
      : null;
    setOpen(false);
    setFormData({ fieldName: '', fieldValue: '' });
  };

  return (
    <Dialog className='relative z-50' open={open} onClose={setOpen}>
      <DialogBackdrop
        transition
        className='fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150'
      />

      <div className='fixed inset-0 z-10 w-full overflow-y-auto'>
        <form
          onSubmit={(e) => handleSubmission(e)}
          className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'
        >
          <DialogPanel
            transition
            className='relative w-full max-w-md transform overflow-hidden rounded-xl border border-light-ring-secondary bg-light-foreground text-left shadow-paper-lg transition duration-200 data-[closed]:translate-y-2 data-[closed]:opacity-0 sm:my-8 dark:border-dark-ring-secondary dark:bg-dark-foreground'
          >
            <div className='bg-light-foreground dark:bg-dark-foreground px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
              <div className='sm:flex sm:items-start'>
                <div className='mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10'>
                  <CreateSvg
                    className='h-10 w-10 text-light-text-primary dark:text-dark-text-primary'
                    aria-hidden='true'
                  />
                </div>
                <div className='mt-3 text sm:ml-4 sm:mt-0 text-left'>
                  <DialogTitle
                    as='h3'
                    className='text-md font-semibold leading-6 text-light-text-primary dark:text-dark-text-primary'
                  >
                    Create Custom Field
                  </DialogTitle>
                  <div className='mt-2'>
                    <p className='text-md text-light-text-secondary dark:text-dark-text-secondary'>
                      Add a label and a value. For example, “Portfolio” and a link.
                    </p>
                    <div className='flex flex-col gap-2 py-2'>
                      <div className='flex flex-col gap-1'>
                        <label className='text text-md text-light-text-primary dark:text-dark-text-primary'>
                          Field Name <sup>*</sup>
                        </label>
                        <input
                          className={inputClassName}
                          name='fieldName'
                          onChange={(e) => handleFormChange(e)}
                          type='text'
                          value={formData.fieldName || ''}
                          placeholder='Portfolio'
                        />
                      </div>
                      <div className='flex flex-col gap-1'>
                        <label className='text text-md text-light-text-primary dark:text-dark-text-primary'>
                          Value <sup>*</sup>
                        </label>
                        <input
                          className={inputClassName}
                          name='fieldValue'
                          onChange={(e) => handleFormChange(e)}
                          type='text'
                          value={formData.fieldValue || ''}
                          placeholder='alexmorgan.dev'
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
                  setOpen(false);
                  setFormData({ fieldName: '', fieldValue: '' });
                }}
                data-autofocus
              >
                Cancel
              </SecondaryButton>
              <PrimaryButton
                className={`h-10 ${
                  formData.fieldName.length > 0 &&
                  formData.fieldValue.length > 0
                    ? 'null'
                    : 'cursor-not-allowed'
                }`}
                type='submit'
                disabled={
                  formData.fieldName.length > 0 &&
                  formData.fieldValue.length > 0
                    ? false
                    : true
                }
              >
                Create
              </PrimaryButton>
            </div>
          </DialogPanel>
        </form>
      </div>
    </Dialog>
  );
}
