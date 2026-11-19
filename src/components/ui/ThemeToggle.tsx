'use client';

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { LuCheck, LuMonitor, LuMoon, LuSun } from 'react-icons/lu';

const options = [
  { value: 'light', label: 'Light', icon: LuSun },
  { value: 'dark', label: 'Dark', icon: LuMoon },
  { value: 'system', label: 'System', icon: LuMonitor },
] as const;

export default function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const Icon = !mounted ? LuMonitor : resolvedTheme === 'dark' ? LuMoon : LuSun;
  const current = mounted ? theme ?? 'system' : 'system';

  return (
    <Menu as='div' className={`relative ${className}`}>
      <MenuButton
        className='icon-btn border border-line bg-surface'
        aria-label='Change colour theme'
        title='Colour theme'
      >
        <Icon className='h-[17px] w-[17px]' />
      </MenuButton>
      <MenuItems
        transition
        anchor='bottom end'
        className='z-[80] w-40 rounded-xl border border-line bg-surface p-1.5 shadow-lift transition duration-150 ease-out [--anchor-gap:8px] data-[closed]:scale-95 data-[closed]:opacity-0'
      >
        <p className='px-2.5 pb-1.5 pt-1 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-ink-faint'>
          Appearance
        </p>
        {options.map((option) => {
          const OptionIcon = option.icon;
          const active = current === option.value;
          return (
            <MenuItem key={option.value}>
              <button
                type='button'
                onClick={() => setTheme(option.value)}
                className='flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-[13px] text-ink-soft transition-colors data-[focus]:bg-sunken data-[focus]:text-ink'
              >
                <OptionIcon className='h-4 w-4' />
                <span className='flex-1'>{option.label}</span>
                {active ? <LuCheck className='h-3.5 w-3.5 text-accent' /> : null}
              </button>
            </MenuItem>
          );
        })}
      </MenuItems>
    </Menu>
  );
}
