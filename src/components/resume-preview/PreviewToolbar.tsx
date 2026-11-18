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
  'inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-lg bg-light-button-primary-background px-3 py-2 text-[12px] font-medium text-light-button-primary-text transition-colors duration-150 hover:bg-light-button-primary-active dark:bg-dark-button-primary-background dark:text-dark-button-primary-text dark:hover:bg-dark-button-primary-active';

const menuButtonClass =
  'group inline-flex h-9 items-center gap-1.5 rounded-full px-2.5 text-[12px] text-light-text-secondary transition-colors duration-150 hover:bg-black/[0.06] hover:text-light-text-primary dark:text-dark-text-secondary dark:hover:bg-white/10 dark:hover:text-dark-text-primary';

const menuItemsClass =
  'z-[60] w-56 rounded-lg border border-light-ring-secondary bg-light-foreground p-1.5 shadow-paper-lg [--anchor-gap:6px] dark:border-dark-ring-secondary dark:bg-dark-foreground';

const menuItemClass =
  'flex w-full flex-row items-center gap-2.5 rounded-md px-2.5 py-2 text-[12px] text-light-text-secondary transition-colors hover:bg-light-background hover:text-light-text-primary dark:text-dark-text-secondary dark:hover:bg-dark-background dark:hover:text-dark-text-primary';

function ToolbarMenu({
  label,
  value,
  swatch,
  children,
}: {
  label: string;
  value: string;
  swatch?: string;
  children: React.ReactNode;
}) {
  return (
    <Menu as='div' className='relative'>
      <MenuButton className={menuButtonClass} title={label}>
        <span className='hidden text-[11px] sm:inline'>{label}</span>
        <span className='flex items-center gap-1.5 font-medium text-light-text-primary dark:text-dark-text-primary'>
          {swatch ? (
            <span
              className='h-2.5 w-2.5 shrink-0 rounded-full border border-black/10 dark:border-white/20'
              style={{ backgroundColor: swatch }}
            />
          ) : null}
          {value}
        </span>
        <FaChevronDown className='h-3 w-3 opacity-70 transition-transform duration-150 group-data-[open]:rotate-180' />
      </MenuButton>
      <MenuItems anchor='top start' className={menuItemsClass}>
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
    COLOR_OPTIONS.find((option) => option.value === theme?.color)?.label ?? 'Forest';
  const fontLabel =
    FONT_OPTIONS.find((option) => option.value === theme?.font)?.label ?? 'Sans';

  const fileName = `Resume_${resume?.profile.fullName}`;

  return (
    <>
      <div className='absolute inset-x-0 top-0 z-40 flex items-center justify-end border-b border-light-ring-secondary bg-light-foreground/95 px-2 py-2 backdrop-blur-xl dark:border-dark-ring-secondary dark:bg-dark-foreground/95 sm:px-4'>
        <div className='flex shrink-0 items-center gap-1.5 sm:gap-2'>
          <SecondaryButton
            className='h-8 px-2.5 py-0 text-[12px] xl:px-3'
            onClick={() => setTransform(0, 0, 1)}
          >
            <span className='hidden xl:inline'>Reset zoom</span>
            <span className='xl:hidden'>Reset</span>
          </SecondaryButton>
          <Menu as='div' className='relative'>
            <MenuButton className={downloadClass}>
              <span className='hidden xl:inline'>Download PDF</span>
              <span className='xl:hidden'>PDF</span>
              <FaChevronDown className='h-3 w-3' />
            </MenuButton>
            <MenuItems anchor='bottom end' className={menuItemsClass}>
              <MenuItem as='div'>
                <PDFDownloadLink
                  className={menuItemClass}
                  document={
                    <ResumeDocument resume={resume} pageHeight={pageHeight} />
                  }
                  fileName={fileName}
                >
                  <span className='flex flex-col'>
                    <span className='font-medium'>Single page</span>
                    <span className='text-[11px]'>Fits everything on one sheet</span>
                  </span>
                </PDFDownloadLink>
              </MenuItem>
              <MenuItem as='div'>
                <PDFDownloadLink
                  className={menuItemClass}
                  document={<ResumeDocument resume={resume} />}
                  fileName={fileName}
                >
                  <span className='flex flex-col'>
                    <span className='font-medium'>Multiple pages</span>
                    <span className='text-[11px]'>Standard letter pages</span>
                  </span>
                </PDFDownloadLink>
              </MenuItem>
            </MenuItems>
          </Menu>
        </div>
      </div>

      <div className='pointer-events-none absolute inset-x-0 bottom-4 z-40 flex justify-center px-3'>
        <div className='pointer-events-auto flex items-center rounded-full border border-white/60 bg-white/80 px-1.5 py-1 shadow-[0_10px_36px_-12px_rgba(0,0,0,0.35)] backdrop-blur-2xl backdrop-saturate-150 dark:border-white/10 dark:bg-[#0B0C0E]/85'>
          <ToolbarMenu label='Template' value={templateLabel}>
            {TEMPLATE_OPTIONS.map((option) => (
              <MenuItem key={option.value}>
                <div
                  className={menuItemClass}
                  onClick={() => update({ template: option.value })}
                >
                  <span
                    className='h-4 w-4 shrink-0 rounded-sm border border-current'
                    style={{
                      borderTopWidth: option.value === 'modern' ? 4 : 1,
                      borderColor: theme?.color,
                    }}
                  />
                  <span className='flex flex-col'>
                    <span className='font-medium'>{option.label}</span>
                    <span className='hidden text-[11px] opacity-60 sm:block'>
                      {option.description}
                    </span>
                  </span>
                </div>
              </MenuItem>
            ))}
          </ToolbarMenu>

          <span
            aria-hidden='true'
            className='h-4 w-px shrink-0 bg-light-ring-secondary/70 dark:bg-dark-ring-secondary/70'
          />

          <ToolbarMenu label='Color' value={colorLabel} swatch={theme?.color}>
            {COLOR_OPTIONS.map((option) => (
              <MenuItem key={option.value}>
                <div
                  className={menuItemClass}
                  onClick={() => update({ color: option.value })}
                >
                  <span
                    className='h-4 w-4 shrink-0 rounded-full border border-light-ring-secondary dark:border-dark-ring-secondary'
                    style={{ backgroundColor: option.value }}
                  />
                  <span>{option.label}</span>
                </div>
              </MenuItem>
            ))}
          </ToolbarMenu>

          <span
            aria-hidden='true'
            className='h-4 w-px shrink-0 bg-light-ring-secondary/70 dark:bg-dark-ring-secondary/70'
          />

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
                  <span className='hidden text-[11px] opacity-60 sm:block'>
                    {option.sample}
                  </span>
                </div>
              </MenuItem>
            ))}
          </ToolbarMenu>
        </div>
      </div>
    </>
  );
}
