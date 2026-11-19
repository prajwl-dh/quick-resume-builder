'use client';

import type { ResumeInterface, SectionKey } from '@/components/builder/previousResumes/ResumeInterface';
import { DEFAULT_SECTION_ORDER } from '@/lib/resumeDefaults';
import { toggleSectionVisibility } from '@/lib/slices/resumeSlice';
import { useAppDispatch } from '@/lib/store/hooks';
import { motion } from 'framer-motion';
import { LuArrowLeft, LuArrowRight, LuEye, LuEyeOff } from 'react-icons/lu';
import { SECTION_META } from './sectionMeta';
import AwardsEditor from './sections/AwardsEditor';
import CertificationsEditor from './sections/CertificationsEditor';
import EducationEditor from './sections/EducationEditor';
import ExperienceEditor from './sections/ExperienceEditor';
import LanguagesEditor from './sections/LanguagesEditor';
import ProfileEditor from './sections/ProfileEditor';
import ProjectsEditor from './sections/ProjectsEditor';
import ReferencesEditor from './sections/ReferencesEditor';
import SkillsEditor from './sections/SkillsEditor';

const editors: Record<SectionKey, React.ComponentType<{ resume: ResumeInterface }>> = {
  profile: ProfileEditor,
  skills: SkillsEditor,
  experience: ExperienceEditor,
  education: EducationEditor,
  projects: ProjectsEditor,
  certifications: CertificationsEditor,
  awards: AwardsEditor,
  references: ReferencesEditor,
  languages: LanguagesEditor,
};

export default function EditorPane({
  resume,
  active,
  onChange,
  onFinish,
}: {
  resume: ResumeInterface;
  active: SectionKey;
  onChange: (section: SectionKey) => void;
  onFinish: () => void;
}) {
  const dispatch = useAppDispatch();
  const order = (resume.sectionOrder ?? DEFAULT_SECTION_ORDER).filter((section) =>
    DEFAULT_SECTION_ORDER.includes(section)
  );
  const currentIndex = order.indexOf(active);
  const previous = currentIndex > 0 ? order[currentIndex - 1] : null;
  const next = currentIndex < order.length - 1 ? order[currentIndex + 1] : null;
  const hidden = resume.hiddenSections?.includes(active) ?? false;
  const meta = SECTION_META[active];
  const Icon = meta.icon;
  const Editor = editors[active];

  return (
    <div className='mx-auto w-full max-w-[660px] px-4 pb-16 pt-6 sm:px-7 sm:pt-8'>
      <motion.div
        key={active}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      >
        <header className='mb-6'>
          <div className='flex items-start gap-3'>
            <span className='mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-[11px] bg-accent-soft text-accent'>
              <Icon className='h-[18px] w-[18px]' />
            </span>
            <div className='min-w-0 flex-1'>
              <div className='flex flex-wrap items-center gap-2'>
                <h1 className='text-[22px] font-semibold leading-tight tracking-[-0.02em] text-ink'>
                  {meta.label}
                </h1>
                {hidden ? (
                  <span className='rounded-full border border-line bg-sunken px-2 py-0.5 text-[10.5px] font-semibold uppercase tracking-[0.08em] text-ink-faint'>
                    Hidden from PDF
                  </span>
                ) : null}
              </div>
              <p className='mt-1 max-w-lg text-[13px] leading-[1.55] text-ink-soft'>{meta.hint}</p>
            </div>
            <button
              type='button'
              onClick={() =>
                dispatch(toggleSectionVisibility({ id: resume.id, section: active }))
              }
              className='btn btn-secondary btn-sm mt-0.5 shrink-0'
              aria-pressed={!hidden}
              title={hidden ? 'Show this section in the PDF' : 'Hide this section from the PDF'}
            >
              {hidden ? <LuEyeOff className='h-3.5 w-3.5' /> : <LuEye className='h-3.5 w-3.5' />}
              <span className='hidden sm:inline'>{hidden ? 'Hidden' : 'Shown'}</span>
            </button>
          </div>
        </header>

        <Editor resume={resume} />
      </motion.div>

      <div className='mt-10 flex items-center justify-between gap-3 border-t border-line pt-5'>
        {previous ? (
          <button
            type='button'
            onClick={() => onChange(previous)}
            className='btn btn-secondary'
          >
            <LuArrowLeft className='h-4 w-4' />
            {SECTION_META[previous].label}
          </button>
        ) : (
          <span />
        )}
        {next ? (
          <button type='button' onClick={() => onChange(next)} className='btn btn-primary'>
            {SECTION_META[next].label}
            <LuArrowRight className='h-4 w-4' />
          </button>
        ) : (
          <button type='button' onClick={onFinish} className='btn btn-primary'>
            Review resume
            <LuArrowRight className='h-4 w-4' />
          </button>
        )}
      </div>
    </div>
  );
}
