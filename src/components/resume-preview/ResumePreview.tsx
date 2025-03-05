import {
  Document,
  Page,
  PDFDownloadLink,
  Text,
  View,
} from '@react-pdf/renderer';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import { ResumeInterface } from '../builder/previousResumes/ResumeInterface';
import PrimaryButton from '../buttons/PrimaryButton';
import SecondaryButton from '../buttons/SecondaryButton';

export default function ResumePreview({
  resume,
}: {
  resume: ResumeInterface | undefined;
}) {
  const DesktopPreview = () => {
    return (
      <Document>
        <Page
          size='LETTER'
          style={{
            color: 'black',
            padding: '40px',
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
              <Text key={index}>{resume?.profile.fullName}</Text>
            ))}
          </View>
        </Page>
      </Document>
    );
  };

  return (
    <div className='hidden lg:flex flex-col bg-light-background dark:bg-dark-foreground justify-center items-center fixed max-h-dvh w-[calc(100vw-(16rem+35vw))] 2xl:w-[calc(100vw-(16rem+40vw))] lg:ml-[calc(16rem+35vw)] 2xl:ml-[calc(16rem+40vw)] overflow-hidden'>
      <div className='absolute top-0 z-50 w-full h-14 flex justify-between items-center px-4 bg-light-background dark:bg-dark-foreground'>
        <p className='text-xl font-semibold'>Preview</p>
        <div className='flex gap-4'>
          <SecondaryButton>Reset Zoom</SecondaryButton>
          <PrimaryButton>
            <PDFDownloadLink
              document={<DesktopPreview />}
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
          <div className='bg-white border-[1px] shadow-lg rounded-md mx-10 mb-10 mt-24 min-h-[90dvh] p-10 cursor-grab min-w-[calc(100vw-(16rem+35vw+80px))] 2xl:min-w-[calc(100vw-(16rem+40vw+80px))]'>
            <DesktopPreview />
          </div>
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
}
