import type { SectionKey } from '@/components/builder/previousResumes/ResumeInterface';
import { SECTION_HINTS, SECTION_LABELS } from '@/lib/resumeDesign';
import type { IconType } from 'react-icons';
import {
  LuAward,
  LuBadgeCheck,
  LuBriefcase,
  LuFolderGit2,
  LuGraduationCap,
  LuLanguages,
  LuLayers,
  LuUser,
  LuUsers,
} from 'react-icons/lu';

export const SECTION_ICONS: Record<SectionKey, IconType> = {
  profile: LuUser,
  skills: LuLayers,
  experience: LuBriefcase,
  education: LuGraduationCap,
  projects: LuFolderGit2,
  certifications: LuBadgeCheck,
  awards: LuAward,
  references: LuUsers,
  languages: LuLanguages,
};

export const SECTION_META: Record<
  SectionKey,
  { label: string; hint: string; icon: IconType }
> = (Object.keys(SECTION_LABELS) as SectionKey[]).reduce(
  (map, key) => ({
    ...map,
    [key]: {
      label: SECTION_LABELS[key],
      hint: SECTION_HINTS[key],
      icon: SECTION_ICONS[key],
    },
  }),
  {} as Record<SectionKey, { label: string; hint: string; icon: IconType }>
);
