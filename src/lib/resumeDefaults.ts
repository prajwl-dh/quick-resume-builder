import {
  DateRange,
  DEFAULT_EMPTY_RANGE,
  ResumeInterface,
  ResumeLanguage,
  ResumeTheme,
  SectionKey,
  SkillGroup,
} from '@/components/builder/previousResumes/ResumeInterface';
import { v4 as uuidv4 } from 'uuid';

export const EXAMPLE_RESUME_ID = 'example-resume';

export const MONTHS = [
  { value: '01', label: 'January', short: 'Jan' },
  { value: '02', label: 'February', short: 'Feb' },
  { value: '03', label: 'March', short: 'Mar' },
  { value: '04', label: 'April', short: 'Apr' },
  { value: '05', label: 'May', short: 'May' },
  { value: '06', label: 'June', short: 'Jun' },
  { value: '07', label: 'July', short: 'Jul' },
  { value: '08', label: 'August', short: 'Aug' },
  { value: '09', label: 'September', short: 'Sep' },
  { value: '10', label: 'October', short: 'Oct' },
  { value: '11', label: 'November', short: 'Nov' },
  { value: '12', label: 'December', short: 'Dec' },
];

export const YEARS = Array.from({ length: 76 }, (_, i) =>
  String(new Date().getFullYear() + 5 - i)
);

export const PROFICIENCY_LEVELS = [
  'Native',
  'Fluent',
  'Advanced',
  'Intermediate',
  'Beginner',
  'Basic',
];

export const COMMON_SKILLS = [
  'JavaScript',
  'TypeScript',
  'React',
  'Next.js',
  'Node.js',
  'Python',
  'HTML',
  'CSS',
  'Tailwind CSS',
  'GraphQL',
  'SQL',
  'Git',
  'Docker',
  'AWS',
  'Figma',
  'Jest',
  'Communication',
  'Leadership',
  'Teamwork',
  'Problem Solving',
  'Project Management',
  'Public Speaking',
];

export const SECTION_LABELS: Record<SectionKey, string> = {
  profile: 'Profile',
  skills: 'Skills',
  experience: 'Work Experience',
  education: 'Education',
  projects: 'Projects',
  certifications: 'Certifications',
  awards: 'Awards',
  references: 'References',
  languages: 'Languages',
};

export const DEFAULT_SECTION_ORDER: SectionKey[] = [
  'profile',
  'skills',
  'experience',
  'education',
  'projects',
  'certifications',
  'awards',
  'references',
  'languages',
];

export const DEFAULT_THEME: ResumeTheme = {
  template: 'classic',
  color: '#1f2937',
  font: 'Helvetica',
  onePage: true,
};

export const TEMPLATE_OPTIONS: { value: ResumeTheme['template']; label: string; description: string }[] = [
  { value: 'classic', label: 'Classic', description: 'Timeless, rule-lined sections' },
  { value: 'modern', label: 'Modern', description: 'Bold accent headings' },
  { value: 'minimal', label: 'Minimal', description: 'Clean and compact' },
];

export const COLOR_OPTIONS = [
  { value: '#1f2937', label: 'Slate' },
  { value: '#2563eb', label: 'Blue' },
  { value: '#0f766e', label: 'Teal' },
  { value: '#7c3aed', label: 'Violet' },
  { value: '#b91c1c', label: 'Crimson' },
  { value: '#b45309', label: 'Amber' },
];

export const FONT_OPTIONS: { value: ResumeTheme['font']; label: string; sample: string }[] = [
  { value: 'Helvetica', label: 'Sans', sample: 'Clean sans-serif' },
  { value: 'Times-Roman', label: 'Serif', sample: 'Classic serif' },
  { value: 'Courier', label: 'Mono', sample: 'Monospaced' },
];

export function emptyRange(): DateRange {
  return { ...DEFAULT_EMPTY_RANGE };
}

export function formatDatePart(month: string, year: string): string {
  if (!month && !year) return '';
  const monthLabel = MONTHS.find((m) => m.value === month)?.short ?? month;
  return [monthLabel, year].filter(Boolean).join(' ');
}

export function formatDateRange(range?: DateRange): string {
  if (!range) return '';
  const start = formatDatePart(range.startMonth, range.startYear);
  const end = range.present
    ? 'Present'
    : formatDatePart(range.endMonth, range.endYear);
  if (!start && !end) return '';
  if (!start) return end;
  if (!end) return start;
  return `${start} – ${end}`;
}

