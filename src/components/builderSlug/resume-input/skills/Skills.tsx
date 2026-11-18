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
        <SkillsSvg className='w-8 h-8 text-light-text-primary dark:text-dark-text-primary' />
        <p className='text text-2xl xl:text-3xl text-light-text-primary dark:text-dark-text-primary'>
          Skills
        </p>
        <SectionControls resume={resume} section='skills' />
      </div>

      <div className='border-dark-text-secondary dark:border-light-text-secondary border-b-2'></div>

      <SkillsPicker resume={resume} />
    </div>
  );
}
