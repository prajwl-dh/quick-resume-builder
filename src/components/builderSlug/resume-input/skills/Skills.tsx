'use client';
import { DeleteSvg } from '@/components/builder/previousResumes/DeleteSvg';
import { ResumeInterface } from '@/components/builder/previousResumes/ResumeInterface';
import { Tooltip } from '@/components/tooltip/ToolTip';
import RefContext from '@/lib/providers/RefContext';
import {
  addNewResumeSkills,
  deleteResumeSkills,
  updateResumeSkills,
} from '@/lib/slices/resumeSlice';
import { useAppDispatch } from '@/lib/store/hooks';
import { motion } from 'framer-motion';
import { useContext } from 'react';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa6';
import { SkillsSvg } from '../../navbar/svgs/SkillsSvg';
import InputField from '../inputComponents/InputField';

export default function Skills({
  resume,
}: {
  resume: ResumeInterface | undefined;
}) {
  const { skillsRef } = useContext(RefContext);
  const dispatch = useAppDispatch();

  const addNewSkill = () => {
    dispatch(
      addNewResumeSkills({
        id: resume?.id ?? '',
      })
    );
  };

  const deleteSkill = (index: number) => {
    dispatch(
      deleteResumeSkills({
        id: resume?.id ?? '',
        index: index,
      })
    );
  };

  const moveSkillUp = (index: number) => {
    if (index === 0 || !resume?.skills) return;

    const prevSkill = resume.skills[index - 1];
    const currentSkill = resume.skills[index];

    dispatch(
      updateResumeSkills({
        id: resume.id,
        index: index - 1,
        value: currentSkill,
      })
    );

    dispatch(
      updateResumeSkills({
        id: resume.id,
        index: index,
        value: prevSkill,
      })
    );
  };

  const moveSkillDown = (index: number) => {
    if (!resume?.skills || index === resume.skills.length - 1) return;

    const nextSkill = resume.skills[index + 1];
    const currentSkill = resume.skills[index];

    dispatch(
      updateResumeSkills({
        id: resume.id,
        index: index + 1,
        value: currentSkill,
      })
    );

    dispatch(
      updateResumeSkills({
        id: resume.id,
        index: index,
        value: nextSkill,
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
      updateResumeSkills({
        id: resume?.id ?? '',
        index: index,
        value: {
          ...resume?.skills?.[index],
          [name]: value,
        },
      })
    );
  };

  return (
    <div className='w-full flex flex-col gap-4'>
      <div ref={skillsRef} className='flex flex-row gap-2 items-center'>
        <SkillsSvg className='w-8 h-8 text-light-text-primary dark:text-dark-text-primary' />
        <p className='text text-3xl text-light-text-primary dark:text-dark-text-primary'>
          Skills
        </p>
      </div>

      <div className='border-dark-text-secondary dark:border-light-text-secondary border-b-2'></div>

      <div className='flex flex-col gap-6'>
        {resume?.skills?.map((field, index) => {
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
                      onClick={() => moveSkillUp(index)}
                    />
                  </Tooltip>
                )}

                {index === resume?.skills?.length - 1 ? null : (
                  <Tooltip text='Move Down'>
                    <FaArrowDown
                      className='text text-xl text-light-text-secondary dark:text-dark-text-secondary cursor-pointer'
                      onClick={() => moveSkillDown(index)}
                    />
                  </Tooltip>
                )}

                <Tooltip text='Delete'>
                  <DeleteSvg
                    onClick={() => deleteSkill(index)}
                    className='text text-2xl text-light-text-secondary dark:text-dark-text-secondary hover:text-red-500 hover:dark:text-red-500 cursor-pointer'
                  />
                </Tooltip>
              </div>

              <div className='flex flex-row flex-wrap justify-start gap-2'>
                <InputField
                  label=''
                  type='text'
                  name='skillRelevantSkills'
                  placeholder='Skill Category : Skill 1, Skill2, ...'
                  value={resume?.skills[index]?.skillRelevantSkills || ''}
                  onChange={(e) => handleChange(e, index)}
                />
              </div>
              <div className='mt-4'></div>
            </motion.div>
          );
        })}
      </div>

      <div
        onClick={() => addNewSkill()}
        className='flex flex-row items-center gap-2 text-light-text-secondary text text-md dark:text-dark-text-secondary hover:text-light-text-primary hover:dark:text-dark-text-primary cursor-pointer group'
      >
        <p className='text text-lg'> + </p>
        <p className='underline underline-offset-2'>Add Skill</p>
      </div>
    </div>
  );
}
