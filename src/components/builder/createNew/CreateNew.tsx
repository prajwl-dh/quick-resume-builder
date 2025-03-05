'use client';
import PrimaryButton from '@/components/buttons/PrimaryButton';
import { useState } from 'react';
import CreateConfirmationPopup from './CreateConfirmationPopup';

export default function CreateNew() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <PrimaryButton onClick={() => setOpen(true)}>Create Resume</PrimaryButton>

      <CreateConfirmationPopup open={open} setOpen={setOpen} />
    </>
  );
}
