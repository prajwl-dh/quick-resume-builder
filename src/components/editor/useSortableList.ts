'use client';

import { useCallback, useState } from 'react';

/**
 * A small HTML5 drag-and-drop list. Returns a drag handle for each item
 * and drop props for the item container. Keyboard users get explicit
 * move actions in the item menu, so this is not the only way to reorder.
 */
export default function useSortableList(onMove: (from: number, to: number) => void) {
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);

  const reset = useCallback(() => {
    setDragIndex(null);
    setOverIndex(null);
  }, []);

  const handleProps = (index: number) => ({
    draggable: true,
    onDragStart: (event: React.DragEvent<HTMLElement>) => {
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('text/plain', String(index));
      setDragIndex(index);
    },
    onDragEnd: reset,
  });

  const itemProps = (index: number) => ({
    onDragOver: (event: React.DragEvent<HTMLElement>) => {
      if (dragIndex === null) return;
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';
      if (overIndex !== index) setOverIndex(index);
    },
    onDragLeave: () => {
      setOverIndex((current) => (current === index ? null : current));
    },
    onDrop: (event: React.DragEvent<HTMLElement>) => {
      event.preventDefault();
      const from = dragIndex;
      if (from !== null && from !== index) onMove(from, index);
      reset();
    },
  });

  return { dragIndex, overIndex, handleProps, itemProps, reset };
}
