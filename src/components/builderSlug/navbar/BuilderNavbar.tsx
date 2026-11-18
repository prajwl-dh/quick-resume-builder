'use client';
import { Brand } from '@/components/navbar/Brand';
import Moon from '@/components/theme-switcher/Moon';
import Sun from '@/components/theme-switcher/Sun';
import RefContext from '@/lib/providers/RefContext';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import { AwardsSvg } from './svgs/AwardsSvg';
import { BackSvg } from './svgs/BackSvg';
import { CertificateSvg } from './svgs/CertificateSvg';
import { EducationSvg } from './svgs/EducationSvg';
import { ExperienceSvg } from './svgs/ExperienceSvg';
import { LanguageSvg } from './svgs/LanguageSvg';
import { ProfileSvg } from './svgs/ProfileSvg';
import { ProjectSvg } from './svgs/ProjectSvg';
import { ReferenceSvg } from './svgs/ReferenceSvg';
import { SkillsSvg } from './svgs/SkillsSvg';

interface BuilderNavbarProps {
  isSidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isResumePreviewOpen: boolean;
  setIsResumePreviewOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

type SectionKey =
  | 'profile'
  | 'skills'
  | 'workExperience'
  | 'education'
  | 'projects'
  | 'certifications'
  | 'awards'
  | 'references'
  | 'languages';

export default function BuilderNavbar({
  isSidebarOpen,
  setSidebarOpen,
  isResumePreviewOpen,
  setIsResumePreviewOpen,
}: BuilderNavbarProps) {
  const sidebarRef = useRef<HTMLElement>(null);
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const [active, setActive] = useState<SectionKey | null>(null);
  const refs = useContext(RefContext);

  const sections: { key: SectionKey; label: string; icon: React.ElementType; ref: React.RefObject<HTMLElement> }[] = [
    { key: 'profile', label: 'Profile', icon: ProfileSvg, ref: refs.profileRef },
    { key: 'skills', label: 'Skills', icon: SkillsSvg, ref: refs.skillsRef },
    { key: 'workExperience', label: 'Work experience', icon: ExperienceSvg, ref: refs.workExperienceRef },
    { key: 'education', label: 'Education', icon: EducationSvg, ref: refs.educationRef },
    { key: 'projects', label: 'Projects', icon: ProjectSvg, ref: refs.projectsRef },
    { key: 'certifications', label: 'Certifications', icon: CertificateSvg, ref: refs.certificationsRef },
    { key: 'awards', label: 'Awards', icon: AwardsSvg, ref: refs.awardsRef },
    { key: 'references', label: 'References', icon: ReferenceSvg, ref: refs.referencesRef },
    { key: 'languages', label: 'Languages', icon: LanguageSvg, ref: refs.languagesRef },
  ];

  useEffect(() => {
    const nodes = sections
      .map((section) => section.ref.current)
      .filter((node): node is HTMLElement => Boolean(node));
    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const top = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (!top) return;
        const match = sections.find((section) => section.ref.current === top.target);
        if (match) setActive(match.key);
      },
      { rootMargin: '-15% 0px -70% 0px' }
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        event.target &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setSidebarOpen(false);
      }
    };
    if (isSidebarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSidebarOpen, setSidebarOpen]);

  const handleScroll = (key: SectionKey) => {
    const section = sections.find((item) => item.key === key);
    section?.ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setActive(key);
    setSidebarOpen(false);
  };

  const previewToggle = (
    <button
      type='button'
      onClick={() => setIsResumePreviewOpen((prev) => !prev)}
      className='inline-flex items-center gap-2 rounded-lg border border-light-ring-secondary bg-light-foreground px-3 py-2 text-[13px] font-medium text-light-text-secondary transition-colors hover:border-light-ring-primary hover:text-light-text-primary dark:border-dark-ring-secondary dark:bg-dark-foreground dark:text-dark-text-secondary dark:hover:border-dark-ring-primary dark:hover:text-dark-text-primary'
    >
      {isResumePreviewOpen ? <FaEyeSlash className='h-4 w-4' /> : <FaEye className='h-4 w-4' />}
      {isResumePreviewOpen ? 'Hide preview' : 'Preview'}
    </button>
  );

  return (
    <>
      {/* Mobile top bar */}
      <div className='fixed inset-x-0 top-0 z-40 flex h-14 items-center justify-between border-b border-light-ring-secondary bg-light-background/95 px-4 backdrop-blur-xl dark:border-dark-ring-secondary dark:bg-dark-background/95 lg:hidden'>
        <button
          type='button'
          aria-label='Open sections menu'
          onClick={() => {
            setSidebarOpen((prev) => !prev);
            setIsResumePreviewOpen(false);
          }}
          className='inline-flex h-9 w-9 items-center justify-center rounded-lg text-light-text-primary dark:text-dark-text-primary'
        >
          <svg width='22' height='22' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
            <path d='M4 7h16M4 12h16M4 17h16' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' />
          </svg>
        </button>
        <Brand compact />
        {previewToggle}
      </div>

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        aria-label='Resume sections'
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-light-ring-secondary bg-light-foreground transition-transform duration-200 dark:border-dark-ring-secondary dark:bg-dark-foreground lg:static lg:z-auto lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className='flex h-16 shrink-0 items-center justify-between border-b border-light-ring-secondary px-5 dark:border-dark-ring-secondary'>
          <Brand onClick={() => router.push('/builder')} />
          {resolvedTheme === 'dark' ? (
            <Sun setTheme={setTheme} />
          ) : (
            <Moon setTheme={setTheme} />
          )}
        </div>

        <nav className='min-h-0 flex-1 overflow-y-auto px-3 py-4'>
          <button
            type='button'
            onClick={() => router.push('/builder')}
            className='mb-3 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-[13px] font-medium text-light-text-secondary transition-colors hover:bg-light-background hover:text-light-text-primary dark:text-dark-text-secondary dark:hover:bg-dark-background dark:hover:text-dark-text-primary'
          >
            <BackSvg className='h-4 w-4' />
            All resumes
          </button>
          <div className='mb-2 px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-light-text-secondary dark:text-dark-text-secondary'>
            Sections
          </div>
          <ul className='space-y-0.5'>
            {sections.map((section) => {
              const Icon = section.icon;
              const isActive = active === section.key;
              return (
                <li key={section.key}>
                  <button
                    type='button'
                    onClick={() => handleScroll(section.key)}
                    className={`relative flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[13px] transition-colors duration-150 ${
                      isActive
                        ? 'before:absolute before:inset-y-1.5 before:left-0 before:w-[3px] before:rounded-full before:bg-accent dark:before:bg-dark-accent bg-accent-soft font-semibold text-accent dark:bg-dark-accent-soft dark:text-dark-accent'
                        : 'text-light-text-secondary hover:bg-light-background hover:text-light-text-primary dark:text-dark-text-secondary dark:hover:bg-dark-background dark:hover:text-dark-text-primary'
                    }`}
                  >
                    <Icon className='h-4 w-4 shrink-0' />
                    {section.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className='shrink-0 border-t border-light-ring-secondary p-3 dark:border-dark-ring-secondary'>
          <div className='rounded-lg bg-light-background px-3 py-2.5 text-[12px] leading-relaxed text-light-text-secondary dark:bg-dark-background dark:text-dark-text-secondary'>
            Changes save to this device as you type.
          </div>
        </div>
      </aside>

      {isSidebarOpen && (
        <button
          type='button'
          aria-label='Close menu'
          onClick={() => setSidebarOpen(false)}
          className='fixed inset-0 z-40 bg-black/30 lg:hidden'
        />
      )}
    </>
  );
}