export function parseLegacyDate(value?: string): DateRange {
  const range = emptyRange();
  if (!value) return range;

  const text = value.trim();
  if (/present|current|now|till date/i.test(text)) range.present = true;

  const parts = text.split(/\s*(?:-|–|—|to)\s*/i).filter(Boolean);
  const parsePart = (part: string): { month: string; year: string } => {
    const cleaned = part.trim().replace(/,/g, ' ');
    const monthMatch = MONTHS.find(
      (m) =>
        cleaned.toLowerCase().startsWith(m.label.toLowerCase()) ||
        cleaned.toLowerCase().startsWith(m.short.toLowerCase())
    );
    const yearMatch = cleaned.match(/\b(19|20)\d{2}\b/);
    return {
      month: monthMatch?.value ?? '',
      year: yearMatch?.[0] ?? '',
    };
  };

  if (parts.length > 0) {
    const start = parsePart(parts[0].replace(/present|current|now/i, ''));
    range.startMonth = start.month;
    range.startYear = start.year;
  }
  if (parts.length > 1 && !range.present) {
    const end = parsePart(parts[1]);
    range.endMonth = end.month;
    range.endYear = end.year;
  }
  return range;
}

export function splitBullets(value?: string): string[] {
  if (!value) return [''];
  const lines = value.split(/\r?\n/);
  return lines.length ? lines : [''];
}

export function skillsToLegacy(groups: SkillGroup[]): string {
  return groups
    .map((group) =>
      group.skills.length ? `${group.name}: ${group.skills.join(', ')}` : ''
    )
    .filter(Boolean)
    .join('\n\n');
}

export function languagesToLegacy(items: ResumeLanguage[]): string {
  return items
    .map((item) =>
      [item.name, item.proficiency].filter(Boolean).join(': ')
    )
    .filter(Boolean)
    .join('\n');
}

function splitSkills(value: string): string[] {
  return value
    .split(',')
    .map((skill) => skill.trim())
    .filter(Boolean);
}

export function legacyToSkillGroups(value?: string): SkillGroup[] {
  if (!value) return [];
  const groups: SkillGroup[] = [];
  let untitled: SkillGroup | null = null;

  value
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean)
    .forEach((line) => {
      const separator = line.indexOf(':');
      if (separator > -1) {
        groups.push({
          id: uuidv4(),
          name: line.slice(0, separator).trim() || 'Skills',
          skills: splitSkills(line.slice(separator + 1)),
        });
      } else {
        if (!untitled) {
          untitled = { id: uuidv4(), name: 'Skills', skills: [] };
          groups.push(untitled);
        }
        untitled.skills.push(...splitSkills(line));
      }
    });

  return groups;
}

export function legacyToLanguageItems(value?: string): ResumeLanguage[] {
  if (!value) return [];
  return value
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean)
    .flatMap((line) => {
      const separator = line.indexOf(':');
      if (separator > -1) {
        const label = line.slice(0, separator).trim() || 'Fluent';
        return splitSkills(line.slice(separator + 1)).map((name) => ({
          id: uuidv4(),
          name,
          proficiency: label,
        }));
      }
      return [{ id: uuidv4(), name: line, proficiency: 'Fluent' }];
    });
}

export function normalizeResume(resume: ResumeInterface): ResumeInterface {
  const sectionOrder =
    resume.sectionOrder && resume.sectionOrder.length
      ? DEFAULT_SECTION_ORDER.filter((key) => resume.sectionOrder!.includes(key))
      : [...DEFAULT_SECTION_ORDER];

  return {
    ...resume,
    sectionOrder: [
      ...sectionOrder,
      ...DEFAULT_SECTION_ORDER.filter((key) => !sectionOrder.includes(key)),
    ],
    hiddenSections: resume.hiddenSections ?? [],
    theme: { ...DEFAULT_THEME, ...(resume.theme ?? {}) },
    skillGroups:
      resume.skillGroups ??
      (typeof resume.skills === 'string' && resume.skills.trim()
        ? legacyToSkillGroups(resume.skills)
        : []),
    languageItems:
      resume.languageItems ??
      (typeof resume.languages === 'string' && resume.languages.trim()
        ? legacyToLanguageItems(resume.languages)
        : []),
    experience: (resume.experience ?? []).map((entry) => ({
      ...entry,
      jobDateRange:
        entry.jobDateRange ??
        (entry.jobDate ? parseLegacyDate(entry.jobDate) : emptyRange()),
    })),
    education: (resume.education ?? []).map((entry) => ({
      ...entry,
      schoolDateRange:
        entry.schoolDateRange ??
        (entry.schoolDate ? parseLegacyDate(entry.schoolDate) : emptyRange()),
    })),
    projects: resume.projects ?? [],
    certifications: resume.certifications ?? [],
    awards: resume.awards ?? [],
    references: resume.references ?? [],
  };
}

