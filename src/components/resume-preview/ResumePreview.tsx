import {
  Document,
  Page,
  PDFDownloadLink,
  Text,
  View,
} from '@react-pdf/renderer';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import { ResumeInterface } from '../builder/previousResumes/ResumeInterface';

export default function ResumePreview({
  resume,
}: {
  resume: ResumeInterface | undefined;
}) {
  const DesktopPreview = () => {
    return (
      <Document
        style={{
          height: '100%',
          width: '100%',
          backgroundColor: 'white',
          color: 'black',
          border: '2px solid black',
        }}
      >
        <Page size='A4'>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '10px',
              flexWrap: 'wrap',
              padding: '20px',
            }}
          >
            {/* Example content */}
            {Array.from({ length: 100 }).map((_, index) => (
              <Text key={index}>{resume?.fullName}</Text>
            ))}
          </View>
        </Page>
      </Document>
    );
  };

  return (
    <div className='hidden lg:flex justify-center items-center fixed h-full w-[calc(100vw-(16rem+35vw))] 2xl:w-[calc(100vw-(16rem+40vw))] bg-light-foreground dark:bg-dark-foreground lg:ml-[calc(16rem+35vw)] 2xl:ml-[calc(16rem+40vw)] overflow-hidden cursor-grabbing'>
      <TransformWrapper
        initialScale={0.8}
        minScale={0.5}
        maxScale={2}
        centerZoomedOut
        centerOnInit
        wheel={{ step: 0.1 }}
      >
        {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
          <div className='relative w-full h-full flex items-center justify-center overflow-auto'>
            <TransformComponent
              wrapperStyle={{ width: '100%', height: '100%' }}
              contentStyle={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <DesktopPreview />
            </TransformComponent>
            <div className='absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-row gap-2'>
              <div
                className='relative inline-flex group'
                onClick={() => zoomOut()}
              >
                <div className='absolute transition-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt'></div>
                <button
                  title='Zoom Out'
                  className='relative inline-flex items-center justify-center px-4 py-2 text-lg font-bold text-white transition-all duration-200 bg-gray-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900'
                  role='button'
                >
                  Zoom -
                </button>
              </div>
              <div
                className='relative inline-flex group'
                onClick={() => zoomIn()}
              >
                <div className='absolute transition-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt'></div>
                <button
                  title='Zoom In'
                  className='relative inline-flex items-center justify-center px-4 py-2 text-lg font-bold text-white transition-all duration-200 bg-gray-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900'
                  role='button'
                >
                  Zoom +
                </button>
              </div>
              <div
                className='relative inline-flex group'
                onClick={() => {
                  resetTransform(); // Ensure this resets zoom and pan
                  // Force re-render or manually trigger centering if necessary
                  rest.setTransform(0, 0, 1);
                }}
              >
                <div className='absolute transition-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt'></div>
                <button
                  title='Reset Transform'
                  className='relative inline-flex items-center justify-center px-4 py-2 text-lg font-bold text-white transition-all duration-200 bg-gray-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900'
                  role='button'
                >
                  Reset
                </button>
              </div>
              <PDFDownloadLink
                document={<DesktopPreview />}
                fileName={resume?.fileName}
                className='text-black'
              >
                {({ blob, url, loading, error }) =>
                  loading ? null : (
                    <div className='relative inline-flex group'>
                      <div className='absolute transition-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt'></div>
                      <button
                        title='Download Now'
                        className='relative inline-flex items-center justify-center px-4 py-2 text-lg font-bold text-white transition-all duration-200 bg-gray-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900'
                        role='button'
                      >
                        Download
                      </button>
                    </div>
                  )
                }
              </PDFDownloadLink>
            </div>
          </div>
        )}
      </TransformWrapper>
    </div>
  );
}
