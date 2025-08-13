'use client';
import { ResumeInterface } from '@/components/builder/previousResumes/ResumeInterface';
import RefContext from '@/lib/providers/RefContext';
import { updateResumeLanguage } from '@/lib/slices/resumeSlice';
import { useAppDispatch } from '@/lib/store/hooks';
import { useContext } from 'react';
import { LanguageSvg } from '../../navbar/svgs/LanguageSvg';
import TextAreaField from '../inputComponents/TextAreaField';

export default function Languages({
  resume,
}: {
  resume: ResumeInterface | undefined;
}) {
  const { languagesRef } = useContext(RefContext);
  const dispatch = useAppDispatch();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();

    const { name, value } = e.target;
    dispatch(
      updateResumeLanguage({
        id: resume?.id ?? '',
        value: value,
      })
    );
  };

  return (
    <div className='w-full flex flex-col gap-4'>
      <div ref={languagesRef} className='flex flex-row gap-2 items-center'>
        <LanguageSvg className='w-8 h-8 text-light-text-primary dark:text-dark-text-primary' />
        <p className='text text-3xl text-light-text-primary dark:text-dark-text-primary'>
          Languages
        </p>
      </div>

      <div className='border-dark-text-secondary dark:border-light-text-secondary border-b-2'></div>

      <div className='flex flex-col gap-6'>
        <TextAreaField
          label=''
          placeholder={'Fluent: English, Nepali\n\nBasic: Hindi, Spanish'}
          name='languages'
          onChange={(e) => handleChange(e)}
          value={resume?.languages || ''}
          rows={5}
        />
      </div>
    </div>
  );
}
