'use client';

import type { ResumeInterface } from '@/components/builder/previousResumes/ResumeInterface';
import Logo from '@/components/ui/Logo';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { downloadJson } from '@/lib/downloads';
import { renameResume } from '@/lib/slices/resumeSlice';
import { useAppDispatch } from '@/lib/store/hooks';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import {
  LuArrowLeft,
  LuCheck,
  LuDownload,
  LuEllipsisVertical,
  LuFileJson,
  LuLayoutTemplate,
  LuShieldCheck,
  LuTrash2,
} from 'react-icons/lu';

export default function TopBar({
  resume,
  dirty,
  active,
  onOpenExport,
  onOpenCheck,
  onOpenDesign,
  onRequestDelete,
}: {
  resume: ResumeInterface;
  dirty: boolean;
  active: string;
  onOpenExport: () => void;
  onOpenCheck: () => void;
  onOpenDesign: () => void;
  onRequestDelete: () => void;
}) {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState(resume.fileName || resume.title || 'Untitled resume');
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTitle(resume.fileName || resume.title || 'Untitled resume');
  }, [resume.fileName, resume.title]);

  const commit = () => {
    const next = title.trim() || 'Untitled resume';
    setTitle(next);
    setEditing(false);
    if (next !== (resume.fileName ?? '')) {
      dispatch(renameResume({ id: resume.id, fileName: next }));
    }
  };

  return (
    <header className='no-print flex h-14 shrink-0 items-center gap-1.5 border-b border-line bg-surface/90 px-3 backdrop-blur-md sm:gap-3 sm:px-4'>
      <Logo href='/builder' compact className='hidden sm:inline-flex' />
      <Link
        href='/builder'
        className='icon-btn sm:hidden'
        aria-label='Back to your resumes'
      >
        <LuArrowLeft className='h-4 w-4' />
      </Link>

      <span className='hidden h-6 w-px bg-line sm:block' aria-hidden='true' />

      <div className='min-w-0 flex-1'>
        {editing ? (
          <input
            ref={inputRef}
            autoFocus
            value={title}
            aria-label='Resume name'
            onChange={(event) => setTitle(event.target.value)}
            onBlur={commit}
            onKeyDown={(event) => {
              if (event.key === 'Enter') commit();
              if (event.key === 'Escape') {
                setTitle(resume.fileName || resume.title || 'Untitled resume');
                setEditing(false);
              }
            }}
            className='h-8 w-full max-w-[300px] rounded-md border border-accent/40 bg-surface px-2 text-[13.5px] font-semibold text-ink focus:outline-none focus:ring-2 focus:ring-accent/15'
          />
        ) : (
          <div className='flex items-center gap-2'>
            <button
              type='button'
              onClick={() => {
                setEditing(true);
                requestAnimationFrame(() => inputRef.current?.select());
              }}
              className='min-w-0 truncate rounded-md px-1 py-1 text-left text-[13px] font-semibold text-ink transition-colors hover:bg-sunken sm:text-[13.5px]'
              title='Rename this resume'
            >
              {title}
            </button>
            <span
              className='hidden items-center gap-1.5 whitespace-nowrap rounded-full border border-line bg-surface px-2 py-0.5 text-[10.5px] font-medium text-ink-faint sm:inline-flex'
              aria-live='polite'
            >
              {dirty ? (
                <>
                  <span className='h-1.5 w-1.5 rounded-full bg-warn animate-pulse-soft' />
                  Saving
                </>
              ) : (
                <>
                  <LuCheck className='h-3 w-3 text-accent' />
                  Saved
                </>
              )}
            </span>
          </div>
        )}
      </div>

      <button
        type='button'
        onClick={onOpenDesign}
        className={`btn btn-secondary btn-sm lg:hidden ${
          active === 'design' ? 'bg-accent-soft text-accent' : ''
        }`}
        aria-label='Design'
        aria-current={active === 'design' ? 'true' : undefined}
        title='Design'
      >
        <LuLayoutTemplate className='h-4 w-4' />
      </button>

      <button type='button' onClick={onOpenCheck} className={`btn btn-secondary btn-sm lg:hidden ${active === 'check' ? 'bg-accent-soft text-accent' : ''}`}>
        <LuShieldCheck className='h-4 w-4' />
        <span className='hidden lg:inline'>Resume check</span>
      </button>

      <ThemeToggle className='hidden sm:inline-flex' />

      <button type='button' onClick={onOpenExport} className='btn btn-primary btn-sm'>
        <LuDownload className='h-4 w-4' />
        <span className='hidden sm:inline'>Download PDF</span>
        <span className='sm:hidden'>PDF</span>
      </button>

      <Menu as='div' className='relative'>
        <MenuButton className='icon-btn' aria-label='More options'>
          <LuEllipsisVertical className='h-4 w-4' />
        </MenuButton>
        <MenuItems
          anchor='bottom end'
          transition
          className='z-[80] w-56 rounded-xl border border-line bg-surface p-1.5 shadow-lift transition duration-150 [--anchor-gap:8px] data-[closed]:scale-95 data-[closed]:opacity-0'
        >
          <MenuItem>
            <Link
              href='/builder'
              className='flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[12.5px] text-ink-soft transition-colors data-[focus]:bg-sunken data-[focus]:text-ink'
            >
              <LuArrowLeft className='h-3.5 w-3.5' /> All resumes
            </Link>
          </MenuItem>
          <MenuItem>
            <button
              type='button'
              onClick={() => downloadJson(resume)}
              className='flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-[12.5px] text-ink-soft transition-colors data-[focus]:bg-sunken data-[focus]:text-ink'
            >
              <LuFileJson className='h-3.5 w-3.5' /> Download a backup
            </button>
          </MenuItem>
          <div className='my-1 h-px bg-line' />
          <MenuItem>
            <button
              type='button'
              onClick={onRequestDelete}
              className='flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-[12.5px] text-danger transition-colors data-[focus]:bg-danger/10'
            >
              <LuTrash2 className='h-3.5 w-3.5' /> Delete this resume
            </button>
          </MenuItem>
        </MenuItems>
      </Menu>
    </header>
  );
}
