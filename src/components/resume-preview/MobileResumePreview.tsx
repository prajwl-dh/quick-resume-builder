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

export default function MobileResumePreview({
  resume,
}: {
  resume: ResumeInterface | undefined;
}) {
  const MobilePreview = () => {
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
              <Text key={index}>{resume?.fullName}</Text>
            ))}
          </View>
        </Page>
      </Document>
    );
  };
  return (
    <div className='bg-light-background dark:bg-dark-foreground h-[calc(100dvh-56px)] lg:hidden w-full fixed mt-14 flex flex-col justify-center items-center overflow-hidden'>
      <div className='absolute top-0 z-50 w-full h-14 flex justify-between items-center px-4 bg-light-background dark:bg-dark-foreground'>
        <p className='text-xl font-semibold'>Preview</p>
        <div className='flex gap-4'>
          <SecondaryButton>Export JSON</SecondaryButton>
          <PrimaryButton>
            <PDFDownloadLink
              document={<MobilePreview />}
              fileName={`Resume_${resume?.fullName}`}
            >
              Download PDF
            </PDFDownloadLink>
          </PrimaryButton>
        </div>
      </div>
      <TransformWrapper
        initialScale={0.9}
        minScale={0.6}
        maxScale={1.5}
        centerOnInit
        centerZoomedOut
      >
        <TransformComponent>
          <div className='bg-white border-[1px] shadow-lg rounded-md mx-10 mb-10 mt-24 min-h-[90dvh] p-10 md:w-[calc(dvw-(80px))] cursor-grab'>
            <MobilePreview />
          </div>
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
}
