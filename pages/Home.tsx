
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Shield, Globe, Clock, ChevronRight, ChevronLeft, Quote, Star, CheckCircle, Award } from 'lucide-react';
import { PRODUCTS, TESTIMONIALS, PROCESS_STEPS } from '../constants';
import GlareHover from '../components/GlareHover';

// Card component for horizontal scroller
const ScrollCard: React.FC<{ 
  icon: React.ElementType; 
  number: string; 
  label: string;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}> = ({ icon: IconComponent, number, label, onHoverStart, onHoverEnd }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const handleMouseEnter = () => {
    setIsHovered(true);
    onHoverStart();
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    onHoverEnd();
  };
  
  return (
    <div 
      className={`flex-shrink-0 w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 p-6 sm:p-8 rounded-full text-white shadow-xl transition-all duration-500 cursor-pointer relative flex flex-col items-center justify-center ${isHovered ? 'border-2 border-secondary z-50' : 'border-2 border-transparent z-10'}`}
      style={{
        background: isHovered 
          ? 'white' 
          : 'linear-gradient(to bottom right, #2d5016, #1a3009)',
        transform: isHovered ? 'translateY(-8px)' : 'none',
        transformOrigin: 'center center',
        boxShadow: isHovered ? '0 25px 50px -12px rgba(0, 0, 0, 0.25)' : '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        willChange: isHovered ? 'transform' : 'auto'
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        className="mb-3 sm:mb-4 transition-all duration-500"
        style={{
          transform: isHovered ? 'scale(1.1) rotate(6deg)' : 'scale(1) rotate(0deg)'
        }}
      >
        <IconComponent className={`w-10 h-10 sm:w-12 sm:h-12 transition-colors duration-500 ${isHovered ? 'text-primary' : 'text-secondary'}`} />
      </div>
      <div className={`text-3xl sm:text-4xl font-black mb-1 transition-colors duration-500 ${isHovered ? 'text-primary' : 'text-secondary'}`}>{number}</div>
      <div className={`text-xs sm:text-sm font-semibold text-center transition-colors duration-500 px-2 ${isHovered ? 'text-gray-800' : 'text-nature-100'}`}>{label}</div>
    </div>
  );
};

const Home: React.FC = () => {
  const heroSlides = [
    {
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=2000',
      title: 'Exporters of',
      titleHighlight: 'Fresh Agri Products',
      description: 'Bringing the world\'s freshest harvest to your doorstep with uncompromised quality and global standards.'
    },
    {
      image: 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&q=80&w=2000',
      title: 'Premium Quality',
      titleHighlight: 'Vegetables',
      description: 'Exporting premium vegetables and fruits cultivated under the best conditions, ensuring quality and freshness.'
    },
    {
      image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80&w=2000',
      title: 'Fresh From',
      titleHighlight: 'The Farm',
      description: 'Direct sourcing from sustainable farms to ensure every product meets the highest international standards.'
    },
    {
      image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=2000',
      title: 'Global Export',
      titleHighlight: 'Partners',
      description: 'Trusted by international distributors and retail chains worldwide for reliable agricultural exports.'
    }
  ];

  // Create slides array with a clone of the first slide at the end for seamless loop
  const slidesWithClone = [...heroSlides, heroSlides[0]];
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const horizontalScrollRef = useRef<HTMLDivElement>(null);
  const autoScrollPosition = useRef<number>(0);
  const [isScrollingPaused, setIsScrollingPaused] = useState(false);
  const processSectionRef = useRef<HTMLElement>(null);
  const processCardsRef = useRef<HTMLDivElement>(null);
  const whyChooseUsRef = useRef<HTMLElement>(null);
  const [whyChooseUsVisible, setWhyChooseUsVisible] = useState(false);

  const nextSlide = () => {
    setCurrentSlide((prev) => {
      const next = prev + 1;
      if (next >= slidesWithClone.length - 1) {
        // We're about to reach the clone, transition to it first
        setIsTransitioning(true);
        return slidesWithClone.length - 1;
      }
      setIsTransitioning(true);
      return next;
    });
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => {
      // For forward-only behavior, prev button cycles to last slide
      if (prev === 0) {
        setIsTransitioning(true);
        return heroSlides.length - 1;
      }
      setIsTransitioning(true);
      return prev - 1;
    });
  };

  const goToSlide = (index: number) => {
    setIsTransitioning(true);
    setCurrentSlide(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  // Handle seamless transition: when we reach the clone, instantly jump to slide 0
  useEffect(() => {
    if (currentSlide === slidesWithClone.length - 1) {
      // After transition to clone completes, instantly jump to slide 0
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentSlide(0);
        // Re-enable transition after jump
        setTimeout(() => {
          setIsTransitioning(true);
        }, 50);
      }, 800); // Wait for transition duration (0.8s)
      return () => clearTimeout(timer);
    }
  }, [currentSlide]);

  // Continuous horizontal auto-scroll
  useEffect(() => {
    let animationFrameId: number;
    let lastTime = 0;
    const scrollSpeed = 1.0; // pixels per frame (adjust for speed)

    const animate = (currentTime: number) => {
      if (horizontalScrollRef.current && !isScrollingPaused) {
        const scrollContent = horizontalScrollRef.current.querySelector('.horizontal-scroll-content') as HTMLElement;
        
        if (scrollContent) {
          const containerWidth = horizontalScrollRef.current.clientWidth;
          const contentWidth = scrollContent.scrollWidth;
          
          // Increment scroll position
          autoScrollPosition.current += scrollSpeed;
          
          // Reset position when it reaches the end (seamless loop)
          // Since we have duplicate items, we can loop back to 0 when we reach halfway
          const halfWidth = contentWidth / 2;
          if (autoScrollPosition.current >= halfWidth) {
            autoScrollPosition.current = 0;
          }
          
          scrollContent.style.transform = `translateX(-${autoScrollPosition.current}px)`;
        }
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isScrollingPaused]);

  // Hide scrollbar for cards container
  useEffect(() => {
    if (processCardsRef.current) {
      const style = document.createElement('style');
      style.textContent = `
        #process-cards-container::-webkit-scrollbar {
          display: none;
        }
      `;
      document.head.appendChild(style);
      processCardsRef.current.id = 'process-cards-container';
      
      return () => {
        document.head.removeChild(style);
      };
    }
  }, []);

  // Intersection Observer for "Why Choose Us" section animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setWhyChooseUsVisible(true);
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of section is visible
      }
    );

    if (whyChooseUsRef.current) {
      observer.observe(whyChooseUsRef.current);
    }

    return () => {
      if (whyChooseUsRef.current) {
        observer.unobserve(whyChooseUsRef.current);
      }
    };
  }, []);

  return (
    <div className="overflow-x-hidden overflow-y-visible">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0 z-0 flex" style={{ width: `${slidesWithClone.length * 100}%`, transform: `translateX(-${currentSlide * (100 / slidesWithClone.length)}%)`, transition: isTransitioning ? 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)' : 'none' }}>
          {slidesWithClone.map((slide, index) => (
            <div
              key={index}
              className="h-full flex-shrink-0 bg-cover bg-center bg-no-repeat relative flex items-center"
              style={{
                backgroundImage: `url(${slide.image})`,
                width: `${100 / slidesWithClone.length}%`
              }}
            >
              <div className="absolute inset-0 bg-black/60"></div>
              {/* Text content for each slide - positioned on the left */}
              <div className="relative z-10 text-left max-w-4xl px-4 sm:px-6 md:px-12 lg:px-16">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold mb-4 sm:mb-6 leading-tight">
                  {slide.title} <br />
                  <span className="text-secondary">{slide.titleHighlight}</span>
          </h1>
                <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-6 sm:mb-8 md:mb-10 max-w-2xl leading-relaxed font-light">
                  {slide.description}
          </p>
                <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-5">
            <Link 
              to="/products" 
              className="w-full sm:w-auto px-6 sm:px-8 md:px-10 py-3 sm:py-4 text-sm sm:text-base bg-secondary hover:bg-secondary-dark text-primary-dark rounded-full font-black transition-all transform hover:scale-105 flex items-center justify-center gap-2 group shadow-xl"
            >
              EXPLORE PRODUCTS <ArrowRight size={18} className="sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              to="/contact" 
              className="w-full sm:w-auto px-6 sm:px-8 md:px-10 py-3 sm:py-4 text-sm sm:text-base bg-white/10 backdrop-blur-md border-2 border-white/30 hover:bg-white hover:text-primary-dark text-white rounded-full font-black transition-all transform hover:scale-105"
            >
              GET IN TOUCH
            </Link>
          </div>
        </div>
            </div>
          ))}
        </div>
        {/* Carousel Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                (index === currentSlide || (currentSlide === slidesWithClone.length - 1 && index === 0)) ? 'w-8 bg-secondary' : 'w-2 bg-white/50 hover:bg-white/75'
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
      </section>

      {/* Summarized About Section */}
      <section className="py-12 sm:py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-12 md:gap-16">
            <div className="lg:w-1/2 relative group w-full">
              <div className="absolute -inset-2 sm:-inset-4 bg-nature-100 rounded-2xl sm:rounded-3xl transform rotate-2 group-hover:rotate-1 transition-transform"></div>
              <img 
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1000" 
                className="relative rounded-2xl sm:rounded-3xl shadow-2xl object-cover h-[300px] sm:h-[400px] md:h-[500px] lg:h-[550px] w-full"
                alt="Import Export Trading"
              />
              <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 bg-primary text-white p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl shadow-2xl hidden sm:block border-2 sm:border-4 border-white">
                <span className="block text-2xl sm:text-3xl md:text-4xl font-bold font-serif text-secondary">Quality</span>
                <span className="text-[10px] sm:text-xs tracking-widest font-bold uppercase">First & Foremost</span>
              </div>
            </div>
            <div className="lg:w-1/2 w-full">
              <div className="w-12 sm:w-20 h-1 sm:h-1.5 bg-secondary mb-4 sm:mb-6 md:mb-8"></div>
              <span className="text-primary font-black uppercase tracking-widest text-xs sm:text-sm mb-3 sm:mb-4 block">Who We Are</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-secondary font-bold mb-4 sm:mb-6 md:mb-8 leading-tight">Greemsun General Trading LLC</h2>
              <p className="text-gray-600 mb-6 sm:mb-8 text-base sm:text-lg leading-relaxed">
                Greemsun General Trading LLC is a dynamic agricultural export company based on trust and quality. We source directly from sustainable farms to ensure every vegetable and fruit delivered meets the highest international hygiene and freshness standards.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-10 md:mb-12">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="bg-nature-50 p-2 sm:p-3 rounded-xl sm:rounded-2xl"><CheckCircle className="text-primary w-5 h-5 sm:w-6 sm:h-6" /></div>
                  <span className="font-bold text-primary-dark text-sm sm:text-base">Certified Sourcing</span>
                </div>
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="bg-nature-50 p-2 sm:p-3 rounded-xl sm:rounded-2xl"><CheckCircle className="text-primary w-5 h-5 sm:w-6 sm:h-6" /></div>
                  <span className="font-bold text-primary-dark text-sm sm:text-base">Global Logistics</span>
                </div>
              </div>
              <Link 
                to="/about" 
                className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-primary text-white rounded-lg sm:rounded-xl font-bold hover:bg-primary-dark transition-all group text-sm sm:text-base"
              >
                DISCOVER MORE <ChevronRight size={16} className="sm:w-[18px] sm:h-[18px] group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Cards */}
      <section className="py-12 sm:py-16 md:py-24 bg-nature-50 relative overflow-hidden group">
        {/* Sticky Background Image */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-opacity duration-500 opacity-100 group-hover:opacity-20"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?auto=format&fit=crop&q=80&w=2000)',
            backgroundAttachment: 'fixed'
          }}
        ></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
            {/* Mission Card - Left with slide-in animation */}
            <div className="bg-white p-6 sm:p-8 md:p-12 rounded-2xl sm:rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-all duration-500 border-l-4 sm:border-l-8 border-primary group hover:-translate-y-2 hover:scale-[1.02] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-primary/5 rounded-full -mr-12 -mt-12 sm:-mr-16 sm:-mt-16 group-hover:scale-150 transition-transform duration-700"></div>
              <div className="bg-primary-dark w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl flex items-center justify-center mb-6 sm:mb-10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 relative z-10">
                <Shield className="text-secondary w-8 h-8 sm:w-10 sm:h-10 group-hover:scale-125 transition-transform duration-300" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-primary mb-4 sm:mb-6 group-hover:text-secondary transition-colors duration-300 relative z-10">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed text-base sm:text-lg relative z-10 group-hover:text-gray-700 transition-colors duration-300">
                To bridge the gap between local fertile lands and global consumers by providing nutritious, sustainably sourced, and premium quality agricultural products.
              </p>
              <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </div>
            
            {/* Vision Card - Right with different animation */}
            <div className="bg-primary p-6 sm:p-8 md:p-12 rounded-2xl sm:rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-all duration-500 border-r-4 sm:border-r-8 border-secondary group text-white hover:-translate-y-2 hover:scale-[1.02] relative overflow-hidden">
              <div className="absolute top-0 left-0 w-24 h-24 sm:w-32 sm:h-32 bg-secondary/10 rounded-full -ml-12 -mt-12 sm:-ml-16 sm:-mt-16 group-hover:scale-150 transition-transform duration-700"></div>
              <div className="bg-secondary w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl flex items-center justify-center mb-6 sm:mb-10 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500 relative z-10">
                <Globe className="text-primary-dark w-8 h-8 sm:w-10 sm:h-10 group-hover:scale-125 transition-transform duration-300" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold mb-4 sm:mb-6 text-secondary group-hover:scale-105 transition-transform duration-300 relative z-10">Our Vision</h3>
              <p className="text-nature-100 leading-relaxed text-base sm:text-lg relative z-10 group-hover:text-white transition-colors duration-300">
                To be the global benchmark for fresh produce export, known for our integrity, innovative cold-chain solutions, and dedication to nature.
              </p>
              <div className="absolute bottom-0 right-0 w-full h-2 bg-gradient-to-l from-secondary to-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right"></div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Provide Section */}
      <section className="pt-8 pb-12 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <span className="text-secondary font-black uppercase tracking-widest text-xs sm:text-sm mb-2 block">Our Categories</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-primary font-bold">What We Provide</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {[
              { title: 'Fresh Vegetables', img: 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&q=80&w=800', desc: 'Premium grade vegetables picked daily.' },
              { title: 'Organic Fruits', img: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80&w=800', desc: 'Juicy, farm-fresh seasonal selections.' },
              { title: 'Essential Spices', img: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&q=80&w=800', desc: 'Aromatic and pure whole spices.' }
            ].map((item, idx) => (
              <div key={idx} className="group relative rounded-xl sm:rounded-2xl md:rounded-[2rem] overflow-hidden shadow-2xl h-[300px] sm:h-[400px] md:h-[500px]">
                <img src={item.img} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={item.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-primary/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute bottom-0 left-0 p-6 sm:p-8 md:p-10 transform translate-y-6 group-hover:translate-y-0 transition-transform duration-700">
                  <div className="w-8 sm:w-12 h-1 bg-secondary mb-3 sm:mb-4"></div>
                  <h4 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">{item.title}</h4>
                  <p className="text-sm sm:text-base text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-200">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Horizontal Scroller */}
      <section ref={horizontalScrollRef} className="pt-8 pb-8 bg-white overflow-visible">
        <div className="w-full overflow-x-hidden overflow-y-visible">
          <div className="horizontal-scroll-content flex gap-4 sm:gap-6 md:gap-8 will-change-transform py-4 sm:py-6 md:py-8">
            {[
              { number: '99%', label: 'Quality Rating', icon: CheckCircle },
              { number: '24/7', label: 'Support Available', icon: Clock },
              { number: '50+', label: 'Countries Served', icon: Globe },
              { number: '1000+', label: 'Happy Clients', icon: Star },
              { number: '25+', label: 'Years Experience', icon: Award },
              { number: '99%', label: 'Quality Rating', icon: CheckCircle },
              { number: '24/7', label: 'Support Available', icon: Clock },
              { number: '50+', label: 'Countries Served', icon: Globe },
              { number: '1000+', label: 'Happy Clients', icon: Star },
              { number: '25+', label: 'Years Experience', icon: Award },
            ].map((item, idx) => (
              <ScrollCard 
                key={idx} 
                icon={item.icon} 
                number={item.number} 
                label={item.label}
                onHoverStart={() => setIsScrollingPaused(true)}
                onHoverEnd={() => setIsScrollingPaused(false)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section 
        ref={whyChooseUsRef}
        className="py-12 sm:py-16 md:py-24 bg-white text-primary transition-transform duration-500 hover:scale-[1.05] relative overflow-hidden"
      >
        {/* Farmer sketch background */}
        <div 
          className="absolute inset-0 z-0 opacity-20"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=2000')`,
            backgroundSize: 'contain',
            backgroundPosition: 'right center',
            backgroundRepeat: 'no-repeat',
            filter: 'grayscale(100%) contrast(1.2)'
          }}
        ></div>
        {/* Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-white/95 z-0"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12 sm:mb-16 md:mb-20 gap-6 sm:gap-10">
            <div className="md:w-1/2">
              <span className="text-secondary font-bold uppercase tracking-widest text-xs sm:text-sm mb-3 sm:mb-4 block">The Greemsun Standard</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold leading-tight">Why We are Your Trusted Export Partner</h2>
            </div>
            <div className="md:w-1/2 border-l-0 md:border-l-4 border-secondary pl-0 md:pl-10">
              <p className="text-base sm:text-lg text-gray-700 italic font-light">
                "Our commitment to quality isn't just a promise; it's the core of everything we do, from farm selection to final delivery."
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10">
            {[
              { 
                title: 'Premium Quality', 
                desc: 'Every product is hand-checked for export-grade quality.',
                image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80&w=800'
              },
              { 
                title: 'Express Logistics', 
                desc: 'Direct shipping channels ensuring maximum shelf life.',
                image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800'
              },
              { 
                title: 'Global Standards', 
                desc: 'Compliant with UAE, European, and Asian food safety laws.',
                image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800'
              },
              { 
                title: 'Sustainable Farms', 
                desc: 'Ethically sourced produce supporting local communities.',
                image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=800'
              }
            ].map((card, idx) => (
              <div 
                key={idx} 
                className="bg-white group cursor-pointer overflow-hidden"
                style={{
                  transform: whyChooseUsVisible ? 'translateY(0) scale(1)' : 'translateY(80px) scale(1)',
                  opacity: whyChooseUsVisible ? 1 : 0,
                  boxShadow: 'none',
                  transition: `transform 0.7s ease ${idx * 0.15}s, opacity 0.7s ease ${idx * 0.15}s, box-shadow 0.3s ease`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '4px 4px 20px rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Image Section with Overlay */}
                <div className="w-full h-48 sm:h-64 md:h-80 overflow-hidden relative">
                  <img 
                    src={card.image} 
                    alt={card.title}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:opacity-20 group-hover:scale-110"
                    style={{ 
                      borderRadius: 0,
                      filter: 'contrast(1.1) saturate(1.1)'
                    }}
                  />
                  {/* Text Overlay on Hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="text-center px-4 sm:px-6">
                      <p className="text-sm sm:text-base font-medium leading-relaxed text-black" style={{ fontFamily: 'Times New Roman, serif' }}>{card.desc}</p>
                    </div>
                  </div>
                </div>
                {/* Title Below Image */}
                <div className="p-4 sm:p-6 bg-white">
                  <h4 className="text-lg sm:text-xl font-black text-primary text-center" style={{ fontFamily: 'Times New Roman, serif' }}>{card.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How the Process Works - Image Style */}
      <section ref={processSectionRef} className="py-8 bg-white relative overflow-hidden">
        {/* Background fruit sketch image */}
        <div 
          className="absolute inset-0 opacity-[0.05] z-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80&w=2000)',
            filter: 'grayscale(100%) contrast(0.3) brightness(1.5)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>
        {/* Additional fruit pattern overlay for more coverage */}
        <div 
          className="absolute inset-0 opacity-[0.03] z-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&q=80&w=2000)',
            filter: 'grayscale(100%) contrast(0.2) brightness(1.8)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            mixBlendMode: 'multiply'
          }}
        ></div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-2">How It Works</h2>
            <p className="text-lg sm:text-xl text-gray-600">Process</p>
          </div>
        </div>
        
        {/* Full-width scrollable container */}
        <div 
          ref={processCardsRef}
          className="w-full overflow-y-auto relative z-10 max-h-[600px] sm:max-h-[450px]"
          style={{
            scrollbarWidth: 'none', // Firefox
            msOverflowStyle: 'none', // IE/Edge
          }}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-8 sm:space-y-10 md:space-y-12">
            {/* Step 1 - Left */}
            <div className="flex items-center gap-4 md:gap-8">
              <div className="hidden md:block flex-1"></div>
              <div className="flex-1 relative">
                <div className="bg-white rounded-lg sm:rounded-xl shadow-xl p-4 sm:p-6 md:p-8 relative z-10 ml-12 sm:ml-16 md:ml-20 flex items-center min-h-[140px] sm:min-h-[160px] group transition-shadow duration-300 hover:shadow-[8px_8px_20px_0_rgba(234,179,8,0.4)]">
                  <div className="absolute -left-8 sm:-left-12 md:-left-16 top-1/2 -translate-y-1/2 z-20">
                    <div className="bg-secondary w-16 h-20 sm:w-20 sm:h-28 md:w-24 md:h-32 flex flex-col items-center justify-center rounded-lg shadow-lg">
                      <span className="text-white text-[8px] sm:text-[10px] md:text-xs font-bold uppercase mb-1">Step</span>
                      <span className="text-white text-2xl sm:text-3xl md:text-4xl font-bold">01</span>
                    </div>
                  </div>
                  {/* Tail line extending from left side of Step 1 */}
                  <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full w-24 md:w-40 h-1 bg-gray-600 z-0">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[8px] border-r-gray-600"></div>
                  </div>
                  <div className="ml-6 sm:ml-8 md:ml-12">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-secondary mb-2 sm:mb-3 md:mb-4 text-left">Inquiry & Consultation</h3>
                    <p className="text-gray-700 text-xs sm:text-sm md:text-base leading-relaxed text-left">
                      Share your product list, quantity, and delivery requirements through our online form or WhatsApp.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 - Right */}
            <div className="flex items-center gap-4 md:gap-8">
              <div className="flex-1 relative">
                <div className="bg-white rounded-xl shadow-xl p-6 md:p-8 relative z-10 mr-16 md:mr-20 flex items-center min-h-[160px] group transition-shadow duration-300 hover:shadow-[8px_8px_20px_0_rgba(234,179,8,0.4)]">
                  <div className="absolute -right-12 md:-right-16 top-1/2 -translate-y-1/2 z-20">
                    <div className="bg-secondary w-20 h-28 md:w-24 md:h-32 flex flex-col items-center justify-center rounded-lg shadow-lg">
                      <span className="text-white text-[10px] md:text-xs font-bold uppercase mb-1">Step</span>
                      <span className="text-white text-3xl md:text-4xl font-bold">02</span>
                    </div>
                  </div>
                  {/* Tail line extending from right side of Step 2 */}
                  <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-full w-24 md:w-40 h-1 bg-gray-600 z-0">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[8px] border-l-gray-600"></div>
                  </div>
                  <div className="mr-8 md:mr-12">
                    <h3 className="text-xl md:text-2xl font-bold text-secondary mb-3 md:mb-4 text-left">Product Sourcing</h3>
                    <p className="text-gray-700 text-sm md:text-base leading-relaxed text-left">
                      We procure from verified farms and suppliers in India and other Asian/African regions.
                    </p>
                  </div>
                </div>
              </div>
              <div className="hidden md:block flex-1"></div>
            </div>

            {/* Step 3 - Left */}
            <div className="flex items-center gap-4 md:gap-8">
              <div className="hidden md:block flex-1"></div>
              <div className="flex-1 relative">
                <div className="bg-white rounded-xl shadow-xl p-6 md:p-8 relative z-10 ml-16 md:ml-20 flex items-center min-h-[160px] group transition-shadow duration-300 hover:shadow-[8px_8px_20px_0_rgba(234,179,8,0.4)]">
                  <div className="absolute -left-12 md:-left-16 top-1/2 -translate-y-1/2 z-20">
                    <div className="bg-secondary w-20 h-28 md:w-24 md:h-32 flex flex-col items-center justify-center rounded-lg shadow-lg">
                      <span className="text-white text-[10px] md:text-xs font-bold uppercase mb-1">Step</span>
                      <span className="text-white text-3xl md:text-4xl font-bold">03</span>
                    </div>
                  </div>
                  {/* Tail line extending from left side of Step 3 */}
                  <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full w-24 md:w-40 h-1 bg-gray-600 z-0">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[8px] border-r-gray-600"></div>
                  </div>
                  <div className="ml-8 md:ml-12">
                    <h3 className="text-xl md:text-2xl font-bold text-secondary mb-3 md:mb-4 text-left">Quality Check & Packaging</h3>
                    <p className="text-gray-700 text-sm md:text-base leading-relaxed text-left">
                      All items undergo quality inspections and are packed per UAE import and re-export standards.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4 - Right */}
            <div className="flex items-center gap-4 md:gap-8">
              <div className="flex-1 relative">
                <div className="bg-white rounded-xl shadow-xl p-6 md:p-8 relative z-10 mr-16 md:mr-20 flex items-center min-h-[160px] group transition-shadow duration-300 hover:shadow-[8px_8px_20px_0_rgba(234,179,8,0.4)]">
                  <div className="absolute -right-12 md:-right-16 top-1/2 -translate-y-1/2 z-20">
                    <div className="bg-secondary w-20 h-28 md:w-24 md:h-32 flex flex-col items-center justify-center rounded-lg shadow-lg">
                      <span className="text-white text-[10px] md:text-xs font-bold uppercase mb-1">Step</span>
                      <span className="text-white text-3xl md:text-4xl font-bold">04</span>
                    </div>
                  </div>
                  {/* Tail line extending from right side of Step 4 */}
                  <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-full w-24 md:w-40 h-1 bg-gray-600 z-0">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[8px] border-l-gray-600"></div>
                  </div>
                  <div className="mr-8 md:mr-12">
                    <h3 className="text-xl md:text-2xl font-bold text-secondary mb-3 md:mb-4 text-left">Shipping & Delivery</h3>
                    <p className="text-gray-700 text-sm md:text-base leading-relaxed text-left">
                      Handled via air and sea freight, cleared through Dubai ports for smooth distribution.
                    </p>
                  </div>
                </div>
              </div>
              <div className="hidden md:block flex-1"></div>
            </div>

            {/* Step 5 - Left */}
            <div className="flex items-center gap-4 md:gap-8">
              <div className="hidden md:block flex-1"></div>
              <div className="flex-1 relative">
                <div className="bg-white rounded-xl shadow-xl p-6 md:p-8 relative z-10 ml-16 md:ml-20 flex items-center min-h-[160px] group transition-shadow duration-300 hover:shadow-[8px_8px_20px_0_rgba(234,179,8,0.4)]">
                  <div className="absolute -left-12 md:-left-16 top-1/2 -translate-y-1/2 z-20">
                    <div className="bg-secondary w-20 h-28 md:w-24 md:h-32 flex flex-col items-center justify-center rounded-lg shadow-lg">
                      <span className="text-white text-[10px] md:text-xs font-bold uppercase mb-1">Step</span>
                      <span className="text-white text-3xl md:text-4xl font-bold">05</span>
                    </div>
                  </div>
                  {/* Tail line extending from left side of Step 5 */}
                  <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full w-24 md:w-40 h-1 bg-gray-600 z-0">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[8px] border-r-gray-600"></div>
                  </div>
                  <div className="ml-8 md:ml-12">
                    <h3 className="text-xl md:text-2xl font-bold text-secondary mb-3 md:mb-4 text-left">Feedback & Long Term Partnership</h3>
                    <p className="text-gray-700 text-sm md:text-base leading-relaxed text-left">
                      We value your feedback and continuously improve our services.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights of Certificates */}
      <section className="py-12 sm:py-16 md:py-24 bg-white relative overflow-hidden">
        {/* Background fruit sketch image */}
        <div 
          className="absolute inset-0 opacity-[0.05] z-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80&w=2000)',
            filter: 'grayscale(100%) contrast(0.3) brightness(1.5)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>
        {/* Additional fruit pattern overlay for more coverage */}
        <div 
          className="absolute inset-0 opacity-[0.03] z-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&q=80&w=2000)',
            filter: 'grayscale(100%) contrast(0.2) brightness(1.8)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            mixBlendMode: 'multiply'
          }}
        ></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-dark mb-3 sm:mb-4">Certifications & Compliance</h2>
          <div className="flex justify-center items-center gap-2 mb-8 sm:mb-12 md:mb-16">
            <div className="w-8 sm:w-12 h-1 bg-green-600"></div>
            <div className="w-8 sm:w-12 h-1 bg-yellow-500"></div>
          </div>
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-12 items-start">
            {[
              { 
                name: 'Maharashtra Foodstuff Trading LLC',
                description: 'Approved importer in Dubai, recognized by UAE authorities for food trade compliance.',
                image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=400'
              },
              { 
                name: 'Dubai Chamber of Commerce',
                description: 'Registered business member with the Dubai Chamber, ensuring trade credibility.',
                image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=400'
              },
              { 
                name: 'एपीडा APEDA',
                description: 'All sourcing partners are certified under APEDA & FSSAI (India) for export-grade food safety.',
                image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=400'
              },
              { 
                name: 'HACCP Food Safety',
                description: 'We maintain HACCP & ISO 22000 standards for food handling, processing, and logistics.',
                image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80&w=400'
              }
            ].map((cert, idx) => (
              <div 
                key={idx} 
                className="flex flex-col items-center group cursor-pointer max-w-[200px] sm:max-w-[240px]"
              >
                <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 bg-white rounded-full shadow-xl flex items-center justify-center mb-3 sm:mb-4 transition-all duration-500 group-hover:shadow-2xl overflow-hidden relative border-2 border-gray-200">
                  <img 
                    src={cert.image} 
                    alt={cert.name}
                    className="w-full h-full object-cover rounded-full transition-all duration-500"
                  />
                  <div 
                    className="absolute inset-0 bg-yellow-500/0 group-hover:bg-yellow-500/85 transition-all duration-500 rounded-full flex items-center justify-center"
                    style={{
                      backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255, 255, 255, 0.1) 10px, rgba(255, 255, 255, 0.1) 20px)'
                    }}
                  >
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-center text-white font-bold text-xs sm:text-sm md:text-base leading-tight px-4 sm:px-6 py-2 z-10 w-full max-w-[85%] break-words">
                      {cert.name}
                    </div>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed text-center mt-2 px-2">{cert.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature of My Product */}
      <section className="relative min-h-[500px] sm:min-h-[600px] flex items-center justify-center text-white overflow-hidden py-8 sm:py-12 md:py-16">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1590779033100-9f60705a2f3d?auto=format&fit=crop&q=80&w=2000)'
          }}
        >
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, rgba(234, 179, 8, 0.7) 0%, rgba(251, 191, 36, 0.6) 50%, rgba(234, 179, 8, 0.7) 100%)',
              animation: 'gradientShift 8s ease infinite'
            }}
          ></div>
            </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-4xl mx-auto sm:-ml-[50px]">
              <span 
                className="text-secondary font-black uppercase tracking-widest text-xs sm:text-sm mb-4 sm:mb-6 block opacity-0"
                style={{
                  animation: 'fadeInUp 0.8s ease forwards'
                }}
              >
                Premium Selection
              </span>
            <h2 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold mb-6 sm:mb-8 md:mb-10 leading-tight opacity-0"
              style={{
                animation: 'fadeInUp 0.8s ease 0.2s forwards'
              }}
            >
              Harvested with <br /><span className="text-secondary">Purity & Care</span>
            </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16">
                {[
                  {
                    title: '100% Pesticide Free',
                    description: 'Certified organic produce without harmful chemicals'
                  },
                  {
                    title: 'Freshness Guaranteed',
                    description: 'Harvested at peak ripeness for maximum quality'
                  },
                  {
                    title: 'UV Treated Processing',
                    description: 'Advanced sanitization ensures food safety standards'
                  },
                  {
                    title: 'Sustainable Packaging',
                    description: 'Eco-friendly materials protecting nature and products'
                  },
                  {
                    title: 'Direct Farm Sourcing',
                    description: 'Straight from trusted farms to your doorstep'
                  },
                  {
                    title: 'Standardized Grading',
                    description: 'Consistent quality control and size classification'
                  }
                ].map((feature, i) => (
                  <li 
                    key={i} 
                    className="opacity-0"
                    style={{
                      animation: `fadeInUp 0.6s ease ${0.4 + i * 0.1}s forwards`
                    }}
                  >
                    <GlareHover
                      width="100%"
                      height="140px"
                      background="#ffffff"
                      borderRadius="12px"
                      borderColor="rgba(234, 179, 8, 0.3)"
                      glareColor="#fbbf24"
                      glareOpacity={0.3}
                      glareAngle={-30}
                      glareSize={200}
                      transitionDuration={800}
                      playOnce={false}
                      className="flex flex-col gap-2 p-3 sm:p-4 transition-all duration-500 shadow-lg hover:shadow-2xl transform hover:scale-105 hover:-translate-y-2"
                      style={{
                        borderWidth: '2px',
                        margin: '0 auto'
                      }}
                      className="w-full sm:max-w-[320px] min-h-[120px] sm:min-h-[140px]"
                    >
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div 
                          className="bg-yellow-500 p-1 sm:p-1.5 rounded-full flex-shrink-0 shadow-lg transform transition-all duration-500 group-hover:rotate-360"
                          style={{
                            animation: `pulse 2s ease-in-out infinite ${i * 0.3}s, float 3s ease-in-out infinite ${1 + i * 0.2}s`
                          }}
                        >
                          <CheckCircle size={16} className="sm:w-[18px] sm:h-[18px] text-white" />
                        </div>
                        <h3 className="text-sm sm:text-base font-bold text-gray-800 leading-tight">{feature.title}</h3>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed pl-8 sm:pl-11">{feature.description}</p>
                    </GlareHover>
                  </li>
                ))}
              </ul>
              <Link 
                to="/products" 
                className="inline-block px-6 sm:px-8 md:px-12 py-3 sm:py-4 md:py-5 text-primary-dark rounded-full font-black transition-all duration-500 shadow-2xl hover:shadow-secondary/40 text-sm sm:text-base md:text-lg uppercase tracking-wider transform hover:scale-110 opacity-0 relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)',
                  backgroundSize: '200% 200%',
                  animation: 'fadeInUp 0.8s ease 1s forwards, shimmer 3s ease-in-out infinite',
                  border: '2px solid rgba(255, 255, 255, 0.3)'
                }}
              >
                <span className="relative z-10">View Product Catalog</span>
              </Link>
            </div>
          </div>
        <style>{`
          @keyframes gradientShift {
            0%, 100% { opacity: 0.6; }
            50% { opacity: 0.8; }
          }
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-10px);
            }
          }
          @keyframes pulse {
            0%, 100% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.1);
            }
          }
          @keyframes shimmer {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }
          @keyframes pulseBorder {
            0%, 100% {
              opacity: 0.5;
              transform: scale(1);
            }
            50% {
              opacity: 0.8;
              transform: scale(1.05);
            }
          }
        `}</style>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white transition-transform duration-500 hover:scale-[1.02] group">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="text-secondary font-black uppercase tracking-widest text-sm mb-4 block">Client Feedback</span>
            <h2 className="text-4xl font-serif text-primary font-bold">What Our Partners Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {TESTIMONIALS.map((t) => (
              <div key={t.id} className="bg-white p-12 rounded-[2rem] shadow-xl border border-nature-100 flex flex-col justify-between hover:-translate-y-2 transition-transform duration-500">
                <div>
                  <div className="flex text-secondary mb-8">
                    {[...Array(t.rating)].map((_, i) => <Star key={i} size={20} fill="currentColor" />)}
                  </div>
                  <Quote size={60} className="text-nature-100 mb-6" />
                  <p className="text-gray-700 mb-10 italic text-lg leading-relaxed font-medium">"{t.content}"</p>
                </div>
                <div className="flex items-center gap-5 pt-8 border-t border-nature-50">
                  <div className="w-16 h-16 bg-primary text-secondary rounded-2xl flex items-center justify-center font-black text-2xl shadow-lg">
                    {t.name[0]}
                  </div>
                  <div>
                    <h5 className="font-black text-primary-dark text-lg">{t.name}</h5>
                    <p className="text-sm font-bold text-secondary uppercase tracking-widest">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
