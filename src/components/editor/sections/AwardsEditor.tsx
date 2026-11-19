'use client';

import type { ResumeInterface } from '@/components/builder/previousResumes/ResumeInterface';
import {
  addNewResumeAward,
  deleteResumeAward,
  reorderEntries,
  updateResumeAward,
} from '@/lib/slices/resumeSlice';
import { useAppDispatch } from '@/lib/store/hooks';
import RepeatableEntries from '../RepeatableEntries';
import { TextAreaField, TextField } from '../fields';

export default function AwardsEditor({ resume }: { resume: ResumeInterface }) {
  const dispatch = useAppDispatch();
  const entries = resume.awards ?? [];

  return (
    <RepeatableEntries
      entries={entries}
      hint='Recognition that says something about the work. If it needs a paragraph to explain, it may not belong here.'
      title={(entry) => entry.awardName ?? 'Untitled award'}
      subtitle={(entry) => [entry.awardIssuer, entry.awardDate].filter(Boolean).join(' · ')}
      addLabel='Add an award'
      emptyTitle='No awards yet.'
      emptyText='A team award, a scholarship, a competition result. One line is enough.'
      onAdd={() => dispatch(addNewResumeAward({ id: resume.id }))}
      onDelete={(index) => dispatch(deleteResumeAward({ id: resume.id, index }))}
      onMove={(from, to) => dispatch(reorderEntries({ id: resume.id, section: 'awards', from, to }))}
      onUpdate={(index, patch) =>
        dispatch(updateResumeAward({ id: resume.id, index, value: { ...entries[index], ...patch } }))
      }
      render={(entry, index, update) => (
        <>
          <TextField
            label='Award'
            value={entry.awardName ?? ''}
            placeholder='Employee of the Year'
            onChange={(event) => update(index, { awardName: event.target.value })}
          />
          <div className='grid gap-4 sm:grid-cols-2'>
            <TextField
              label='Given by'
              value={entry.awardIssuer ?? ''}
              placeholder='Northstar Labs'
              onChange={(event) => update(index, { awardIssuer: event.target.value })}
            />
            <TextField
              label='Year'
              value={entry.awardDate ?? ''}
              placeholder='2024'
              onChange={(event) => update(index, { awardDate: event.target.value })}
            />
          </div>
          <TextAreaField
            label='Why (optional)'
            rows={2}
            value={entry.awardDescription ?? ''}
            placeholder='For the design system rebuild and the accessibility programme.'
            onChange={(event) => update(index, { awardDescription: event.target.value })}
          />
        </>
      )}
    />
  );
}
