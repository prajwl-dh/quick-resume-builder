'use client';

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import type { ReactNode } from 'react';
import {
  LuArrowDown,
  LuArrowUp,
  LuChevronDown,
  LuGripVertical,
  LuTrash2,
} from 'react-icons/lu';

export default function EntryCard({
  index,
  total,
  title,
  subtitle,
  open,
  onToggle,
  onMove,
  onDelete,
  dragHandleProps,
  dropProps,
  isDragging,
  isOver,
  children,
}: {
  index: number;
  total: number;
  title: string;
  subtitle?: string;
  open: boolean;
  onToggle: () => void;
  onMove: (from: number, to: number) => void;
  onDelete: () => void;
  dragHandleProps: {
    draggable: boolean;
    onDragStart: (event: React.DragEvent<HTMLElement>) => void;
    onDragEnd: () => void;
  };
  dropProps: {
    onDragOver: (event: React.DragEvent<HTMLElement>) => void;
    onDragLeave: () => void;
    onDrop: (event: React.DragEvent<HTMLElement>) => void;
  };
  isDragging: boolean;
  isOver: boolean;
  children: ReactNode;
}) {
  return (
    <div
      {...dropProps}
      data-over={isOver}
      className={`entry-card drop-target ${isDragging ? 'opacity-45' : ''}`}
    >
      <div className='flex items-center gap-1.5 p-2 pl-3'>
        <span
          {...dragHandleProps}
          role='button'
          tabIndex={-1}
          aria-label='Drag to reorder'
          title='Drag to reorder'
          className='cursor-grab rounded-md p-1 text-ink-faint transition-colors hover:text-ink active:cursor-grabbing'
        >
          <LuGripVertical className='h-4 w-4' />
        </span>

        <button
          type='button'
          onClick={onToggle}
          aria-expanded={open}
          className='flex min-w-0 flex-1 items-center gap-2 rounded-lg px-1 py-1.5 text-left'
        >
          <span className='min-w-0 flex-1'>
            <span className='block truncate text-[13.5px] font-semibold text-ink'>
              {title || 'Untitled'}
            </span>
            {subtitle ? (
              <span className='mt-0.5 block truncate text-[12px] text-ink-faint'>{subtitle}</span>
            ) : null}
          </span>
          <LuChevronDown
            className={`h-4 w-4 shrink-0 text-ink-faint transition-transform duration-200 ${
              open ? 'rotate-180' : ''
            }`}
          />
        </button>

        <Menu as='div' className='relative shrink-0'>
          <MenuButton
            className='icon-btn h-8 w-8'
            aria-label={`Options for ${title || 'this entry'}`}
          >
            <svg width='16' height='16' viewBox='0 0 16 16' fill='currentColor' aria-hidden='true'>
              <circle cx='8' cy='3' r='1.1' />
              <circle cx='8' cy='8' r='1.1' />
              <circle cx='8' cy='13' r='1.1' />
            </svg>
          </MenuButton>
          <MenuItems
            anchor='bottom end'
            transition
            className='z-50 w-40 rounded-xl border border-line bg-surface p-1.5 shadow-lift transition duration-150 ease-out [--anchor-gap:6px] data-[closed]:scale-95 data-[closed]:opacity-0'
          >
            <MenuItem>
              <button
                type='button'
                disabled={index <= 0}
                onClick={() => onMove(index, index - 1)}
                className='flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-[12.5px] text-ink-soft transition-colors data-[focus]:bg-sunken data-[focus]:text-ink disabled:opacity-35'
              >
                <LuArrowUp className='h-3.5 w-3.5' /> Move up
              </button>
            </MenuItem>
            <MenuItem>
              <button
                type='button'
                disabled={index >= total - 1}
                onClick={() => onMove(index, index + 1)}
                className='flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-[12.5px] text-ink-soft transition-colors data-[focus]:bg-sunken data-[focus]:text-ink disabled:opacity-35'
              >
                <LuArrowDown className='h-3.5 w-3.5' /> Move down
              </button>
            </MenuItem>
            <div className='my-1 h-px bg-line' />
            <MenuItem>
              <button
                type='button'
                onClick={onDelete}
                className='flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-[12.5px] text-danger transition-colors data-[focus]:bg-danger/10'
              >
                <LuTrash2 className='h-3.5 w-3.5' /> Delete
              </button>
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>

      <div
        className={`grid transition-[grid-template-rows,opacity] duration-250 ease-out ${
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className='overflow-hidden'>
          <div className='space-y-4 border-t border-line/70 p-4'>{children}</div>
        </div>
      </div>
    </div>
  );
}
