'use client';

import type { ResumeInterface } from '@/components/builder/previousResumes/ResumeInterface';
import {
  addNewResumeReference,
  deleteResumeReference,
  reorderEntries,
  updateResumeReference,
} from '@/lib/slices/resumeSlice';
import { useAppDispatch } from '@/lib/store/hooks';
import RepeatableEntries from '../RepeatableEntries';
import { TextAreaField, TextField } from '../fields';

export default function ReferencesEditor({ resume }: { resume: ResumeInterface }) {
  const dispatch = useAppDispatch();
  const entries = resume.references ?? [];

  return (
    <RepeatableEntries
      entries={entries}
      hint='Only add references when an employer asks, or when the name carries weight. Always ask the person first.'
      title={(entry) => entry.referenceName ?? 'Untitled reference'}
      subtitle={(entry) =>
        [entry.referenceRole, entry.referenceCompany].filter(Boolean).join(', ')
      }
      addLabel='Add a reference'
      emptyTitle='No references added.'
      emptyText='Many applications do not need them. You can leave this section hidden.'
      onAdd={() => dispatch(addNewResumeReference({ id: resume.id }))}
      onDelete={(index) => dispatch(deleteResumeReference({ id: resume.id, index }))}
      onMove={(from, to) =>
        dispatch(reorderEntries({ id: resume.id, section: 'references', from, to }))
      }
      onUpdate={(index, patch) =>
        dispatch(
          updateResumeReference({ id: resume.id, index, value: { ...entries[index], ...patch } })
        )
      }
      render={(entry, index, update) => (
        <>
          <div className='grid gap-4 sm:grid-cols-2'>
            <TextField
              label='Name'
              value={entry.referenceName ?? ''}
              placeholder='Jordan Lee'
              onChange={(event) => update(index, { referenceName: event.target.value })}
            />
            <TextField
              label='Email'
              type='email'
              value={entry.referenceEmail ?? ''}
              placeholder='jordan@example.com'
              onChange={(event) => update(index, { referenceEmail: event.target.value })}
            />
          </div>
          <div className='grid gap-4 sm:grid-cols-2'>
            <TextField
              label='Role'
              value={entry.referenceRole ?? ''}
              placeholder='Engineering manager'
              onChange={(event) => update(index, { referenceRole: event.target.value })}
            />
            <TextField
              label='Company'
              value={entry.referenceCompany ?? ''}
              placeholder='Northstar Labs'
              onChange={(event) => update(index, { referenceCompany: event.target.value })}
            />
          </div>
          <TextAreaField
            label='Context (optional)'
            rows={2}
            value={entry.referenceDescription ?? ''}
            placeholder='Worked with Alex on the dashboard rebuild.'
            onChange={(event) => update(index, { referenceDescription: event.target.value })}
          />
        </>
      )}
    />
  );
}
