import { PDFDownloadLink } from '@react-pdf/renderer';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import { ResumeInterface } from '../builder/previousResumes/ResumeInterface';
import PrimaryButton from '../buttons/PrimaryButton';
import SecondaryButton from '../buttons/SecondaryButton';
import ResumeDocument from './ResumeDocument';

export default function MobileResumePreview({
  resume,
}: {
  resume: ResumeInterface | undefined;
}) {
  return (
    <div className='bg-light-background dark:bg-dark-foreground h-[calc(100dvh-56px)] lg:hidden w-full fixed mt-14 flex flex-col justify-center items-center overflow-hidden'>
      <div className='absolute top-0 z-50 w-full h-14 flex justify-end items-center px-4 bg-light-background dark:bg-dark-foreground'>
        <div className='flex gap-4'>
          <SecondaryButton>Reset Zoom</SecondaryButton>
          <PrimaryButton>
            <PDFDownloadLink
              document={<ResumeDocument resume={resume} />}
              fileName={`Resume_${resume?.profile.fullName}`}
            >
              Download PDF
            </PDFDownloadLink>
          </PrimaryButton>
        </div>
      </div>
      <TransformWrapper
        initialScale={0.9}
        minScale={0.6}
        maxScale={1}
        centerOnInit
        centerZoomedOut
      >
        <TransformComponent>
          <div className='bg-white border-[1px] shadow-md rounded-md mx-10 mb-10 px-4 mt-24 min-h-[90dvh] w-dvw cursor-grab'>
            <ResumeDocument resume={resume} />
          </div>
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
}
