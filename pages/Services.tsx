
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, Globe, ShieldCheck, Truck, Factory, PackageCheck, Briefcase } from 'lucide-react';

const Services: React.FC = () => {
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

  const serviceList = [
    { icon: <Globe className="w-12 h-12 text-secondary" />, title: 'Global Distribution', desc: 'Worldwide shipping network reaching Asia, Europe, and Middle Eastern markets with ease.' },
    { icon: <ShieldCheck className="w-12 h-12 text-secondary" />, title: 'Quality Auditing', desc: 'In-house laboratory testing for pesticide levels and nutritional value.' },
    { icon: <Truck className="w-12 h-12 text-secondary" />, title: 'Cold Chain Logistics', desc: 'Seamless temperature-controlled transport to maintain freshness from farm to port.' },
    { icon: <Factory className="w-12 h-12 text-secondary" />, title: 'Processing & Sorting', desc: 'Automated grading systems to categorize produce based on export-grade specifications.' },
    { icon: <PackageCheck className="w-12 h-12 text-secondary" />, title: 'Custom Packaging', desc: 'Retail-ready or bulk packaging solutions designed for durability and branding.' },
    { icon: <Briefcase className="w-12 h-12 text-secondary" />, title: 'Trade Consulting', desc: 'Expert guidance on international import-export regulations and customs.' },
  ];

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
          <span className="inline-block text-secondary font-extrabold tracking-[0.2em] text-sm mb-4 uppercase drop-shadow-md">Comprehensive Solutions</span>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight">
            Export Solutions <br />
            <span className="text-secondary">for Global Trade</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
            Comprehensive services tailored for global agricultural trade, from quality auditing to cold chain logistics and custom packaging.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <Link 
              to="/contact" 
              className="w-full sm:w-auto px-10 py-4 bg-secondary hover:bg-secondary-dark text-primary-dark rounded-full font-black transition-all transform hover:scale-105 flex items-center justify-center gap-2 group shadow-xl"
            >
              GET IN TOUCH <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              to="/import-process" 
              className="w-full sm:w-auto px-10 py-4 bg-white/10 backdrop-blur-md border-2 border-white/30 hover:bg-white hover:text-primary-dark text-white rounded-full font-black transition-all transform hover:scale-105"
            >
              OUR PROCESS
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceList.map((service, idx) => (
            <div key={idx} className="p-10 bg-white rounded-3xl shadow-lg border border-nature-50 hover:border-secondary transition-all group">
              <div className="mb-8 group-hover:scale-110 transition-transform">{service.icon}</div>
              <h3 className="text-2xl font-bold text-primary mb-4">{service.title}</h3>
              <p className="text-gray-500 leading-relaxed">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Services;
