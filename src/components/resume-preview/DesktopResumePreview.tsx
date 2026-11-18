import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import { ResumeInterface } from '../builder/previousResumes/ResumeInterface';
import PreviewToolbar from './PreviewToolbar';
import ResumePaper from './ResumePaper';
import useOnePageHeight from './useOnePageHeight';

export default function DesktopResumePreview({
  resume,
}: {
  resume: ResumeInterface | undefined;
}) {
  const { measureRef, pageHeight } = useOnePageHeight(resume);

  return (
    <div className='relative hidden min-h-0 flex-1 flex-col overflow-hidden bg-[#EDECE7] dark:bg-[#0B0C0E] lg:flex'>
      <TransformWrapper initialScale={1} minScale={0.6} maxScale={1}>
        {({ setTransform }) => (
          <>
            <PreviewToolbar
              resume={resume}
              setTransform={setTransform}
              pageHeight={pageHeight}
            />
            <TransformComponent
              wrapperStyle={{ width: '100%', height: '100%' }}
              contentStyle={{
                width: '100%',
                boxSizing: 'border-box',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                padding: '60px 24px 72px',
              }}
            >
              <div className='w-full max-w-[794px] overflow-hidden rounded-lg border border-light-ring-secondary bg-white shadow-paper-lg dark:border-dark-ring-secondary'>
                <div ref={measureRef} className='px-10 py-10 2xl:px-14 2xl:py-12'>
                  <ResumePaper resume={resume} />
                </div>
              </div>
            </TransformComponent>
          </>
        )}
      </TransformWrapper>
    </div>
  );
}
