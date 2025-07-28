'use client';
import { DeleteSvg } from '@/components/builder/previousResumes/DeleteSvg';
import { ResumeInterface } from '@/components/builder/previousResumes/ResumeInterface';
import { Tooltip } from '@/components/tooltip/ToolTip';
import RefContext from '@/lib/providers/RefContext';
import {
  addNewResumeProject,
  deleteResumeProject,
  updateResumeProject,
} from '@/lib/slices/resumeSlice';
import { useAppDispatch } from '@/lib/store/hooks';
import { motion } from 'framer-motion';
import { useContext } from 'react';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa6';
import { ProjectSvg } from '../../navbar/svgs/ProjectSvg';
import InputField from '../inputComponents/InputField';
import TextAreaField from '../inputComponents/TextAreaField';

export default function Projects({
  resume,
}: {
  resume: ResumeInterface | undefined;
}) {
  const { projectsRef } = useContext(RefContext);
  const dispatch = useAppDispatch();

  const addNewProject = () => {
    dispatch(
      addNewResumeProject({
        id: resume?.id ?? '',
      })
    );
  };

  const deleteProject = (index: number) => {
    dispatch(
      deleteResumeProject({
        id: resume?.id ?? '',
        index: index,
      })
    );
  };

  const moveProjectUp = (index: number) => {
    if (index === 0 || !resume?.projects) return;

    const prevProject = resume.projects[index - 1];
    const currentProject = resume.projects[index];

    dispatch(
      updateResumeProject({
        id: resume.id,
        index: index - 1,
        value: currentProject,
      })
    );

    dispatch(
      updateResumeProject({
        id: resume.id,
        index: index,
        value: prevProject,
      })
    );
  };

  const moveProjectDown = (index: number) => {
    if (!resume?.projects || index === resume.projects.length - 1) return;

    const nextProject = resume.projects[index + 1];
    const currentProject = resume.projects[index];

    dispatch(
      updateResumeProject({
        id: resume.id,
        index: index + 1,
        value: currentProject,
      })
    );

    dispatch(
      updateResumeProject({
        id: resume.id,
        index: index,
        value: nextProject,
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
      updateResumeProject({
        id: resume?.id ?? '',
        index: index,
        value: {
          ...resume?.projects?.[index],
          [name]: value,
        },
      })
    );
  };

  return (
    <div className='w-full flex flex-col gap-4'>
      <div ref={projectsRef} className='flex flex-row gap-2 items-center'>
        <ProjectSvg className='w-8 h-8 text-light-text-primary dark:text-dark-text-primary' />
        <p className='text text-3xl text-light-text-primary dark:text-dark-text-primary'>
          Projects
        </p>
      </div>

      <div className='border-dark-text-secondary dark:border-light-text-secondary border-b-2'></div>

      <div className='flex flex-col gap-6'>
        {resume?.projects?.map((field, index) => {
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
                      onClick={() => moveProjectUp(index)}
                    />
                  </Tooltip>
                )}

                {index === resume?.projects?.length - 1 ? null : (
                  <Tooltip text='Move Down'>
                    <FaArrowDown
                      className='text text-xl text-light-text-secondary dark:text-dark-text-secondary cursor-pointer'
                      onClick={() => moveProjectDown(index)}
                    />
                  </Tooltip>
                )}

                <Tooltip text='Delete'>
                  <DeleteSvg
                    onClick={() => deleteProject(index)}
                    className='text text-2xl text-light-text-secondary dark:text-dark-text-secondary hover:text-red-500 hover:dark:text-red-500 cursor-pointer'
                  />
                </Tooltip>
              </div>

              <div className='flex flex-row flex-wrap justify-start gap-2'>
                <InputField
                  label='Project Name'
                  type='text'
                  name='projectName'
                  placeholder='Acme Project'
                  value={resume?.projects[index]?.projectName || ''}
                  onChange={(e) => handleChange(e, index)}
                />
              </div>

              <TextAreaField
                label='Additional Info (If Any)'
                placeholder='Description Here'
                name='projectDescription'
                rows={5}
                value={resume?.projects[index]?.projectDescription || ''}
                onChange={(e) => handleChange(e, index)}
              />

              <div className='mt-4'></div>
            </motion.div>
          );
        })}
      </div>

      <div
        onClick={() => addNewProject()}
        className='flex flex-row items-center gap-2 text-light-text-secondary text text-md dark:text-dark-text-secondary hover:text-light-text-primary hover:dark:text-dark-text-primary cursor-pointer group'
      >
        <p className='text text-lg'> + </p>
        <p className='underline underline-offset-2'>Add Project</p>
      </div>
    </div>
  );
}
