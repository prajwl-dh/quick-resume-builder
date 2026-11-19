'use client';

import type { ResumeInterface, SectionKey } from '@/components/builder/previousResumes/ResumeInterface';
import { deleteResume } from '@/lib/slices/resumeSlice';
import { useAppDispatch } from '@/lib/store/hooks';
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { LuEye, LuPencilLine, LuTrash2 } from 'react-icons/lu';
import EditorPane from '../editor/EditorPane';
import DesignPanel from './DesignPanel';
import ExportDialog from './ExportDialog';
import PreviewPane, { type PreviewMetrics } from './PreviewPane';
import ResumeCheckPanel from './ResumeCheckPanel';
import SectionRail, { MobileSectionTabs, type PanelKey } from './SectionRail';
import TopBar from './TopBar';

export default function Workspace({ resume }: { resume: ResumeInterface }) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [active, setActive] = useState<PanelKey>('profile');
  const [exportOpen, setExportOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [metrics, setMetrics] = useState<PreviewMetrics>({ pages: 1 });
  const [dirty, setDirty] = useState(false);
  const initialRender = useRef(true);
  const saveTimer = useRef<number | null>(null);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    setDirty(true);
    if (saveTimer.current) window.clearTimeout(saveTimer.current);
    saveTimer.current = window.setTimeout(() => setDirty(false), 700);
    return () => {
      if (saveTimer.current) window.clearTimeout(saveTimer.current);
    };
  }, [resume]);

  const handleMetrics = useCallback((next: PreviewMetrics) => {
    setMetrics((current) => (current.pages === next.pages ? current : next));
  }, []);

  const select = (key: PanelKey) => {
    setActive(key);
    setShowPreview(false);
  };

  return (
    <>
      <div className='app-shell flex h-dvh flex-col overflow-hidden bg-canvas'>
      <TopBar
        resume={resume}
        dirty={dirty}
        active={active}
        onOpenExport={() => setExportOpen(true)}
        onOpenCheck={() => select('check')}
        onOpenDesign={() => select('design')}
        onRequestDelete={() => setDeleteOpen(true)}
      />

      <div className='flex min-h-0 flex-1'>
        <SectionRail resume={resume} active={active} onSelect={select} />

        <div className='flex min-w-0 flex-1 flex-col'>
          <MobileSectionTabs active={active} onSelect={select} />

          <div className='flex min-h-0 flex-1'>
            <main
              className={`min-h-0 flex-1 overflow-y-auto pb-20 lg:pb-0 ${
                showPreview ? 'hidden lg:block' : 'block'
              }`}
            >
              {active === 'design' ? <DesignPanel resume={resume} /> : null}
              {active === 'check' ? (
                <ResumeCheckPanel
                  resume={resume}
                  pageCount={metrics.pages}
                  onJump={(section: SectionKey) => select(section)}
                />
              ) : null}
              {active !== 'design' && active !== 'check' ? (
                <EditorPane
                  resume={resume}
                  active={active}
                  onChange={select}
                  onFinish={() => select('check')}
                />
              ) : null}
            </main>

            <aside
              className={`min-w-0 flex-1 flex-col border-line bg-surface/40 lg:flex lg:flex-none lg:w-[43%] lg:border-l xl:w-[47%] ${
                showPreview ? 'flex' : 'hidden'
              }`}
            >
              <PreviewPane
                resume={resume}
                onMetrics={handleMetrics}
                className='h-full'
              />
            </aside>
          </div>
        </div>
      </div>

      {/* Mobile edit / preview switch */}
      <div className='no-print pointer-events-none fixed inset-x-0 bottom-4 z-30 flex justify-center lg:hidden'>
        <div className='pointer-events-auto flex items-center gap-0.5 rounded-full border border-line bg-surface/95 p-1 shadow-lift backdrop-blur'>
          <button
            type='button'
            onClick={() => setShowPreview(false)}
            className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[12px] font-medium transition-colors ${
              showPreview ? 'text-ink-soft' : 'bg-accent-soft text-accent'
            }`}
          >
            <LuPencilLine className='h-3.5 w-3.5' /> Edit
          </button>
          <button
            type='button'
            onClick={() => setShowPreview(true)}
            className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[12px] font-medium transition-colors ${
              showPreview ? 'bg-accent-soft text-accent' : 'text-ink-soft'
            }`}
          >
            <LuEye className='h-3.5 w-3.5' /> Preview
          </button>
        </div>
      </div>

      <ExportDialog
        open={exportOpen}
        onClose={() => setExportOpen(false)}
        resume={resume}
      />

      <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)} className='relative z-[90]'>
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
              Delete this resume?
            </DialogTitle>
            <p className='mt-1.5 text-[13px] leading-[1.55] text-ink-soft'>
              This removes it from this browser. There is no undo, so download a backup
              first if you might want it later.
            </p>
            <div className='mt-5 flex justify-end gap-2'>
              <button
                type='button'
                onClick={() => setDeleteOpen(false)}
                className='btn btn-secondary btn-sm'
              >
                Keep it
              </button>
              <button
                type='button'
                onClick={() => {
                  dispatch(deleteResume(resume.id));
                  router.push('/builder');
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
    </>
  );
}
