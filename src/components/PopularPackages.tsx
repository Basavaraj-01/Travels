import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Star, Clock, MapPin, CheckCircle, Search } from 'lucide-react';
import { packages } from '../data';
import PackageModal from './PackageModal';

export default function PopularPackages() {
  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  const [showAll, setShowAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPackages = packages.filter(pkg => 
    pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    pkg.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayedPackages = showAll ? filteredPackages : filteredPackages.slice(0, 3);

  return (
    <section id="packages" className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-serif font-bold text-dark dark:text-white mb-4"
          >
            Popular <span className="text-primary">Packages</span>
          </motion.h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg mb-8">
            Discover our most sought-after travel experiences, carefully curated for unforgettable memories.
          </p>

          {/* Search Feature */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-md mx-auto relative"
          >
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search destinations or packages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all shadow-sm"
            />
          </motion.div>
        </div>

        {filteredPackages.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">No packages found matching your search.</p>
            <button 
              onClick={() => setSearchQuery('')}
              className="mt-4 text-primary hover:underline font-medium"
            >
              Clear Search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedPackages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group flex flex-col"
            >
              <div className="relative h-64 overflow-hidden shrink-0">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-primary flex items-center gap-1">
                  <Star className="w-4 h-4 fill-current" />
                  {pkg.rating} ({pkg.reviews})
                </div>
                {pkg.originalPrice && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Sale
                  </div>
                )}
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-dark dark:text-white mb-1 line-clamp-1">{pkg.title}</h3>
                    <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{pkg.location}</span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                  {pkg.description}
                </p>

                <div className="flex items-center gap-4 mb-6 text-sm text-gray-600 dark:text-gray-300">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>{pkg.days} Days</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>{pkg.inclusions.length} Inclusions</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Starting from</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-dark dark:text-white">${pkg.price}</span>
                      {pkg.originalPrice && (
                        <span className="text-sm text-gray-400 line-through">${pkg.originalPrice}</span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedPackage(pkg)}
                    className="bg-primary hover:bg-primary-hover text-white px-6 py-2 rounded-full font-medium transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        )}
        
        {filteredPackages.length > 3 && (
          <div className="text-center mt-12">
            <button 
              onClick={() => setShowAll(!showAll)} 
              className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-full font-semibold transition-colors text-lg"
            >
              {showAll ? 'Show Less Packages' : 'Explore All Packages'}
            </button>
          </div>
        )}
      </div>

      {selectedPackage && (
        <PackageModal
          pkg={selectedPackage}
          onClose={() => setSelectedPackage(null)}
        />
      )}
    </section>
  );
}
