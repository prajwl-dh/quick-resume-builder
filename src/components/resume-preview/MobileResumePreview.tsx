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
    <div className='h-[calc(100vh-56px)] w-full mt-14'>
      <div className='flex flex-row justify-between self-end items-center gap-4 my-2 h-max mx-2'>
        <Select
          className={
            'text-light-button-secondary-text cursor-pointer bg-white px-2 py-1.5 rounded-sm outline-none text-md'
          }
          name='status'
          aria-label='Project status'
        >
          <option value='default'>Default Theme</option>
        </Select>
        <button className='text-light-button-secondary-text bg-white hover:bg-gray-200 px-2 py-1.5 rounded-sm outline-none text-md'>
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
        <button className='text-light-button-secondary-text bg-white hover:bg-gray-200 px-2 py-1.5 rounded-sm outline-none text-md'>
          Export JSON
        </button>
      </div>
      <PDFViewer className='h-full w-full'>
        <MobilePreview />
      </PDFViewer>
    </div>
  );
}
