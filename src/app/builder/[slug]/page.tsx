'use client';

import NotFound from '@/app/not-found';
import BuilderNavbar from '@/components/builderSlug/navbar/BuilderNavbar';
import ResumeInput from '@/components/builderSlug/resume-input/ResumeInput';
import DesktopResumePreview from '@/components/resume-preview/DesktopResumePreview';
import MobileResumePreview from '@/components/resume-preview/MobileResumePreview';
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
    <div className='flex h-dvh flex-col overflow-hidden'>
      <div className='flex min-h-0 flex-1'>
        <BuilderNavbar
          isSidebarOpen={isSidebarOpen}
          setSidebarOpen={setSidebarOpen}
          isResumePreviewOpen={isResumePreviewOpen}
          setIsResumePreviewOpen={setIsResumePreviewOpen}
        />
        {isResumePreviewOpen ? (
          <MobileResumePreview resume={resume} />
        ) : (
          <>
            <ResumeInput resume={resume} />
            <DesktopResumePreview resume={resume} />
          </>
        )}
      </div>
    </div>
  );
}
