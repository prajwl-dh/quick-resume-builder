'use client';

import NotFound from '@/app/not-found';
import Navbar from '@/components/navbar/Navbar';
import ScrollToTheTop from '@/components/scroll-to-top/ScrollToTheTop';
import { useAppSelector } from '@/lib/store/hooks';

type SlugType = {
  params: { slug: string };
};

export default function Slug({ params }: SlugType) {
  const resume = useAppSelector((state) => state.resumeReducer.value).filter(
    (resume) => resume?.id === params?.slug
  );

  if (resume?.length === 0) {
    return <NotFound />;
  }

  return (
    <div className='flex flex-col justify-between mt-[70px]'>
      <Navbar />
      <div className='w-screen px-1 md:px-14 flex flex-col items-center'>
        <div className='flex flex-col gap-2'>
          <p>{resume[0]?.id}</p>
          <p>{resume[0]?.fullName}</p>
          <p>{resume[0]?.last_accessed}</p>
          <p>{resume[0]?.title}</p>
        </div>
        <ScrollToTheTop />
      </div>
    </div>
  );
}
