import { PDFDownloadLink } from '@react-pdf/renderer';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import { ResumeInterface } from '../builder/previousResumes/ResumeInterface';
import SecondaryButton from '../buttons/SecondaryButton';
import ResumeDocument from './ResumeDocument';

export default function MobileResumePreview({
  resume,
}: {
  resume: ResumeInterface | undefined;
}) {
  return (
    <div className='bg-light-background dark:bg-dark-foreground h-[calc(100dvh-56px)] lg:hidden w-full fixed mt-14 flex flex-col justify-center items-center overflow-hidden'>
      <TransformWrapper
        initialScale={1}
        minScale={0.6}
        maxScale={1}
        centerZoomedOut
      >
        {({ setTransform }) => (
          <>
            <div className='absolute top-0 z-50 w-full h-14 flex justify-end items-center px-4 bg-light-background dark:bg-dark-foreground'>
              <div className='flex gap-4'>
                <SecondaryButton
                  onClick={() => {
                    setTransform(0, 0, 1);
                  }}
                >
                  Reset Zoom
                </SecondaryButton>

                <PDFDownloadLink
                  className='text-light-button-primary-text dark:text-dark-button-primary-text bg-light-button-primary-background dark:bg-dark-button-primary-background hover:bg-light-button-primary-active dark:hover:bg-dark-button-primary-active ring-1 ring-light-button-primary-background dark:ring-dark-button-primary-background hover:ring-light-button-primary-active dark:hover:ring-dark-button-primary-active px-3 py-1.5 rounded-md shadow-sm outline-none transition duration-200 text-md hover:-translate-y-0.5'
                  document={<ResumeDocument resume={resume} />}
                  fileName={`Resume_${resume?.profile.fullName}`}
                >
                  Download PDF
                </PDFDownloadLink>
              </div>
            </div>

            <TransformComponent>
              <div className='bg-white border-[1px] shadow-md rounded-md mx-2 mb-10 px-4 mt-24 min-h-[90dvh] w-[calc(100dvw-15px)] cursor-grab'>
                <ResumeDocument resume={resume} />
              </div>
            </TransformComponent>
          </>
        )}
      </TransformWrapper>
    </div>
  );
}
