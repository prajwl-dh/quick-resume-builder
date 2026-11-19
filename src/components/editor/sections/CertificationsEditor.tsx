'use client';

import type { ResumeInterface } from '@/components/builder/previousResumes/ResumeInterface';
import {
  addNewResumeCertification,
  deleteResumeCertification,
  reorderEntries,
  updateResumeCertification,
} from '@/lib/slices/resumeSlice';
import { useAppDispatch } from '@/lib/store/hooks';
import RepeatableEntries from '../RepeatableEntries';
import { TextAreaField, TextField } from '../fields';

export default function CertificationsEditor({ resume }: { resume: ResumeInterface }) {
  const dispatch = useAppDispatch();
  const entries = resume.certifications ?? [];

  return (
    <RepeatableEntries
      entries={entries}
      hint='Only keep certificates that still apply. An expiry date is useful if it is current.'
      title={(entry) => entry.certificationName ?? 'Untitled certificate'}
      subtitle={(entry) =>
        [entry.certificationIssuer, entry.certificationDate].filter(Boolean).join(' · ')
      }
      addLabel='Add a certification'
      emptyTitle='No certifications yet.'
      emptyText='Licences, cloud certificates, safety training — anything relevant to the job.'
      onAdd={() => dispatch(addNewResumeCertification({ id: resume.id }))}
      onDelete={(index) => dispatch(deleteResumeCertification({ id: resume.id, index }))}
      onMove={(from, to) =>
        dispatch(reorderEntries({ id: resume.id, section: 'certifications', from, to }))
      }
      onUpdate={(index, patch) =>
        dispatch(
          updateResumeCertification({
            id: resume.id,
            index,
            value: { ...entries[index], ...patch },
          })
        )
      }
      render={(entry, index, update) => (
        <>
          <TextField
            label='Certificate'
            value={entry.certificationName ?? ''}
            placeholder='AWS Certified Developer – Associate'
            onChange={(event) => update(index, { certificationName: event.target.value })}
          />
          <div className='grid gap-4 sm:grid-cols-2'>
            <TextField
              label='Issued by'
              value={entry.certificationIssuer ?? ''}
              placeholder='Amazon Web Services'
              onChange={(event) => update(index, { certificationIssuer: event.target.value })}
            />
            <TextField
              label='Year or expiry'
              value={entry.certificationDate ?? ''}
              placeholder='2024'
              onChange={(event) => update(index, { certificationDate: event.target.value })}
            />
          </div>
          <TextAreaField
            label='Note (optional)'
            rows={2}
            value={entry.certificationDescription ?? ''}
            placeholder='Cloud architecture, deployment and access management.'
            onChange={(event) => update(index, { certificationDescription: event.target.value })}
          />
        </>
      )}
    />
  );
}
