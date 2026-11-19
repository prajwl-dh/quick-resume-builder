'use client';

import type { ResumeInterface } from '@/components/builder/previousResumes/ResumeInterface';
import {
  addNewResumeWorkExperience,
  deleteResumeWorkExperience,
  reorderEntries,
  updateEntryDateRange,
  updateResumeWorkExperience,
} from '@/lib/slices/resumeSlice';
import { useAppDispatch } from '@/lib/store/hooks';
import { useState } from 'react';
import { AddButton, DateRangeField, TextAreaField, TextField } from '../fields';
import EntryCard from '../EntryCard';
import useSortableList from '../useSortableList';

export default function ExperienceEditor({ resume }: { resume: ResumeInterface }) {
  const dispatch = useAppDispatch();
  const entries = resume.experience ?? [];
  const [open, setOpen] = useState<Set<number>>(() => new Set([0]));

  const move = (from: number, to: number) => {
    dispatch(reorderEntries({ id: resume.id, section: 'experience', from, to }));
    setOpen(new Set());
  };

  const update = (index: number, patch: Record<string, unknown>) => {
    dispatch(
      updateResumeWorkExperience({
        id: resume.id,
        index,
        value: { ...entries[index], ...patch },
      })
    );
  };

  const { dragIndex, overIndex, handleProps, itemProps } = useSortableList(move);

  const add = () => {
    dispatch(addNewResumeWorkExperience({ id: resume.id }));
    setOpen(new Set([entries.length]));
  };

  return (
    <div className='space-y-4'>
      <p className='text-[13px] leading-[1.6] text-ink-soft'>
        Most recent first. One line per achievement — start with a verb and add a number when you
        can.
      </p>

      {entries.map((entry, index) => {
        const isOpen = open.has(index);
        const dates =
          entry.jobDateRange?.present
            ? 'Present'
            : entry.jobDateRange?.startYear
              ? `${entry.jobDateRange.startYear}–${entry.jobDateRange.endYear || '…'}`
              : entry.jobDate;
        return (
          <EntryCard
            key={index}
            index={index}
            total={entries.length}
            title={entry.jobTitle || 'Untitled role'}
            subtitle={[entry.companyName, dates].filter(Boolean).join(' · ')}
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
              dispatch(deleteResumeWorkExperience({ id: resume.id, index }));
              setOpen(new Set());
            }}
            dragHandleProps={handleProps(index)}
            dropProps={itemProps(index)}
            isDragging={dragIndex === index}
            isOver={overIndex === index && dragIndex !== index}
          >
            <div className='grid gap-4 sm:grid-cols-2'>
              <TextField
                label='Job title'
                value={entry.jobTitle ?? ''}
                placeholder='Product designer'
                onChange={(event) => update(index, { jobTitle: event.target.value })}
              />
              <TextField
                label='Company'
                value={entry.companyName ?? ''}
                placeholder='Northstar Labs'
                onChange={(event) => update(index, { companyName: event.target.value })}
              />
            </div>
            <TextField
              label='Location'
              value={entry.jobLocation ?? ''}
              placeholder='Austin, TX · Remote'
              onChange={(event) => update(index, { jobLocation: event.target.value })}
            />
            <DateRangeField
              value={entry.jobDateRange}
              onChange={(value) =>
                dispatch(
                  updateEntryDateRange({
                    id: resume.id,
                    section: 'experience',
                    index,
                    value,
                  })
                )
              }
            />
            <TextAreaField
              label='What you did'
              rows={5}
              value={entry.jobDescription ?? ''}
              placeholder={
                'Rebuilt the checkout flow and cut drop-off by 18%.\nMentored two designers through their first release.\nRan the accessibility review for the design system.'
              }
              hint='One line per bullet. Two to four lines is a good length for each role.'
              onChange={(event) => update(index, { jobDescription: event.target.value })}
            />
          </EntryCard>
        );
      })}

      {entries.length === 0 ? (
        <div className='rounded-xl border border-dashed border-line-strong bg-surface/60 px-4 py-6 text-center'>
          <p className='text-[13.5px] font-medium text-ink'>No roles yet.</p>
          <p className='mx-auto mt-1 max-w-xs text-[12.5px] leading-[1.5] text-ink-faint'>
            Add the job you want a hiring manager to read first.
          </p>
        </div>
      ) : null}

      <AddButton onClick={add}>Add work experience</AddButton>
    </div>
  );
}
