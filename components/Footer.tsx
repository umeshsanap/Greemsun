
import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Phone, Mail, MapPin, Instagram, Facebook, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary-dark text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Leaf className="text-secondary w-8 h-8" />
              <span className="font-serif font-bold text-2xl tracking-tight">GREEMSUN</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Global leaders in agricultural trading. Exporting the freshest vegetables and premium agricultural products from fertile lands to the world.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-primary p-2 rounded-full hover:bg-secondary transition-colors"><Facebook size={18} /></a>
              <a href="#" className="bg-primary p-2 rounded-full hover:bg-secondary transition-colors"><Instagram size={18} /></a>
              <a href="#" className="bg-primary p-2 rounded-full hover:bg-secondary transition-colors"><Linkedin size={18} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6 border-b border-secondary w-fit pb-1">Quick Links</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><Link to="/" className="hover:text-secondary transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-secondary transition-colors">About Us</Link></li>
              <li><Link to="/products" className="hover:text-secondary transition-colors">Fresh Products</Link></li>
              <li><Link to="/certifications" className="hover:text-secondary transition-colors">Compliance</Link></li>
              <li><Link to="/contact" className="hover:text-secondary transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-lg mb-6 border-b border-secondary w-fit pb-1">Our Services</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li>Bulk Export</li>
              <li>Quality Auditing</li>
              <li>Cold Chain Logistics</li>
              <li>Private Labeling</li>
              <li>Trade Consulting</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-6 border-b border-secondary w-fit pb-1">Get In Touch</h4>
            <ul className="space-y-4 text-sm text-gray-300">
              <li className="flex items-start space-x-3">
                <MapPin className="text-secondary shrink-0" size={18} />
                <span>123 Business Bay, Green Avenue,<br />Dubai, United Arab Emirates</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="text-secondary shrink-0" size={18} />
                <span>+971 50 123 4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="text-secondary shrink-0" size={18} />
                <span>info@greemsuntrading.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
          <p>© 2024 Greemsun General Trading LLC. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
