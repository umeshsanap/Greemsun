
import React from 'react';
import { Leaf, ShieldCheck, Globe, Truck, Award, Zap, Heart, CheckCircle2 } from 'lucide-react';
import { Product, Testimonial, Service, Step } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Premium Red Chilies',
    category: 'Vegetables',
    description: 'Vibrant, hand-picked red chilies with intense color and perfect spice levels for global markets.',
    image: 'https://images.unsplash.com/photo-1588252303782-cb80119f702e?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '2',
    name: 'Organic Cauliflower',
    category: 'Vegetables',
    description: 'Snow-white, firm cauliflower heads grown in nutrient-rich soil and harvested at peak maturity.',
    image: 'https://images.unsplash.com/photo-1568584711075-3d021a7c3ec3?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '3',
    name: 'Fresh Green Beans',
    category: 'Vegetables',
    description: 'Tender, snap-fresh green beans sorted meticulously for uniform size and exceptional quality.',
    image: 'https://images.unsplash.com/photo-1567375638346-e2b0b24b00ca?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '4',
    name: 'Garden Fresh Lemons',
    category: 'Fruits',
    description: 'Juicy, thick-skinned lemons rich in vitamin C, perfect for culinary and industrial use.',
    image: 'https://images.unsplash.com/photo-1590502593747-42a996133562?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '5',
    name: 'Crimson Tomatoes',
    category: 'Vegetables',
    description: 'Plump, vine-ripened tomatoes with deep red color and balanced sweetness.',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '6',
    name: 'Fresh Ginger Root',
    category: 'Spices',
    description: 'High-quality, firm ginger roots with strong aroma and long shelf life for international trade.',
    image: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&q=80&w=800',
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Ahmed Al-Mansour',
    role: 'Produce Distributor, UAE',
    content: 'Greemsun has been our primary supplier for over two years. The quality of vegetables is consistently superior, and their logistics are seamless.',
    rating: 5,
  },
  {
    id: '2',
    name: 'Dr. Sarah Jenkins',
    role: 'Import Manager, UK',
    content: 'Impressive commitment to certification and quality. They understand the rigorous standards required for the European market.',
    rating: 5,
  },
  {
    id: '3',
    name: 'Marcus Chen',
    role: 'Supply Chain Director, Singapore',
    content: 'Speed and freshness are critical for us. Greemsun delivers on both promises every single time.',
    rating: 4,
  }
];

export const SERVICES: Service[] = [
  {
    id: 's1',
    title: 'Global Export',
    description: 'Seamless international distribution network across five continents.',
    icon: 'Globe',
  },
  {
    id: 's2',
    title: 'Quality Assurance',
    description: 'Multi-stage quality checks ensuring only the finest produce reaches you.',
    icon: 'ShieldCheck',
  },
  {
    id: 's3',
    title: 'Cold Storage',
    description: 'State-of-the-art temperature-controlled storage and transit.',
    icon: 'Zap',
  },
  {
    id: 's4',
    title: 'Custom Packaging',
    description: 'Bespoke packaging solutions tailored for specific market needs.',
    icon: 'Truck',
  }
];

export const PROCESS_STEPS: Step[] = [
  { id: 1, title: 'Direct Sourcing', description: 'We source directly from local farms ensuring fair trade and peak freshness.' },
  { id: 2, title: 'Rigorous Sorting', description: 'Advanced sorting facilities categorize produce by size, color, and quality.' },
  { id: 3, title: 'Secure Packaging', description: 'Packaging designed for protection and environmental sustainability.' },
  { id: 4, title: 'Compliance & Export', description: 'Expert handling of all customs documentation and international standards.' },
  { id: 5, title: 'Fast Delivery', description: 'Express logistics ensuring minimal time from farm to your facility.' },
];
