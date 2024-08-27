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
          style={{ paddingVertical: '10px', paddingHorizontal: '5px' }}
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
    <div className='hidden lg:flex flex-col justify-center items-center fixed h-full w-[calc(100vw-(16rem+35vw))] 2xl:w-[calc(100vw-(16rem+40vw))] bg-[#323639] lg:ml-[calc(16rem+35vw)] 2xl:ml-[calc(16rem+40vw)] overflow-hidden'>
      <div className='flex flex-row self-end items-center gap-4 my-2 h-max mx-2'>
        <Select
          className={
            'text-light-button-secondary-text bg-white dark:bg-white hover:bg-gray-200 h-9 px-2 py-1.5 rounded-sm outline-none text-md'
          }
          name='status'
          aria-label='Project status'
        >
          <option value='default'>Default Theme</option>
        </Select>
        <button className='text-light-button-secondary-text bg-white dark:bg-white hover:bg-gray-200 px-2 py-1.5 rounded-sm outline-none text-md'>
          <PDFDownloadLink
            document={<DesktopPreview />}
            fileName={resume?.fileName}
            className='text-black'
          >
            {({ blob, url, loading, error }) =>
              loading ? 'Loading...' : 'Download'
            }
          </PDFDownloadLink>
        </button>
        <button className='text-light-button-secondary-text bg-white dark:bg-white hover:bg-gray-200 px-2 py-1.5 rounded-sm outline-none text-md'>
          Export JSON
        </button>
      </div>
      <PDFViewer className='h-full w-full'>
        <DesktopPreview />
      </PDFViewer>
    </div>
  );
}
