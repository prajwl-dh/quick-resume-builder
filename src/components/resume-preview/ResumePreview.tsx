import { Document, Page, Text, View } from '@react-pdf/renderer';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import { ResumeInterface } from '../builder/previousResumes/ResumeInterface';

export default function ResumePreview({
  resume,
}: {
  resume: ResumeInterface | undefined;
}) {
  const DesktopPreview = () => {
    return (
      <Document>
        <Page
          size='A4'
          style={{
            paddingVertical: '10px',
            paddingHorizontal: '5px',
            color: 'black',
          }}
        >
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
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
    <div className='hidden lg:flex flex-col bg-light-background dark:bg-dark-foreground justify-center items-center fixed max-h-dvh w-[calc(100vw-(16rem+35vw))] 2xl:w-[calc(100vw-(16rem+40vw))] bg-[#323639] lg:ml-[calc(16rem+35vw)] 2xl:ml-[calc(16rem+40vw)] overflow-hidden'>
      <TransformWrapper
        initialScale={0.9}
        minScale={0.6}
        maxScale={1}
        centerOnInit
        centerZoomedOut
      >
        <TransformComponent>
          <div className='bg-white border-[1px] shadow-lg rounded-sm m-10 min-h-[90dvh]'>
            <DesktopPreview />
          </div>
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
}
