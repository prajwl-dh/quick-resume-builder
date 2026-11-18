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
        <LanguageSvg className='h-[18px] w-[18px] shrink-0 text-accent dark:text-dark-accent' />
        <p className='font-display text-[26px] leading-none tracking-[-0.01em]'>
          Languages
        </p>
        <SectionControls resume={resume} section='languages' />
      </div>

      <div className='h-px bg-light-ring-secondary dark:bg-dark-ring-secondary'></div>

      <LanguagePicker resume={resume} />
    </div>
  );
}
