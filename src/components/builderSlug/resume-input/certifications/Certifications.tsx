'use client';
import { ResumeInterface } from '@/components/builder/previousResumes/ResumeInterface';
import RefContext from '@/lib/providers/RefContext';
import {
  addNewResumeCertification,
  deleteResumeCertification,
  reorderEntries,
  updateResumeCertification,
} from '@/lib/slices/resumeSlice';
import { useAppDispatch } from '@/lib/store/hooks';
import { motion } from 'framer-motion';
import { useContext } from 'react';
import { CertificateSvg } from '../../navbar/svgs/CertificateSvg';
import InputField from '../inputComponents/InputField';
import BulletEditor from '../shared/BulletEditor';
import EntryControls from '../shared/EntryControls';
import SectionControls from '../shared/SectionControls';
import useDragReorder from '../shared/useDragReorder';

export default function Certifications({
  resume,
}: {
  resume: ResumeInterface | undefined;
}) {
  const { certificationsRef } = useContext(RefContext);
  const dispatch = useAppDispatch();
  const entries = resume?.certifications ?? [];
  const hidden = resume?.hiddenSections?.includes('certifications') ?? false;

  const move = (from: number, to: number) =>
    dispatch(
      reorderEntries({ id: resume?.id ?? '', section: 'certifications', from, to })
    );
  const { dragIndex, dragHandleProps, dropProps } = useDragReorder(move);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { name, value } = event.target;
    dispatch(
      updateResumeCertification({
        id: resume?.id ?? '',
        index,
        value: { ...resume?.certifications?.[index], [name]: value },
      })
    );
  };

  return (
    <div className={`w-full flex flex-col gap-4 ${hidden ? 'opacity-60' : ''}`}>
      <div ref={certificationsRef} className='flex flex-row gap-2 items-center'>
        <CertificateSvg className='w-8 h-8 text-light-text-primary dark:text-dark-text-primary' />
        <p className='text text-2xl xl:text-3xl text-light-text-primary dark:text-dark-text-primary'>
          Certifications
        </p>
        <SectionControls resume={resume} section='certifications' />
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
                dispatch(deleteResumeCertification({ id: resume?.id ?? '', index }))
              }
              dragHandleProps={dragHandleProps(index)}
              isDragging={dragIndex === index}
            />

            <InputField
              label='Certification Name'
              type='text'
              name='certificationName'
              placeholder='AWS Certified Developer'
              value={field.certificationName || ''}
              onChange={(event) => handleChange(event, index)}
            />

            <BulletEditor
              label='Additional Info (If Any)'
              placeholder='Describe the certification'
              value={field.certificationDescription || ''}
              onChange={(value) =>
                dispatch(
                  updateResumeCertification({
                    id: resume?.id ?? '',
                    index,
                    value: {
                      ...resume?.certifications?.[index],
                      certificationDescription: value,
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
        onClick={() =>
          dispatch(addNewResumeCertification({ id: resume?.id ?? '' }))
        }
        className='self-start flex flex-row items-center gap-2 text-light-text-secondary text text-md dark:text-dark-text-secondary hover:text-light-text-primary hover:dark:text-dark-text-primary cursor-pointer group'
      >
        <p className='text text-lg'> + </p>
        <p className='underline underline-offset-2'>Add Certification</p>
      </button>
    </div>
  );
}
