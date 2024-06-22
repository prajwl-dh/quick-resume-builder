'use client';

import CreateNew from './CreateNew';
import ImportResume from './ImportResume';

export default function BuilderHome() {
  return (
    <div className='w-full 2xl:w-10/12 px-1 flex flex-col justify-center items-center'>
      <div className='w-full flex flex-wrap gap-4 py-5 justify-center lg:justify-start'>
        <CreateNew />
        <ImportResume />
      </div>
    </div>
  );
}
