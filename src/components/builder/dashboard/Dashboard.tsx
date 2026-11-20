'use client';

import type { ResumeInterface } from '@/components/builder/previousResumes/ResumeInterface';
import Logo from '@/components/ui/Logo';
import ThemeToggle from '@/components/ui/ThemeToggle';
import {
  deleteResume,
  importResumes,
  renameResume,
} from '@/lib/slices/resumeSlice';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import {
  LuArrowRight,
  LuCheck,
  LuFileUp,
  LuLayers,
  LuPlus,
  LuSparkles,
  LuTrash2,
  LuTriangleAlert,
} from 'react-icons/lu';
import NewResumeDialog from './NewResumeDialog';
import ResumeCard from './ResumeCard';

export default function Dashboard() {
  const dispatch = useAppDispatch();
  const resumes = useAppSelector((state) => state.resumeReducer.value);
  const [mounted, setMounted] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [renameTarget, setRenameTarget] = useState<ResumeInterface | null>(null);
  const [renameValue, setRenameValue] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<ResumeInterface | null>(null);
  const [notice, setNotice] = useState<{ tone: 'ok' | 'error'; text: string } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(() => setNotice(null), 5000);
    return () => window.clearTimeout(timer);
  }, [notice]);

  const saved = resumes.filter((resume) => !resume.isExample);
  const example = resumes.find((resume) => resume.isExample);

  const openRename = (resume: ResumeInterface) => {
    setRenameTarget(resume);
    setRenameValue(resume.fileName || resume.title || '');
  };

  const commitRename = () => {
    if (!renameTarget) return;
    const next = renameValue.trim();
    if (next) dispatch(renameResume({ id: renameTarget.id, fileName: next }));
    setRenameTarget(null);
  };

  const handleImport = async (file: File) => {
    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      const incoming: ResumeInterface[] = Array.isArray(parsed)
        ? parsed
        : Array.isArray(parsed?.resumes)
          ? parsed.resumes
          : parsed?.profile
            ? [parsed]
            : [];
      if (!incoming.length) {
        setNotice({ tone: 'error', text: 'That file does not contain a resume.' });
        return;
      }
      dispatch(importResumes(incoming));
      setNotice({
        tone: 'ok',
        text: `${incoming.length} ${incoming.length === 1 ? 'resume' : 'resumes'} imported.`,
      });
    } catch {
      setNotice({ tone: 'error', text: 'We could not read that file. Is it a Quick Resume backup?' });
    }
  };

  return (
    <div className='flex min-h-dvh flex-col bg-canvas'>
      <header className='no-print sticky top-0 z-40 border-b border-line bg-canvas/80 backdrop-blur-md'>
        <div className='shell flex h-16 items-center justify-between gap-4'>
          <Logo href='/' />
          <div className='flex items-center gap-1.5 sm:gap-2.5'>
            <ThemeToggle />
            <button
              type='button'
              onClick={() => setCreateOpen(true)}
              className='btn btn-primary btn-sm'
            >
              <LuPlus className='h-4 w-4' />
              New resume
            </button>
          </div>
        </div>
      </header>

      <main className='shell flex-1 pb-24 pt-10 sm:pt-14'>
        <div className='flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between'>
          <div>
            <p className='eyebrow'>Workspace</p>
            <h1 className='mt-2 font-display text-[38px] leading-[1.05] tracking-[-0.02em] text-ink sm:text-[46px]'>
              Your resumes
            </h1>
            <p className='mt-2 max-w-md text-[13.5px] leading-[1.6] text-ink-soft'>
              {mounted && saved.length > 0
                ? `${saved.length} ${saved.length === 1 ? 'resume is' : 'resumes are'} saved in this browser. Nothing is uploaded, and no account is needed.`
                : 'Saved in this browser. Nothing is uploaded, and no account is needed.'}
            </p>
          </div>

          <div className='flex flex-wrap items-center gap-2'>
            <input
              ref={fileRef}
              type='file'
              accept='application/json,.json'
              className='hidden'
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) void handleImport(file);
                event.target.value = '';
              }}
            />
            <button
              type='button'
              onClick={() => fileRef.current?.click()}
              className='btn btn-secondary'
            >
              <LuFileUp className='h-4 w-4' />
              Import a backup
            </button>
            {!mounted || saved.length > 0 ? (
              <button
                type='button'
                onClick={() => setCreateOpen(true)}
                className='btn btn-primary'
              >
                <LuPlus className='h-4 w-4' />
                New resume
              </button>
            ) : null}
          </div>
        </div>

        {notice ? (
          <div
            role='status'
            aria-live='polite'
            className={`mt-6 flex items-start gap-2.5 rounded-xl border px-3.5 py-3 text-[12.5px] ${
              notice.tone === 'ok'
                ? 'border-accent/25 bg-accent-soft text-ink'
                : 'border-danger/25 bg-danger/5 text-danger'
            }`}
          >
            {notice.tone === 'ok' ? (
              <LuCheck className='mt-0.5 h-4 w-4 shrink-0 text-accent' />
            ) : (
              <LuTriangleAlert className='mt-0.5 h-4 w-4 shrink-0' />
            )}
            {notice.text}
          </div>
        ) : null}

        {!mounted ? (
          <div className='mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3'>
            {[0, 1, 2].map((item) => (
              <div
                key={item}
                className='overflow-hidden rounded-2xl border border-line bg-surface'
              >
                <div className='p-2.5 pb-0'>
                  <div className='aspect-[210/297] animate-pulse rounded-xl bg-sunken' />
                </div>
                <div className='space-y-2 px-3.5 py-3.5'>
                  <div className='h-3 w-2/3 animate-pulse rounded bg-sunken' />
                  <div className='h-2.5 w-1/2 animate-pulse rounded bg-sunken' />
                </div>
              </div>
            ))}
          </div>
        ) : null}

        {mounted && saved.length === 0 ? (
          <section className='mt-10 overflow-hidden rounded-2xl border border-line bg-surface'>
            <div className='grid gap-0 md:grid-cols-[1.15fr_1fr]'>
              <div className='p-6 sm:p-8'>
                <span className='flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent'>
                  <LuSparkles className='h-5 w-5' />
                </span>
                <h2 className='mt-4 text-[20px] font-semibold tracking-[-0.015em] text-ink'>
                  Nothing here yet. Start with one section.
                </h2>
                <p className='mt-1.5 max-w-md text-[13px] leading-[1.65] text-ink-soft'>
                  Most people begin with their name, one job and a short summary. The
                  rest can be added when you need it.
                </p>
                <div className='mt-5 flex flex-wrap gap-2'>
                  <button
                    type='button'
                    onClick={() => setCreateOpen(true)}
                    className='btn btn-primary btn-sm'
                  >
                    <LuPlus className='h-4 w-4' />
                    Start a resume
                  </button>
                  {example ? (
                    <Link href={`/builder/${example.id}`} className='btn btn-secondary btn-sm'>
                      Open the example
                      <LuArrowRight className='h-4 w-4' />
                    </Link>
                  ) : null}
                </div>
              </div>
              <div className='relative hidden border-l border-line bg-sunken/50 p-6 md:block'>
                <div className='absolute inset-0 dot-grid opacity-50' aria-hidden='true' />
                <div className='relative mx-auto max-w-[240px] rounded-lg border border-line bg-[#fffdf9] p-4 shadow-soft'>
                  <div className='h-2 w-1/2 rounded bg-ink/70' />
                  <div className='mt-2 h-1.5 w-1/3 rounded bg-ink/25' />
                  <div className='mt-5 space-y-1.5'>
                    <div className='h-1.5 w-full rounded bg-ink/15' />
                    <div className='h-1.5 w-11/12 rounded bg-ink/15' />
                    <div className='h-1.5 w-4/5 rounded bg-ink/15' />
                  </div>
                  <div className='mt-5 h-1.5 w-1/4 rounded bg-accent/60' />
                  <div className='mt-2 space-y-1.5'>
                    <div className='h-1.5 w-full rounded bg-ink/15' />
                    <div className='h-1.5 w-10/12 rounded bg-ink/15' />
                    <div className='h-1.5 w-full rounded bg-ink/15' />
                    <div className='h-1.5 w-9/12 rounded bg-ink/15' />
                  </div>
                  <div className='mt-5 h-1.5 w-1/4 rounded bg-accent/60' />
                  <div className='mt-2 space-y-1.5'>
                    <div className='h-1.5 w-11/12 rounded bg-ink/15' />
                    <div className='h-1.5 w-full rounded bg-ink/15' />
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : null}

        {mounted && saved.length > 0 ? (
          <section aria-label='Saved resumes' className='mt-10'>
            <div className='mb-4 flex items-end justify-between gap-3'>
              <h2 className='text-[12px] font-semibold uppercase tracking-[0.12em] text-ink-faint'>
                Saved on this device
              </h2>
              <span className='text-[11.5px] text-ink-faint'>
                Click a card to keep writing
              </span>
            </div>
            <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3'>
              {saved.map((resume) => (
                <ResumeCard
                  key={resume.id}
                  resume={resume}
                  onRename={() => openRename(resume)}
                  onDelete={() => setDeleteTarget(resume)}
                />
              ))}
            </div>
          </section>
        ) : null}

        {mounted && example && saved.length > 0 ? (
          <section className='mt-8 flex flex-col gap-4 rounded-2xl border border-line bg-surface p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5'>
            <div className='flex items-center gap-3.5'>
              <span className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sunken text-ink-soft'>
                <LuLayers className='h-[18px] w-[18px]' />
              </span>
              <div>
                <p className='text-[13.5px] font-semibold text-ink'>
                  Want to see a finished one?
                </p>
                <p className='mt-0.5 text-[12.5px] leading-[1.5] text-ink-soft'>
                  The example is a full resume you can read, edit or copy. It stays around
                  for reference.
                </p>
              </div>
            </div>
            <Link
              href={`/builder/${example.id}`}
              className='btn btn-secondary btn-sm shrink-0 self-start sm:self-auto'
            >
              Open the example
              <LuArrowRight className='h-4 w-4' />
            </Link>
          </section>
        ) : null}
      </main>

      <footer className='border-t border-line py-6'>
        <div className='shell flex flex-col gap-2 text-[11.5px] text-ink-faint sm:flex-row sm:items-center sm:justify-between'>
          <span>Quick Resume. Your files stay in your browser.</span>
          <span>Built for a clean download, not to collect data.</span>
        </div>
      </footer>

      <NewResumeDialog open={createOpen} onClose={() => setCreateOpen(false)} />

      <Dialog
        open={Boolean(renameTarget)}
        onClose={() => setRenameTarget(null)}
        className='relative z-[90]'
      >
        <DialogBackdrop
          transition
          className='fixed inset-0 bg-ink/35 backdrop-blur-[2px] transition-opacity data-[closed]:opacity-0'
        />
        <div className='fixed inset-0 flex items-center justify-center p-4'>
          <DialogPanel
            transition
            className='w-full max-w-sm rounded-2xl border border-line bg-surface p-5 shadow-lift transition data-[closed]:scale-95 data-[closed]:opacity-0'
          >
            <DialogTitle className='text-[16px] font-semibold text-ink'>
              Rename this resume
            </DialogTitle>
            <p className='mt-1 text-[12.5px] leading-[1.5] text-ink-soft'>
              The name only appears here and in the editor. It does not appear on the resume.
            </p>
            <input
              autoFocus
              value={renameValue}
              onChange={(event) => setRenameValue(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') commitRename();
              }}
              className='input mt-4'
              aria-label='Resume name'
            />
            <div className='mt-5 flex justify-end gap-2'>
              <button
                type='button'
                onClick={() => setRenameTarget(null)}
                className='btn btn-secondary btn-sm'
              >
                Cancel
              </button>
              <button
                type='button'
                onClick={commitRename}
                disabled={!renameValue.trim()}
                className='btn btn-primary btn-sm'
              >
                Save name
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      <Dialog
        open={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        className='relative z-[90]'
      >
        <DialogBackdrop
          transition
          className='fixed inset-0 bg-ink/35 backdrop-blur-[2px] transition-opacity data-[closed]:opacity-0'
        />
        <div className='fixed inset-0 flex items-center justify-center p-4'>
          <DialogPanel
            transition
            className='w-full max-w-sm rounded-2xl border border-line bg-surface p-5 shadow-lift transition data-[closed]:scale-95 data-[closed]:opacity-0'
          >
            <span className='flex h-10 w-10 items-center justify-center rounded-xl bg-danger/10 text-danger'>
              <LuTrash2 className='h-[18px] w-[18px]' />
            </span>
            <DialogTitle className='mt-3 text-[16px] font-semibold text-ink'>
              Delete &ldquo;{deleteTarget?.fileName || deleteTarget?.title}&rdquo;?
            </DialogTitle>
            <p className='mt-1.5 text-[13px] leading-[1.55] text-ink-soft'>
              It will be removed from this browser. There is no undo.
            </p>
            <div className='mt-5 flex justify-end gap-2'>
              <button
                type='button'
                onClick={() => setDeleteTarget(null)}
                className='btn btn-secondary btn-sm'
              >
                Keep it
              </button>
              <button
                type='button'
                onClick={() => {
                  if (deleteTarget) dispatch(deleteResume(deleteTarget.id));
                  setDeleteTarget(null);
                }}
                className='btn btn-danger btn-sm'
              >
                Delete
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
}
