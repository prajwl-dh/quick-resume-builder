'use client';

import ScaledSheet from '@/components/resume/ScaledSheet';
import type { ResumeInterface } from '@/components/builder/previousResumes/ResumeInterface';
import { downloadJson } from '@/lib/downloads';
import { duplicateResume, updateLastAccessed } from '@/lib/slices/resumeSlice';
import { useAppDispatch } from '@/lib/store/hooks';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import Link from 'next/link';
import {
  LuArrowUpRight,
  LuCopy,
  LuDownload,
  LuEllipsis,
  LuPencilLine,
  LuTrash2,
} from 'react-icons/lu';

function editedLabel(value?: string) {
  if (!value) return 'Not opened yet';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Saved recently';
  const diff = Date.now() - date.getTime();
  const minutes = Math.round(diff / 60000);
  if (minutes < 1) return 'Edited just now';
  if (minutes < 60) return `Edited ${minutes} min ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `Edited ${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  const days = Math.round(hours / 24);
  if (days === 1) return 'Edited yesterday';
  if (days < 30) return `Edited ${days} days ago`;
  return `Edited ${date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })}`;
}

export default function ResumeCard({
  resume,
  onRename,
  onDelete,
}: {
  resume: ResumeInterface;
  onRename: () => void;
  onDelete: () => void;
}) {
  const dispatch = useAppDispatch();
  const name = resume.fileName || resume.title || 'Untitled resume';
  const meta = [resume.profile?.intro, editedLabel(resume.last_accessed)]
    .filter(Boolean)
    .join(' · ');

  return (
    <div className='group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-all duration-200 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-lift'>
      <Link
        href={`/builder/${resume.id}`}
        onClick={() => dispatch(updateLastAccessed(resume.id))}
        className='block p-2.5 pb-0'
        aria-label={`Open ${name}`}
      >
        <div className='relative overflow-hidden rounded-xl border border-line/70 bg-[#fffdf9]'>
          <div className='aspect-[210/297] w-full overflow-hidden'>
            <ScaledSheet resume={resume} crop maxScale={2} rounded={false} />
          </div>
          <div className='pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/10 via-transparent to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100' />
        </div>
      </Link>

      <div className='flex min-w-0 items-start gap-2 px-3.5 py-3'>
        <div className='min-w-0 flex-1'>
          <div className='flex items-center gap-1.5'>
            <h3 className='truncate text-[13.5px] font-semibold text-ink'>{name}</h3>
            {resume.isExample ? (
              <span className='shrink-0 rounded-full border border-line bg-sunken px-1.5 py-0.5 text-[9.5px] font-semibold uppercase tracking-[0.06em] text-ink-faint'>
                Example
              </span>
            ) : null}
          </div>
          <p className='mt-0.5 truncate text-[11.5px] text-ink-faint'>{meta}</p>
        </div>

        <Link
          href={`/builder/${resume.id}`}
          onClick={() => dispatch(updateLastAccessed(resume.id))}
          aria-label={`Open ${name}`}
          className='flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-ink-faint transition-colors hover:bg-sunken hover:text-ink'
        >
          <LuArrowUpRight className='h-4 w-4' />
        </Link>

        <Menu as='div' className='relative shrink-0'>
          <MenuButton
            className='flex h-7 w-7 items-center justify-center rounded-lg text-ink-faint transition-colors hover:bg-sunken hover:text-ink'
            aria-label={`Options for ${name}`}
          >
            <LuEllipsis className='h-4 w-4' />
          </MenuButton>
          <MenuItems
            anchor='bottom end'
            transition
            className='z-50 w-48 rounded-xl border border-line bg-surface p-1.5 shadow-lift transition duration-150 [--anchor-gap:6px] data-[closed]:scale-95 data-[closed]:opacity-0'
          >
            <MenuItem>
              <button
                type='button'
                onClick={onRename}
                className='flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-[12.5px] text-ink-soft transition-colors data-[focus]:bg-sunken data-[focus]:text-ink'
              >
                <LuPencilLine className='h-3.5 w-3.5' /> Rename
              </button>
            </MenuItem>
            <MenuItem>
              <button
                type='button'
                onClick={() => dispatch(duplicateResume(resume.id))}
                className='flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-[12.5px] text-ink-soft transition-colors data-[focus]:bg-sunken data-[focus]:text-ink'
              >
                <LuCopy className='h-3.5 w-3.5' /> Make a copy
              </button>
            </MenuItem>
            <MenuItem>
              <button
                type='button'
                onClick={() => downloadJson(resume)}
                className='flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-[12.5px] text-ink-soft transition-colors data-[focus]:bg-sunken data-[focus]:text-ink'
              >
                <LuDownload className='h-3.5 w-3.5' /> Download a backup
              </button>
            </MenuItem>
            <div className='my-1 h-px bg-line' />
            <MenuItem>
              <button
                type='button'
                onClick={onDelete}
                className='flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-[12.5px] text-danger transition-colors data-[focus]:bg-danger/10'
              >
                <LuTrash2 className='h-3.5 w-3.5' /> Delete
              </button>
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>
    </div>
  );
}
