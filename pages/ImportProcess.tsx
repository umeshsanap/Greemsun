
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, Package, Ship, FileSearch, ClipboardCheck, Truck } from 'lucide-react';

const ImportProcess: React.FC = () => {
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

  const steps = [
    { icon: <ClipboardCheck size={40} />, title: 'Step 1: Inquiry & Quotation', desc: 'Clients submit their requirements. We provide competitive bulk pricing and shipping estimates.' },
    { icon: <FileSearch size={40} />, title: 'Step 2: Documentation', desc: 'Processing of Proforma Invoice, LC terms, and necessary export permits.' },
    { icon: <Package size={40} />, title: 'Step 3: Procurement & QC', desc: 'Direct sourcing from farms followed by a 5-tier quality control process.' },
    { icon: <Ship size={40} />, title: 'Step 4: Transit & Clearing', desc: 'Loading into temperature-controlled containers and managing custom clearances.' },
    { icon: <Truck size={40} />, title: 'Step 5: Delivery', desc: 'Final dispatch to the client\'s designated facility or port.' },
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
          <span className="inline-block text-secondary font-extrabold tracking-[0.2em] text-sm mb-4 uppercase drop-shadow-md">Our Operations</span>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight">
            Our Export Process <br />
            <span className="text-secondary">From Farm to Port</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
            Ensuring transparency and efficiency at every stage of the journey, from inquiry to final delivery.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <Link 
              to="/contact" 
              className="w-full sm:w-auto px-10 py-4 bg-secondary hover:bg-secondary-dark text-primary-dark rounded-full font-black transition-all transform hover:scale-105 flex items-center justify-center gap-2 group shadow-xl"
            >
              START INQUIRY <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
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
        <div className="space-y-12">
          {steps.map((step, idx) => (
            <div key={idx} className={`flex flex-col md:flex-row items-center gap-12 p-8 rounded-[2rem] transition-all duration-500 ${idx % 2 === 0 ? 'bg-white' : 'bg-nature-50'}`}>
              <div className="bg-primary text-secondary p-8 rounded-full shrink-0 shadow-lg">
                {step.icon}
              </div>
              <div>
                <h3 className="text-3xl font-serif font-bold text-primary mb-4">{step.title}</h3>
                <p className="text-gray-600 text-lg leading-relaxed">{step.desc}</p>
              </div>
              <div className="hidden md:block ml-auto opacity-10 font-serif font-black text-9xl text-primary leading-none">
                0{idx + 1}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ImportProcess;
