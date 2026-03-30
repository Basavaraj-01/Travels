import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, Shield, Clock, HeartHandshake, X } from 'lucide-react';

export default function AboutUs() {
  const [showStory, setShowStory] = useState(false);

  const features = [
    {
      icon: <Globe className="w-8 h-8 text-primary" />,
      title: 'Global Network',
      description: 'Access to exclusive partnerships and hidden gems across 100+ countries.'
    },
    {
      icon: <Shield className="w-8 h-8 text-primary" />,
      title: 'Secure Booking',
      description: 'Your payments and personal information are protected with bank-level security.'
    },
    {
      icon: <Clock className="w-8 h-8 text-primary" />,
      title: '24/7 Support',
      description: 'Our dedicated team is always available to assist you, anywhere in the world.'
    },
    {
      icon: <HeartHandshake className="w-8 h-8 text-primary" />,
      title: 'Personalized Service',
      description: 'Tailor-made itineraries designed specifically for your preferences and budget.'
    }
  ];

  return (
    <section id="about" className="py-20 bg-light dark:bg-gray-900 overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left side - Images */}
          <div className="w-full lg:w-1/2 relative">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-8 border-white dark:border-gray-800"
            >
              <img 
                src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=800" 
                alt="Travelers" 
                className="w-full h-auto object-cover"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="absolute -bottom-10 -right-10 w-2/3 rounded-2xl overflow-hidden shadow-2xl border-8 border-white dark:border-gray-800 z-20 hidden md:block"
            >
              <img 
                src="https://images.unsplash.com/photo-1503220317375-aaad61436b1b?auto=format&fit=crop&q=80&w=600" 
                alt="Passport and map" 
                className="w-full h-auto object-cover"
              />
            </motion.div>
            
            {/* Experience Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, type: 'spring' }}
              className="absolute -top-6 -left-6 bg-primary text-white w-32 h-32 rounded-full flex flex-col items-center justify-center shadow-xl z-30"
            >
              <span className="text-4xl font-bold">15+</span>
              <span className="text-sm font-medium text-center leading-tight mt-1">Years of<br/>Experience</span>
            </motion.div>
          </div>

          {/* Right side - Content */}
          <div className="w-full lg:w-1/2 mt-12 lg:mt-0">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-serif font-bold text-dark dark:text-white mb-6"
            >
              Why Choose <span className="text-primary">Global B</span>?
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-600 dark:text-gray-300 text-lg mb-10 leading-relaxed"
            >
              We don't just book trips; we craft unforgettable experiences. With over a decade of expertise in the travel industry, Global B has established itself as a premier international travel agency dedicated to turning your dream vacations into reality.
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + (index * 0.1) }}
                  className="flex gap-4"
                >
                  <div className="shrink-0 mt-1 bg-white dark:bg-gray-800 p-3 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-dark dark:text-white mb-2">{feature.title}</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="mt-10"
            >
              <button 
                onClick={() => setShowStory(true)}
                className="bg-dark dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 text-white dark:text-dark px-8 py-3 rounded-full font-medium transition-colors shadow-lg"
              >
                Read Our Full Story
              </button>
            </motion.div>
          </div>

        </div>
      </div>

      <AnimatePresence>
        {showStory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowStory(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              <div className="p-6 sm:p-8 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center shrink-0">
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-dark dark:text-white">Our Full Story</h3>
                <button
                  onClick={() => setShowStory(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors text-gray-500 dark:text-gray-400"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="p-6 sm:p-8 overflow-y-auto custom-scrollbar text-gray-600 dark:text-gray-300 space-y-6 leading-relaxed">
                <p>
                  Founded in 2011, Global B began with a simple yet profound belief: travel has the power to transform lives. What started as a small, passionate team of globetrotters has blossomed into an award-winning international travel agency.
                </p>
                <p>
                  Our founders, avid travelers themselves, realized that the modern traveler was seeking more than just a cookie-cutter vacation. They wanted authentic experiences, deep cultural immersion, and the peace of mind that comes with expert planning. Thus, Global B was born.
                </p>
                <p>
                  Over the past 15 years, we have built an extensive global network, partnering with the finest boutique hotels, expert local guides, and exclusive experience providers. This allows us to offer our clients access to hidden gems and VIP treatments that simply cannot be found elsewhere.
                </p>
                <p>
                  We pride ourselves on our personalized approach. Every itinerary we design is as unique as the traveler it's created for. Whether you're seeking a thrilling safari in the Serengeti, a romantic honeymoon in the Maldives, or a deep dive into the history of Rome, our dedicated team works tirelessly to ensure every detail is perfect.
                </p>
                <p>
                  At Global B, we don't just send you on a trip; we welcome you into our family of explorers. Join us, and let's discover the world together.
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
