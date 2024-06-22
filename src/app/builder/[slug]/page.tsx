import Navbar from '@/components/navbar/Navbar';
import ScrollToTheTop from '@/components/scroll-to-top/ScrollToTheTop';

type SlugType = {
  params: { slug: string };
};

export default function Slug({ params }: SlugType) {
  return (
    <div className='flex flex-col justify-between mt-[70px]'>
      <Navbar />
      <div className='w-screen px-1 md:px-14 flex flex-col items-center'>
        {params.slug}
        <ScrollToTheTop />
      </div>
    </div>
  );
}
