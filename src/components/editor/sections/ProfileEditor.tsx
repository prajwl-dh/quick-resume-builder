'use client';

import type { ResumeInterface, ResumeProfile } from '@/components/builder/previousResumes/ResumeInterface';
import {
  addCustomProfileField,
  deleteCustomProfileField,
  updateResumeProfile,
} from '@/lib/slices/resumeSlice';
import { useAppDispatch } from '@/lib/store/hooks';
import { useState } from 'react';
import { LuPlus, LuX } from 'react-icons/lu';
import { TextAreaField, TextField } from '../fields';

export default function ProfileEditor({ resume }: { resume: ResumeInterface }) {
  const dispatch = useAppDispatch();
  const [label, setLabel] = useState('');
  const [link, setLink] = useState('');
  const customFields = resume.profile.profileCustomField ?? [];

  const update = (key: keyof ResumeProfile, value: string) => {
    dispatch(updateResumeProfile({ id: resume.id, key, value }));
  };

  const updateCustom = (fieldName: string, fieldValue: string) => {
    dispatch(
      addCustomProfileField({
        id: resume.id,
        key: 'profileCustomField',
        value: { fieldName, fieldValue },
      })
    );
  };

  const addCustom = () => {
    if (!link.trim()) return;
    const name = label.trim() || 'Link';
    dispatch(
      addCustomProfileField({
        id: resume.id,
        key: 'profileCustomField',
        value: { fieldName: name, fieldValue: link.trim() },
      })
    );
    setLabel('');
    setLink('');
  };

  return (
    <div className='space-y-7'>
      <div className='grid gap-4 sm:grid-cols-2'>
        <TextField
          label='Full name'
          value={resume.profile.fullName ?? ''}
          placeholder='Alex Morgan'
          autoComplete='name'
          onChange={(event) => update('fullName', event.target.value)}
        />
        <TextField
          label='Role or headline'
          value={resume.profile.intro ?? ''}
          placeholder='Product designer'
          onChange={(event) => update('intro', event.target.value)}
        />
      </div>

      <div className='grid gap-4 sm:grid-cols-2'>
        <TextField
          label='Email'
          type='email'
          value={resume.profile.email ?? ''}
          placeholder='alex@example.com'
          autoComplete='email'
          onChange={(event) => update('email', event.target.value)}
        />
        <TextField
          label='Phone'
          type='tel'
          value={resume.profile.phone ?? ''}
          placeholder='+1 415 555 0132'
          autoComplete='tel'
          onChange={(event) => update('phone', event.target.value)}
        />
      </div>

      <div className='grid gap-4 sm:grid-cols-2'>
        <TextField
          label='Location'
          value={resume.profile.location ?? ''}
          placeholder='Austin, TX'
          autoComplete='address-level2'
          onChange={(event) => update('location', event.target.value)}
        />
        <TextField
          label='Website'
          value={resume.profile.website ?? ''}
          placeholder='alexmorgan.dev'
          onChange={(event) => update('website', event.target.value)}
        />
      </div>

      <div className='grid gap-4 sm:grid-cols-2'>
        <TextField
          label='LinkedIn'
          value={resume.profile.linkedIn ?? ''}
          placeholder='linkedin.com/in/alexmorgan'
          onChange={(event) => update('linkedIn', event.target.value)}
        />
        <TextField
          label='GitHub'
          value={resume.profile.gitHub ?? ''}
          placeholder='github.com/alexmorgan'
          onChange={(event) => update('gitHub', event.target.value)}
        />
      </div>

      {customFields.length ? (
        <div className='space-y-2'>
          <p className='label mb-2'>Other links</p>
          {customFields.map((field) => (
            <div key={field.fieldName} className='flex items-center gap-2'>
              <span className='w-24 shrink-0 truncate rounded-md bg-sunken px-2 py-1.5 text-[11.5px] font-medium text-ink-soft'>
                {field.fieldName}
              </span>
              <input
                aria-label={`${field.fieldName} value`}
                className='input h-9 flex-1 text-[13px]'
                value={field.fieldValue}
                placeholder='portfolio.example.com'
                onChange={(event) => updateCustom(field.fieldName, event.target.value)}
              />
              <button
                type='button'
                aria-label={`Remove ${field.fieldName}`}
                onClick={() =>
                  dispatch(
                    deleteCustomProfileField({
                      id: resume.id,
                      key: 'profileCustomField',
                      fieldName: field.fieldName,
                    })
                  )
                }
                className='icon-btn h-9 w-9 shrink-0'
              >
                <LuX className='h-4 w-4' />
              </button>
            </div>
          ))}
        </div>
      ) : null}

      <div className='rounded-xl border border-dashed border-line-strong bg-surface/60 p-3.5'>
        <p className='text-[12.5px] font-medium text-ink-soft'>Add a link</p>
        <p className='mt-0.5 text-[12px] text-ink-faint'>
          A portfolio, case study or writing page. Label it so the link makes sense on paper.
        </p>
        <div className='mt-3 flex flex-col gap-2 sm:flex-row'>
          <input
            aria-label='Link label'
            className='input h-9 sm:w-32'
            value={label}
            placeholder='Portfolio'
            onChange={(event) => setLabel(event.target.value)}
          />
          <input
            aria-label='Link address'
            className='input h-9 flex-1'
            value={link}
            placeholder='alexmorgan.dev/work'
            onChange={(event) => setLink(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
                addCustom();
              }
            }}
          />
          <button
            type='button'
            onClick={addCustom}
            disabled={!link.trim()}
            className='btn btn-secondary btn-sm h-9 shrink-0'
          >
            <LuPlus className='h-3.5 w-3.5' />
            Add
          </button>
        </div>
      </div>

      <TextAreaField
        label='Summary'
        counter
        rows={5}
        value={resume.profile.summary ?? ''}
        placeholder='Two or three sentences about the work you do, the kind of team you do it with, and what you want next.'
        hint='Keep it under about 450 characters. This is the first thing a reader slows down for.'
        onChange={(event) => update('summary', event.target.value)}
      />
    </div>
  );
}
