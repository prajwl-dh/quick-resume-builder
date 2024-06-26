'use client';

import NotFound from '@/app/not-found';
import BuilderNavbar from '@/components/builderSlug/navbar/BuilderNavbar';
import { useAppSelector } from '@/lib/store/hooks';

type SlugType = {
  params: { slug: string };
};

export default function Slug({ params }: SlugType) {
  const resume = useAppSelector((state) => state.resumeReducer.value).find(
    (resume) => resume?.id === params?.slug
  );

  if (!resume) {
    return <NotFound />;
  }

  return (
    <div className='flex flex-col justify-between'>
      <div className='w-screen flex'>
        <BuilderNavbar />
      </div>
    </div>
  );
}
