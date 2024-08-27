'use client';

import NotFound from '@/app/not-found';
import BuilderNavbar from '@/components/builderSlug/navbar/BuilderNavbar';
import ResumeInput from '@/components/builderSlug/resume-input/ResumeInput';
import MobileResumePreview from '@/components/resume-preview/MobileResumePreview';
import ResumePreview from '@/components/resume-preview/ResumePreview';
import { useAppSelector } from '@/lib/store/hooks';
import { useState } from 'react';

type SlugType = {
  params: { slug: string };
};

export default function Slug({ params }: SlugType) {
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [isResumePreviewOpen, setIsResumePreviewOpen] =
    useState<boolean>(false);

  const resume = useAppSelector((state) => state.resumeReducer.value).find(
    (resume) => resume?.id === params?.slug
  );

  if (!resume) {
    return <NotFound />;
  }

  return (
    <div className='flex flex-col justify-between'>
      <div className='w-screen flex flex-col lg:flex-row'>
        {!isResumePreviewOpen ? (
          <>
            <BuilderNavbar
              isSidebarOpen={isSidebarOpen}
              setSidebarOpen={setSidebarOpen}
              isResumePreviewOpen={isResumePreviewOpen}
              setIsResumePreviewOpen={setIsResumePreviewOpen}
            />
            <ResumeInput resume={resume} />
            <ResumePreview resume={resume} />
          </>
        ) : (
          <>
            <BuilderNavbar
              isSidebarOpen={isSidebarOpen}
              setSidebarOpen={setSidebarOpen}
              isResumePreviewOpen={isResumePreviewOpen}
              setIsResumePreviewOpen={setIsResumePreviewOpen}
            />
            <MobileResumePreview resume={resume} />
          </>
        )}
      </div>
    </div>
  );
}
