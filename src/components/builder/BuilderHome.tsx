'use client';

import { useAppSelector } from '@/app/store/hooks';
import CreateNew from './CreateNew';
import ImportResume from './ImportResume';
import PreviousResumes from './PreviousResumes';

export default function BuilderHome() {
  const resumes = useAppSelector((state) => state.resumeReducer.value);

  console.log(resumes);
  return (
    <div className='w-full 2xl:w-10/12 px-1 py-5 flex flex-col justify-center items-center'>
      <div className='w-full grid grid-cols-1 sm:grid-cols-[repeat(auto-fill,minmax(270px,1fr))] gap-10'>
        <CreateNew />
        <ImportResume />
        <PreviousResumes />
      </div>
    </div>
  );
}
