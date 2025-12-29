
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, Award, CheckCircle2, ShieldCheck, FileCheck } from 'lucide-react';

const Certifications: React.FC = () => {
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
          <span className="inline-block text-secondary font-extrabold tracking-[0.2em] text-sm mb-4 uppercase drop-shadow-md">Quality Assurance</span>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight">
            Compliance & Safety <br />
            <span className="text-secondary">Global Standards</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
            Our commitment to international food safety standards is unwavering. We operate under the strictest global food safety protocols to ensure quality and compliance.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <Link 
              to="/products" 
              className="w-full sm:w-auto px-10 py-4 bg-secondary hover:bg-secondary-dark text-primary-dark rounded-full font-black transition-all transform hover:scale-105 flex items-center justify-center gap-2 group shadow-xl"
            >
              VIEW PRODUCTS <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              to="/contact" 
              className="w-full sm:w-auto px-10 py-4 bg-white/10 backdrop-blur-md border-2 border-white/30 hover:bg-white hover:text-primary-dark text-white rounded-full font-black transition-all transform hover:scale-105"
            >
              GET IN TOUCH
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <h2 className="text-3xl font-serif font-bold text-primary mb-6">Globally Recognized Standards</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Greemsun General Trading LLC operates under the strictest global food safety protocols. We understand that transparency is the foundation of trust in the agricultural export business. All our partner farms and processing units are periodically audited to ensure compliance.
            </p>
            <div className="space-y-4">
              {[
                'HACCP (Hazard Analysis Critical Control Point)',
                'ISO 22000 Food Safety Management',
                'Global G.A.P (Good Agricultural Practices)',
                'APEDA Registered Exporter',
                'FDA Compliant Processes'
              ].map((cert, i) => (
                <div key={i} className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border-l-4 border-secondary">
                  <CheckCircle2 className="text-primary shrink-0" />
                  <span className="font-bold text-primary-dark">{cert}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-primary rounded-3xl p-8 text-white text-center flex flex-col items-center">
              <Award className="text-secondary w-16 h-16 mb-4" />
              <h4 className="font-bold mb-2">Quality Awards</h4>
              <p className="text-xs text-nature-100">Excellence in Export 2023</p>
            </div>
            <div className="bg-secondary rounded-3xl p-8 text-white text-center flex flex-col items-center">
              <ShieldCheck className="text-primary-dark w-16 h-16 mb-4" />
              <h4 className="font-bold mb-2">Eco-Certified</h4>
              <p className="text-xs text-white/80">Sustainable Farming Gold</p>
            </div>
            <div className="col-span-2 bg-nature-50 rounded-3xl p-12 flex items-center justify-center">
              <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=500" className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg" alt="Quality seal" />
              <div className="ml-6">
                <h4 className="text-xl font-bold text-primary">Zero-Pesticide Guarantee</h4>
                <p className="text-sm text-gray-500">Every batch is tested in 3rd-party labs.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Certifications;
