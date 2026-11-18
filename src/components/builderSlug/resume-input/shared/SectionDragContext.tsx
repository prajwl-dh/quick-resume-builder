'use client';
import { createContext, useContext } from 'react';

export interface SectionDragHandleProps {
  draggable: boolean;
  onDragStart: (event: React.DragEvent<HTMLElement>) => void;
  onDragEnd: () => void;
}

export interface SectionDragValue {
  dragHandleProps: (index: number) => SectionDragHandleProps;
  isDragging: (index: number) => boolean;
}

const SectionDragContext = createContext<SectionDragValue | null>(null);

export function SectionDragProvider({
  value,
  children,
}: {
  value: SectionDragValue;
  children: React.ReactNode;
}) {
  return (
    <SectionDragContext.Provider value={value}>
      {children}
    </SectionDragContext.Provider>
  );
}

export function useSectionDrag(): SectionDragValue {
  const context = useContext(SectionDragContext);
  if (!context) {
    throw new Error('useSectionDrag must be used within a SectionDragProvider');
  }
  return context;
}
