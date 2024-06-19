import Footer from '@/components/footer/Footer';
import Navbar from '@/components/navbar/Navbar';
import Home from '../components/home/Home';

export default function page() {
  return (
    <div className='flex flex-col justify-between mt-[80px]'>
      <Navbar />
      <div className='w-full 2xl:w-10/12 px-3 md:px-14 flex flex-col items-center'>
        <Home />
        <Footer />
      </div>
    </div>
  );
}
