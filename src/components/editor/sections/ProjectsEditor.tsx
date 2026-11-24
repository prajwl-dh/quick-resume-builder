'use client';

import type { ResumeInterface } from '@/components/builder/previousResumes/ResumeInterface';
import {
  addNewResumeProject,
  deleteResumeProject,
  reorderEntries,
  updateResumeProject,
} from '@/lib/slices/resumeSlice';
import { useAppDispatch } from '@/lib/store/hooks';
import RepeatableEntries from '../RepeatableEntries';
import { TextAreaField, TextField } from '../fields';

export default function ProjectsEditor({ resume }: { resume: ResumeInterface }) {
  const dispatch = useAppDispatch();
  const entries = resume.projects ?? [];

  return (
    <RepeatableEntries
      entries={entries}
      hint='Work you can point to, even if nobody paid for it. A link is more useful than a paragraph.'
      title={(entry) => entry.projectName ?? 'Untitled project'}
      subtitle={(entry) => entry.projectLink ?? ''}
      addLabel='Add a project'
      emptyTitle='No projects yet.'
      emptyText='A side project, a client build or an open-source contribution all count.'
      onAdd={() => dispatch(addNewResumeProject({ id: resume.id }))}
      onDelete={(index) => dispatch(deleteResumeProject({ id: resume.id, index }))}
      onMove={(from, to) => dispatch(reorderEntries({ id: resume.id, section: 'projects', from, to }))}
      onUpdate={(index, patch) =>
        dispatch(
          updateResumeProject({ id: resume.id, index, value: { ...entries[index], ...patch } })
        )
      }
      render={(entry, index, update) => (
        <>
          <div className='grid gap-4 sm:grid-cols-2'>
            <TextField
              label='Project name'
              value={entry.projectName ?? ''}
              placeholder='OpenUI'
              onChange={(event) => update(index, { projectName: event.target.value })}
            />
            <TextField
              label='Link'
              value={entry.projectLink ?? ''}
              placeholder='github.com/you/openui'
              onChange={(event) => update(index, { projectLink: event.target.value })}
            />
          </div>
          <TextAreaField
            label='What it is (optional)'
            bulleted
            rows={4}
            value={entry.projectDescription ?? ''}
            placeholder='A component library used by three product teams. Built the theming layer and wrote the contributing guide.'
            onChange={(event) => update(index, { projectDescription: event.target.value })}
          />
        </>
      )}
    />
  );
}
