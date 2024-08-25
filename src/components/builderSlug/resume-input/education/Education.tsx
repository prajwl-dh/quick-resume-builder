'use client';
import { ResumeInterface } from '@/components/builder/previousResumes/ResumeInterface';
import RefContext from '@/lib/providers/RefContext';
import { useAppDispatch } from '@/lib/store/hooks';
import { useContext } from 'react';
import { EducationSvg } from '../../navbar/svgs/EducationSvg';

export default function Education({
  resume,
}: {
  resume: ResumeInterface | undefined;
}) {
  const { educationRef } = useContext(RefContext);
  const dispatch = useAppDispatch();

  return (
    <div className='w-full flex flex-col gap-4'>
      <div ref={educationRef} className='flex flex-row gap-2 items-center'>
        <EducationSvg className='w-8 h-8 text-light-text-primary dark:text-dark-text-primary' />
        <p className='text text-3xl text-light-text-primary dark:text-dark-text-primary'>
          Education
        </p>
      </div>
    </div>
  );
}
