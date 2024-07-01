import { ProfileSvg } from '../../navbar/svgs/ProfileSvg';

export default function Profile() {
  return (
    <div className='w-full flex flex-col gap-4'>
      <div className='flex flex-row gap-2 items-center'>
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
          placeholder='John Doe Smith'
        ></input>
      </div>
      <div className='flex flex-col flex-1 gap-2'>
        <label className='text text-md font-medium text-light-text-primary dark:text-dark-text-primary'>
          Intro
        </label>
        <input
          className='p-2 rounded-md ring-1 focus:outline-none bg-light-foreground dark:bg-dark-foreground placeholder:text-light-form-placeholder placeholder:dark:text-dark-form-placeholder text-light-text-primary ring-light-ring-secondary dark:ring-dark-ring-secondary focus:ring-light-ring-primary focus:dark:ring-dark-ring-primary dark:text-dark-text-primary text-md'
          type='text'
          placeholder='Creative and Innovative Web Developer'
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
            placeholder='https://portforlio.com'
          ></input>
        </div>
      </div>
    </div>
  );
}
