import Footer from '@/components/footer/Footer';
import Home from '@/components/home/Home';
import Navbar from '@/components/navbar/Navbar';
import ScrollToTheTop from '@/components/scroll-to-top/ScrollToTheTop';

export default function HomePage() {
  return (
    <div className='flex min-h-dvh flex-col'>
      <Navbar
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 260, damping: 26 }}
      />
      <main className='flex-1 pt-16'>
        <Home />
      </main>
      <Footer />
      <ScrollToTheTop />
    </div>
  );
}
