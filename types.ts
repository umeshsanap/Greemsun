
export interface Product {
  id: string;
  name: string;
  category: 'Vegetables' | 'Fruits' | 'Spices';
  description: string;
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Step {
  id: number;
  title: string;
  description: string;
}
