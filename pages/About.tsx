
import React from 'react';
import { Target, Users, Landmark, Globe2 } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="pt-20">
      <div className="bg-primary text-white py-24 px-4 text-center">
        <h1 className="text-5xl font-serif font-bold mb-4">Our Story</h1>
        <p className="max-w-2xl mx-auto text-lg text-nature-100">Rooted in excellence, growing for the world.</p>
      </div>

      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <div className="md:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=1000" 
              className="rounded-3xl shadow-2xl"
              alt="Farm"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-serif font-bold text-primary mb-6">Redefining Agricultural Exports</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Greemsun General Trading LLC started with a simple vision: to bring the freshness of the world's most fertile agricultural belts directly to the plates of international consumers. Today, we stand as a beacon of quality in the global trading community.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Our journey is marked by long-standing relationships with farmers who share our passion for soil health and organic practices. We believe that true quality starts from the seed and ends with a satisfied customer thousands of miles away.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div className="flex flex-col items-center p-6 bg-nature-50 rounded-2xl">
                <Landmark className="text-secondary mb-2" size={32} />
                <span className="font-bold text-primary">UAE Based</span>
              </div>
              <div className="flex flex-col items-center p-6 bg-nature-50 rounded-2xl">
                <Globe2 className="text-secondary mb-2" size={32} />
                <span className="font-bold text-primary">Global Reach</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-serif font-bold text-center mb-16">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: <Target className="w-12 h-12 text-secondary" />, title: 'Integrity', desc: 'We build honest partnerships with both our farmers and our global clients.' },
              { icon: <Users className="w-12 h-12 text-secondary" />, title: 'Community', desc: 'Supporting rural farming communities through fair trade and educational support.' },
              { icon: <Globe2 className="w-12 h-12 text-secondary" />, title: 'Sustainability', desc: 'Implementing eco-friendly packaging and reducing carbon footprint in transit.' }
            ].map((v, i) => (
              <div key={i} className="text-center p-8 border border-primary-light rounded-3xl hover:bg-primary-dark transition-colors">
                <div className="flex justify-center mb-6">{v.icon}</div>
                <h4 className="text-2xl font-bold mb-4">{v.title}</h4>
                <p className="text-gray-300 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
