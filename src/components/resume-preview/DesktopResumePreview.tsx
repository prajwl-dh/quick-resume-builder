import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import { ResumeInterface } from '../builder/previousResumes/ResumeInterface';
import PreviewToolbar from './PreviewToolbar';
import ResumeDocument from './ResumeDocument';
import useOnePageHeight from './useOnePageHeight';

export default function DesktopResumePreview({
  resume,
}: {
  resume: ResumeInterface | undefined;
}) {
  const { measureRef, pageHeight } = useOnePageHeight(
    resume,
    Boolean(resume?.theme?.onePage)
  );

  return (
    <div className='hidden lg:flex flex-col bg-white dark:bg-dark-foreground justify-center items-center fixed max-h-dvh w-[calc(100vw-(16rem+35vw))] 2xl:w-[calc(100vw-(16rem+40vw))] lg:ml-[calc(16rem+35vw)] 2xl:ml-[calc(16rem+40vw)] overflow-hidden'>
      <TransformWrapper initialScale={1} minScale={0.6} maxScale={1}>
        {({ setTransform }) => (
          <>
            <PreviewToolbar
              resume={resume}
              setTransform={setTransform}
              pageHeight={pageHeight}
            />

            <TransformComponent>
              <div className='bg-white border-[1px] shadow-md rounded-md mx-2 xl:mx-10 mb-10 mt-24 px-2 sm:px-4 min-h-[90dvh] cursor-grab min-w-[calc(100vw-(16rem+35vw+24px))] 2xl:min-w-[calc(100vw-(16rem+40vw+80px))] antialiased'>
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
