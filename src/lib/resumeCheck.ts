import type {
  ResumeInterface,
  SectionKey,
} from '@/components/builder/previousResumes/ResumeInterface';
import { splitBullets } from '@/lib/resumeDefaults';

export interface CheckItem {
  id: string;
  label: string;
  detail: string;
  done: boolean;
  weight: number;
  target?: SectionKey;
}

export interface ResumeCheck {
  score: number;
  items: CheckItem[];
  tone: 'start' | 'close' | 'ready';
  headline: string;
  open: CheckItem[];
}

const has = (value?: string) => Boolean(value?.trim());

export function analyzeResume(
  resume: ResumeInterface | undefined,
  pageCount = 1
): ResumeCheck {
  if (!resume) {
    return {
      score: 0,
      items: [],
      tone: 'start',
      headline: 'Start with your name.',
      open: [],
    };
  }

  const profile = resume.profile ?? {};
  const experience = resume.experience ?? [];
  const bulletCount = experience.reduce(
    (count, entry) => count + splitBullets(entry.jobDescription).length,
    0
  );
  const skillCount = (resume.skillGroups ?? []).reduce(
    (count, group) => count + group.skills.filter((skill) => skill.trim()).length,
    0
  );
  const experienceWithDates = experience.filter(
    (entry) =>
      entry.jobDateRange?.present ||
      has(entry.jobDateRange?.startYear) ||
      has(entry.jobDate)
  ).length;

  const items: CheckItem[] = [
    {
      id: 'name',
      label: 'A name and a role',
      detail: has(profile.fullName) && has(profile.intro)
        ? 'The top of the page says who you are.'
        : 'Add your name and the role you are applying for.',
      done: has(profile.fullName) && has(profile.intro),
      weight: 15,
      target: 'profile',
    },
    {
      id: 'contact',
      label: 'Two ways to reach you',
      detail: has(profile.email) && has(profile.phone)
        ? 'An email and a phone number are on the page.'
        : 'Add an email and a phone number. Recruiters use both.',
      done: has(profile.email) && has(profile.phone),
      weight: 15,
      target: 'profile',
    },
    {
      id: 'location',
      label: 'Where you are',
      detail: has(profile.location)
        ? `${profile.location} is listed.`
        : 'A city and region is enough. Full addresses are not needed.',
      done: has(profile.location),
      weight: 5,
      target: 'profile',
    },
    {
      id: 'summary',
      label: 'A short summary',
      detail: (profile.summary?.trim().length ?? 0) >= 120
        ? 'Your summary gives the page some context.'
        : 'Write two or three sentences: what you do and what you are good at.',
      done: (profile.summary?.trim().length ?? 0) >= 120,
      weight: 10,
      target: 'profile',
    },
    {
      id: 'experience',
      label: 'At least one role',
      detail: experience.length
        ? `${experience.length} ${experience.length === 1 ? 'role is' : 'roles are'} listed.`
        : 'Add the job you want a hiring manager to read first.',
      done: experience.length > 0,
      weight: 20,
      target: 'experience',
    },
    {
      id: 'bullets',
      label: 'Specific achievements',
      detail: bulletCount >= 3
        ? `${bulletCount} lines describe what you actually did.`
        : 'Aim for at least three lines across your roles. Lead with results.',
      done: bulletCount >= 3,
      weight: 10,
      target: 'experience',
    },
    {
      id: 'skills',
      label: 'Six or more skills',
      detail: skillCount >= 6
        ? `${skillCount} skills across your groups.`
        : 'Group six to twelve skills so the page can be skimmed.',
      done: skillCount >= 6,
      weight: 10,
      target: 'skills',
    },
    {
      id: 'education',
      label: 'Education or training',
      detail: (resume.education ?? []).some(
        (entry) => has(entry.schoolName) || has(entry.schoolMajor)
      )
        ? 'Your school or training is listed.'
        : 'Add a degree, diploma or the training that applies to the role.',
      done: (resume.education ?? []).some(
        (entry) => has(entry.schoolName) || has(entry.schoolMajor)
      ),
      weight: 5,
      target: 'education',
    },
    {
      id: 'dates',
      label: 'Dates on every role',
      detail: experience.length
        ? experienceWithDates === experience.length
          ? 'Every role has a date range.'
          : 'One or more roles are missing dates.'
        : 'Dates appear once you add a role.',
      done: experience.length > 0 && experienceWithDates === experience.length,
      weight: 5,
      target: 'experience',
    },
    {
      id: 'length',
      label: 'A readable length',
      detail: pageCount <= 2
        ? pageCount === 1
          ? 'The resume fits on one page.'
          : 'The resume runs to two pages.'
        : 'Three pages is long for most roles. Tighten the oldest work first.',
      done: pageCount <= 2,
      weight: 5,
    },
  ];

  const total = items.reduce((sum, item) => sum + item.weight, 0);
  const earned = items.reduce((sum, item) => sum + (item.done ? item.weight : 0), 0);
  const score = Math.round((earned / total) * 100);
  const open = items.filter((item) => !item.done);

  return {
    score,
    items,
    open,
    tone: score >= 85 ? 'ready' : score >= 60 ? 'close' : 'start',
    headline:
      score >= 85
        ? 'Ready to send.'
        : score >= 60
          ? 'Nearly there.'
          : 'A few things to fill in.',
  };
}
