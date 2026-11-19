'use client';

import ResumeSheet from '@/components/resume/ResumeSheet';
import type { ResumeInterface } from '@/components/builder/previousResumes/ResumeInterface';
import { normalizeTheme } from '@/lib/resumeDefaults';
import { MARGIN_SIZES, PAPER_SIZES } from '@/lib/resumeDesign';
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { LuMinus, LuPlus } from 'react-icons/lu';

const MM_TO_PX = 96 / 25.4;

export interface PreviewMetrics {
  pages: number;
}

type Zoom = 'fit' | 50 | 65 | 80 | 100;

const ZOOM_STEPS: Zoom[] = ['fit', 50, 65, 80, 100];

const PreviewPane = function PreviewPane({
  resume,
  onMetrics,
  className = '',
}: {
  resume: ResumeInterface;
  onMetrics?: (metrics: PreviewMetrics) => void;
  className?: string;
}) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const sheetWrapRef = useRef<HTMLDivElement>(null);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [sheetHeight, setSheetHeight] = useState(0);
  const [zoom, setZoom] = useState<Zoom>('fit');

  const theme = useMemo(() => normalizeTheme(resume.theme), [resume.theme]);
  const paper = PAPER_SIZES[theme.paper ?? 'a4'];
  const margin = MARGIN_SIZES[theme.margin ?? 'normal'];
  const baseWidth = paper.width * MM_TO_PX;
  const pageHeight = paper.height * MM_TO_PX;
  const pad = margin.mm * MM_TO_PX;
  const printableHeight = pageHeight - pad * 2;

  const fitScale = viewportWidth
    ? Math.min(1.05, Math.max(0.2, (viewportWidth - 64) / baseWidth))
    : 0.6;
  const scale = zoom === 'fit' ? fitScale : zoom / 100;

  const measure = useCallback(() => {
    const wrap = sheetWrapRef.current;
    if (!wrap) return;
    setSheetHeight(wrap.scrollHeight);
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const observer = new ResizeObserver(([entry]) => {
      setViewportWidth(entry.contentRect.width);
    });
    observer.observe(viewport);
    setViewportWidth(viewport.clientWidth);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const wrap = sheetWrapRef.current;
    if (!wrap) return;
    const observer = new ResizeObserver(measure);
    observer.observe(wrap);
    measure();
    return () => observer.disconnect();
  }, [measure, resume]);

  const contentHeight = Math.max(0, sheetHeight - pad * 2);
  const pages = Math.max(1, Math.ceil((contentHeight - 1) / printableHeight));

  useEffect(() => {
    onMetrics?.({ pages });
  }, [onMetrics, pages]);

  const scaledHeight = sheetHeight * scale;
  const breakOffsets = Array.from({ length: Math.max(0, pages - 1) }, (_, index) =>
    (pad + printableHeight * (index + 1)) * scale
  );

  return (
    <div className={`flex min-h-0 flex-col ${className}`}>
      <div className='flex h-11 shrink-0 items-center justify-between gap-3 border-b border-line px-3'>
        <div className='flex items-center gap-2 text-[11.5px] font-medium text-ink-faint'>
          <span className='rounded-full border border-line bg-surface px-2 py-0.5 tabular-nums'>
            {pages} {pages === 1 ? 'page' : 'pages'}
          </span>
          <span className='hidden sm:inline'>
            {paper.label} · {margin.mm}mm
          </span>
        </div>

        <div className='flex items-center gap-1'>
          <button
            type='button'
            aria-label='Zoom out'
            className='icon-btn h-7 w-7'
            onClick={() => {
              const index = ZOOM_STEPS.indexOf(zoom);
              setZoom(ZOOM_STEPS[Math.max(0, index - 1)]);
            }}
            disabled={zoom === 50}
          >
            <LuMinus className='h-3.5 w-3.5' />
          </button>
          <span className='w-12 text-center text-[11.5px] font-medium tabular-nums text-ink-soft'>
            {zoom === 'fit' ? 'Fit' : `${zoom}%`}
          </span>
          <button
            type='button'
            aria-label='Zoom in'
            className='icon-btn h-7 w-7'
            onClick={() => {
              const index = ZOOM_STEPS.indexOf(zoom);
              setZoom(ZOOM_STEPS[Math.min(ZOOM_STEPS.length - 1, index + 1)]);
            }}
            disabled={zoom === 100}
          >
            <LuPlus className='h-3.5 w-3.5' />
          </button>
        </div>
      </div>

      <div
        ref={viewportRef}
        className='preview-stage relative min-h-0 flex-1 overflow-auto px-4 py-6 pb-24 sm:px-6 lg:pb-6'
      >
        <div
          className='relative mx-auto'
          style={{ width: baseWidth * scale, minHeight: scaledHeight }}
        >
          <div
            aria-hidden='true'
            style={{
              width: baseWidth,
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
            }}
          >
            <div ref={sheetWrapRef} className='bg-[#fffdf9] shadow-sheet'>
              <ResumeSheet resume={resume} />
            </div>
          </div>

          {breakOffsets.map((offset, index) => (
            <div
              key={index}
              aria-hidden='true'
              className='pointer-events-none absolute inset-x-[-14px] flex items-center gap-2'
              style={{ top: offset }}
            >
              <span className='h-px flex-1 border-t border-dashed border-ink/20' />
              <span className='rounded-full border border-line bg-canvas/90 px-1.5 py-0.5 text-[9.5px] font-medium uppercase tracking-[0.06em] text-ink-faint'>
                Page {index + 2}
              </span>
              <span className='h-px flex-1 border-t border-dashed border-ink/20' />
            </div>
          ))}
        </div>

        {zoom !== 'fit' ? (
          <p className='mx-auto mt-5 max-w-sm text-center text-[11.5px] leading-[1.5] text-ink-faint'>
            The preview is zoomed in. Use Fit to see the whole page at once.
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default PreviewPane;
