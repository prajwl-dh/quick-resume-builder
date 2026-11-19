import {
  DateRange,
  DEFAULT_EMPTY_RANGE,
  ResumeFont,
  ResumeInterface,
  ResumeLanguage,
  ResumeTheme,
  SectionKey,
  SkillGroup,
} from '@/components/builder/previousResumes/ResumeInterface';
import {
  COLORS,
  DEFAULT_SECTION_ORDER as DESIGN_SECTION_ORDER,
  DEFAULT_THEME as DESIGN_DEFAULT_THEME,
  FONTS,
  FONT_IDS,
  MARGIN_SIZES,
  PAPER_SIZES,
  TEMPLATES,
  TEMPLATE_IDS,
  isHexColor,
} from '@/lib/resumeDesign';
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
  'SQL',
  'GraphQL',
  'REST APIs',
  'HTML',
  'CSS',
  'Tailwind CSS',
  'Git',
  'Docker',
  'AWS',
  'Figma',
  'Jest',
  'Accessibility',
  'Design systems',
  'Data analysis',
  'Excel',
  'Tableau',
  'Project management',
  'Communication',
  'Leadership',
  'Mentoring',
  'Problem solving',
  'Public speaking',
  'Customer research',
  'Copywriting',
  'SEO',
  'Photoshop',
  'Illustrator',
];

export { DEFAULT_SECTION_ORDER } from '@/lib/resumeDesign';
export { SECTION_LABELS } from '@/lib/resumeDesign';

export const DEFAULT_THEME: ResumeTheme = { ...DESIGN_DEFAULT_THEME };

export const TEMPLATE_OPTIONS = TEMPLATES.map((template) => ({
  value: template.id,
  label: template.name,
  description: template.note,
}));

export const COLOR_OPTIONS = COLORS;

export const FONT_OPTIONS = FONTS.map((font) => ({
  value: font.id,
  label: font.name,
  sample: font.group,
}));

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
  if (!value) return [];
  return value
    .split(/\r?\n/)
    .map((line) => line.replace(/^\s*[•\-–]\s*/, '').trim())
    .filter(Boolean);
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
    .map((item) => [item.name, item.proficiency].filter(Boolean).join(': '))
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

/** True when a section has anything worth printing. Empty sections are skipped. */
export function sectionHasContent(
  resume: ResumeInterface | undefined,
  section: SectionKey
): boolean {
  if (!resume) return false;
  const hasText = (value?: string) => Boolean(value?.trim());
  const hasRange = (range?: {
    startMonth?: string;
    startYear?: string;
    endMonth?: string;
    endYear?: string;
    present?: boolean;
  }) =>
    Boolean(
      range?.present ||
        hasText(range?.startMonth) ||
        hasText(range?.startYear) ||
        hasText(range?.endMonth) ||
        hasText(range?.endYear)
    );

  switch (section) {
    case 'profile':
      return [
        resume.profile.fullName,
        resume.profile.intro,
        resume.profile.email,
        resume.profile.phone,
        resume.profile.location,
        resume.profile.website,
        resume.profile.linkedIn,
        resume.profile.gitHub,
        resume.profile.summary,
        ...(resume.profile.profileCustomField ?? []).map((field) => field.fieldValue),
      ].some(hasText);
    case 'skills':
      return (
        (resume.skillGroups ?? []).some((group) =>
          group.skills.some((skill) => hasText(skill))
        ) || hasText(resume.skills)
      );
    case 'experience':
      return (resume.experience ?? []).some(
        (entry) =>
          [
            entry.companyName,
            entry.jobTitle,
            entry.jobLocation,
            entry.jobDescription,
          ].some(hasText) || hasRange(entry.jobDateRange)
      );
    case 'education':
      return (resume.education ?? []).some(
        (entry) =>
          [
            entry.schoolName,
            entry.schoolMajor,
            entry.schoolGPA,
            entry.schoolDescription,
          ].some(hasText) || hasRange(entry.schoolDateRange)
      );
    case 'projects':
      return (resume.projects ?? []).some(
        (entry) => hasText(entry.projectName) || hasText(entry.projectDescription)
      );
    case 'certifications':
      return (resume.certifications ?? []).some(
        (entry) =>
          hasText(entry.certificationName) ||
          hasText(entry.certificationIssuer) ||
          hasText(entry.certificationDescription)
      );
    case 'awards':
      return (resume.awards ?? []).some(
        (entry) =>
          hasText(entry.awardName) ||
          hasText(entry.awardIssuer) ||
          hasText(entry.awardDescription)
      );
    case 'references':
      return (resume.references ?? []).some(
        (entry) =>
          hasText(entry.referenceName) ||
          hasText(entry.referenceRole) ||
          hasText(entry.referenceDescription)
      );
    case 'languages':
      return (
        (resume.languageItems ?? []).some(
          (item) => hasText(item.name) || hasText(item.proficiency)
        ) || hasText(resume.languages)
      );
    default:
      return false;
  }
}

