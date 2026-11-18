'use client';
import { ResumeInterface, SectionKey } from '@/components/builder/previousResumes/ResumeInterface';
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
    <div className='flex lg:h-screen'>
      <div className='flex flex-col gap-10 xl:gap-14 lg:ml-64 p-3 sm:p-4 w-full mt-14 lg:mt-0 lg:w-[35vw] 2xl:w-[40vw] overflow-x-hidden overflow-y-auto'>
        <SectionDragProvider
          value={{
            dragHandleProps,
            isDragging: (index) => dragIndex === index,
          }}
        >
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
        </SectionDragProvider>
      </div>
    </div>
  );
}
