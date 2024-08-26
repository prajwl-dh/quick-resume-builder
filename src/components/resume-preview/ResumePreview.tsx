import { Document, Page, PDFViewer, Text, View } from '@react-pdf/renderer';
import { ResumeInterface } from '../builder/previousResumes/ResumeInterface';

export default function ResumePreview({
  resume,
}: {
  resume: ResumeInterface | undefined;
}) {
  return (
    <div className='hidden lg:flex justify-center items-center fixed h-full w-[calc(100vw-(16rem+35vw))] 2xl:w-[calc(100vw-(16rem+40vw))] bg-light-foreground dark:bg-dark-foreground lg:ml-[calc(16rem+35vw)] 2xl:ml-[calc(16rem+40vw)] overflow-hidden'>
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
              <Text>{resume?.fullName}</Text>
              <Text>{resume?.fullName}</Text>
              <Text>{resume?.fullName}</Text>
              <Text>{resume?.fullName}</Text>
              <Text>{resume?.fullName}</Text>
              <Text>{resume?.fullName}</Text>
              <Text>{resume?.fullName}</Text>
              <Text>{resume?.fullName}</Text>
              <Text>{resume?.fullName}</Text>
              <Text>{resume?.fullName}</Text>
              <Text>{resume?.fullName}</Text>
              <Text>{resume?.fullName}</Text>
              <Text>{resume?.fullName}</Text>
              <Text>{resume?.fullName}</Text>
              <Text>{resume?.fullName}</Text>
              <Text>{resume?.fullName}</Text>
              <Text>{resume?.fullName}</Text>
              <Text>{resume?.fullName}</Text>
              <Text>{resume?.fullName}</Text>
              <Text>{resume?.fullName}</Text>
              <Text>{resume?.fullName}</Text>
              <Text>{resume?.fullName}</Text>
              <Text>{resume?.fullName}</Text>
              <Text>{resume?.fullName}</Text>
              <Text>{resume?.fullName}</Text>
              <Text>{resume?.fullName}</Text>
              <Text>{resume?.fullName}</Text>
              <Text>{resume?.fullName}</Text>
              <Text>{resume?.fullName}</Text>
              <Text>{resume?.fullName}</Text>
              <Text>{resume?.fullName}</Text>
              <Text>{resume?.fullName}</Text>
              <Text>{resume?.fullName}</Text>
              <Text>{resume?.fullName}</Text>
              <Text>{resume?.fullName}</Text>
              <Text>{resume?.fullName}</Text>
              <Text>{resume?.fullName}</Text>
              <Text>{resume?.fullName}</Text>
              <Text>{resume?.fullName}</Text>
              <Text>{resume?.fullName}</Text>
              <Text>{resume?.fullName}</Text>
              <Text>{resume?.fullName}</Text>
              <Text>{resume?.fullName}</Text>
              <Text>{resume?.fullName}</Text>
              <Text>{resume?.fullName}</Text>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </div>
  );
}
