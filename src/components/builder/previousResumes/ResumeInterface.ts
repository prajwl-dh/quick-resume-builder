export type SectionKey =
  | 'profile'
  | 'skills'
  | 'experience'
  | 'education'
  | 'projects'
  | 'certifications'
  | 'awards'
  | 'references'
  | 'languages';

export type ResumeTemplate =
  | 'ivory'
  | 'meridian'
  | 'folio'
  | 'onyx'
  | 'ledger'
  | 'mono'
  | 'linea'
  | 'swiss'
  | 'gazette'
  | 'studio'
  | 'atlas'
  | 'column';

export type ResumeFont =
  | 'inter'
  | 'source'
  | 'lora'
  | 'garamond'
  | 'playfair'
  | 'manrope'
  | 'work'
  | 'space'
  | 'plex'
  | 'plex-mono'
  | 'franklin'
  | 'instrument';

export type ResumePaper = 'a4' | 'letter';
export type ResumeMargin = 'narrow' | 'normal' | 'wide';

export interface SkillGroup {
  id: string;
  name: string;
  skills: string[];
}

export interface ResumeLanguage {
  id: string;
  name: string;
  proficiency: string;
}

export interface DateRange {
  startMonth: string;
  startYear: string;
  endMonth: string;
  endYear: string;
  present: boolean;
}

export const DEFAULT_EMPTY_RANGE: DateRange = {
  startMonth: '',
  startYear: '',
  endMonth: '',
  endYear: '',
  present: false,
};

export interface ResumeTheme {
  template: ResumeTemplate;
  color: string;
  font: ResumeFont;
  onePage?: boolean;
  /** Type scale, 0.9 to 1.15. */
  scale?: number;
  /** Line height, 1.3 to 1.7. */
  leading?: number;
  /** Vertical rhythm between sections, 0.75 to 1.4. */
  spacing?: number;
  margin?: ResumeMargin;
  paper?: ResumePaper;
}

export interface ResumeInterface {
  id: string;
  fileName?: string;
  title: string;
  last_accessed: string;
  profile: ResumeProfile;
  skills: string;
  skillGroups?: SkillGroup[];
  experience: ResumeWorkExperience[];
  education: ResumeEducation[];
  projects: ResumeProjects[];
  certifications: ResumeCertifications[];
  awards: ResumeAwards[];
  references: ResumeReferences[];
  languages: string;
  languageItems?: ResumeLanguage[];
  sectionOrder?: SectionKey[];
  hiddenSections?: SectionKey[];
  theme?: ResumeTheme;
  isExample?: boolean;
}

export interface ResumeProfile {
  fullName?: string;
  intro?: string;
  email?: string;
  location?: string;
  phone?: string;
  website?: string;
  linkedIn?: string;
  gitHub?: string;
  profileCustomField?: { fieldName: string; fieldValue: string }[];
  summary?: string;
}

export interface ResumeWorkExperience {
  companyName?: string;
  jobTitle?: string;
  jobLocation?: string;
  jobDate?: string;
  jobDateRange?: DateRange;
  jobDescription?: string;
}

export interface ResumeEducation {
  schoolName?: string;
  schoolDate?: string;
  schoolDateRange?: DateRange;
  schoolMajor?: string;
  schoolGPA?: string;
  schoolDescription?: string;
}

export interface ResumeProjects {
  projectName?: string;
  projectLink?: string;
  projectDescription?: string;
}

export interface ResumeCertifications {
  certificationName?: string;
  certificationIssuer?: string;
  certificationDate?: string;
  certificationDescription?: string;
}

export interface ResumeAwards {
  awardName?: string;
  awardIssuer?: string;
  awardDate?: string;
  awardDescription?: string;
}

export interface ResumeReferences {
  referenceName?: string;
  referenceRole?: string;
  referenceCompany?: string;
  referenceEmail?: string;
  referenceDescription?: string;
}

export interface ResumeState {
  value: ResumeInterface[];
}