export function sectionItemCount(
  resume: ResumeInterface | undefined,
  section: SectionKey
): number {
  if (!resume) return 0;
  switch (section) {
    case 'skills':
      return (resume.skillGroups ?? []).reduce(
        (count, group) => count + group.skills.length,
        0
      );
    case 'languages':
      return (resume.languageItems ?? []).filter((item) => item.name?.trim()).length;
    case 'profile':
      return [
        resume.profile.fullName,
        resume.profile.intro,
        resume.profile.email,
        resume.profile.location,
        resume.profile.summary,
      ].filter((value) => Boolean(value?.trim())).length;
    default:
      return ((resume as unknown as Record<string, unknown[]>)[section] ?? []).length;
  }
}

function clamp(value: unknown, min: number, max: number, fallback: number): number {
  const number = typeof value === 'number' && Number.isFinite(value) ? value : fallback;
  return Math.min(max, Math.max(min, number));
}

const LEGACY_TEMPLATES: Record<string, ResumeTheme['template']> = {
  classic: 'ivory',
  modern: 'meridian',
  minimal: 'ledger',
};

const LEGACY_FONTS: Record<string, ResumeFont> = {
  Helvetica: 'inter',
  'Times-Roman': 'source',
  Courier: 'plex-mono',
};

export function normalizeTheme(theme?: ResumeTheme): ResumeTheme {
  const incoming = (theme ?? {}) as Partial<ResumeTheme> & { template?: string; font?: string };
  const template = LEGACY_TEMPLATES[incoming.template ?? ''] ?? incoming.template;
  const font = LEGACY_FONTS[incoming.font ?? ''] ?? incoming.font;

  return {
    template: TEMPLATE_IDS.includes(template as ResumeTheme['template'])
      ? (template as ResumeTheme['template'])
      : DESIGN_DEFAULT_THEME.template,
    font: FONT_IDS.includes(font as ResumeFont)
      ? (font as ResumeFont)
      : DESIGN_DEFAULT_THEME.font,
    color: isHexColor(incoming.color)
      ? (incoming.color as string)
      : DESIGN_DEFAULT_THEME.color,
    onePage: Boolean(incoming.onePage),
    scale: clamp(incoming.scale, 0.85, 1.2, DESIGN_DEFAULT_THEME.scale),
    leading: clamp(incoming.leading, 1.25, 1.75, DESIGN_DEFAULT_THEME.leading),
    spacing: clamp(incoming.spacing, 0.7, 1.5, DESIGN_DEFAULT_THEME.spacing),
    margin:
      incoming.margin && incoming.margin in MARGIN_SIZES
        ? incoming.margin
        : DESIGN_DEFAULT_THEME.margin,
    paper:
      incoming.paper && incoming.paper in PAPER_SIZES
        ? incoming.paper
        : DESIGN_DEFAULT_THEME.paper,
  };
}

export function normalizeResume(resume: ResumeInterface): ResumeInterface {
  const incomingOrder = (resume.sectionOrder ?? []).filter((key) =>
    (DESIGN_SECTION_ORDER as SectionKey[]).includes(key)
  );
  // Preserve the order the user chose, then append any sections that were
  // added to the design after this resume was saved.
  const sectionOrder = incomingOrder.filter(
    (key, index) => incomingOrder.indexOf(key) === index
  );

  return {
    ...resume,
    sectionOrder: [
      ...sectionOrder,
      ...(DESIGN_SECTION_ORDER as SectionKey[]).filter(
        (key) => !sectionOrder.includes(key)
      ),
    ],
    hiddenSections: resume.hiddenSections ?? [],
    theme: normalizeTheme(resume.theme),
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
    profile: {
      ...resume.profile,
      profileCustomField: resume.profile?.profileCustomField ?? [],
    },
  };
}

