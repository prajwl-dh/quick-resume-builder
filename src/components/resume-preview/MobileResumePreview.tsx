import { Select } from '@headlessui/react';
import {
  Document,
  Page,
  PDFDownloadLink,
  PDFViewer,
  Text,
  View,
} from '@react-pdf/renderer';
import { ResumeInterface } from '../builder/previousResumes/ResumeInterface';

export default function MobileResumePreview({
  resume,
}: {
  resume: ResumeInterface | undefined;
}) {
  const MobilePreview = () => {
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
    <div className='h-[calc(100vh-56px)] w-full fixed mt-14 flex flex-col justify-center items-center overflow-hidden bg-[#323639]'>
      <div className='flex flex-row w-full justify-center items-center gap-2 my-2'>
        <Select
          className={
            'text-light-button-secondary-text cursor-pointer bg-white px-2 py-1.5 h-9 rounded-sm outline-none text-md shadow-md'
          }
          name='status'
          aria-label='Project status'
        >
          <option value='default'>Default Theme</option>
        </Select>
        <button className='text-light-button-secondary-text bg-white hover:bg-gray-200 h-9 px-2 py-1.5 rounded-sm outline-none text-md shadow-md'>
          <PDFDownloadLink
            document={<MobilePreview />}
            fileName={resume?.fileName}
            className='text-black'
          >
            {({ blob, url, loading, error }) =>
              loading ? 'Loading...' : 'Download'
            }
          </PDFDownloadLink>
        </button>
        <button className='text-light-button-secondary-text bg-white hover:bg-gray-200 h-9 px-2 py-1.5 rounded-sm outline-none text-md shadow-md'>
          Export JSON
        </button>
      </div>
      <PDFViewer className='h-[calc(100vh-56px-36px)] w-full px-2 mb-2'>
        <MobilePreview />
      </PDFViewer>
    </div>
  );
}
