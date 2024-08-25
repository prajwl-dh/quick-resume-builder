'use client';
import { DeleteSvg } from '@/components/builder/previousResumes/DeleteSvg';
import { ResumeInterface } from '@/components/builder/previousResumes/ResumeInterface';
import RefContext from '@/lib/providers/RefContext';
import {
  addCustomField,
  deleteCustomField,
  updateResume,
} from '@/lib/slices/resumeSlice';
import { useAppDispatch } from '@/lib/store/hooks';
import React, { useContext } from 'react';
import { ProfileSvg } from '../../navbar/svgs/ProfileSvg';
import InputField from '../inputComponents/InputField';
import TextAreaField from '../inputComponents/TextAreaField';
import CustomFieldPopup from '../resume-input-popups/CustomFieldPopup';

export default function Profile({
  resume,
}: {
  resume: ResumeInterface | undefined;
}) {
  console.log(resume);
  const { profileRef } = useContext(RefContext);
  const dispatch = useAppDispatch();
  const [open, setOpen] = React.useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    dispatch(
      updateResume({
        id: resume?.id ?? '',
        key: e.target.name as keyof ResumeInterface,
        value: e.target.value,
      })
    );
  };

  const handleCustomFieldChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    dispatch(
      addCustomField({
        id: resume?.id ?? '',
        key: 'profileCustomField',
        value: {
          fieldName: e.target.name,
          fieldValue: e.target.value,
        },
      })
    );
  };

  return (
    <div className='w-full flex flex-col gap-4'>
      <div ref={profileRef} className='flex flex-row gap-2 items-center'>
        <ProfileSvg className='w-8 h-8 text-light-text-primary dark:text-dark-text-primary' />
        <p className='text text-3xl text-light-text-primary dark:text-dark-text-primary'>
          Profile
        </p>
      </div>

      <InputField
        label='Full Name'
        type='text'
        name='fullName'
        placeholder='John Doe Smith'
        value={resume?.fullName || undefined}
        onChange={(e) => handleChange(e)}
      />

      <InputField
        label='Intro'
        name='intro'
        onChange={(e) => handleChange(e)}
        type='text'
        value={resume?.intro || ''}
        placeholder='An Innovative Web Developer'
      />

      <div className='flex flex-row flex-wrap justify-start gap-2'>
        <InputField
          label='Email'
          type='email'
          name='email'
          onChange={(e) => handleChange(e)}
          value={resume?.email || ''}
          placeholder='john@email.com'
        />

        <InputField
          label='Location'
          type='text'
          name='location'
          onChange={(e) => handleChange(e)}
          value={resume?.location || ''}
          placeholder='Dallas, TX'
        />
      </div>

      <div className='flex flex-row flex-wrap justify-start gap-2'>
        <InputField
          label='Phone'
          type='text'
          name='phone'
          onChange={(e) => handleChange(e)}
          value={resume?.phone || ''}
          placeholder='+1 415 555 0132'
        />

        <InputField
          label='Website'
          type='text'
          name='website'
          onChange={(e) => handleChange(e)}
          value={resume?.website || ''}
          placeholder='https://portforlio.com'
        />
      </div>

      <div className='flex flex-row flex-wrap justify-start gap-2'>
        <InputField
          label='LinkedIn'
          type='text'
          name='linkedIn'
          onChange={(e) => handleChange(e)}
          value={resume?.linkedIn || ''}
          placeholder='https://www.linkedin.com/in/john-doe-smith/'
        />

        <InputField
          label='GitHub'
          type='text'
          name='gitHub'
          onChange={(e) => handleChange(e)}
          value={resume?.gitHub || ''}
          placeholder='https://github.com/john-doe-smith'
        />
      </div>

      {resume?.profileCustomField?.map((field, index) => {
        return (
          <div key={index} className='flex flex-row gap-2 items-end'>
            <InputField
              label={field.fieldName}
              type='text'
              name={field.fieldName}
              value={field.fieldValue || ''}
              onChange={(e) => handleCustomFieldChange(e)}
            />
            <DeleteSvg
              onClick={() =>
                dispatch(
                  deleteCustomField({
                    id: resume?.id ?? '',
                    key: 'profileCustomField',
                    fieldName: field.fieldName,
                  })
                )
              }
              className='text text-3xl mb-1 text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text-primary hover:dark:text-dark-text-primary cursor-pointer'
            />
          </div>
        );
      })}

      <div
        onClick={() => setOpen(true)}
        className='flex flex-row items-center gap-2 text-light-text-secondary text text-md dark:text-dark-text-secondary hover:text-light-text-primary hover:dark:text-dark-text-primary cursor-pointer group'
      >
        <p className='text text-lg'> + </p>
        <p className='group-hover:underline underline-offset-2'>
          Add a custom field
        </p>
      </div>

      <CustomFieldPopup
        open={open}
        setOpen={setOpen}
        source={'profile'}
        resume={resume}
      />

      <TextAreaField
        label='Summary'
        placeholder='Professional summary here'
        name='summary'
        onChange={(e) => handleChange(e)}
        value={resume?.summary || ''}
        rows={5}
      />
    </div>
  );
}
