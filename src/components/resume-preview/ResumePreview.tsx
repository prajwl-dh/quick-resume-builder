import {
  Document,
  Page,
  PDFDownloadLink,
  PDFViewer,
  Text,
  View,
} from '@react-pdf/renderer';
import { ResumeInterface } from '../builder/previousResumes/ResumeInterface';

export default function ResumePreview({
  resume,
}: {
  resume: ResumeInterface | undefined;
}) {
  const DesktopPreview = () => {
    return (
      <Document>
        <Page size='A4'>
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
    <div className='hidden lg:flex justify-center items-center fixed h-full w-[calc(100vw-(16rem+35vw))] 2xl:w-[calc(100vw-(16rem+40vw))] bg-light-foreground dark:bg-dark-foreground lg:ml-[calc(16rem+35vw)] 2xl:ml-[calc(16rem+40vw)] overflow-hidden cursor-grabbing'>
      <PDFViewer showToolbar={false} className='prajwal h-full w-full'>
        <DesktopPreview />
      </PDFViewer>
      <div className='absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-row gap-2'>
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
  );
}
