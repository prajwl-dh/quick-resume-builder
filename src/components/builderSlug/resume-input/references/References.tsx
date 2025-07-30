'use client';
import { DeleteSvg } from '@/components/builder/previousResumes/DeleteSvg';
import { ResumeInterface } from '@/components/builder/previousResumes/ResumeInterface';
import { Tooltip } from '@/components/tooltip/ToolTip';
import RefContext from '@/lib/providers/RefContext';
import {
  addNewResumeReference,
  deleteResumeReference,
  updateResumeReference,
} from '@/lib/slices/resumeSlice';
import { useAppDispatch } from '@/lib/store/hooks';
import { motion } from 'framer-motion';
import { useContext } from 'react';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa6';
import { ReferenceSvg } from '../../navbar/svgs/ReferenceSvg';
import InputField from '../inputComponents/InputField';
import TextAreaField from '../inputComponents/TextAreaField';

export default function References({
  resume,
}: {
  resume: ResumeInterface | undefined;
}) {
  const { referencesRef } = useContext(RefContext);
  const dispatch = useAppDispatch();

  const addNewReference = () => {
    dispatch(
      addNewResumeReference({
        id: resume?.id ?? '',
      })
    );
  };

  const deleteReference = (index: number) => {
    dispatch(
      deleteResumeReference({
        id: resume?.id ?? '',
        index: index,
      })
    );
  };

  const moveReferenceUp = (index: number) => {
    if (index === 0 || !resume?.references) return;

    const prevReference = resume.references[index - 1];
    const currentReference = resume.references[index];

    dispatch(
      updateResumeReference({
        id: resume.id,
        index: index - 1,
        value: currentReference,
      })
    );

    dispatch(
      updateResumeReference({
        id: resume.id,
        index: index,
        value: prevReference,
      })
    );
  };

  const moveReferenceDown = (index: number) => {
    if (!resume?.references || index === resume.references.length - 1) return;

    const nextReference = resume.references[index + 1];
    const currentReference = resume.references[index];

    dispatch(
      updateResumeReference({
        id: resume.id,
        index: index + 1,
        value: currentReference,
      })
    );

    dispatch(
      updateResumeReference({
        id: resume.id,
        index: index,
        value: nextReference,
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
      updateResumeReference({
        id: resume?.id ?? '',
        index: index,
        value: {
          ...resume?.references?.[index],
          [name]: value,
        },
      })
    );
  };

  return (
    <div className='w-full flex flex-col gap-4'>
      <div ref={referencesRef} className='flex flex-row gap-2 items-center'>
        <ReferenceSvg className='w-8 h-8 text-light-text-primary dark:text-dark-text-primary' />
        <p className='text text-3xl text-light-text-primary dark:text-dark-text-primary'>
          References
        </p>
      </div>

      <div className='border-dark-text-secondary dark:border-light-text-secondary border-b-2'></div>

      <div className='flex flex-col gap-6'>
        {resume?.references?.map((field, index) => {
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              viewport={{ once: true }}
              className='flex flex-col gap-4 border-dark-text-secondary dark:border-light-text-secondary border-b-2 border-dashed'
            >
              <div className='flex flex-row justify-end gap-6 items-center'>
                {index === 0 ? null : (
                  <Tooltip text='Move Up'>
                    <FaArrowUp
                      className='text text-xl text-light-text-secondary dark:text-dark-text-secondary cursor-pointer'
                      onClick={() => moveReferenceUp(index)}
                    />
                  </Tooltip>
                )}

                {index === resume?.references?.length - 1 ? null : (
                  <Tooltip text='Move Down'>
                    <FaArrowDown
                      className='text text-xl text-light-text-secondary dark:text-dark-text-secondary cursor-pointer'
                      onClick={() => moveReferenceDown(index)}
                    />
                  </Tooltip>
                )}

                <Tooltip text='Delete'>
                  <DeleteSvg
                    onClick={() => deleteReference(index)}
                    className='text text-2xl text-light-text-secondary dark:text-dark-text-secondary hover:text-red-500 hover:dark:text-red-500 cursor-pointer'
                  />
                </Tooltip>
              </div>

              <div className='flex flex-row flex-wrap justify-start gap-2'>
                <InputField
                  label='Reference Name'
                  type='text'
                  name='referenceName'
                  placeholder='John Doe Smith'
                  value={resume?.references[index]?.referenceName || ''}
                  onChange={(e) => handleChange(e, index)}
                />
              </div>

              <TextAreaField
                label='Additional Info (If Any)'
                placeholder='Description Here'
                name='referenceDescription'
                rows={5}
                value={resume?.references[index]?.referenceDescription || ''}
                onChange={(e) => handleChange(e, index)}
              />

              <div className='mt-4'></div>
            </motion.div>
          );
        })}
      </div>

      <div
        onClick={() => addNewReference()}
        className='flex flex-row items-center gap-2 text-light-text-secondary text text-md dark:text-dark-text-secondary hover:text-light-text-primary hover:dark:text-dark-text-primary cursor-pointer group'
      >
        <p className='text text-lg'> + </p>
        <p className='underline underline-offset-2'>Add Reference</p>
      </div>
    </div>
  );
}
