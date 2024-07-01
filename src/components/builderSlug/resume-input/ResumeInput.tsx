import { ResumeInterface } from '@/components/builder/previousResumes/ResumeInterface';
import Profile from './profile/Profile';

export default function ResumeInput({
  resume,
}: {
  resume: ResumeInterface | undefined;
}) {
  return (
    <div className='flex lg:h-screen'>
      <div className='flex flex-col gap-5 lg:ml-64 p-2 lg:p-4 w-full mt-14 lg:mt-0 lg:w-[35vw] 2xl:w-[40vw] overflow-x-hidden overflow-y-auto'>
        <Profile resume={resume} />
      </div>
    </div>
  );
}
