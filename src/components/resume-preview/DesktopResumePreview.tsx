import { PDFDownloadLink } from '@react-pdf/renderer';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import { ResumeInterface } from '../builder/previousResumes/ResumeInterface';
import PrimaryButton from '../buttons/PrimaryButton';
import SecondaryButton from '../buttons/SecondaryButton';
import ResumeDocument from './ResumeDocument';

export default function DesktopResumePreview({
  resume,
}: {
  resume: ResumeInterface | undefined;
}) {
  return (
    <div className='hidden lg:flex flex-col bg-white dark:bg-dark-foreground justify-center items-center fixed max-h-dvh w-[calc(100vw-(16rem+35vw))] 2xl:w-[calc(100vw-(16rem+40vw))] lg:ml-[calc(16rem+35vw)] 2xl:ml-[calc(16rem+40vw)] overflow-hidden'>
      <div className='absolute top-0 z-50 w-full h-14 flex justify-end items-center px-4 bg-white dark:bg-dark-foreground'>
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
        centerZoomedOut
      >
        <TransformComponent>
          <div className='bg-white border-[1px] shadow-md rounded-md mx-10 mb-10 mt-24 px-4 min-h-[90dvh] cursor-grab min-w-[calc(100vw-(16rem+35vw+80px))] 2xl:min-w-[calc(100vw-(16rem+40vw+80px))] antialiased'>
            <ResumeDocument resume={resume} />
          </div>
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
}