export function createExampleResume(): ResumeInterface {
  const example: ResumeInterface = {
    id: EXAMPLE_RESUME_ID,
    fileName: 'Example resume',
    title: 'Senior frontend engineer',
    last_accessed: 'Tue, 17 Nov 2026 10:00:00 GMT',
    isExample: true,
    profile: {
      fullName: 'Alex Morgan',
      intro: 'Senior frontend engineer',
      email: 'alex.morgan@example.com',
      location: 'Austin, TX',
      phone: '+1 415 555 0132',
      website: 'alexmorgan.dev',
      linkedIn: 'linkedin.com/in/alexmorgan',
      gitHub: 'github.com/alexmorgan',
      profileCustomField: [{ fieldName: 'Portfolio', fieldValue: 'alexmorgan.dev/work' }],
      summary:
        'Frontend engineer with eight years of experience shipping accessible, fast web products. Happiest on a team that reads each other’s code.',
    },
    skills: '',
    skillGroups: [
      {
        id: 'example-skill-1',
        name: 'Languages & frameworks',
        skills: ['TypeScript', 'React', 'Next.js', 'Node.js', 'GraphQL'],
      },
      {
        id: 'example-skill-2',
        name: 'Tools',
        skills: ['Figma', 'Playwright', 'GitHub Actions', 'Docker'],
      },
      {
        id: 'example-skill-3',
        name: 'Working with people',
        skills: ['Code review', 'Mentoring', 'Design partner'],
      },
    ],
    experience: [
      {
        companyName: 'Northstar Labs',
        jobTitle: 'Senior frontend engineer',
        jobLocation: 'Austin, TX',
        jobDate: 'Jan 2021 – Present',
        jobDateRange: {
          startMonth: '01',
          startYear: '2021',
          endMonth: '',
          endYear: '',
          present: true,
        },
        jobDescription:
          'Rebuilt the customer dashboard around a shared component library. Time to first meaningful paint fell from 4.1s to 1.6s.\nLed the accessibility workstream; the product now passes WCAG 2.2 AA on every core flow.\nMentor two engineers through weekly pairing, code review and release ownership.',
      },
      {
        companyName: 'Pixel & Code',
        jobTitle: 'Frontend developer',
        jobLocation: 'Remote',
        jobDate: 'Jun 2018 – Dec 2020',
        jobDateRange: {
          startMonth: '06',
          startYear: '2018',
          endMonth: '12',
          endYear: '2020',
          present: false,
        },
        jobDescription:
          'Built storefronts for retail and hospitality clients in React and Next.js.\nCut average bundle size by 38% with route-level splitting and better image handling.\nWrote the team’s first visual regression suite, which ended most cross-browser surprises.',
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
          'Graduated with honors. Teaching assistant for Data Structures.',
      },
    ],
    projects: [
      {
        projectName: 'OpenUI',
        projectLink: 'github.com/alexmorgan/openui',
        projectDescription:
          'An accessible React component library with typed props and sensible defaults. Used by a handful of small product teams.',
      },
      {
        projectName: 'Weatherly',
        projectLink: 'weatherly.example.com',
        projectDescription:
          'A small weather dashboard built with Next.js and GraphQL. Built to learn how far a thin server layer could go.',
      },
    ],
    certifications: [
      {
        certificationName: 'AWS Certified Developer – Associate',
        certificationIssuer: 'Amazon Web Services',
        certificationDate: '2023',
        certificationDescription: 'Lambda, S3, DynamoDB and IAM.',
      },
    ],
    awards: [
      {
        awardName: 'Employee of the Year',
        awardIssuer: 'Northstar Labs',
        awardDate: '2024',
        awardDescription: 'For the design system rebuild and the accessibility programme.',
      },
    ],
    references: [
      {
        referenceName: 'Jordan Lee',
        referenceRole: 'Engineering manager',
        referenceCompany: 'Northstar Labs',
        referenceEmail: 'jordan.lee@example.com',
        referenceDescription: 'Happy to talk about Alex’s work on the dashboard rebuild.',
      },
    ],
    languages: '',
    languageItems: [
      { id: 'example-language-1', name: 'English', proficiency: 'Native' },
      { id: 'example-language-2', name: 'Nepali', proficiency: 'Fluent' },
      { id: 'example-language-3', name: 'Hindi', proficiency: 'Intermediate' },
    ],
    sectionOrder: [...DESIGN_SECTION_ORDER],
    hiddenSections: [],
    theme: {
      template: 'folio',
      color: '#1E5B49',
      font: 'source',
      onePage: false,
      scale: 1,
      leading: 1.45,
      spacing: 1,
      margin: 'normal',
      paper: 'a4',
    },
  };

  example.skills = skillsToLegacy(example.skillGroups!);
  example.languages = languagesToLegacy(example.languageItems!);
  return example;
}
