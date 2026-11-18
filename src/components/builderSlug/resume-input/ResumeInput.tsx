'use client';
import {
  ResumeInterface,
  SectionKey,
} from '@/components/builder/previousResumes/ResumeInterface';
import { DEFAULT_SECTION_ORDER } from '@/lib/resumeDefaults';
import { reorderSections } from '@/lib/slices/resumeSlice';
import { useAppDispatch } from '@/lib/store/hooks';
import Awards from './awards/Awards';
import Certifications from './certifications/Certifications';
import Education from './education/Education';
import Languages from './languages/Languages';
import Profile from './profile/Profile';
import Projects from './projects/Projects';
import References from './references/References';
import { SectionDragProvider } from './shared/SectionDragContext';
import useDragReorder from './shared/useDragReorder';
import Skills from './skills/Skills';
import WorkExperience from './workExperience/WorkExperience';

const sectionComponents: Record<
  SectionKey,
  React.ComponentType<{ resume: ResumeInterface | undefined }>
> = {
  profile: Profile,
  skills: Skills,
  experience: WorkExperience,
  education: Education,
  projects: Projects,
  certifications: Certifications,
  awards: Awards,
  references: References,
  languages: Languages,
};

export default function ResumeInput({
  resume,
}: {
  resume: ResumeInterface | undefined;
}) {
  const dispatch = useAppDispatch();
  const order = resume?.sectionOrder ?? DEFAULT_SECTION_ORDER;

  const move = (from: number, to: number) =>
    dispatch(reorderSections({ id: resume?.id ?? '', from, to }));
  const { dragIndex, dragHandleProps, dropProps } = useDragReorder(move);

  return (
    <div className='min-h-0 w-full flex-1 overflow-y-auto bg-light-background pt-14 dark:bg-dark-background lg:w-[38%] lg:shrink-0 lg:pt-0 2xl:w-[40%]'>
      <div className='mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10'>
        <header className='mb-10 border-b border-light-ring-secondary pb-6 dark:border-dark-ring-secondary'>
          <div className='eyebrow'>Resume details</div>
          <h1 className='mt-2 truncate text-xl font-semibold tracking-[-0.02em]'>
            {resume?.fileName ?? 'Untitled resume'}
          </h1>
          <p className='mt-1.5 text-[13px] text-light-text-secondary dark:text-dark-text-secondary'>
            Edit a section and the preview updates as you type.
          </p>
        </header>

        <SectionDragProvider
          value={{
            dragHandleProps,
            isDragging: (index) => dragIndex === index,
          }}
        >
          <div className='flex flex-col gap-12'>
            {order.map((section, index) => {
              const Component = sectionComponents[section];
              return (
                <div
                  key={section}
                  {...dropProps(index)}
                  className={dragIndex === index ? 'opacity-40' : ''}
                >
                  <Component resume={resume} />
                </div>
              );
            })}
          </div>
        </SectionDragProvider>
      </div>
    </div>
  );
}
