import { Document, Page, Text, View } from '@react-pdf/renderer';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import { ResumeInterface } from '../builder/previousResumes/ResumeInterface';

export default function MobileResumePreview({
  resume,
}: {
  resume: ResumeInterface | undefined;
}) {
  const MobilePreview = () => {
    return (
      <Document>
        <Page
          size='A4'
          style={{
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
    <div className='bg-light-background dark:bg-dark-foreground h-[calc(100dvh-56px)] w-full fixed mt-14 flex flex-col justify-center items-center overflow-hidden bg-[#323639]'>
      <TransformWrapper
        initialScale={0.9}
        minScale={0.6}
        maxScale={1}
        centerOnInit
        centerZoomedOut
      >
        <TransformComponent>
          <div className='bg-white border-[1px] shadow-lg rounded-sm m-10 min-h-[90dvh] p-10'>
            <MobilePreview />
          </div>
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
}
