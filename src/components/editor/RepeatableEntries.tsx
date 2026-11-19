'use client';

import { useState } from 'react';
import { AddButton } from './fields';
import EntryCard from './EntryCard';
import useSortableList from './useSortableList';

export default function RepeatableEntries<T>({
  entries,
  onAdd,
  onDelete,
  onMove,
  onUpdate,
  title,
  subtitle,
  addLabel,
  emptyTitle,
  emptyText,
  hint,
  render,
}: {
  entries: T[];
  onAdd: () => void;
  onDelete: (index: number) => void;
  onMove: (from: number, to: number) => void;
  onUpdate: (index: number, patch: Record<string, unknown>) => void;
  title: (entry: T) => string;
  subtitle: (entry: T) => string;
  addLabel: string;
  emptyTitle: string;
  emptyText: string;
  hint: string;
  render: (entry: T, index: number, update: (index: number, patch: Record<string, unknown>) => void) => React.ReactNode;
}) {
  const [open, setOpen] = useState<Set<number>>(() => new Set([0]));
  const { dragIndex, overIndex, handleProps, itemProps } = useSortableList((from, to) => {
    onMove(from, to);
    setOpen(new Set());
  });

  const add = () => {
    onAdd();
    setOpen(new Set([entries.length]));
  };

  return (
    <div className='space-y-4'>
      <p className='text-[13px] leading-[1.6] text-ink-soft'>{hint}</p>

      {entries.map((entry, index) => (
        <EntryCard
          key={index}
          index={index}
          total={entries.length}
          title={title(entry) || 'Untitled'}
          subtitle={subtitle(entry)}
          open={open.has(index)}
          onToggle={() =>
            setOpen((current) => {
              const next = new Set(current);
              if (next.has(index)) next.delete(index);
              else next.add(index);
              return next;
            })
          }
          onMove={(from, to) => {
            onMove(from, to);
            setOpen(new Set());
          }}
          onDelete={() => {
            onDelete(index);
            setOpen(new Set());
          }}
          dragHandleProps={handleProps(index)}
          dropProps={itemProps(index)}
          isDragging={dragIndex === index}
          isOver={overIndex === index && dragIndex !== index}
        >
          {render(entry, index, onUpdate)}
        </EntryCard>
      ))}

      {entries.length === 0 ? (
        <div className='rounded-xl border border-dashed border-line-strong bg-surface/60 px-4 py-6 text-center'>
          <p className='text-[13.5px] font-medium text-ink'>{emptyTitle}</p>
          <p className='mx-auto mt-1 max-w-sm text-[12.5px] leading-[1.5] text-ink-faint'>
            {emptyText}
          </p>
        </div>
      ) : null}

      <AddButton onClick={add}>{addLabel}</AddButton>
    </div>
  );
}
