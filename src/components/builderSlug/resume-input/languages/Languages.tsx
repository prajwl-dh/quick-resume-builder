'use client';
import { ResumeInterface } from '@/components/builder/previousResumes/ResumeInterface';
import RefContext from '@/lib/providers/RefContext';
import { useAppDispatch } from '@/lib/store/hooks';
import { useContext } from 'react';
import { LanguageSvg } from '../../navbar/svgs/LanguageSvg';

export default function Languages({
  resume,
}: {
  resume: ResumeInterface | undefined;
}) {
  const { languagesRef } = useContext(RefContext);
  const dispatch = useAppDispatch();

  return (
    <div className='w-full flex flex-col gap-4'>
      <div ref={languagesRef} className='flex flex-row gap-2 items-center'>
        <LanguageSvg className='w-8 h-8 text-light-text-primary dark:text-dark-text-primary' />
        <p className='text text-3xl text-light-text-primary dark:text-dark-text-primary'>
          Languages
        </p>
      </div>
    </div>
  );
}
