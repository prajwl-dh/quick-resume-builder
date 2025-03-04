'use client';
import { DeleteSvg } from '@/components/builder/previousResumes/DeleteSvg';
import { ResumeInterface } from '@/components/builder/previousResumes/ResumeInterface';
import { Tooltip } from '@/components/tooltip/ToolTip';
import RefContext from '@/lib/providers/RefContext';
import {
  addNewResumeEducation,
  deleteResumeEducation,
  updateResumeEducation,
} from '@/lib/slices/resumeSlice';
import { useAppDispatch } from '@/lib/store/hooks';
import { useContext } from 'react';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa6';
import { EducationSvg } from '../../navbar/svgs/EducationSvg';
import InputField from '../inputComponents/InputField';
import TextAreaField from '../inputComponents/TextAreaField';

export default function Education({
  resume,
}: {
  resume: ResumeInterface | undefined;
}) {
  const { educationRef } = useContext(RefContext);
  const dispatch = useAppDispatch();

  const addNewSchool = () => {
    dispatch(
      addNewResumeEducation({
        id: resume?.id ?? '',
      })
    );
  };

  const deleteSchool = (index: number) => {
    dispatch(
      deleteResumeEducation({
        id: resume?.id ?? '',
        index: index,
      })
    );
  };

  const moveSchoolUp = (index: number) => {
    if (index === 0 || !resume?.education) return;

    const prevEdu = resume.education[index - 1];
    const currentEdu = resume.education[index];

    dispatch(
      updateResumeEducation({
        id: resume.id,
        index: index - 1,
        value: currentEdu,
      })
    );

    dispatch(
      updateResumeEducation({
        id: resume.id,
        index: index,
        value: prevEdu,
      })
    );
  };

  const moveSchoolDown = (index: number) => {
    if (!resume?.education || index === resume.education.length - 1) return;

    const nextEdu = resume.education[index + 1];
    const currentEdu = resume.education[index];

    dispatch(
      updateResumeEducation({
        id: resume.id,
        index: index + 1,
        value: currentEdu,
      })
    );

    dispatch(
      updateResumeEducation({
        id: resume.id,
        index: index,
        value: nextEdu,
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
      updateResumeEducation({
        id: resume?.id ?? '',
        index: index,
        value: {
          ...resume?.education?.[index],
          [name]: value,
        },
      })
    );
  };

  return (
    <div className='w-full flex flex-col gap-4'>
      <div ref={educationRef} className='flex flex-row gap-2 items-center'>
        <EducationSvg className='w-8 h-8 text-light-text-primary dark:text-dark-text-primary' />
        <p className='text text-3xl text-light-text-primary dark:text-dark-text-primary'>
          Education
        </p>
      </div>

      <div className='border-dark-text-secondary dark:border-light-text-secondary border-b-2 border-dashed'></div>

      <div className='flex flex-col gap-6'>
        {resume?.education?.map((field, index) => {
          return (
            <div
              key={index}
              className='flex flex-col gap-4 border-dark-text-secondary dark:border-light-text-secondary border-b-2 border-dashed'
            >
              <div className='flex flex-row justify-end gap-6 items-center'>
                {index === 0 ? null : (
                  <Tooltip text='Move Up'>
                    <FaArrowUp
                      className='text text-xl text-light-text-secondary dark:text-dark-text-secondary cursor-pointer'
                      onClick={() => moveSchoolUp(index)}
                    />
                  </Tooltip>
                )}

                {index === resume?.education?.length - 1 ? null : (
                  <Tooltip text='Move Down'>
                    <FaArrowDown
                      className='text text-xl text-light-text-secondary dark:text-dark-text-secondary cursor-pointer'
                      onClick={() => moveSchoolDown(index)}
                    />
                  </Tooltip>
                )}

                <Tooltip text='Delete'>
                  <DeleteSvg
                    onClick={() => deleteSchool(index)}
                    className='text text-2xl text-light-text-secondary dark:text-dark-text-secondary hover:text-red-500 hover:dark:text-red-500 cursor-pointer'
                  />
                </Tooltip>
              </div>

              <div className='flex flex-row flex-wrap justify-start gap-2'>
                <InputField
                  label='School Name'
                  type='text'
                  name='schoolName'
                  placeholder='McNeese State University'
                  value={resume?.education[index]?.schoolName || ''}
                  onChange={(e) => handleChange(e, index)}
                />

                <InputField
                  label='Date'
                  type='text'
                  name='schoolDate'
                  placeholder='May 2023'
                  value={resume?.education[index]?.schoolDate || ''}
                  onChange={(e) => handleChange(e, index)}
                />
              </div>

              <div className='flex flex-row flex-wrap justify-start gap-2'>
                <InputField
                  label='Degree & Major'
                  type='text'
                  name='schoolMajor'
                  placeholder='Bachelors Degree in Computer Science'
                  value={resume?.education[index]?.schoolMajor || ''}
                  onChange={(e) => handleChange(e, index)}
                />

                <InputField
                  label='GPA'
                  type='text'
                  name='schoolGPA'
                  placeholder='3.75'
                  value={resume?.education[index]?.schoolGPA || ''}
                  onChange={(e) => handleChange(e, index)}
                />
              </div>

              <TextAreaField
                label='Additional Info (If Any)'
                placeholder='Description Here'
                name='schoolDescription'
                rows={5}
                value={resume?.education[index]?.schoolDescription || ''}
                onChange={(e) => handleChange(e, index)}
              />

              <div className='mt-4'></div>
            </div>
          );
        })}
      </div>

      <div
        onClick={() => addNewSchool()}
        className='flex flex-row items-center gap-2 text-light-text-secondary text text-md dark:text-dark-text-secondary hover:text-light-text-primary hover:dark:text-dark-text-primary cursor-pointer group'
      >
        <p className='text text-lg'> + </p>
        <p className='underline underline-offset-2'>Add School</p>
      </div>
    </div>
  );
}
