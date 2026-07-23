import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import ProductCatalog from '../components/ProductCatalog';
import About from '../components/About';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <Hero />
      <Features />
      <ProductCatalog />
      <About />
      <Footer />
    </main>
  );
}