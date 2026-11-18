'use client';
import { ResumeInterface } from '@/components/builder/previousResumes/ResumeInterface';
import RefContext from '@/lib/providers/RefContext';
import { useContext } from 'react';
import { SkillsSvg } from '../../navbar/svgs/SkillsSvg';
import SectionControls from '../shared/SectionControls';
import SkillsPicker from '../shared/SkillsPicker';

export default function Skills({ resume }: { resume: ResumeInterface | undefined }) {
  const { skillsRef } = useContext(RefContext);
  const hidden = resume?.hiddenSections?.includes('skills') ?? false;

  return (
    <div className={`w-full flex flex-col gap-4 ${hidden ? 'opacity-60' : ''}`}>
      <div ref={skillsRef} className='flex flex-row gap-2 items-center'>
        <SkillsSvg className='h-[18px] w-[18px] shrink-0 text-accent dark:text-dark-accent' />
        <p className='font-display text-[26px] leading-none tracking-[-0.01em]'>
          Skills
        </p>
        <SectionControls resume={resume} section='skills' />
      </div>

      <div className='h-px bg-light-ring-secondary dark:bg-dark-ring-secondary'></div>

      <SkillsPicker resume={resume} />
    </div>
  );
}
