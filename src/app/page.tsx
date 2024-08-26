import Footer from '@/components/footer/Footer';
import Home from '@/components/home/Home';
import Navbar from '@/components/navbar/Navbar';
import ScrollToTheTop from '@/components/scroll-to-top/ScrollToTheTop';

export default function page() {
  return (
    <div className='flex flex-col justify-between mt-[70px]'>
      <Navbar
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, type: 'spring' }}
      />
      <div className='w-screen h-[calc(100vh-80px)] px-1 md:px-14 flex flex-col items-center bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808010_1px,transparent_1px)] bg-[size:100px_100px] dark:bg-[linear-gradient(to_right,#80808015_1px,transparent_1px),linear-gradient(to_bottom,#80808015_1px,transparent_1px)]'>
        <Home />
        <ScrollToTheTop />
      </div>
      <Footer />
    </div>
  );
}
