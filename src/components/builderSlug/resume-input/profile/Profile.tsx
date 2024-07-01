'use client';
import { ResumeInterface } from '@/components/builder/previousResumes/ResumeInterface';
import RefContext from '@/lib/providers/RefContext';
import { updateResume } from '@/lib/slices/resumeSlice';
import { useAppDispatch } from '@/lib/store/hooks';
import { useContext } from 'react';
import { ProfileSvg } from '../../navbar/svgs/ProfileSvg';

export default function Profile({
  resume,
}: {
  resume: ResumeInterface | undefined;
}) {
  const { profileRef } = useContext(RefContext);
  const dispatch = useAppDispatch();

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

  return (
    <div className='w-full flex flex-col gap-4'>
      <div ref={profileRef} className='flex flex-row gap-2 items-center'>
        <ProfileSvg className='w-8 h-8 text-light-text-primary dark:text-dark-text-primary' />
        <p className='text text-3xl text-light-text-primary dark:text-dark-text-primary'>
          Profile
        </p>
      </div>
      <div className='flex flex-col flex-1 gap-2'>
        <label className='text text-md font-medium text-light-text-primary dark:text-dark-text-primary'>
          Full Name
        </label>
        <input
          className='p-2 rounded-md ring-1 focus:outline-none bg-light-foreground dark:bg-dark-foreground placeholder:text-light-form-placeholder placeholder:dark:text-dark-form-placeholder text-light-text-primary ring-light-ring-secondary dark:ring-dark-ring-secondary focus:ring-light-ring-primary focus:dark:ring-dark-ring-primary dark:text-dark-text-primary text-md'
          type='text'
          name='fullName'
          placeholder='John Doe Smith'
          value={resume?.fullName || undefined}
          onChange={(e) => handleChange(e)}
        ></input>
      </div>
      <div className='flex flex-col flex-1 gap-2'>
        <label className='text text-md font-medium text-light-text-primary dark:text-dark-text-primary'>
          Intro
        </label>
        <input
          className='p-2 rounded-md ring-1 focus:outline-none bg-light-foreground dark:bg-dark-foreground placeholder:text-light-form-placeholder placeholder:dark:text-dark-form-placeholder text-light-text-primary ring-light-ring-secondary dark:ring-dark-ring-secondary focus:ring-light-ring-primary focus:dark:ring-dark-ring-primary dark:text-dark-text-primary text-md'
          name='intro'
          onChange={(e) => handleChange(e)}
          type='text'
          value={resume?.intro || ''}
          placeholder='An Innovative Web Developer'
        ></input>
      </div>
      <div className='flex flex-row flex-wrap justify-start gap-2'>
        <div className='flex flex-col flex-1 gap-2'>
          <label className='text text-md font-medium text-light-text-primary dark:text-dark-text-primary'>
            Email
          </label>
          <input
            className='p-2 rounded-md ring-1 focus:outline-none bg-light-foreground dark:bg-dark-foreground placeholder:text-light-form-placeholder placeholder:dark:text-dark-form-placeholder text-light-text-primary ring-light-ring-secondary dark:ring-dark-ring-secondary focus:ring-light-ring-primary focus:dark:ring-dark-ring-primary dark:text-dark-text-primary text-md'
            type='email'
            name='email'
            onChange={(e) => handleChange(e)}
            value={resume?.email || ''}
            placeholder='john@email.com'
          ></input>
        </div>
        <div className='flex flex-col flex-1 gap-2'>
          <label className='text text-md font-medium text-light-text-primary dark:text-dark-text-primary'>
            Location
          </label>
          <input
            className='p-2 rounded-md ring-1 focus:outline-none bg-light-foreground dark:bg-dark-foreground placeholder:text-light-form-placeholder placeholder:dark:text-dark-form-placeholder text-light-text-primary ring-light-ring-secondary dark:ring-dark-ring-secondary focus:ring-light-ring-primary focus:dark:ring-dark-ring-primary dark:text-dark-text-primary text-md'
            type='text'
            name='location'
            onChange={(e) => handleChange(e)}
            value={resume?.location || ''}
            placeholder='Dallas, TX'
          ></input>
        </div>
      </div>
      <div className='flex flex-row flex-wrap justify-start gap-2'>
        <div className='flex flex-col flex-1 gap-2'>
          <label className='text text-md font-medium text-light-text-primary dark:text-dark-text-primary'>
            Phone
          </label>
          <input
            className='p-2 rounded-md ring-1 focus:outline-none bg-light-foreground dark:bg-dark-foreground placeholder:text-light-form-placeholder placeholder:dark:text-dark-form-placeholder text-light-text-primary ring-light-ring-secondary dark:ring-dark-ring-secondary focus:ring-light-ring-primary focus:dark:ring-dark-ring-primary dark:text-dark-text-primary text-md'
            type='text'
            name='phone'
            onChange={(e) => handleChange(e)}
            value={resume?.phone || ''}
            placeholder='+1 415 555 0132'
          ></input>
        </div>
        <div className='flex flex-col flex-1 gap-2'>
          <label className='text text-md font-medium text-light-text-primary dark:text-dark-text-primary'>
            Website
          </label>
          <input
            className='p-2 rounded-md ring-1 focus:outline-none bg-light-foreground dark:bg-dark-foreground placeholder:text-light-form-placeholder placeholder:dark:text-dark-form-placeholder text-light-text-primary ring-light-ring-secondary dark:ring-dark-ring-secondary focus:ring-light-ring-primary focus:dark:ring-dark-ring-primary dark:text-dark-text-primary text-md'
            type='text'
            name='website'
            onChange={(e) => handleChange(e)}
            value={resume?.website || ''}
            placeholder='https://portforlio.com'
          ></input>
        </div>
      </div>
      <div className='flex flex-row flex-wrap justify-start gap-2'>
        <div className='flex flex-col flex-1 gap-2'>
          <label className='text text-md font-medium text-light-text-primary dark:text-dark-text-primary'>
            LinkedIn
          </label>
          <input
            className='p-2 rounded-md ring-1 focus:outline-none bg-light-foreground dark:bg-dark-foreground placeholder:text-light-form-placeholder placeholder:dark:text-dark-form-placeholder text-light-text-primary ring-light-ring-secondary dark:ring-dark-ring-secondary focus:ring-light-ring-primary focus:dark:ring-dark-ring-primary dark:text-dark-text-primary text-md'
            type='text'
            name='linkedIn'
            onChange={(e) => handleChange(e)}
            value={resume?.linkedIn || ''}
            placeholder='https://www.linkedin.com/in/john-doe-smith/'
          ></input>
        </div>
        <div className='flex flex-col flex-1 gap-2'>
          <label className='text text-md font-medium text-light-text-primary dark:text-dark-text-primary'>
            GitHub
          </label>
          <input
            className='p-2 rounded-md ring-1 focus:outline-none bg-light-foreground dark:bg-dark-foreground placeholder:text-light-form-placeholder placeholder:dark:text-dark-form-placeholder text-light-text-primary ring-light-ring-secondary dark:ring-dark-ring-secondary focus:ring-light-ring-primary focus:dark:ring-dark-ring-primary dark:text-dark-text-primary text-md'
            type='text'
            name='gitHub'
            onChange={(e) => handleChange(e)}
            value={resume?.gitHub || ''}
            placeholder='https://github.com/john-doe-smith'
          ></input>
        </div>
      </div>
      <div className='flex flex-col flex-1 gap-2'>
        <label className='text text-md font-medium text-light-text-primary dark:text-dark-text-primary'>
          Summary
        </label>
        <textarea
          className='p-2 rounded-md ring-1 focus:outline-none bg-light-foreground dark:bg-dark-foreground placeholder:text-light-form-placeholder placeholder:dark:text-dark-form-placeholder text-light-text-primary ring-light-ring-secondary dark:ring-dark-ring-secondary focus:ring-light-ring-primary focus:dark:ring-dark-ring-primary dark:text-dark-text-primary text-md'
          placeholder='Professional summary here'
          name='summary'
          onChange={(e) => handleChange(e)}
          value={resume?.summary || ''}
          rows={5}
        ></textarea>
      </div>
    </div>
  );
}
