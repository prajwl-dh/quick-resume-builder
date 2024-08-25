'use client';
import { ResumeInterface } from '@/components/builder/previousResumes/ResumeInterface';
import RefContext from '@/lib/providers/RefContext';
import { useAppDispatch } from '@/lib/store/hooks';
import { useContext } from 'react';
import { CertificateSvg } from '../../navbar/svgs/CertificateSvg';

export default function Certifications({
  resume,
}: {
  resume: ResumeInterface | undefined;
}) {
  const { certificationsRef } = useContext(RefContext);
  const dispatch = useAppDispatch();

  return (
    <div className='w-full flex flex-col gap-4'>
      <div ref={certificationsRef} className='flex flex-row gap-2 items-center'>
        <CertificateSvg className='w-8 h-8 text-light-text-primary dark:text-dark-text-primary' />
        <p className='text text-3xl text-light-text-primary dark:text-dark-text-primary'>
          Certifications
        </p>
      </div>
    </div>
  );
}
