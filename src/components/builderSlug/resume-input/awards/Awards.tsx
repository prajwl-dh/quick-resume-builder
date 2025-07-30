'use client';
import { DeleteSvg } from '@/components/builder/previousResumes/DeleteSvg';
import { ResumeInterface } from '@/components/builder/previousResumes/ResumeInterface';
import { Tooltip } from '@/components/tooltip/ToolTip';
import RefContext from '@/lib/providers/RefContext';
import {
  addNewResumeAward,
  deleteResumeAward,
  updateResumeAward,
} from '@/lib/slices/resumeSlice';
import { useAppDispatch } from '@/lib/store/hooks';
import { motion } from 'framer-motion';
import { useContext } from 'react';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa6';
import { AwardsSvg } from '../../navbar/svgs/AwardsSvg';
import InputField from '../inputComponents/InputField';
import TextAreaField from '../inputComponents/TextAreaField';

export default function Awards({
  resume,
}: {
  resume: ResumeInterface | undefined;
}) {
  const { awardsRef } = useContext(RefContext);
  const dispatch = useAppDispatch();

  const addNewAward = () => {
    dispatch(
      addNewResumeAward({
        id: resume?.id ?? '',
      })
    );
  };

  const deleteAward = (index: number) => {
    dispatch(
      deleteResumeAward({
        id: resume?.id ?? '',
        index: index,
      })
    );
  };

  const moveAwardUp = (index: number) => {
    if (index === 0 || !resume?.awards) return;

    const prevAward = resume.awards[index - 1];
    const currentAward = resume.awards[index];

    dispatch(
      updateResumeAward({
        id: resume.id,
        index: index - 1,
        value: currentAward,
      })
    );

    dispatch(
      updateResumeAward({
        id: resume.id,
        index: index,
        value: prevAward,
      })
    );
  };

  const moveAwardDown = (index: number) => {
    if (!resume?.awards || index === resume.awards.length - 1) return;

    const nextAward = resume.awards[index + 1];
    const currentAward = resume.awards[index];

    dispatch(
      updateResumeAward({
        id: resume.id,
        index: index + 1,
        value: currentAward,
      })
    );

    dispatch(
      updateResumeAward({
        id: resume.id,
        index: index,
        value: nextAward,
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
      updateResumeAward({
        id: resume?.id ?? '',
        index: index,
        value: {
          ...resume?.awards?.[index],
          [name]: value,
        },
      })
    );
  };

  return (
    <div className='w-full flex flex-col gap-4'>
      <div ref={awardsRef} className='flex flex-row gap-2 items-center'>
        <AwardsSvg className='w-8 h-8 text-light-text-primary dark:text-dark-text-primary' />
        <p className='text text-3xl text-light-text-primary dark:text-dark-text-primary'>
          Awards
        </p>
      </div>

      <div className='border-dark-text-secondary dark:border-light-text-secondary border-b-2'></div>

      <div className='flex flex-col gap-6'>
        {resume?.awards?.map((field, index) => {
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
                      onClick={() => moveAwardUp(index)}
                    />
                  </Tooltip>
                )}

                {index === resume?.awards?.length - 1 ? null : (
                  <Tooltip text='Move Down'>
                    <FaArrowDown
                      className='text text-xl text-light-text-secondary dark:text-dark-text-secondary cursor-pointer'
                      onClick={() => moveAwardDown(index)}
                    />
                  </Tooltip>
                )}

                <Tooltip text='Delete'>
                  <DeleteSvg
                    onClick={() => deleteAward(index)}
                    className='text text-2xl text-light-text-secondary dark:text-dark-text-secondary hover:text-red-500 hover:dark:text-red-500 cursor-pointer'
                  />
                </Tooltip>
              </div>

              <div className='flex flex-row flex-wrap justify-start gap-2'>
                <InputField
                  label='Award Name'
                  type='text'
                  name='awardName'
                  placeholder='Acme Award'
                  value={resume?.awards[index]?.awardName || ''}
                  onChange={(e) => handleChange(e, index)}
                />
              </div>

              <TextAreaField
                label='Additional Info (If Any)'
                placeholder='Description Here'
                name='awardDescription'
                rows={5}
                value={resume?.awards[index]?.awardDescription || ''}
                onChange={(e) => handleChange(e, index)}
              />

              <div className='mt-4'></div>
            </motion.div>
          );
        })}
      </div>

      <div
        onClick={() => addNewAward()}
        className='flex flex-row items-center gap-2 text-light-text-secondary text text-md dark:text-dark-text-secondary hover:text-light-text-primary hover:dark:text-dark-text-primary cursor-pointer group'
      >
        <p className='text text-lg'> + </p>
        <p className='underline underline-offset-2'>Add Award</p>
      </div>
    </div>
  );
}
