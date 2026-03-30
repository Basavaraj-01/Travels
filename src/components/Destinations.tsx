import React, { useState } from 'react';
import { motion } from 'motion/react';
import { destinations } from '../data';
import { ArrowRight } from 'lucide-react';

export default function Destinations() {
  const [showAll, setShowAll] = useState(false);
  const displayedDestinations = showAll ? destinations : destinations.slice(0, 4);

  return (
    <section id="destinations" className="py-20 bg-white dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-serif font-bold text-dark dark:text-white mb-4"
            >
              Top <span className="text-primary">Destinations</span>
            </motion.h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Explore our handpicked selection of the world's most breathtaking locations. Where will your next journey take you?
            </p>
          </div>
          {destinations.length > 4 && (
            <button 
              onClick={() => setShowAll(!showAll)}
              className="flex items-center gap-2 text-primary font-semibold hover:text-primary-hover transition-colors whitespace-nowrap"
            >
              {showAll ? 'Show Less Destinations' : 'View All Destinations'} <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedDestinations.map((dest, index) => (
            <motion.div
              key={dest.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative h-80 rounded-2xl overflow-hidden group cursor-pointer shadow-md hover:shadow-xl transition-all duration-300"
            >
              <img
                src={dest.image}
                alt={dest.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="absolute bottom-0 left-0 p-6 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-2xl font-bold text-white mb-1">{dest.name}</h3>
                <p className="text-white/80 text-sm font-medium">{dest.tours} Tours Available</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
