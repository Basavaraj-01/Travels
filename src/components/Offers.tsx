import React from 'react';
import { motion } from 'motion/react';
import { offers } from '../data';
import { Tag, ArrowRight } from 'lucide-react';

export default function Offers() {
  return (
    <section id="offers" className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-serif font-bold text-dark dark:text-white mb-4"
          >
            Special <span className="text-primary">Offers</span>
          </motion.h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
            Exclusive deals and seasonal promotions to make your dream vacation more affordable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {offers.map((offer, index) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative rounded-3xl overflow-hidden shadow-xl group h-80"
            >
              <img
                src={offer.image}
                alt={offer.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
              
              <div className="absolute inset-0 p-8 flex flex-col justify-center text-white w-full md:w-3/4">
                <div className="bg-primary/90 backdrop-blur-sm w-max px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  {offer.discount}
                </div>
                
                <h3 className="text-3xl font-serif font-bold mb-3 leading-tight">{offer.title}</h3>
                <p className="text-white/90 mb-6 text-lg leading-relaxed">{offer.description}</p>
                
                <div className="flex items-center gap-4 mt-auto">
                  <div className="bg-white/20 backdrop-blur-md border border-white/30 px-4 py-2 rounded-lg font-mono text-lg font-semibold tracking-widest">
                    {offer.code}
                  </div>
                  <button 
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    className="flex items-center gap-2 text-white font-semibold hover:text-primary transition-colors"
                  >
                    Claim Offer <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
