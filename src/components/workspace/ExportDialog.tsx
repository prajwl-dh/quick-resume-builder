'use client';

import type { ResumeInterface } from '@/components/builder/previousResumes/ResumeInterface';
import { normalizeTheme } from '@/lib/resumeDefaults';
import { pdfFileName } from '@/lib/downloads';
import { MIN_ONE_PAGE_SCALE } from '@/lib/pdf/limits';
import { MARGIN_SIZES, PAPER_SIZES } from '@/lib/resumeDesign';
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import { useEffect, useRef, useState } from 'react';
import {
  LuDownload,
  LuFileText,
  LuLoader,
  LuRotateCcw,
  LuTriangleAlert,
} from 'react-icons/lu';
import { Checkbox } from '../editor/fields';

interface PdfPreview {
  url: string;
  pages: number;
  scale: number;
  bytes: number;
}

type BuildState =
  | { status: 'building'; previous?: PdfPreview }
  | { status: 'ready'; preview: PdfPreview }
  | { status: 'error'; message: string };

export default function ExportDialog({
  open,
  onClose,
  resume,
}: {
  open: boolean;
  onClose: () => void;
  resume: ResumeInterface;
}) {
  const theme = normalizeTheme(resume.theme);
  const paper = PAPER_SIZES[theme.paper ?? 'a4'];
  const margin = MARGIN_SIZES[theme.margin ?? 'normal'];
  // A single page is the default for every theme. Unchecking it only applies
  // to this build; the next time the dialog opens it starts checked again.
  const [onePage, setOnePage] = useState(true);
  const [state, setState] = useState<BuildState>({ status: 'building' });
  const [attempt, setAttempt] = useState(0);
  const runId = useRef(0);
  const previewUrl = useRef<string | null>(null);

  useEffect(() => {
    if (!open) return;
    const id = ++runId.current;
    let cancelled = false;

    setState((current) => {
      const previous =
        current.status === 'ready'
          ? current.preview
          : current.status === 'building'
            ? current.previous
            : undefined;
      return { status: 'building', previous };
    });

    import('@/lib/pdf/exportResumePdf')
      .then(({ buildResumePdf }) => buildResumePdf(resume, onePage))
      .then((result) => {
        if (cancelled || id !== runId.current) return;
        if (previewUrl.current) URL.revokeObjectURL(previewUrl.current);
        const url = URL.createObjectURL(result.blob);
        previewUrl.current = url;
        setState({
          status: 'ready',
          preview: {
            url,
            pages: result.pages,
            scale: result.scale,
            bytes: result.blob.size,
          },
        });
      })
      .catch((error) => {
        console.error('PDF build failed', error);
        if (cancelled || id !== runId.current) return;
        setState({
          status: 'error',
          message:
            'The PDF could not be built. Check your connection and try again.',
        });
      });

    return () => {
      cancelled = true;
    };
  }, [open, resume, attempt, onePage]);

  // Release the preview file when the dialog closes or the component unmounts.
  useEffect(() => {
    if (open) return;
    const url = previewUrl.current;
    previewUrl.current = null;
    if (url) window.setTimeout(() => URL.revokeObjectURL(url), 320);
    setState({ status: 'building' });
    setOnePage(true);
  }, [open]);

  useEffect(
    () => () => {
      if (previewUrl.current) URL.revokeObjectURL(previewUrl.current);
    },
    []
  );

  const preview =
    state.status === 'ready'
      ? state.preview
      : state.status === 'building'
        ? state.previous
        : null;
  const ready = state.status === 'ready' ? state.preview : null;
  const pages = preview?.pages ?? 0;
  const scalePercent = preview ? Math.round(preview.scale * 100) : 100;

  const download = () => {
    if (!ready) return;
    const link = document.createElement('a');
    link.href = ready.url;
    link.download = pdfFileName(resume);
    document.body.appendChild(link);
    link.click();
    link.remove();
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
          className='w-full max-w-[620px] rounded-t-2xl border border-line bg-surface shadow-lift transition duration-200 data-[closed]:translate-y-3 data-[closed]:opacity-0 sm:rounded-2xl'
        >
          <div className='flex items-start gap-3.5 p-5 pb-4 sm:p-6 sm:pb-4'>
            <span className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent'>
              <LuDownload className='h-[18px] w-[18px]' />
            </span>
            <div className='min-w-0 flex-1'>
              <DialogTitle className='text-[17px] font-semibold tracking-[-0.015em] text-ink'>
                Download your resume
              </DialogTitle>
              <p className='mt-1 text-[12.5px] leading-[1.55] text-ink-soft'>
                A real PDF with selectable text, working links and the settings
                from Design. It is built in this browser and never uploaded.
              </p>
            </div>
          </div>

          <div className='space-y-4 px-5 pb-5 sm:px-6'>
            <div className='overflow-hidden rounded-xl border border-line bg-sunken/50'>
              <div className='flex items-center justify-between gap-3 border-b border-line bg-surface px-3 py-2'>
                <div className='flex min-w-0 items-center gap-2 text-[12px] text-ink-soft'>
                  <LuFileText className='h-3.5 w-3.5 shrink-0 text-ink-faint' />
                  <span className='truncate'>
                    {pages
                      ? `${pages} ${pages === 1 ? 'page' : 'pages'}`
                      : 'Preparing your PDF'}
                  </span>
                  {state.status === 'building' && pages ? (
                    <span className='shrink-0 text-[10.5px] font-medium text-ink-faint'>
                      updating
                    </span>
                  ) : null}
                  {ready && ready.scale < 0.999 ? (
                    <span className='hidden rounded-full bg-accent-soft px-2 py-0.5 text-[10.5px] font-medium tabular-nums text-accent sm:inline'>
                      {scalePercent}% type
                    </span>
                  ) : null}
                </div>
                <span className='shrink-0 text-[11px] text-ink-faint'>
                  {paper.label} · {margin.mm}mm
                </span>
              </div>

              <div className='relative h-[260px] bg-sunken sm:h-[300px]'>
                {preview && state.status !== 'error' ? (
                  <>
                    <iframe
                      key={preview.url}
                      src={`${preview.url}#toolbar=0&navpanes=0&view=FitH`}
                      title='Resume PDF preview'
                      className='h-full w-full'
                    />
                    {state.status === 'building' ? (
                      <div
                        aria-live='polite'
                        className='pointer-events-none absolute inset-0 flex items-center justify-center bg-surface/55 backdrop-blur-[1px]'
                      >
                        <span className='flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-[11.5px] font-medium text-ink-soft shadow-sm'>
                          <LuLoader className='h-3.5 w-3.5 animate-spin text-accent' />
                          Updating the PDF
                        </span>
                      </div>
                    ) : null}
                  </>
                ) : (
                  <div
                    aria-live='polite'
                    className='flex h-full flex-col items-center justify-center gap-2.5 px-6 text-center'
                  >
                    {state.status === 'error' ? (
                      <>
                        <LuTriangleAlert className='h-5 w-5 text-danger' />
                        <p className='text-[12.5px] leading-[1.5] text-ink-soft'>
                          {state.message}
                        </p>
                        <button
                          type='button'
                          onClick={() => setAttempt((value) => value + 1)}
                          className='btn btn-secondary btn-sm mt-1'
                        >
                          <LuRotateCcw className='h-3.5 w-3.5' />
                          Try again
                        </button>
                      </>
                    ) : (
                      <>
                        <LuLoader className='h-5 w-5 animate-spin text-accent' />
                        <p className='text-[12.5px] text-ink-soft'>
                          Building the PDF
                          {onePage ? ' and checking the fit' : ''}…
                        </p>
                        <p className='text-[11px] text-ink-faint'>
                          This usually takes a second.
                        </p>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className='rounded-xl border border-line p-3.5'>
              <Checkbox
                checked={onePage}
                onChange={setOnePage}
                label='Fit everything on one page'
              />
              <p className='mt-2 pl-[26px] text-[11.5px] leading-[1.5] text-ink-faint'>
                {!ready
                  ? 'The finished PDF decides this, not an estimate.'
                  : onePage
                    ? pages > 1
                      ? `Even at ${Math.round(MIN_ONE_PAGE_SCALE * 100)}% this PDF runs to ${pages} pages. Trim a little, or turn this off and keep the natural length.`
                      : ready.scale < 0.999
                        ? `The PDF fits on one page at ${scalePercent}% of your chosen type size. No text is removed.`
                        : 'This PDF already fits on one page at your chosen type size.'
                    : pages === 1
                      ? 'This PDF is one page at natural length.'
                      : `This PDF is ${pages} pages at natural length. That is fine when the second page earns its place.`}
              </p>
            </div>

            <p className='text-[11.5px] leading-[1.5] text-ink-faint'>
              The file keeps real text for applicant tracking systems, and every
              email and link stays clickable.
            </p>
          </div>

          <div className='flex flex-col-reverse gap-2 border-t border-line px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6'>
            <button type='button' onClick={onClose} className='btn btn-secondary'>
              Cancel
            </button>
            <button
              type='button'
              onClick={download}
              disabled={!ready}
              className='btn btn-primary'
            >
              {ready ? (
                <>
                  <LuDownload className='h-4 w-4' />
                  Download PDF
                </>
              ) : (
                <>
                  <LuLoader className='h-4 w-4 animate-spin' />
                  Building PDF
                </>
              )}
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
