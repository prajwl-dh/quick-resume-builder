'use client';
import { Logo } from '@/components/navbar/Logo';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { BackSvg } from './svgs/BackSvg';
import { ExperienceSvg } from './svgs/ExperienceSvg';
import { ProfileSvg } from './svgs/ProfileSvg';

export default function BuilderNavbar() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = React.useRef<HTMLDivElement>(null);
  const router = useRouter();

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
      <div className='flex flex-row justify-between p-3 sm:hidden bg-light-background dark:bg-dark-background w-screen'>
        <button
          data-drawer-target='default-sidebar'
          data-drawer-toggle='default-sidebar'
          aria-controls='default-sidebar'
          type='button'
          className='inline-flex items-center text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
          onClick={toggleSidebar}
        >
          <svg
            className='w-6 h-6'
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
        <p>p</p>
      </div>

      <aside
        ref={sidebarRef}
        id='default-sidebar'
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform bg-light-foreground dark:bg-dark-foreground ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } sm:translate-x-0`}
        aria-label='Sidebar'
      >
        <div className='h-full px-3 py-4 overflow-y-auto'>
          <div className='flex flex-row justify-between items-start'>
            <div className='flex flex-row items-center -space-x-1 mb-4'>
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
          </div>
          <ul className='space-y-2 font-medium'>
            <li>
              <div className='flex items-center p-2 rounded-lg cursor-pointer text-light-text-secondary dark:text-dark-text-secondary hover:bg-[#e5e7eb] dark:hover:bg-[#4d4d4e] group'>
                <BackSvg className='w-5 h-5 transition duration-75 group-hover:text-light-text-primary dark:group-hover:text-dark-text-primary' />
                <span className='ms-3 group-hover:text-light-text-primary dark:group-hover:text-dark-text-primary'>
                  Go Back
                </span>
              </div>
            </li>
            <li>
              <div className='flex items-center p-2 rounded-lg cursor-pointer text-light-text-secondary dark:text-dark-text-secondary hover:bg-[#e5e7eb] dark:hover:bg-[#4d4d4e] group'>
                <ProfileSvg className='w-5 h-5 transition duration-75 group-hover:text-light-text-primary dark:group-hover:text-dark-text-primary' />
                <span className='ms-3 group-hover:text-light-text-primary dark:group-hover:text-dark-text-primary'>
                  Profile
                </span>
              </div>
            </li>
            <li>
              <div className='flex items-center p-2 rounded-lg cursor-pointer text-light-text-secondary dark:text-dark-text-secondary hover:bg-[#e5e7eb] dark:hover:bg-[#4d4d4e] group'>
                <ExperienceSvg className='w-5 h-5 transition duration-75 group-hover:text-light-text-primary dark:group-hover:text-dark-text-primary' />
                <span className='ms-3 group-hover:text-light-text-primary dark:group-hover:text-dark-text-primary'>
                  Work Experience
                </span>
              </div>
            </li>
            <li>
              <div className='flex items-center p-2 rounded-lg cursor-pointer text-light-text-secondary dark:text-dark-text-secondary hover:bg-[#e5e7eb] dark:hover:bg-[#4d4d4e] group'>
                <BackSvg className='w-5 h-5 transition duration-75 group-hover:text-light-text-primary dark:group-hover:text-dark-text-primary' />
                <span className='ms-3 group-hover:text-light-text-primary dark:group-hover:text-dark-text-primary'>
                  Education
                </span>
              </div>
            </li>
            <li>
              <div className='flex items-center p-2 rounded-lg cursor-pointer text-light-text-secondary dark:text-dark-text-secondary hover:bg-[#e5e7eb] dark:hover:bg-[#4d4d4e] group'>
                <BackSvg className='w-5 h-5 transition duration-75 group-hover:text-light-text-primary dark:group-hover:text-dark-text-primary' />
                <span className='ms-3 group-hover:text-light-text-primary dark:group-hover:text-dark-text-primary'>
                  Skills
                </span>
              </div>
            </li>
            <li>
              <div className='flex items-center p-2 rounded-lg cursor-pointer text-light-text-secondary dark:text-dark-text-secondary hover:bg-[#e5e7eb] dark:hover:bg-[#4d4d4e] group'>
                <BackSvg className='w-5 h-5 transition duration-75 group-hover:text-light-text-primary dark:group-hover:text-dark-text-primary' />
                <span className='ms-3 group-hover:text-light-text-primary dark:group-hover:text-dark-text-primary'>
                  Awards
                </span>
              </div>
            </li>
            <li>
              <div className='flex items-center p-2 rounded-lg cursor-pointer text-light-text-secondary dark:text-dark-text-secondary hover:bg-[#e5e7eb] dark:hover:bg-[#4d4d4e] group'>
                <BackSvg className='w-5 h-5 transition duration-75 group-hover:text-light-text-primary dark:group-hover:text-dark-text-primary' />
                <span className='ms-3 group-hover:text-light-text-primary dark:group-hover:text-dark-text-primary'>
                  Certifications
                </span>
              </div>
            </li>
            <li>
              <div className='flex items-center p-2 rounded-lg cursor-pointer text-light-text-secondary dark:text-dark-text-secondary hover:bg-[#e5e7eb] dark:hover:bg-[#4d4d4e] group'>
                <BackSvg className='w-5 h-5 transition duration-75 group-hover:text-light-text-primary dark:group-hover:text-dark-text-primary' />
                <span className='ms-3 group-hover:text-light-text-primary dark:group-hover:text-dark-text-primary'>
                  Projects
                </span>
              </div>
            </li>
            <li>
              <div className='flex items-center p-2 rounded-lg cursor-pointer text-light-text-secondary dark:text-dark-text-secondary hover:bg-[#e5e7eb] dark:hover:bg-[#4d4d4e] group'>
                <BackSvg className='w-5 h-5 transition duration-75 group-hover:text-light-text-primary dark:group-hover:text-dark-text-primary' />
                <span className='ms-3 group-hover:text-light-text-primary dark:group-hover:text-dark-text-primary'>
                  References
                </span>
              </div>
            </li>
            <li>
              <div className='flex items-center p-2 rounded-lg cursor-pointer text-light-text-secondary dark:text-dark-text-secondary hover:bg-[#e5e7eb] dark:hover:bg-[#4d4d4e] group'>
                <BackSvg className='w-5 h-5 transition duration-75 group-hover:text-light-text-primary dark:group-hover:text-dark-text-primary' />
                <span className='ms-3 group-hover:text-light-text-primary dark:group-hover:text-dark-text-primary'>
                  Languages
                </span>
              </div>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
}
