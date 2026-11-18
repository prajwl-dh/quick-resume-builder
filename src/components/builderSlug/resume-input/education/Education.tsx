'use client';
import { ResumeInterface } from '@/components/builder/previousResumes/ResumeInterface';
import RefContext from '@/lib/providers/RefContext';
import {
  addNewResumeEducation,
  deleteResumeEducation,
  reorderEntries,
  updateEntryDateRange,
  updateResumeEducation,
} from '@/lib/slices/resumeSlice';
import { useAppDispatch } from '@/lib/store/hooks';
import { motion } from 'framer-motion';
import { useContext } from 'react';
import { EducationSvg } from '../../navbar/svgs/EducationSvg';
import InputField from '../inputComponents/InputField';
import BulletEditor from '../shared/BulletEditor';
import DateRangePicker from '../shared/DateRangePicker';
import EntryControls from '../shared/EntryControls';
import SectionControls from '../shared/SectionControls';
import useDragReorder from '../shared/useDragReorder';

export default function Education({
  resume,
}: {
  resume: ResumeInterface | undefined;
}) {
  const { educationRef } = useContext(RefContext);
  const dispatch = useAppDispatch();
  const entries = resume?.education ?? [];
  const hidden = resume?.hiddenSections?.includes('education') ?? false;

  const move = (from: number, to: number) =>
    dispatch(reorderEntries({ id: resume?.id ?? '', section: 'education', from, to }));
  const { dragIndex, dragHandleProps, dropProps } = useDragReorder(move);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { name, value } = event.target;
    dispatch(
      updateResumeEducation({
        id: resume?.id ?? '',
        index,
        value: { ...resume?.education?.[index], [name]: value },
      })
    );
  };

  return (
    <div className={`w-full flex flex-col gap-4 ${hidden ? 'opacity-60' : ''}`}>
      <div ref={educationRef} className='flex flex-row gap-2 items-center'>
        <EducationSvg className='h-[18px] w-[18px] shrink-0 text-accent dark:text-dark-accent' />
        <p className='font-display text-[26px] leading-none tracking-[-0.01em]'>
          Education
        </p>
        <SectionControls resume={resume} section='education' />
      </div>

      <div className='h-px bg-light-ring-secondary dark:bg-dark-ring-secondary'></div>

      <div className='flex flex-col gap-6'>
        {entries.map((field, index) => (
          <motion.div
            key={index}
            {...dropProps(index)}
            className={`flex flex-col gap-4 border-b border-light-ring-secondary dark:border-dark-ring-secondary ${
              dragIndex === index ? 'opacity-40' : ''
            }`}
          >
            <EntryControls
              index={index}
              total={entries.length}
              onMoveUp={() => move(index, index - 1)}
              onMoveDown={() => move(index, index + 1)}
              onDelete={() =>
                dispatch(deleteResumeEducation({ id: resume?.id ?? '', index }))
              }
              dragHandleProps={dragHandleProps(index)}
              isDragging={dragIndex === index}
            />

            <InputField
              label='School Name'
              type='text'
              name='schoolName'
              placeholder='University of Texas at Austin'
              value={field.schoolName || ''}
              onChange={(event) => handleChange(event, index)}
            />

            <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
              <InputField
                label='Degree & Major'
                type='text'
                name='schoolMajor'
                placeholder='B.S. Computer Science'
                value={field.schoolMajor || ''}
                onChange={(event) => handleChange(event, index)}
              />
              <InputField
                label='GPA'
                type='number'
                step='0.01'
                min='0'
                max='4'
                name='schoolGPA'
                placeholder='3.8'
                value={field.schoolGPA || ''}
                onChange={(event) => handleChange(event, index)}
              />
            </div>

            <DateRangePicker
              value={field.schoolDateRange}
              onChange={(value) =>
                dispatch(
                  updateEntryDateRange({
                    id: resume?.id ?? '',
                    section: 'education',
                    index,
                    value,
                  })
                )
              }
            />

            <BulletEditor
              label='Additional Info'
              placeholder='Describe an achievement or highlight'
              value={field.schoolDescription || ''}
              onChange={(value) =>
                dispatch(
                  updateResumeEducation({
                    id: resume?.id ?? '',
                    index,
                    value: {
                      ...resume?.education?.[index],
                      schoolDescription: value,
                    },
                  })
                )
              }
            />

            <div className='mt-4'></div>
          </motion.div>
        ))}
      </div>

      <button
        type='button'
        onClick={() => dispatch(addNewResumeEducation({ id: resume?.id ?? '' }))}
        className='self-start flex flex-row items-center gap-2 text-light-text-secondary text text-md dark:text-dark-text-secondary hover:text-light-text-primary hover:dark:text-dark-text-primary cursor-pointer group'
      >
        <span aria-hidden='true' className='text-[18px] font-light leading-none'>+</span>
        <p className='underline underline-offset-2'>Add Education</p>
      </button>
    </div>
  );
}
