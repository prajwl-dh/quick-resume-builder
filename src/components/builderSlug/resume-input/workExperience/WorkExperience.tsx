'use client';
import { DeleteSvg } from '@/components/builder/previousResumes/DeleteSvg';
import { ResumeInterface } from '@/components/builder/previousResumes/ResumeInterface';
import RefContext from '@/lib/providers/RefContext';
import {
  addNewResumeWorkExperience,
  deleteResumeWorkExperience,
  updateResumeWorkExperience,
} from '@/lib/slices/resumeSlice';
import { useAppDispatch } from '@/lib/store/hooks';
import { useContext } from 'react';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa6';
import { ExperienceSvg } from '../../navbar/svgs/ExperienceSvg';
import InputField from '../inputComponents/InputField';
import TextAreaField from '../inputComponents/TextAreaField';

export default function WorkExperience({
  resume,
}: {
  resume: ResumeInterface | undefined;
}) {
  const { workExperienceRef } = useContext(RefContext);
  const dispatch = useAppDispatch();

  const addNewJobExperience = () => {
    dispatch(
      addNewResumeWorkExperience({
        id: resume?.id ?? '',
      })
    );
  };

  const deleteJobExperience = (index: number) => {
    console.log(index);
    dispatch(
      deleteResumeWorkExperience({
        id: resume?.id ?? '',
        index: index,
      })
    );
  };

  const moveJobExperienceUp = (index: number) => {
    if (index === 0 || !resume?.experience) return;

    const prevExp = resume.experience[index - 1];
    const currentExp = resume.experience[index];

    dispatch(
      updateResumeWorkExperience({
        id: resume.id,
        index: index - 1,
        value: currentExp,
      })
    );

    dispatch(
      updateResumeWorkExperience({
        id: resume.id,
        index: index,
        value: prevExp,
      })
    );
  };

  const moveJobExperienceDown = (index: number) => {
    if (!resume?.experience || index === resume.experience.length - 1) return;

    const nextExp = resume.experience[index + 1];
    const currentExp = resume.experience[index];

    dispatch(
      updateResumeWorkExperience({
        id: resume.id,
        index: index + 1,
        value: currentExp,
      })
    );

    dispatch(
      updateResumeWorkExperience({
        id: resume.id,
        index: index,
        value: nextExp,
      })
    );
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    e.preventDefault();

    const { name, value } = e.target;
    dispatch(
      updateResumeWorkExperience({
        id: resume?.id ?? '',
        index: index,
        value: {
          ...resume?.experience?.[index],
          [name]: value,
        },
      })
    );
  };

  return (
    <div className='w-full flex flex-col gap-4'>
      <div ref={workExperienceRef} className='flex flex-row gap-2 items-center'>
        <ExperienceSvg className='w-8 h-8 text-light-text-primary dark:text-dark-text-primary' />
        <p className='text text-3xl text-light-text-primary dark:text-dark-text-primary'>
          Work Experience
        </p>
      </div>

      <div className='border-dark-text-secondary dark:border-light-text-secondary border-b-2 border-dashed'></div>

      <div className='flex flex-col gap-6'>
        {resume?.experience?.map((field, index) => {
          return (
            <div
              key={index}
              className='flex flex-col gap-4 border-dark-text-secondary dark:border-light-text-secondary border-b-2 border-dashed'
            >
              <div className='flex flex-row justify-end gap-6 items-center'>
                {index === 0 ? null : (
                  <FaArrowUp
                    className='text text-xl text-light-text-secondary dark:text-dark-text-secondary cursor-pointer'
                    onClick={() => moveJobExperienceUp(index)}
                  />
                )}

                {index === resume?.experience?.length - 1 ? null : (
                  <FaArrowDown
                    className='text text-xl text-light-text-secondary dark:text-dark-text-secondary cursor-pointer'
                    onClick={() => moveJobExperienceDown(index)}
                  />
                )}

                <DeleteSvg
                  onClick={() => deleteJobExperience(index)}
                  className='text text-2xl text-light-text-secondary dark:text-dark-text-secondary hover:text-red-500 hover:dark:text-red-500 cursor-pointer'
                />
              </div>

              <InputField
                label='Company Name'
                type='text'
                name='companyName'
                placeholder='Acme Corporation'
                value={resume?.experience[index]?.companyName || ''}
                onChange={(e) => handleChange(e, index)}
              />

              <div className='flex flex-row flex-wrap justify-start gap-2'>
                <InputField
                  label='Job Title'
                  type='text'
                  name='jobTitle'
                  placeholder='Software Engineer'
                  value={resume?.experience[index]?.jobTitle || ''}
                  onChange={(e) => handleChange(e, index)}
                />

                <InputField
                  label='Date'
                  type='text'
                  name='jobDate'
                  placeholder='July 2024 - Present'
                  value={resume?.experience[index]?.jobDate || ''}
                  onChange={(e) => handleChange(e, index)}
                />
              </div>

              <TextAreaField
                label='Description'
                placeholder='Job Description Here'
                name='jobDescription'
                rows={5}
                value={resume?.experience[index]?.jobDescription || ''}
                onChange={(e) => handleChange(e, index)}
              />

              <div className='mt-4'></div>
            </div>
          );
        })}
      </div>

      <div
        onClick={() => addNewJobExperience()}
        className='flex flex-row items-center gap-2 text-light-text-secondary text text-md dark:text-dark-text-secondary hover:text-light-text-primary hover:dark:text-dark-text-primary cursor-pointer group'
      >
        <p className='text text-lg'> + </p>
        <p className='underline underline-offset-2'>Add Work Experience</p>
      </div>
    </div>
  );
}