export function createExampleResume(): ResumeInterface {
  const example: ResumeInterface = {
    id: EXAMPLE_RESUME_ID,
    fileName: 'Example Resume',
    title: 'Example Software Engineer Resume',
    last_accessed: 'Tue, 17 Nov 2026 10:00:00 GMT',
    isExample: true,
    profile: {
      fullName: 'Alex Morgan',
      intro: 'Senior Frontend Engineer',
      email: 'alex.morgan@example.com',
      location: 'Austin, TX',
      phone: '+1 415 555 0132',
      website: 'https://alexmorgan.dev',
      linkedIn: 'https://www.linkedin.com/in/alexmorgan/',
      gitHub: 'https://github.com/alexmorgan',
      profileCustomField: [{ fieldName: 'Portfolio', fieldValue: 'alexmorgan.dev/work' }],
      summary:
        'Frontend engineer with 8+ years of experience building accessible, high-performance web applications.\nPassionate about design systems, developer experience and mentoring growing teams.',
    },
    skills: '',
    skillGroups: [
      {
        id: uuidv4(),
        name: 'Technical',
        skills: [
          'JavaScript',
          'TypeScript',
          'React',
          'Next.js',
          'Node.js',
          'Tailwind CSS',
          'GraphQL',
        ],
      },
      {
        id: uuidv4(),
        name: 'Tools',
        skills: ['Git', 'Docker', 'Figma', 'Jest', 'AWS'],
      },
      {
        id: uuidv4(),
        name: 'Soft Skills',
        skills: ['Communication', 'Mentoring', 'Problem Solving'],
      },
    ],
    experience: [
      {
        companyName: 'Northstar Labs',
        jobTitle: 'Senior Frontend Engineer',
        jobDate: 'Jan 2021 – Present',
        jobDateRange: {
          startMonth: '01',
          startYear: '2021',
          endMonth: '',
          endYear: '',
          present: true,
        },
        jobDescription:
          'Led a team of 4 engineers to rebuild the customer dashboard, improving load time by 45%.\nIntroduced a shared component library now used across 6 product teams.\nMentored two junior developers through weekly pairing and code reviews.',
      },
      {
        companyName: 'Pixel & Code',
        jobTitle: 'Frontend Developer',
        jobDate: 'Jun 2018 – Dec 2020',
        jobDateRange: {
          startMonth: '06',
          startYear: '2018',
          endMonth: '12',
          endYear: '2020',
          present: false,
        },
        jobDescription:
          'Built responsive e-commerce experiences for 20+ clients using React and Next.js.\nReduced bundle size by 30% through code splitting and image optimization.',
      },
    ],
    education: [
      {
        schoolName: 'University of Texas at Austin',
        schoolMajor: 'B.S. Computer Science',
        schoolDate: 'Aug 2014 – May 2018',
        schoolDateRange: {
          startMonth: '08',
          startYear: '2014',
          endMonth: '05',
          endYear: '2018',
          present: false,
        },
        schoolGPA: '3.8',
        schoolDescription:
          'Graduated with honors. Teaching assistant for Data Structures course.\nPresident of the Web Development Student Club.',
      },
    ],
    projects: [
      {
        projectName: 'OpenUI Component Library',
        projectDescription:
          'An accessible React component library with 40+ components and full TypeScript support.\nOpen-source project with 1.2k stars on GitHub.',
      },
      {
        projectName: 'Weatherly',
        projectDescription:
          'A real-time weather dashboard built with Next.js, GraphQL and Chart.js.',
      },
    ],
    certifications: [
      {
        certificationName: 'AWS Certified Developer – Associate',
        certificationDescription:
          'Issued 2023 · Valid through 2026.\nHands-on experience with Lambda, S3, DynamoDB and IAM.',
      },
    ],
    awards: [
      {
        awardName: 'Employee of the Year, Northstar Labs',
        awardDescription:
          'Recognized for outstanding contribution to the design system initiative in 2024.',
      },
    ],
    references: [
      {
        referenceName: 'Jordan Lee – Engineering Manager',
        referenceDescription:
          'Available upon request. jordan.lee@example.com',
      },
    ],
    languages: '',
    languageItems: [
      { id: uuidv4(), name: 'English', proficiency: 'Native' },
      { id: uuidv4(), name: 'Nepali', proficiency: 'Fluent' },
      { id: uuidv4(), name: 'Hindi', proficiency: 'Intermediate' },
    ],
    sectionOrder: [...DEFAULT_SECTION_ORDER],
    hiddenSections: [],
    theme: {
      template: 'modern',
      color: '#2563eb',
      font: 'Helvetica',
      onePage: true,
    },
  };

  example.skills = skillsToLegacy(example.skillGroups!);
  example.languages = languagesToLegacy(example.languageItems!);
  return example;
}
