'use client';
import { DeleteSvg } from '@/components/builder/previousResumes/DeleteSvg';
import { ResumeInterface } from '@/components/builder/previousResumes/ResumeInterface';
import { Tooltip } from '@/components/tooltip/ToolTip';
import RefContext from '@/lib/providers/RefContext';
import {
  addNewResumeCertification,
  deleteResumeCertification,
  updateResumeCertification,
} from '@/lib/slices/resumeSlice';
import { useAppDispatch } from '@/lib/store/hooks';
import { motion } from 'framer-motion';
import { useContext } from 'react';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa6';
import { CertificateSvg } from '../../navbar/svgs/CertificateSvg';
import InputField from '../inputComponents/InputField';
import TextAreaField from '../inputComponents/TextAreaField';

export default function Certifications({
  resume,
}: {
  resume: ResumeInterface | undefined;
}) {
  const { certificationsRef } = useContext(RefContext);
  const dispatch = useAppDispatch();

  const addNewCertification = () => {
    dispatch(
      addNewResumeCertification({
        id: resume?.id ?? '',
      })
    );
  };

  const deleteCertification = (index: number) => {
    dispatch(
      deleteResumeCertification({
        id: resume?.id ?? '',
        index: index,
      })
    );
  };

  const moveCertificationUp = (index: number) => {
    if (index === 0 || !resume?.certifications) return;

    const prevCertification = resume.certifications[index - 1];
    const currentCertification = resume.certifications[index];

    dispatch(
      updateResumeCertification({
        id: resume.id,
        index: index - 1,
        value: currentCertification,
      })
    );

    dispatch(
      updateResumeCertification({
        id: resume.id,
        index: index,
        value: prevCertification,
      })
    );
  };

  const moveCertificationDown = (index: number) => {
    if (!resume?.certifications || index === resume.certifications.length - 1)
      return;

    const nextCertification = resume.certifications[index + 1];
    const currentCertification = resume.certifications[index];

    dispatch(
      updateResumeCertification({
        id: resume.id,
        index: index + 1,
        value: currentCertification,
      })
    );

    dispatch(
      updateResumeCertification({
        id: resume.id,
        index: index,
        value: nextCertification,
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
      updateResumeCertification({
        id: resume?.id ?? '',
        index: index,
        value: {
          ...resume?.certifications?.[index],
          [name]: value,
        },
      })
    );
  };

  return (
    <div className='w-full flex flex-col gap-4'>
      <div ref={certificationsRef} className='flex flex-row gap-2 items-center'>
        <CertificateSvg className='w-8 h-8 text-light-text-primary dark:text-dark-text-primary' />
        <p className='text text-3xl text-light-text-primary dark:text-dark-text-primary'>
          Certifications
        </p>
      </div>

      <div className='border-dark-text-secondary dark:border-light-text-secondary border-b-2'></div>

      <div className='flex flex-col gap-6'>
        {resume?.certifications?.map((field, index) => {
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
                      onClick={() => moveCertificationUp(index)}
                    />
                  </Tooltip>
                )}

                {index === resume?.certifications?.length - 1 ? null : (
                  <Tooltip text='Move Down'>
                    <FaArrowDown
                      className='text text-xl text-light-text-secondary dark:text-dark-text-secondary cursor-pointer'
                      onClick={() => moveCertificationDown(index)}
                    />
                  </Tooltip>
                )}

                <Tooltip text='Delete'>
                  <DeleteSvg
                    onClick={() => deleteCertification(index)}
                    className='text text-2xl text-light-text-secondary dark:text-dark-text-secondary hover:text-red-500 hover:dark:text-red-500 cursor-pointer'
                  />
                </Tooltip>
              </div>

              <div className='flex flex-row flex-wrap justify-start gap-2'>
                <InputField
                  label='Certification Name'
                  type='text'
                  name='certificationName'
                  placeholder='Acme Certification'
                  value={resume?.certifications[index]?.certificationName || ''}
                  onChange={(e) => handleChange(e, index)}
                />
              </div>

              <TextAreaField
                label='Additional Info (If Any)'
                placeholder='Description Here'
                name='certificationDescription'
                rows={5}
                value={
                  resume?.certifications[index]?.certificationDescription || ''
                }
                onChange={(e) => handleChange(e, index)}
              />

              <div className='mt-4'></div>
            </motion.div>
          );
        })}
      </div>

      <div
        onClick={() => addNewCertification()}
        className='flex flex-row items-center gap-2 text-light-text-secondary text text-md dark:text-dark-text-secondary hover:text-light-text-primary hover:dark:text-dark-text-primary cursor-pointer group'
      >
        <p className='text text-lg'> + </p>
        <p className='underline underline-offset-2'>Add Certification</p>
      </div>
    </div>
  );
}
