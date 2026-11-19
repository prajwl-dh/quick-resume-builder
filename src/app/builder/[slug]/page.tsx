'use client';

import { useAppSelector } from '@/lib/store/hooks';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { LuArrowLeft } from 'react-icons/lu';
import Workspace from '@/components/workspace/Workspace';

type SlugType = {
  params: { slug: string };
};

export default function Slug({ params }: SlugType) {
  const [mounted, setMounted] = useState(false);
  const resumes = useAppSelector((state) => state.resumeReducer.value);
  const resume = resumes.find((item) => item?.id === params?.slug);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className='flex h-dvh items-center justify-center bg-canvas'>
        <div className='flex flex-col items-center gap-3'>
          <span className='h-8 w-8 animate-spin rounded-full border-2 border-line border-t-accent' />
          <p className='text-[12.5px] text-ink-faint'>Opening your resume…</p>
        </div>
      </div>
    );
  }

  if (!resume) {
    return (
      <div className='flex min-h-dvh items-center justify-center bg-canvas px-6'>
        <div className='max-w-sm text-center'>
          <h1 className='font-display text-3xl text-ink'>This resume is not here.</h1>
          <p className='mt-2 text-[13.5px] leading-[1.6] text-ink-soft'>
            It may have been deleted, or this link came from another browser. Your
            resumes are saved on each device separately.
          </p>
          <Link href='/builder' className='btn btn-primary mt-5'>
            <LuArrowLeft className='h-4 w-4' />
            Back to your resumes
          </Link>
        </div>
      </div>
    );
  }

  return <Workspace resume={resume} />;
}
