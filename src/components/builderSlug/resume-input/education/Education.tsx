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
        <EducationSvg className='w-8 h-8 text-light-text-primary dark:text-dark-text-primary' />
        <p className='text text-2xl xl:text-3xl text-light-text-primary dark:text-dark-text-primary'>
          Education
        </p>
        <SectionControls resume={resume} section='education' />
      </div>

      <div className='border-dark-text-secondary dark:border-light-text-secondary border-b-2'></div>

      <div className='flex flex-col gap-6'>
        {entries.map((field, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            viewport={{ once: true }}
            {...dropProps(index)}
            className={`flex flex-col gap-4 border-dark-text-secondary dark:border-light-text-secondary border-b-2 border-dashed ${
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
              placeholder='University of Example'
              value={field.schoolName || ''}
              onChange={(event) => handleChange(event, index)}
            />

            <div className='flex flex-row flex-wrap justify-start gap-2'>
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
        <p className='text text-lg'> + </p>
        <p className='underline underline-offset-2'>Add Education</p>
      </button>
    </div>
  );
}
