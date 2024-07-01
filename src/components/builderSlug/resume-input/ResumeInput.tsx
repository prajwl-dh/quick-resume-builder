import Profile from './profile/Profile';

export default function ResumeInput() {
  return (
    <div className='flex lg:h-screen'>
      <div className='lg:ml-64 p-2 lg:p-4 w-full mt-14 lg:mt-0 lg:w-[35vw] 2xl:w-[40vw] overflow-x-hidden overflow-y-auto'>
        <Profile />
      </div>
    </div>
  );
}
