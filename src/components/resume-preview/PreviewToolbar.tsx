'use client';
import { ResumeInterface } from '@/components/builder/previousResumes/ResumeInterface';
import SecondaryButton from '@/components/buttons/SecondaryButton';
import {
  COLOR_OPTIONS,
  FONT_OPTIONS,
  TEMPLATE_OPTIONS,
} from '@/lib/resumeDefaults';
import { updateResumeTheme } from '@/lib/slices/resumeSlice';
import { useAppDispatch } from '@/lib/store/hooks';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { FaChevronDown } from 'react-icons/fa6';
import ResumeDocument from './ResumeDocument';

const downloadClass =
  'whitespace-nowrap text-light-button-primary-text dark:text-dark-button-primary-text bg-light-button-primary-background dark:bg-dark-button-primary-background hover:bg-light-button-primary-active dark:hover:bg-dark-button-primary-active ring-1 ring-light-button-primary-background dark:ring-dark-button-primary-background hover:ring-light-button-primary-active dark:hover:ring-dark-button-primary-active px-2 sm:px-3 py-1.5 rounded-md shadow-sm outline-none transition duration-200 text-sm sm:text-md hover:-translate-y-0.5';

const menuButtonClass =
  'flex items-center gap-1 px-2 py-1.5 rounded-md ring-1 ring-light-ring-secondary dark:ring-dark-ring-secondary bg-light-foreground dark:bg-dark-foreground text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text-primary dark:hover:text-dark-text-primary text-sm';

const menuItemsClass =
  '[--anchor-gap:6px] z-[60] w-56 rounded-md ring-1 ring-light-ring-secondary dark:ring-dark-ring-secondary bg-light-background dark:bg-dark-background p-1.5 shadow-lg';

const menuItemClass =
  'flex flex-row items-center gap-2 w-full px-2 py-1.5 rounded-md text-sm text-light-text-secondary dark:text-dark-text-secondary hover:bg-[#e5e7eb] dark:hover:bg-dark-foreground cursor-pointer';

function ToolbarMenu({
  label,
  value,
  children,
}: {
  label: string;
  value: string;
  children: React.ReactNode;
}) {
  return (
    <Menu as='div' className='relative'>
      <MenuButton className={menuButtonClass} title={label}>
        <span className='hidden 2xl:inline text-xs opacity-70'>{label}:</span>
        <span className='font-medium'>{value}</span>
        <FaChevronDown className='h-3 w-3' />
      </MenuButton>
      <MenuItems anchor='bottom start' className={menuItemsClass}>
        {children}
      </MenuItems>
    </Menu>
  );
}

export default function PreviewToolbar({
  resume,
  setTransform,
  pageHeight,
}: {
  resume: ResumeInterface | undefined;
  setTransform: (x: number, y: number, scale: number) => void;
  pageHeight?: number;
}) {
  const dispatch = useAppDispatch();
  const theme = resume?.theme;

  const update = (value: Parameters<typeof updateResumeTheme>[0]['value']) =>
    dispatch(updateResumeTheme({ id: resume?.id ?? '', value }));

  const templateLabel =
    TEMPLATE_OPTIONS.find((option) => option.value === theme?.template)?.label ??
    'Classic';
  const colorLabel =
    COLOR_OPTIONS.find((option) => option.value === theme?.color)?.label ??
    'Slate';
  const fontLabel =
    FONT_OPTIONS.find((option) => option.value === theme?.font)?.label ?? 'Sans';

  return (
    <div className='absolute top-0 z-50 w-full bg-white dark:bg-dark-foreground border-b border-light-ring-secondary dark:border-dark-ring-secondary px-2 sm:px-4 py-2'>
      <div className='flex flex-row flex-wrap items-center justify-between gap-x-2 gap-y-1'>
        <div className='flex flex-row items-center gap-1 sm:gap-2'>
          <ToolbarMenu label='Template' value={templateLabel}>
            {TEMPLATE_OPTIONS.map((option) => (
              <MenuItem key={option.value}>
                <div
                  className={menuItemClass}
                  onClick={() => update({ template: option.value })}
                >
                  <span
                    className='h-4 w-4 rounded-sm border border-current shrink-0'
                    style={{
                      borderTopWidth: option.value === 'modern' ? 4 : 1,
                      borderColor: theme?.color,
                    }}
                  />
                  <span className='flex flex-col'>
                    <span className='font-medium'>{option.label}</span>
                    <span className='text-xs opacity-70 hidden sm:block'>
                      {option.description}
                    </span>
                  </span>
                </div>
              </MenuItem>
            ))}
          </ToolbarMenu>

          <ToolbarMenu label='Color' value={colorLabel}>
            {COLOR_OPTIONS.map((option) => (
              <MenuItem key={option.value}>
                <div
                  className={menuItemClass}
                  onClick={() => update({ color: option.value })}
                >
                  <span
                    className='h-4 w-4 rounded-full ring-1 ring-light-ring-secondary dark:ring-dark-ring-secondary shrink-0'
                    style={{ backgroundColor: option.value }}
                  />
                  <span>{option.label}</span>
                </div>
              </MenuItem>
            ))}
          </ToolbarMenu>

          <ToolbarMenu label='Font' value={fontLabel}>
            {FONT_OPTIONS.map((option) => (
              <MenuItem key={option.value}>
                <div
                  className={menuItemClass}
                  onClick={() => update({ font: option.value })}
                >
                  <span
                    className='text-base font-medium'
                    style={{ fontFamily: option.value }}
                  >
                    {option.label}
                  </span>
                  <span className='text-xs opacity-70 hidden sm:block'>
                    {option.sample}
                  </span>
                </div>
              </MenuItem>
            ))}
          </ToolbarMenu>

          <button
            type='button'
            title='Fit the whole resume on a single PDF page'
            aria-pressed={Boolean(theme?.onePage)}
            onClick={() => update({ onePage: !theme?.onePage })}
            className={`whitespace-nowrap px-2 py-1.5 rounded-md ring-1 text-sm transition duration-150 ${
              theme?.onePage
                ? 'ring-light-ring-primary dark:ring-dark-ring-primary bg-light-background dark:bg-dark-background text-light-text-primary dark:text-dark-text-primary font-medium'
                : 'ring-light-ring-secondary dark:ring-dark-ring-secondary text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text-primary dark:hover:text-dark-text-primary'
            }`}
          >
            1 Page
          </button>
        </div>

        <div className='flex gap-1 sm:gap-2 items-center ml-auto shrink-0'>
          <SecondaryButton
            className='whitespace-nowrap px-2 xl:px-3 py-1.5 text-sm xl:text-md'
            onClick={() => setTransform(0, 0, 1)}
          >
            <span className='hidden xl:inline'>Reset Zoom</span>
            <span className='xl:hidden'>Reset</span>
          </SecondaryButton>
          <PDFDownloadLink
            className={downloadClass}
            document={
              <ResumeDocument resume={resume} pageHeight={pageHeight} />
            }
            fileName={`Resume_${resume?.profile.fullName}`}
          >
            <span className='hidden xl:inline'>Download PDF</span>
            <span className='xl:hidden'>PDF</span>
          </PDFDownloadLink>
        </div>
      </div>
    </div>
  );
}
