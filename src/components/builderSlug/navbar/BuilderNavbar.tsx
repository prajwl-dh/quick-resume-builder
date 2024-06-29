'use client';
import { Logo } from '@/components/navbar/Logo';
import Moon from '@/components/theme-switcher/Moon';
import Sun from '@/components/theme-switcher/Sun';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import React from 'react';
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

export default function BuilderNavbar({
  isSidebarOpen,
  setSidebarOpen,
  isResumePreviewOpen,
  setIsResumePreviewOpen,
}: BuilderNavbarProps) {
  const sidebarRef = React.useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
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
  }, [isSidebarOpen]);

  return (
    <div className='flex'>
      <div className='flex flex-row justify-between p-3 lg:hidden bg-light-background dark:bg-dark-background w-screen'>
        <button
          data-drawer-target='default-sidebar'
          data-drawer-toggle='default-sidebar'
          aria-controls='default-sidebar'
          type='button'
          className='inline-flex items-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
          onClick={toggleSidebar}
        >
          <svg
            className={`w-8 h-8 text-sm text-light-text-primary dark:text-dark-text-primary ${
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
        <svg
          onClick={() => router.push('/builder')}
          className={`w-8 h-8 text-sm text-light-text-primary dark:text-dark-text-primary ${
            isSidebarOpen ? 'hidden' : ''
          }`}
          xmlns='http://www.w3.org/2000/svg'
          width='1em'
          height='1em'
          viewBox='0 0 24 24'
        >
          <path
            fill='currentColor'
            d='M7 20q-.825 0-1.412-.587T5 18v-7.15l-2 1.525q-.35.25-.75.213T1.6 12.2t-.2-.75t.4-.65l8.975-6.875q.275-.2.588-.3t.637-.1t.638.1t.587.3L16 6.05V5.5q0-.625.438-1.062T17.5 4t1.063.438T19 5.5v2.85l3.2 2.45q.325.25.388.65t-.188.75t-.65.388t-.75-.213l-2-1.525V18q0 .825-.587 1.413T17 20h-1q-.825 0-1.412-.587T14 18v-2q0-.825-.587-1.412T12 14t-1.412.588T10 16v2q0 .825-.587 1.413T8 20zm3-9.975h4q0-.8-.6-1.313T12 8.2t-1.4.513t-.6 1.312'
          ></path>
        </svg>
        <svg
          onClick={() => setIsResumePreviewOpen((prev) => !prev)}
          className={`w-8 h-8 text-sm text-light-text-primary dark:text-dark-text-primary ${
            isSidebarOpen ? 'hidden' : ''
          }`}
          xmlns='http://www.w3.org/2000/svg'
          width='1em'
          height='1em'
          viewBox='0 0 24 24'
        >
          <g
            fill='none'
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
          >
            <path d='M14 3v4a1 1 0 0 0 1 1h4'></path>
            <path d='M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2'></path>
            <path d='M11 12.5a1.5 1.5 0 0 0-3 0v3a1.5 1.5 0 0 0 3 0m2-4.5l1.5 6l1.5-6'></path>
          </g>
        </svg>
      </div>

      <aside
        ref={sidebarRef}
        id='default-sidebar'
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform bg-light-foreground dark:bg-dark-foreground ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
        aria-label='Sidebar'
      >
        <div className='h-full px-3 py-4 overflow-y-auto'>
          <div className='flex flex-row justify-between items-center mb-4'>
            <div className='flex flex-row items-center -space-x-1'>
              <Logo
                onClick={() => router.push('/')}
                src={'/logo.png'}
                alt='logo'
                height={800}
                width={800}
                quality={100}
                className='h-10 w-10 cursor-pointer'
                priority
              />
              <div
                onClick={() => router.push('/')}
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
    </div>
  );
}
