'use client';
import { DeleteSvg } from '@/components/builder/previousResumes/DeleteSvg';
import { ResumeInterface } from '@/components/builder/previousResumes/ResumeInterface';
import { Tooltip } from '@/components/tooltip/ToolTip';
import RefContext from '@/lib/providers/RefContext';
import {
  addNewResumeLanguage,
  deleteResumeLanguage,
  updateResumeLanguage,
} from '@/lib/slices/resumeSlice';
import { useAppDispatch } from '@/lib/store/hooks';
import { motion } from 'framer-motion';
import { useContext } from 'react';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa6';
import { LanguageSvg } from '../../navbar/svgs/LanguageSvg';
import InputField from '../inputComponents/InputField';

export default function Languages({
  resume,
}: {
  resume: ResumeInterface | undefined;
}) {
  const { languagesRef } = useContext(RefContext);
  const dispatch = useAppDispatch();

  const addNewLanguage = () => {
    dispatch(
      addNewResumeLanguage({
        id: resume?.id ?? '',
      })
    );
  };

  const deleteLanguage = (index: number) => {
    dispatch(
      deleteResumeLanguage({
        id: resume?.id ?? '',
        index: index,
      })
    );
  };

  const moveLanguageUp = (index: number) => {
    if (index === 0 || !resume?.languages) return;

    const prevLanguage = resume.languages[index - 1];
    const currentLanguage = resume.languages[index];

    dispatch(
      updateResumeLanguage({
        id: resume.id,
        index: index - 1,
        value: currentLanguage,
      })
    );

    dispatch(
      updateResumeLanguage({
        id: resume.id,
        index: index,
        value: prevLanguage,
      })
    );
  };

  const moveLanguageDown = (index: number) => {
    if (!resume?.languages || index === resume.languages.length - 1) return;

    const nextLanguage = resume.languages[index + 1];
    const currentLanguage = resume.languages[index];

    dispatch(
      updateResumeLanguage({
        id: resume.id,
        index: index + 1,
        value: currentLanguage,
      })
    );

    dispatch(
      updateResumeLanguage({
        id: resume.id,
        index: index,
        value: nextLanguage,
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
      updateResumeLanguage({
        id: resume?.id ?? '',
        index: index,
        value: {
          ...resume?.languages?.[index],
          [name]: value,
        },
      })
    );
  };

  return (
    <div className='w-full flex flex-col gap-4'>
      <div ref={languagesRef} className='flex flex-row gap-2 items-center'>
        <LanguageSvg className='w-8 h-8 text-light-text-primary dark:text-dark-text-primary' />
        <p className='text text-3xl text-light-text-primary dark:text-dark-text-primary'>
          Languages
        </p>
      </div>

      <div className='border-dark-text-secondary dark:border-light-text-secondary border-b-2'></div>

      <div className='flex flex-col gap-6'>
        {resume?.languages?.map((field, index) => {
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
                      onClick={() => moveLanguageUp(index)}
                    />
                  </Tooltip>
                )}

                {index === resume?.languages?.length - 1 ? null : (
                  <Tooltip text='Move Down'>
                    <FaArrowDown
                      className='text text-xl text-light-text-secondary dark:text-dark-text-secondary cursor-pointer'
                      onClick={() => moveLanguageDown(index)}
                    />
                  </Tooltip>
                )}

                <Tooltip text='Delete'>
                  <DeleteSvg
                    onClick={() => deleteLanguage(index)}
                    className='text text-2xl text-light-text-secondary dark:text-dark-text-secondary hover:text-red-500 hover:dark:text-red-500 cursor-pointer'
                  />
                </Tooltip>
              </div>

              <div className='flex flex-row flex-wrap justify-start gap-2'>
                <InputField
                  label='Language'
                  type='text'
                  name='language'
                  placeholder='English'
                  value={resume?.languages[index]?.language || ''}
                  onChange={(e) => handleChange(e, index)}
                />
              </div>

              <div className='mt-4'></div>
            </motion.div>
          );
        })}
      </div>

      <div
        onClick={() => addNewLanguage()}
        className='flex flex-row items-center gap-2 text-light-text-secondary text text-md dark:text-dark-text-secondary hover:text-light-text-primary hover:dark:text-dark-text-primary cursor-pointer group'
      >
        <p className='text text-lg'> + </p>
        <p className='underline underline-offset-2'>Add Language</p>
      </div>
    </div>
  );
}
