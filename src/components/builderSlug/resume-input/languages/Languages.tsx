'use client';
import { ResumeInterface } from '@/components/builder/previousResumes/ResumeInterface';
import RefContext from '@/lib/providers/RefContext';
import { useContext } from 'react';
import { LanguageSvg } from '../../navbar/svgs/LanguageSvg';
import LanguagePicker from '../shared/LanguagePicker';
import SectionControls from '../shared/SectionControls';

export default function Languages({
  resume,
}: {
  resume: ResumeInterface | undefined;
}) {
  const { languagesRef } = useContext(RefContext);
  const hidden = resume?.hiddenSections?.includes('languages') ?? false;

  return (
    <div className={`w-full flex flex-col gap-4 ${hidden ? 'opacity-60' : ''}`}>
      <div ref={languagesRef} className='flex flex-row gap-2 items-center'>
        <LanguageSvg className='w-8 h-8 text-light-text-primary dark:text-dark-text-primary' />
        <p className='text text-2xl xl:text-3xl text-light-text-primary dark:text-dark-text-primary'>
          Languages
        </p>
        <SectionControls resume={resume} section='languages' />
      </div>

      <div className='border-dark-text-secondary dark:border-light-text-secondary border-b-2'></div>

      <LanguagePicker resume={resume} />
    </div>
  );
}
