import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import { ResumeInterface } from '../builder/previousResumes/ResumeInterface';
import PreviewToolbar from './PreviewToolbar';
import ResumeDocument from './ResumeDocument';
import useOnePageHeight from './useOnePageHeight';

export default function MobileResumePreview({
  resume,
}: {
  resume: ResumeInterface | undefined;
}) {
  const { measureRef, pageHeight } = useOnePageHeight(
    resume,
    Boolean(resume?.theme?.onePage)
  );

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
            <PreviewToolbar
              resume={resume}
              setTransform={setTransform}
              pageHeight={pageHeight}
            />

            <TransformComponent>
              <div className='bg-white border-[1px] shadow-md rounded-md mx-2 mb-10 px-2 sm:px-4 mt-24 min-h-[90dvh] w-[calc(100dvw-15px)] cursor-grab'>
                <div ref={measureRef}>
                  <ResumeDocument resume={resume} />
                </div>
              </div>
            </TransformComponent>
          </>
        )}
      </TransformWrapper>
    </div>
  );
}
