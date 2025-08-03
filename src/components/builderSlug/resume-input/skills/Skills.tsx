'use client';
import { ResumeInterface } from '@/components/builder/previousResumes/ResumeInterface';
import RefContext from '@/lib/providers/RefContext';
import { updateResumeSkills } from '@/lib/slices/resumeSlice';
import { useAppDispatch } from '@/lib/store/hooks';
import { useContext } from 'react';
import { SkillsSvg } from '../../navbar/svgs/SkillsSvg';
import TextAreaField from '../inputComponents/TextAreaField';

export default function Skills({
  resume,
}: {
  resume: ResumeInterface | undefined;
}) {
  const { skillsRef } = useContext(RefContext);
  const dispatch = useAppDispatch();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();

    const { name, value } = e.target;
    dispatch(
      updateResumeSkills({
        id: resume?.id ?? '',

        value: value,
      })
    );
  };

  return (
    <div className='w-full flex flex-col gap-4'>
      <div ref={skillsRef} className='flex flex-row gap-2 items-center'>
        <SkillsSvg className='w-8 h-8 text-light-text-primary dark:text-dark-text-primary' />
        <p className='text text-3xl text-light-text-primary dark:text-dark-text-primary'>
          Skills
        </p>
      </div>

      <div className='border-dark-text-secondary dark:border-light-text-secondary border-b-2'></div>

      <div className='flex flex-col gap-6'>
        <TextAreaField
          label=''
          placeholder={
            'Technical Skills: JavaScript, React, Node.js, Python\n\nSoft Skills: Communication, Teamwork, Problem-solving, Adaptability'
          }
          name='skills'
          onChange={(e) => handleChange(e)}
          value={resume?.skills || ''}
          rows={5}
        />
      </div>
    </div>
  );
}
