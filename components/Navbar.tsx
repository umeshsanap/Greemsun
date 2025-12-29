
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Leaf, Phone, Mail, Instagram, Facebook, Youtube } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Products', path: '/products' },
    { name: 'Services', path: '/services' },
    { name: 'Certification', path: '/certifications' },
    { name: 'Process', path: '/import-process' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      {/* Top Bar with Contact Info and Social Media */}
      <div className={`fixed w-full top-0 z-50 transition-all duration-700 ease-in-out ${scrolled ? 'bg-gray-100 -translate-y-full opacity-0' : 'bg-white translate-y-0 opacity-100'} py-4 border-b border-gray-200`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 md:gap-0">
            {/* Contact Info */}
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 text-base">
              <a href="tel:+971501234567" className={`flex items-center gap-2 transition-colors ${scrolled ? 'text-gray-600 hover:text-secondary' : 'text-gray-700 hover:text-secondary'}`}>
                <Phone size={20} />
                <span>+971 50 123 4567</span>
              </a>
              <a href="mailto:info@greemsuntrading.com" className={`flex items-center gap-2 transition-colors ${scrolled ? 'text-gray-600 hover:text-secondary' : 'text-gray-700 hover:text-secondary'}`}>
                <Mail size={20} />
                <span>info@greemsuntrading.com</span>
              </a>
            </div>

            {/* Social Media Icons */}
            <div className="flex items-center gap-4">
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className={`p-2 rounded-full transition-colors ${scrolled ? 'text-gray-600 hover:text-secondary hover:bg-gray-200' : 'text-gray-700 hover:text-secondary hover:bg-gray-100'}`}>
                <Instagram size={22} />
              </a>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className={`p-2 rounded-full transition-colors ${scrolled ? 'text-gray-600 hover:text-secondary hover:bg-gray-200' : 'text-gray-700 hover:text-secondary hover:bg-gray-100'}`}>
                <Facebook size={22} />
              </a>
              <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className={`p-2 rounded-full transition-colors ${scrolled ? 'text-gray-600 hover:text-secondary hover:bg-gray-200' : 'text-gray-700 hover:text-secondary hover:bg-gray-100'}`}>
                <Youtube size={22} />
              </a>
              <a href="https://www.google.com" target="_blank" rel="noopener noreferrer" className={`p-2 rounded-full transition-colors ${scrolled ? 'text-gray-600 hover:text-secondary hover:bg-gray-200' : 'text-gray-700 hover:text-secondary hover:bg-gray-100'}`}>
                <svg className="w-[22px] h-[22px]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              </a>
              <a href="https://wa.me/971501234567" target="_blank" rel="noopener noreferrer" className={`p-2 rounded-full transition-colors ${scrolled ? 'text-gray-600 hover:text-secondary hover:bg-gray-200' : 'text-gray-700 hover:text-secondary hover:bg-gray-100'}`}>
                <svg className="w-[22px] h-[22px]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`fixed w-full z-40 transition-all duration-700 ease-in-out ${scrolled ? 'bg-white shadow-lg py-4 top-0' : 'bg-transparent py-6 top-16'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-3">
            <div className="bg-primary p-3 rounded-lg">
              <Leaf className="text-secondary w-8 h-8" />
            </div>
            <div className="flex flex-col">
              <span className={`font-serif font-bold text-2xl leading-none ${scrolled ? 'text-primary' : 'text-white'}`}>GREEMSUN</span>
              <span className={`text-xs tracking-widest font-semibold ${scrolled ? 'text-secondary' : 'text-secondary-light'}`}>TRADING LLC</span>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-base font-medium transition-colors hover:text-secondary ${
                  location.pathname === link.path 
                    ? 'text-secondary font-bold' 
                    : scrolled ? 'text-primary' : 'text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link 
              to="/contact" 
              className="bg-secondary hover:bg-secondary-dark text-white px-6 py-3 rounded-full text-base font-bold transition-all transform hover:scale-105"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={scrolled ? 'text-primary' : 'text-white'}
            >
              {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className={`md:hidden bg-white shadow-2xl fixed top-full left-0 w-full animate-fadeIn ${scrolled ? 'mt-16' : 'mt-24'}`}>
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-4 text-base font-medium rounded-md hover:bg-nature-100 ${
                  location.pathname === link.path ? 'text-secondary bg-nature-50' : 'text-primary'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
      </nav>
    </>
  );
};

export default Navbar;
