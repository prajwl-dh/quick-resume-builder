'use client';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export const Tooltip = ({
  text,
  children,
}: {
  text: string;
  children: React.ReactNode;
}) => {
  const spanRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!show) return;
    const span = spanRef.current;
    const tooltip = tooltipRef.current;
    if (!span || !tooltip) return;

    const rect = span.getBoundingClientRect();
    const gap = 8;
    let left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2;
    // Keep the tooltip inside the viewport on narrow screens.
    left = Math.max(8, Math.min(left, window.innerWidth - tooltip.offsetWidth - 8));
    setPos({ top: rect.bottom + gap, left });
  }, [show]);

  return (
    <span
      ref={spanRef}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onFocus={() => setShow(true)}
      onBlur={() => setShow(false)}
      onClick={() => setShow(false)}
      className='inline-flex'
    >
      {children}
      {show &&
        createPortal(
          <div
            ref={tooltipRef}
            role='tooltip'
            className='pointer-events-none fixed z-[100] w-max max-w-[220px] rounded-md border border-light-ring-secondary bg-light-foreground px-2 py-1 text-xs leading-snug text-light-text-primary shadow-paper dark:border-dark-ring-secondary dark:bg-dark-foreground dark:text-dark-text-primary'
            style={{ left: pos.left, top: pos.top }}
          >
            {text}
          </div>,
          document.body
        )}
    </span>
  );
};
