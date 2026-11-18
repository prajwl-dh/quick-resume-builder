import BuilderHome from '@/components/builder/BuilderHome';
import Navbar from '@/components/navbar/Navbar';
import ScrollToTheTop from '@/components/scroll-to-top/ScrollToTheTop';

export default function Builder() {
  return (
    <div className='flex min-h-dvh flex-col'>
      <Navbar />
      <main className='flex-1 pt-16'>
        <BuilderHome />
      </main>
      <ScrollToTheTop />
    </div>
  );
}
