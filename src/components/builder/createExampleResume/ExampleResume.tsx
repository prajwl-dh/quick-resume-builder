'use client';

import { EXAMPLE_RESUME_ID } from '@/lib/resumeDefaults';
import { useRouter } from 'next/navigation';
import SecondaryButton from '@/components/buttons/SecondaryButton';

export default function ExampleResume() {
  const router = useRouter();

  return (
    <SecondaryButton onClick={() => router.push(`/builder/${EXAMPLE_RESUME_ID}`)}>
      View Example Resume
    </SecondaryButton>
  );
}
