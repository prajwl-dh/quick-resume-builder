'use client';

import type { ResumeInterface } from '@/components/builder/previousResumes/ResumeInterface';
import {
  addNewResumeEducation,
  deleteResumeEducation,
  reorderEntries,
  updateEntryDateRange,
  updateResumeEducation,
} from '@/lib/slices/resumeSlice';
import { useAppDispatch } from '@/lib/store/hooks';
import { useState } from 'react';
import { AddButton, DateRangeField, TextAreaField, TextField } from '../fields';
import EntryCard from '../EntryCard';
import useSortableList from '../useSortableList';

export default function EducationEditor({ resume }: { resume: ResumeInterface }) {
  const dispatch = useAppDispatch();
  const entries = resume.education ?? [];
  const [open, setOpen] = useState<Set<number>>(() => new Set([0]));

  const move = (from: number, to: number) => {
    dispatch(reorderEntries({ id: resume.id, section: 'education', from, to }));
    setOpen(new Set());
  };

  const update = (index: number, patch: Record<string, unknown>) => {
    dispatch(
      updateResumeEducation({
        id: resume.id,
        index,
        value: { ...entries[index], ...patch },
      })
    );
  };

  const { dragIndex, overIndex, handleProps, itemProps } = useSortableList(move);

  const add = () => {
    dispatch(addNewResumeEducation({ id: resume.id }));
    setOpen(new Set([entries.length]));
  };

  return (
    <div className='space-y-4'>
      <p className='text-[13px] leading-[1.6] text-ink-soft'>
        Add the qualification that matters for this role. Certifications have their own section.
      </p>

      {entries.map((entry, index) => {
        const isOpen = open.has(index);
        const dates =
          entry.schoolDateRange?.startYear
            ? `${entry.schoolDateRange.startYear}–${entry.schoolDateRange.endYear || '…'}`
            : entry.schoolDate;
        return (
          <EntryCard
            key={index}
            index={index}
            total={entries.length}
            title={entry.schoolName || 'Untitled school'}
            subtitle={[entry.schoolMajor, dates].filter(Boolean).join(' · ')}
            open={isOpen}
            onToggle={() =>
              setOpen((current) => {
                const next = new Set(current);
                if (next.has(index)) next.delete(index);
                else next.add(index);
                return next;
              })
            }
            onMove={move}
            onDelete={() => {
              dispatch(deleteResumeEducation({ id: resume.id, index }));
              setOpen(new Set());
            }}
            dragHandleProps={handleProps(index)}
            dropProps={itemProps(index)}
            isDragging={dragIndex === index}
            isOver={overIndex === index && dragIndex !== index}
          >
            <div className='grid gap-4 sm:grid-cols-2'>
              <TextField
                label='School'
                value={entry.schoolName ?? ''}
                placeholder='University of Texas'
                onChange={(event) => update(index, { schoolName: event.target.value })}
              />
              <TextField
                label='Degree or programme'
                value={entry.schoolMajor ?? ''}
                placeholder='B.S. Computer Science'
                onChange={(event) => update(index, { schoolMajor: event.target.value })}
              />
            </div>
            <div className='grid gap-4 sm:grid-cols-[1fr_8rem]'>
              <TextField
                label='GPA (optional)'
                value={entry.schoolGPA ?? ''}
                placeholder='3.8'
                onChange={(event) => update(index, { schoolGPA: event.target.value })}
              />
            </div>
            <DateRangeField
              value={entry.schoolDateRange}
              onChange={(value) =>
                dispatch(
                  updateEntryDateRange({
                    id: resume.id,
                    section: 'education',
                    index,
                    value,
                  })
                )
              }
            />
            <TextAreaField
              label='Highlights (optional)'
              bulleted
              rows={3}
              value={entry.schoolDescription ?? ''}
              placeholder='Graduated with honors. Teaching assistant for Data Structures.'
              onChange={(event) => update(index, { schoolDescription: event.target.value })}
            />
          </EntryCard>
        );
      })}

      {entries.length === 0 ? (
        <div className='rounded-xl border border-dashed border-line-strong bg-surface/60 px-4 py-6 text-center'>
          <p className='text-[13.5px] font-medium text-ink'>No education yet.</p>
          <p className='mx-auto mt-1 max-w-xs text-[12.5px] leading-[1.5] text-ink-faint'>
            A degree, a diploma or a short training programme is enough.
          </p>
        </div>
      ) : null}

      <AddButton onClick={add}>Add education</AddButton>
    </div>
  );
}
