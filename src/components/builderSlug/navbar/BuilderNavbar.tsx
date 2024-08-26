'use client';
import PrimaryButton from '@/components/buttons/PrimaryButton';
import SecondaryButton from '@/components/buttons/SecondaryButton';
import { Logo } from '@/components/navbar/Logo';
import Moon from '@/components/theme-switcher/Moon';
import Sun from '@/components/theme-switcher/Sun';
import RefContext from '@/lib/providers/RefContext';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react';
import { AwardsSvg } from './svgs/AwardsSvg';
import { BackSvg } from './svgs/BackSvg';
import { CertificateSvg } from './svgs/CertificateSvg';
import { EducationSvg } from './svgs/EducationSvg';
import { ExperienceSvg } from './svgs/ExperienceSvg';
import { LanguageSvg } from './svgs/LanguageSvg';
import { ProfileSvg } from './svgs/ProfileSvg';
import { ProjectSvg } from './svgs/ProjectSvg';
import { ReferenceSvg } from './svgs/ReferenceSvg';
import { ResumePreviewSvg } from './svgs/ResumePreviewSvg';
import { SkillsSvg } from './svgs/SkillsSvg';

interface BuilderNavbarProps {
  isSidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isResumePreviewOpen: boolean;
  setIsResumePreviewOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function BuilderNavbar({
  isSidebarOpen,
  setSidebarOpen,
  isResumePreviewOpen,
  setIsResumePreviewOpen,
}: BuilderNavbarProps) {
  const sidebarRef = React.useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const {
    profileRef,
    workExperienceRef,
    educationRef,
    skillsRef,
    awardsRef,
    certificationsRef,
    projectsRef,
    referencesRef,
    languagesRef,
  } = useContext(RefContext);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
    setIsResumePreviewOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      sidebarRef.current &&
      event.target &&
      !sidebarRef.current.contains(event.target as Node)
    ) {
      setSidebarOpen(false);
    }
  };

  React.useEffect(() => {
    if (isSidebarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  const handleScroll = (section: string) => {
    if (section == 'profile') {
      profileRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    } else if (section == 'workExperience') {
      workExperienceRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    } else if (section == 'education') {
      educationRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    } else if (section == 'skills') {
      skillsRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    } else if (section == 'awards') {
      awardsRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    } else if (section == 'certifications') {
      certificationsRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    } else if (section == 'projects') {
      projectsRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    } else if (section == 'references') {
      referencesRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    } else if (section == 'languages') {
      languagesRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
    setSidebarOpen(false);
  };

  return (
    <div className='flex'>
      <div className='flex fixed top-0 h-14 flex-row justify-between py-3 px-2 lg:hidden backdrop-blur-md bg-opacity-60 dark:bg-opacity-60 bg-light-background dark:bg-dark-background w-screen'>
        <button
          data-drawer-target='default-sidebar'
          data-drawer-toggle='default-sidebar'
          aria-controls='default-sidebar'
          type='button'
          className='inline-flex items-center text-sm text-gray-500 rounded-lg lg:hidden focus:outline-none'
          onClick={toggleSidebar}
        >
          <svg
            className={`w-8 h-8 text-sm text-light-text-primary cursor-pointer dark:text-dark-text-primary ${
              isSidebarOpen ? 'hidden' : ''
            }`}
            aria-hidden='true'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              clipRule='evenodd'
              fillRule='evenodd'
              d='M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z'
            ></path>
          </svg>
        </button>
        {isResumePreviewOpen ? (
          <PrimaryButton
            className='py-0 px-1'
            onClick={() => setIsResumePreviewOpen((prev) => !prev)}
          >
            <ResumePreviewSvg className='text-xl text-dark-text-primary cursor-pointer dark:text-light-text-primary -rotate-6' />
          </PrimaryButton>
        ) : (
          <SecondaryButton
            className='py-0 px-1'
            onClick={() => setIsResumePreviewOpen((prev) => !prev)}
          >
            <ResumePreviewSvg className='text-xl text-light-text-primary cursor-pointer dark:text-dark-text-primary -rotate-6' />
          </SecondaryButton>
        )}
      </div>

      <aside
        ref={sidebarRef}
        id='default-sidebar'
        className={`fixed top-0 left-0 z-50 w-64 h-screen transition-transform bg-light-foreground dark:bg-dark-foreground ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
        aria-label='Sidebar'
      >
        <div className='h-full px-3 py-4 overflow-y-auto overflow-x-hidden'>
          <div className='flex flex-row justify-between items-center mb-4'>
            <div className='flex flex-row items-center -space-x-1'>
              <Logo
                onClick={() => router.push('/builder')}
                src={'/logo.png'}
                alt='logo'
                height={800}
                width={800}
                quality={100}
                className='h-10 w-10 cursor-pointer'
                priority
              />
              <div
                onClick={() => router.push('/builder')}
                className='flex flex-col items-center -space-y-1 cursor-pointer'
              >
                <p className='text text-xl font-bold text-light-text-primary dark:text-dark-text-primary p-0'>
                  Quick
                </p>
                <p className='text text-md text-light-text-primary dark:text-dark-text-primary p-0'>
                  &nbsp;Resume
                </p>
              </div>
            </div>
            {theme === 'dark' ? (
              <Sun setTheme={setTheme} />
            ) : (
              <Moon setTheme={setTheme} />
            )}
          </div>
          <motion.ul
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  type: 'spring',
                  staggerChildren: 0.04,
                },
              },
            }}
            initial='hidden'
            whileInView='show'
            className='space-y-2 font-medium'
          >
            <motion.li
              variants={{
                hidden: { x: -50, opacity: 0 },
                show: { x: 0, opacity: 1 },
              }}
              onClick={() => router.push('/builder')}
            >
              <div className='flex items-center p-2 rounded-lg cursor-pointer text-light-text-secondary dark:text-dark-text-secondary hover:bg-[#e5e7eb] dark:hover:bg-[#4d4d4e] group'>
                <BackSvg className='w-5 h-5 transition duration-75 group-hover:text-light-text-primary dark:group-hover:text-dark-text-primary' />
                <span className='ms-3 group-hover:text-light-text-primary dark:group-hover:text-dark-text-primary'>
                  Go Back
                </span>
              </div>
            </motion.li>
            <motion.li
              variants={{
                hidden: { x: -50, opacity: 0 },
                show: { x: 0, opacity: 1 },
              }}
              onClick={() => handleScroll('profile')}
            >
              <div className='flex items-center p-2 rounded-lg cursor-pointer text-light-text-secondary dark:text-dark-text-secondary hover:bg-[#e5e7eb] dark:hover:bg-[#4d4d4e] group'>
                <ProfileSvg className='w-5 h-5 transition duration-75 group-hover:text-light-text-primary dark:group-hover:text-dark-text-primary' />
                <span className='ms-3 group-hover:text-light-text-primary dark:group-hover:text-dark-text-primary'>
                  Profile
                </span>
              </div>
            </motion.li>
            <motion.li
              variants={{
                hidden: { x: -50, opacity: 0 },
                show: { x: 0, opacity: 1 },
              }}
              onClick={() => handleScroll('workExperience')}
            >
              <div className='flex items-center p-2 rounded-lg cursor-pointer text-light-text-secondary dark:text-dark-text-secondary hover:bg-[#e5e7eb] dark:hover:bg-[#4d4d4e] group'>
                <ExperienceSvg className='w-5 h-5 transition duration-75 group-hover:text-light-text-primary dark:group-hover:text-dark-text-primary' />
                <span className='ms-3 group-hover:text-light-text-primary dark:group-hover:text-dark-text-primary'>
                  Work Experience
                </span>
              </div>
            </motion.li>
            <motion.li
              variants={{
                hidden: { x: -50, opacity: 0 },
                show: { x: 0, opacity: 1 },
              }}
              onClick={() => handleScroll('education')}
            >
              <div className='flex items-center p-2 rounded-lg cursor-pointer text-light-text-secondary dark:text-dark-text-secondary hover:bg-[#e5e7eb] dark:hover:bg-[#4d4d4e] group'>
                <EducationSvg className='w-5 h-5 transition duration-75 group-hover:text-light-text-primary dark:group-hover:text-dark-text-primary' />
                <span className='ms-3 group-hover:text-light-text-primary dark:group-hover:text-dark-text-primary'>
                  Education
                </span>
              </div>
            </motion.li>
            <motion.li
              variants={{
                hidden: { x: -50, opacity: 0 },
                show: { x: 0, opacity: 1 },
              }}
              onClick={() => handleScroll('skills')}
            >
              <div className='flex items-center p-2 rounded-lg cursor-pointer text-light-text-secondary dark:text-dark-text-secondary hover:bg-[#e5e7eb] dark:hover:bg-[#4d4d4e] group'>
                <SkillsSvg className='w-5 h-5 transition duration-75 group-hover:text-light-text-primary dark:group-hover:text-dark-text-primary' />
                <span className='ms-3 group-hover:text-light-text-primary dark:group-hover:text-dark-text-primary'>
                  Skills
                </span>
              </div>
            </motion.li>
            <motion.li
              variants={{
                hidden: { x: -50, opacity: 0 },
                show: { x: 0, opacity: 1 },
              }}
              onClick={() => handleScroll('awards')}
            >
              <div className='flex items-center p-2 rounded-lg cursor-pointer text-light-text-secondary dark:text-dark-text-secondary hover:bg-[#e5e7eb] dark:hover:bg-[#4d4d4e] group'>
                <AwardsSvg className='w-5 h-5 transition duration-75 group-hover:text-light-text-primary dark:group-hover:text-dark-text-primary' />
                <span className='ms-3 group-hover:text-light-text-primary dark:group-hover:text-dark-text-primary'>
                  Awards
                </span>
              </div>
            </motion.li>
            <motion.li
              variants={{
                hidden: { x: -50, opacity: 0 },
                show: { x: 0, opacity: 1 },
              }}
              onClick={() => handleScroll('certifications')}
            >
              <div className='flex items-center p-2 rounded-lg cursor-pointer text-light-text-secondary dark:text-dark-text-secondary hover:bg-[#e5e7eb] dark:hover:bg-[#4d4d4e] group'>
                <CertificateSvg className='w-5 h-5 transition duration-75 group-hover:text-light-text-primary dark:group-hover:text-dark-text-primary' />
                <span className='ms-3 group-hover:text-light-text-primary dark:group-hover:text-dark-text-primary'>
                  Certifications
                </span>
              </div>
            </motion.li>
            <motion.li
              variants={{
                hidden: { x: -50, opacity: 0 },
                show: { x: 0, opacity: 1 },
              }}
              onClick={() => handleScroll('projects')}
            >
              <div className='flex items-center p-2 rounded-lg cursor-pointer text-light-text-secondary dark:text-dark-text-secondary hover:bg-[#e5e7eb] dark:hover:bg-[#4d4d4e] group'>
                <ProjectSvg className='w-5 h-5 transition duration-75 group-hover:text-light-text-primary dark:group-hover:text-dark-text-primary' />
                <span className='ms-3 group-hover:text-light-text-primary dark:group-hover:text-dark-text-primary'>
                  Projects
                </span>
              </div>
            </motion.li>
            <motion.li
              variants={{
                hidden: { x: -50, opacity: 0 },
                show: { x: 0, opacity: 1 },
              }}
              onClick={() => handleScroll('references')}
            >
              <div className='flex items-center p-2 rounded-lg cursor-pointer text-light-text-secondary dark:text-dark-text-secondary hover:bg-[#e5e7eb] dark:hover:bg-[#4d4d4e] group'>
                <ReferenceSvg className='w-5 h-5 transition duration-75 group-hover:text-light-text-primary dark:group-hover:text-dark-text-primary' />
                <span className='ms-3 group-hover:text-light-text-primary dark:group-hover:text-dark-text-primary'>
                  References
                </span>
              </div>
            </motion.li>
            <motion.li
              variants={{
                hidden: { x: -50, opacity: 0 },
                show: { x: 0, opacity: 1 },
              }}
              onClick={() => handleScroll('languages')}
            >
              <div className='flex items-center p-2 rounded-lg cursor-pointer text-light-text-secondary dark:text-dark-text-secondary hover:bg-[#e5e7eb] dark:hover:bg-[#4d4d4e] group'>
                <LanguageSvg className='w-5 h-5 transition duration-75 group-hover:text-light-text-primary dark:group-hover:text-dark-text-primary' />
                <span className='ms-3 group-hover:text-light-text-primary dark:group-hover:text-dark-text-primary'>
                  Languages
                </span>
              </div>
            </motion.li>
          </motion.ul>
        </div>
      </aside>
      <div
        className={`${
          !isSidebarOpen ? 'hidden' : ''
        }fixed z-40 inset-0 bg-light-background dark:bg-dark-background transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in`}
      />
    </div>
  );
}
