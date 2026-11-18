'use client';
import { useState } from 'react';

export default function useDragReorder(onReorder: (from: number, to: number) => void) {
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  const dragHandleProps = (index: number) => ({
    draggable: true,
    onDragStart: (event: React.DragEvent<HTMLElement>) => {
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('text/plain', String(index));
      setDragIndex(index);
    },
    onDragEnd: () => setDragIndex(null),
  });

  const dropProps = (index: number) => ({
    onDragOver: (event: React.DragEvent<HTMLElement>) => {
      event.preventDefault();
      event.stopPropagation();
      event.dataTransfer.dropEffect = 'move';
    },
    onDrop: (event: React.DragEvent<HTMLElement>) => {
      event.preventDefault();
      event.stopPropagation();
      const from = dragIndex ?? Number(event.dataTransfer.getData('text/plain'));
      if (!Number.isNaN(from) && from !== index) onReorder(from, index);
      setDragIndex(null);
    },
  });

  return { dragIndex, dragHandleProps, dropProps };
}
