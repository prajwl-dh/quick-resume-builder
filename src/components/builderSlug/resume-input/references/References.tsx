'use client';
import { ResumeInterface } from '@/components/builder/previousResumes/ResumeInterface';
import RefContext from '@/lib/providers/RefContext';
import {
  addNewResumeReference,
  deleteResumeReference,
  reorderEntries,
  updateResumeReference,
} from '@/lib/slices/resumeSlice';
import { useAppDispatch } from '@/lib/store/hooks';
import { motion } from 'framer-motion';
import { useContext } from 'react';
import { ReferenceSvg } from '../../navbar/svgs/ReferenceSvg';
import InputField from '../inputComponents/InputField';
import BulletEditor from '../shared/BulletEditor';
import EntryControls from '../shared/EntryControls';
import SectionControls from '../shared/SectionControls';
import useDragReorder from '../shared/useDragReorder';

export default function References({
  resume,
}: {
  resume: ResumeInterface | undefined;
}) {
  const { referencesRef } = useContext(RefContext);
  const dispatch = useAppDispatch();
  const entries = resume?.references ?? [];
  const hidden = resume?.hiddenSections?.includes('references') ?? false;

  const move = (from: number, to: number) =>
    dispatch(reorderEntries({ id: resume?.id ?? '', section: 'references', from, to }));
  const { dragIndex, dragHandleProps, dropProps } = useDragReorder(move);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { name, value } = event.target;
    dispatch(
      updateResumeReference({
        id: resume?.id ?? '',
        index,
        value: { ...resume?.references?.[index], [name]: value },
      })
    );
  };

  return (
    <div className={`w-full flex flex-col gap-4 ${hidden ? 'opacity-60' : ''}`}>
      <div ref={referencesRef} className='flex flex-row gap-2 items-center'>
        <ReferenceSvg className='h-[18px] w-[18px] shrink-0 text-accent dark:text-dark-accent' />
        <p className='font-display text-[26px] leading-none tracking-[-0.01em]'>
          References
        </p>
        <SectionControls resume={resume} section='references' />
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
                dispatch(deleteResumeReference({ id: resume?.id ?? '', index }))
              }
              dragHandleProps={dragHandleProps(index)}
              isDragging={dragIndex === index}
            />

            <InputField
              label='Reference Name'
              type='text'
              name='referenceName'
              placeholder='Jordan Lee'
              value={field.referenceName || ''}
              onChange={(event) => handleChange(event, index)}
            />

            <BulletEditor
              label='Additional Info (If Any)'
              placeholder='Contact details or relationship'
              value={field.referenceDescription || ''}
              onChange={(value) =>
                dispatch(
                  updateResumeReference({
                    id: resume?.id ?? '',
                    index,
                    value: {
                      ...resume?.references?.[index],
                      referenceDescription: value,
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
        onClick={() => dispatch(addNewResumeReference({ id: resume?.id ?? '' }))}
        className='self-start flex flex-row items-center gap-2 text-light-text-secondary text text-md dark:text-dark-text-secondary hover:text-light-text-primary hover:dark:text-dark-text-primary cursor-pointer group'
      >
        <span aria-hidden='true' className='text-[18px] font-light leading-none'>+</span>
        <p className='underline underline-offset-2'>Add Reference</p>
      </button>
    </div>
  );
}
