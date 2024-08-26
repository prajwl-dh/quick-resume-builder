import { Document, Page, PDFViewer, Text, View } from '@react-pdf/renderer';
import { ResumeInterface } from '../builder/previousResumes/ResumeInterface';

export default function MobileResumePreview({
  setIsResumePreviewOpen,
  resume,
}: {
  setIsResumePreviewOpen: React.Dispatch<React.SetStateAction<boolean>>;
  resume: ResumeInterface | undefined;
}) {
  return (
    <div
      className='h-[calc(100vh-56px)] w-full mt-14'
      onClick={() => setIsResumePreviewOpen((prev) => !prev)}
    >
      <PDFViewer
        style={{
          height: '100%',
          width: '100%',
        }}
      >
        <Document
          style={{
            height: '100%',
            width: '100%',
            backgroundColor: 'white',
            color: 'black',
          }}
        >
          <Page size='A4'>
            <View
              style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
            >
              <Text>Prajwal</Text>
              <Text>Prajwal</Text>
              <Text>Prajwal</Text>
              <Text>Prajwal</Text>
              <Text>Prajwal</Text>
              <Text>Prajwal</Text>
              <Text>Prajwal</Text>
              <Text>Prajwal</Text>
              <Text>Prajwal</Text>
              <Text>Prajwal</Text>
              <Text>Prajwal</Text>
              <Text>Prajwal</Text>
              <Text>Prajwal</Text>
              <Text>Prajwal</Text>
              <Text>Prajwal</Text>
              <Text>Prajwal</Text>
              <Text>Prajwal</Text>
              <Text>Prajwal</Text>
              <Text>Prajwal</Text>
              <Text>Prajwal</Text>
              <Text>Prajwal</Text>
              <Text>Prajwal</Text>
              <Text>Prajwal</Text>
              <Text>Prajwal</Text>
              <Text>Prajwal</Text>
              <Text>Prajwal</Text>
              <Text>Prajwal</Text>
              <Text>Prajwal</Text>
              <Text>Prajwal</Text>
              <Text>Prajwal</Text>
              <Text>Prajwal</Text>
              <Text>Prajwal</Text>
              <Text>Prajwal</Text>
              <Text>Prajwal</Text>
              <Text>Prajwal</Text>
              <Text>Prajwal</Text>
              <Text>Prajwal</Text>
              <Text>Prajwal</Text>
              <Text>Prajwal</Text>
              <Text>Prajwal</Text>
              <Text>Prajwal</Text>
              <Text>Prajwal</Text>
              <Text>Prajwal</Text>
              <Text>Prajwal</Text>
              <Text>Prajwal</Text>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </div>
  );
}
