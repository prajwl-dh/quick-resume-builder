'use client';
import CreateNew from './CreateNew';
import ImportResume from './ImportResume';
import PreviousResumes from './PreviousResumes';

export default function BuilderHome() {
  return (
    <div className='w-full 2xl:w-10/12 px-1 py-10 flex flex-col justify-center items-center mb-10'>
      <div className='w-full grid grid-cols-1 sm:grid-cols-[repeat(auto-fill,minmax(270px,1fr))] gap-10'>
        <CreateNew />
        <ImportResume />
        <PreviousResumes />
      </div>
    </div>
  );
}
