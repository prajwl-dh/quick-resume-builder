import { CreateSvg } from './CreateSvg';

export default function CreateNew() {
  return (
    <div className='h-60 md:h-80 w-full md:w-72 p-3 gap-1 flex flex-col justify-between items-center rounded-md ring-1 ring-light-ring-secondary dark:ring-dark-ring-secondary hover:ring-light-ring-primary hover:dark:ring-dark-ring-primary bg-light-foreground dark:bg-dark-foreground cursor-pointer hover:shadow-sm'>
      <div className='flex-grow flex justify-center items-center'>
        <CreateSvg className='text text-5xl md:text-6xl text-light-text-primary dark:text-dark-text-primary' />
      </div>
      <p className='text text-md font-bold self-start text-light-text-primary dark:text-dark-text-primary'>
        Create New Resume
      </p>
      <p className='text text-sm text-light-text-secondary self-start dark:text-dark-text-secondary'>
        Create a brand new resume from scratch
      </p>
    </div>
  );
}
