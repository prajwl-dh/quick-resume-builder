'use client';

import ResumeSheet from '@/components/resume/ResumeSheet';
import { PAPER_SIZES } from '@/lib/resumeDesign';
import { normalizeTheme } from '@/lib/resumeDefaults';
import type { ResumeInterface } from '@/components/builder/previousResumes/ResumeInterface';
import { useEffect, useRef, useState } from 'react';

const MM_TO_PX = 96 / 25.4;

/**
 * Scales a real resume sheet into whatever width its container has.
 * Used for thumbnails and static previews.
 */
export default function ScaledSheet({
  resume,
  crop = false,
  className = '',
  maxScale = 1,
  rounded = true,
}: {
  resume: ResumeInterface;
  /** Crop to one page height (thumbnails). */
  crop?: boolean;
  className?: string;
  maxScale?: number;
  rounded?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const theme = normalizeTheme(resume.theme);
  const paper = PAPER_SIZES[theme.paper ?? 'a4'];
  const baseWidth = paper.width * MM_TO_PX;
  const pageHeight = paper.height * MM_TO_PX;
  const scale = width ? Math.min(maxScale, width / baseWidth) : 0;
  const visibleHeight = crop ? pageHeight * scale : height * scale;

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => {
      setWidth(entry.contentRect.width);
    });
    observer.observe(element);
    setWidth(element.clientWidth);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const element = sheetRef.current;
    if (!element) return;
    const observer = new ResizeObserver(() => setHeight(element.scrollHeight));
    observer.observe(element);
    setHeight(element.scrollHeight);
    return () => observer.disconnect();
  }, [resume]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden ${rounded ? 'rounded-[6px]' : ''} ${className}`}
      style={{ height: visibleHeight || undefined }}
      aria-hidden='true'
    >
      <div
        ref={sheetRef}
        style={{
          width: baseWidth,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          pointerEvents: 'none',
        }}
      >
        <ResumeSheet resume={resume} />
      </div>
    </div>
  );
}
