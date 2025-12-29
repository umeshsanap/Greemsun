
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { PRODUCTS } from '../constants';

const Products: React.FC = () => {
  const heroImages = [
    'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=2000',
    'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&q=80&w=2000',
    'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80&w=2000',
    'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=2000'
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => {
      const next = prev + 1;
      return next >= heroImages.length ? 0 : next;
    });
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => {
      const prevIndex = prev - 1;
      return prevIndex < 0 ? heroImages.length - 1 : prevIndex;
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0 z-0 flex" style={{ width: `${heroImages.length * 100}%`, transform: `translateX(-${currentSlide * (100 / heroImages.length)}%)`, transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)' }}>
          {heroImages.map((image, index) => (
            <div
              key={index}
              className="h-full flex-shrink-0 bg-cover bg-center bg-no-repeat relative"
              style={{
                backgroundImage: `url(${image})`,
                width: `${100 / heroImages.length}%`
              }}
            >
              <div className="absolute inset-0 bg-black/60"></div>
            </div>
          ))}
        </div>
        {/* Carousel Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-3">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                index === currentSlide ? 'w-8 bg-secondary' : 'w-2 bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Carousel Control - Previous */}
        <button
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 flex items-center justify-center w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full transition-all cursor-pointer group"
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} className="text-white" />
          <span className="sr-only">Previous</span>
        </button>

        {/* Carousel Control - Next */}
        <button
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 flex items-center justify-center w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full transition-all cursor-pointer group"
          onClick={nextSlide}
          aria-label="Next slide"
        >
          <ChevronRight size={24} className="text-white" />
          <span className="sr-only">Next</span>
        </button>
        <div className="relative z-10 text-center max-w-4xl px-4">
          <span className="inline-block text-secondary font-extrabold tracking-[0.2em] text-sm mb-4 uppercase drop-shadow-md">Premium Selection</span>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight">
            Fresh Agricultural <br />
            <span className="text-secondary">Products</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
            Exporting premium vegetables and fruits cultivated under the best conditions, ensuring quality and freshness in every shipment.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <Link 
              to="/contact" 
              className="w-full sm:w-auto px-10 py-4 bg-secondary hover:bg-secondary-dark text-primary-dark rounded-full font-black transition-all transform hover:scale-105 flex items-center justify-center gap-2 group shadow-xl"
            >
              REQUEST QUOTE <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              to="/services" 
              className="w-full sm:w-auto px-10 py-4 bg-white/10 backdrop-blur-md border-2 border-white/30 hover:bg-white hover:text-primary-dark text-white rounded-full font-black transition-all transform hover:scale-105"
            >
              OUR SERVICES
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {PRODUCTS.map((product) => (
            <div key={product.id} className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-gray-100">
              <div className="h-64 overflow-hidden relative">
                <img src={product.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={product.name} />
                <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full text-xs font-bold text-primary uppercase">
                  {product.category}
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-primary mb-3">{product.name}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-secondary font-bold text-sm tracking-widest">PREMIUM EXPORT</span>
                  <button className="text-primary font-bold hover:text-secondary flex items-center gap-1 group/btn">
                    Enquire Now <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bulk Order Section */}
      <section className="pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-primary-dark rounded-[3rem] p-12 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover" alt="Background" />
          </div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Interested in Bulk Sourcing?</h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-10 text-lg">We provide specialized wholesale pricing for international distributors and retail chains.</p>
            <a href="#/contact" className="bg-secondary text-white px-10 py-4 rounded-full font-bold hover:bg-secondary-dark transition-all inline-block">Request Quote</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;
