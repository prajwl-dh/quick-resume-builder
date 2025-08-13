import { PDFDownloadLink } from '@react-pdf/renderer';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import { ResumeInterface } from '../builder/previousResumes/ResumeInterface';
import SecondaryButton from '../buttons/SecondaryButton';
import ResumeDocument from './ResumeDocument';

export default function DesktopResumePreview({
  resume,
}: {
  resume: ResumeInterface | undefined;
}) {
  return (
    <div className='hidden lg:flex flex-col bg-white dark:bg-dark-foreground justify-center items-center fixed max-h-dvh w-[calc(100vw-(16rem+35vw))] 2xl:w-[calc(100vw-(16rem+40vw))] lg:ml-[calc(16rem+35vw)] 2xl:ml-[calc(16rem+40vw)] overflow-hidden'>
      <TransformWrapper initialScale={1} minScale={0.6} maxScale={1}>
        {({ setTransform }) => (
          <>
            <div className='absolute top-0 z-50 w-full h-14 flex justify-end items-center px-4 bg-white dark:bg-dark-foreground'>
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
              <div className='bg-white border-[1px] shadow-md rounded-md mx-10 mb-10 mt-24 px-4 min-h-[90dvh] cursor-grab min-w-[calc(100vw-(16rem+35vw+80px))] 2xl:min-w-[calc(100vw-(16rem+40vw+80px))] antialiased'>
                <ResumeDocument resume={resume} />
              </div>
            </TransformComponent>
          </>
        )}
      </TransformWrapper>
    </div>
  );
}
