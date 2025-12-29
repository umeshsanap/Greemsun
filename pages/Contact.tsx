
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, Phone, Mail, MapPin, Send } from 'lucide-react';

const Contact: React.FC = () => {
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
          <span className="inline-block text-secondary font-extrabold tracking-[0.2em] text-sm mb-4 uppercase drop-shadow-md">Let's Connect</span>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight">
            Connect With Us <br />
            <span className="text-secondary">Start Your Journey</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
            Ready to source premium agricultural products? Let's talk about how we can meet your import-export needs with excellence and reliability.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <Link 
              to="/products" 
              className="w-full sm:w-auto px-10 py-4 bg-secondary hover:bg-secondary-dark text-primary-dark rounded-full font-black transition-all transform hover:scale-105 flex items-center justify-center gap-2 group shadow-xl"
            >
              VIEW PRODUCTS <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <a 
              href="#contact-form" 
              className="w-full sm:w-auto px-10 py-4 bg-white/10 backdrop-blur-md border-2 border-white/30 hover:bg-white hover:text-primary-dark text-white rounded-full font-black transition-all transform hover:scale-105"
            >
              SEND MESSAGE
            </a>
          </div>
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Info */}
          <div className="lg:w-1/3 space-y-12">
            <div>
              <h2 className="text-3xl font-serif font-bold text-primary mb-8">Contact Information</h2>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="bg-nature-100 p-4 rounded-xl text-primary"><MapPin /></div>
                  <div>
                    <h4 className="font-bold text-primary">Visit Our Office</h4>
                    <p className="text-gray-500">123 Business Bay, Green Avenue, Dubai, UAE</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-nature-100 p-4 rounded-xl text-primary"><Phone /></div>
                  <div>
                    <h4 className="font-bold text-primary">Call Us</h4>
                    <p className="text-gray-500">+971 50 123 4567</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-nature-100 p-4 rounded-xl text-primary"><Mail /></div>
                  <div>
                    <h4 className="font-bold text-primary">Email Us</h4>
                    <p className="text-gray-500">info@greemsuntrading.com</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-primary p-8 rounded-3xl text-white">
              <h4 className="text-xl font-bold mb-4">Business Hours</h4>
              <ul className="space-y-2 text-nature-100">
                <li className="flex justify-between"><span>Mon - Fri</span> <span>09:00 - 18:00</span></li>
                <li className="flex justify-between"><span>Saturday</span> <span>10:00 - 14:00</span></li>
                <li className="flex justify-between"><span>Sunday</span> <span>Closed</span></li>
              </ul>
            </div>
          </div>

          {/* Form */}
          <div className="lg:w-2/3" id="contact-form">
            <div className="bg-white p-10 md:p-16 rounded-[3rem] shadow-2xl border border-gray-100">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-primary mb-2">Full Name</label>
                    <input type="text" className="w-full px-6 py-4 rounded-2xl bg-nature-50 border-none focus:ring-2 focus:ring-secondary outline-none transition-all" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-primary mb-2">Email Address</label>
                    <input type="email" className="w-full px-6 py-4 rounded-2xl bg-nature-50 border-none focus:ring-2 focus:ring-secondary outline-none transition-all" placeholder="john@example.com" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-primary mb-2">Subject</label>
                  <select className="w-full px-6 py-4 rounded-2xl bg-nature-50 border-none focus:ring-2 focus:ring-secondary outline-none transition-all">
                    <option>Product Inquiry</option>
                    <option>Bulk Order Quote</option>
                    <option>Partnership Proposal</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-primary mb-2">Your Message</label>
                  <textarea rows={6} className="w-full px-6 py-4 rounded-2xl bg-nature-50 border-none focus:ring-2 focus:ring-secondary outline-none transition-all" placeholder="How can we help you?"></textarea>
                </div>
                <button type="submit" className="w-full bg-primary hover:bg-primary-dark text-white py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all shadow-xl shadow-primary/20">
                  Send Message <Send size={20} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
