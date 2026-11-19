'use client';

import { TextField } from '@/components/editor/fields';
import { createNewResume, updateResumeTheme } from '@/lib/slices/resumeSlice';
import { useAppDispatch } from '@/lib/store/hooks';
import type { ResumeTemplate } from '@/components/builder/previousResumes/ResumeInterface';
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { LuArrowRight, LuFilePlus2 } from 'react-icons/lu';

const STARTERS: { id: ResumeTemplate; name: string }[] = [
  { id: 'ivory', name: 'Ivory' },
  { id: 'folio', name: 'Folio' },
  { id: 'meridian', name: 'Meridian' },
  { id: 'ledger', name: 'Ledger' },
];

export default function NewResumeDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [template, setTemplate] = useState<ResumeTemplate>('ivory');

  const ready = name.trim().length > 0 && role.trim().length > 0;

  const create = (event: React.FormEvent) => {
    event.preventDefault();
    if (!ready) return;
    const id = uuidv4();
    const fullName = name.trim();
    const jobTitle = role.trim();
    dispatch(
      createNewResume({
        id,
        fileName: `${fullName} — ${jobTitle}`,
        fullName,
        title: jobTitle,
      })
    );
    dispatch(updateResumeTheme({ id, value: { template } }));
    onClose();
    setName('');
    setRole('');
    router.push(`/builder/${id}`);
  };

  return (
    <Dialog open={open} onClose={onClose} className='relative z-[90]'>
      <DialogBackdrop
        transition
        className='fixed inset-0 bg-ink/35 backdrop-blur-[2px] transition-opacity duration-200 data-[closed]:opacity-0'
      />
      <div className='fixed inset-0 flex items-end justify-center overflow-y-auto p-0 sm:items-center sm:p-6'>
        <DialogPanel
          transition
          className='w-full max-w-[500px] rounded-t-2xl border border-line bg-surface shadow-lift transition duration-200 data-[closed]:translate-y-3 data-[closed]:opacity-0 sm:rounded-2xl'
        >
          <form onSubmit={create}>
            <div className='flex items-start gap-3.5 p-5 pb-4 sm:p-6 sm:pb-4'>
              <span className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent'>
                <LuFilePlus2 className='h-[18px] w-[18px]' />
              </span>
              <div className='min-w-0 flex-1'>
                <DialogTitle className='text-[17px] font-semibold tracking-[-0.015em] text-ink'>
                  Start a new resume
                </DialogTitle>
                <p className='mt-1 text-[12.5px] leading-[1.55] text-ink-soft'>
                  Two details for the top of the page. Everything else can wait until
                  you are in the editor.
                </p>
              </div>
            </div>

            <div className='space-y-4 px-5 pb-5 sm:px-6'>
              <TextField
                label='Full name'
                autoFocus
                value={name}
                placeholder='Alex Morgan'
                autoComplete='name'
                onChange={(event) => setName(event.target.value)}
              />
              <TextField
                label='Role you are applying for'
                value={role}
                placeholder='Senior frontend engineer'
                onChange={(event) => setRole(event.target.value)}
              />

              <div>
                <p className='label'>Starting template</p>
                <div className='grid grid-cols-4 gap-2'>
                  {STARTERS.map((item) => (
                    <button
                      key={item.id}
                      type='button'
                      onClick={() => setTemplate(item.id)}
                      aria-pressed={template === item.id}
                      className={`rounded-lg border px-1 py-2 text-center text-[11.5px] font-medium transition-colors ${
                        template === item.id
                          ? 'border-accent bg-accent-soft text-accent'
                          : 'border-line bg-surface text-ink-soft hover:border-line-strong hover:text-ink'
                      }`}
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
                <p className='mt-1.5 text-[11.5px] text-ink-faint'>
                  You can switch templates at any time. Your words stay put.
                </p>
              </div>
            </div>

            <div className='flex flex-col-reverse gap-2 border-t border-line px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6'>
              <button type='button' onClick={onClose} className='btn btn-secondary btn-sm'>
                Cancel
              </button>
              <button type='submit' disabled={!ready} className='btn btn-primary'>
                Create and start writing
                <LuArrowRight className='h-4 w-4' />
              </button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
