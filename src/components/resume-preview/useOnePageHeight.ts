'use client';
import { ResumeInterface } from '@/components/builder/previousResumes/ResumeInterface';
import { useEffect, useRef, useState } from 'react';

const LETTER_WIDTH = 612;
const LETTER_HEIGHT = 792;
const PAGE_PADDING = 20;
const PAGE_CONTENT_WIDTH = LETTER_WIDTH - PAGE_PADDING * 2;
const BUFFER = 24;

/** Measures the on-screen paper so a single-page PDF can use a custom page height. */
export default function useOnePageHeight(resume: ResumeInterface | undefined) {
  const measureRef = useRef<HTMLDivElement>(null);
  const [pageHeight, setPageHeight] = useState(LETTER_HEIGHT);
  const resumeKey = JSON.stringify(resume);

  useEffect(() => {
    const element = measureRef.current;
    if (!element) return;

    const compute = () => {
      const width = element.clientWidth;
      const height = element.scrollHeight;
      if (!width || !height) return;

      // The preview uses the same numeric sizes as the PDF, so its measured
      // height maps to PDF points using the paper-content width ratio.
      const needed = Math.ceil(
        height * (width / PAGE_CONTENT_WIDTH) * 1.12 + PAGE_PADDING * 2 + BUFFER
      );
      const next = Math.max(LETTER_HEIGHT, needed);
      setPageHeight((previous) => (Math.abs(previous - next) > 2 ? next : previous));
    };

    compute();
    const observer = new ResizeObserver(compute);
    observer.observe(element);
    return () => observer.disconnect();
  }, [resumeKey]);

  return { measureRef, pageHeight };
}
