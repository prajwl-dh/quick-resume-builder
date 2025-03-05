'use client';
import CreateNew from './createNew/CreateNew';
import PreviousResumes from './previousResumes/PreviousResumes';

export default function BuilderHome() {
  return (
    <div className='w-full 2xl:w-10/12 px-5 md:px-1 py-5 md:py-10 flex flex-col justify-center items-center mb-10'>
      <div className='w-full grid grid-cols-1 sm:grid-cols-[repeat(auto-fill,minmax(270px,1fr))] gap-10'>
        <CreateNew />
        <PreviousResumes />
      </div>
    </div>
  );
}
