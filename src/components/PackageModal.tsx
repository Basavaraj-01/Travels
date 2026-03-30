import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Users, MapPin, Check, Info, Star, BedDouble } from 'lucide-react';

export default function PackageModal({ pkg, onClose }: { pkg: any, onClose: () => void }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [bookingStep, setBookingStep] = useState(1);
  const [formData, setFormData] = useState({
    date: '',
    travelers: '2',
    name: '',
    email: '',
    phone: '',
    requests: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (bookingStep === 1) {
      setBookingStep(2);
    } else {
      setIsSubmitting(true);
      try {
        const response = await fetch('https://formspree.io/f/mzdkrzkz', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            _formType: 'Package Booking',
            packageTitle: pkg.title,
            packageLocation: pkg.location,
            totalPrice: Math.round(pkg.price * parseInt(formData.travelers) * 1.1),
            ...formData
          }),
        });
        if (response.ok) {
          alert('Booking request submitted successfully! We will contact you shortly.');
          onClose();
        } else {
          alert('Oops! There was a problem submitting your booking request.');
        }
      } catch (error) {
        alert('Oops! There was a problem submitting your booking request.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto md:overflow-hidden flex flex-col md:flex-row transition-colors duration-300"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-white/50 dark:bg-black/50 hover:bg-white dark:hover:bg-black p-2 rounded-full backdrop-blur-md transition-colors"
          >
            <X className="w-6 h-6 text-gray-800 dark:text-white" />
          </button>

          {/* Left Column - Details */}
          <div className="w-full md:w-2/3 flex flex-col md:overflow-y-auto custom-scrollbar min-h-0">
            <div className="relative h-64 md:h-80 shrink-0">
              <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    {pkg.days} Days
                  </span>
                  <div className="flex items-center gap-1 text-sm bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">
                    <Star className="w-4 h-4 fill-current text-yellow-400" />
                    <span>{pkg.rating} ({pkg.reviews} reviews)</span>
                  </div>
                </div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold mb-2">{pkg.title}</h2>
                <div className="flex items-center gap-2 text-white/80">
                  <MapPin className="w-5 h-5" />
                  <span>{pkg.location}</span>
                </div>
              </div>
            </div>

            <div className="p-6">
              {/* Tabs */}
              <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6 overflow-x-auto">
                {['overview', 'itinerary', 'hotel', 'inclusions'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-3 font-medium text-sm uppercase tracking-wider whitespace-nowrap border-b-2 transition-colors ${
                      activeTab === tab
                        ? 'border-primary text-primary'
                        : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="min-h-[300px]">
                {activeTab === 'overview' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">{pkg.description}</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl">
                        <h4 className="font-semibold text-dark dark:text-white mb-2 flex items-center gap-2">
                          <Check className="w-5 h-5 text-green-500" /> Highlights
                        </h4>
                        <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
                          {pkg.inclusions.slice(0, 3).map((inc: string, i: number) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                              {inc}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl">
                        <h4 className="font-semibold text-dark dark:text-white mb-2 flex items-center gap-2">
                          <Info className="w-5 h-5 text-red-400" /> Not Included
                        </h4>
                        <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
                          {pkg.exclusions.slice(0, 3).map((exc: string, i: number) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-1.5 shrink-0" />
                              {exc}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'itinerary' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                    <div className="relative border-l-2 border-primary/30 ml-3 space-y-8">
                      {pkg.itinerary.map((day: any, i: number) => (
                        <div key={i} className="relative pl-6">
                          <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-primary border-4 border-white dark:border-gray-800 shadow-sm" />
                          <h4 className="font-bold text-dark dark:text-white text-lg mb-1">
                            Day {day.day}: <span className="text-primary">{day.title}</span>
                          </h4>
                          <p className="text-gray-600 dark:text-gray-300">{day.description}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'hotel' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                    <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-2xl border border-gray-100 dark:border-gray-600">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-dark dark:text-white mb-2 flex items-center gap-2">
                            <BedDouble className="w-6 h-6 text-primary" />
                            {pkg.hotel.name}
                          </h3>
                          <div className="flex gap-1">
                            {[...Array(pkg.hotel.rating)].map((_, i) => (
                              <Star key={i} className="w-5 h-5 fill-current text-yellow-400" />
                            ))}
                          </div>
                        </div>
                      </div>
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">Amenities</h4>
                      <div className="flex flex-wrap gap-2">
                        {pkg.hotel.amenities.map((amenity: string, i: number) => (
                          <span key={i} className="bg-white dark:bg-gray-800 px-4 py-2 rounded-full text-sm font-medium text-gray-600 dark:text-gray-300 shadow-sm border border-gray-100 dark:border-gray-700">
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'inclusions' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                    <div>
                      <h3 className="text-xl font-bold text-dark dark:text-white mb-4 border-b dark:border-gray-700 pb-2">What's Included</h3>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {pkg.inclusions.map((inc: string, i: number) => (
                          <li key={i} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                            <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                            <span>{inc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-dark dark:text-white mb-4 border-b dark:border-gray-700 pb-2">What's Excluded</h3>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {pkg.exclusions.map((exc: string, i: number) => (
                          <li key={i} className="flex items-start gap-3 text-gray-500 dark:text-gray-400">
                            <X className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                            <span>{exc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Booking Form */}
          <div className="w-full md:w-1/3 bg-gray-50 dark:bg-gray-900 border-b md:border-b-0 md:border-l border-gray-200 dark:border-gray-700 flex flex-col order-first md:order-last min-h-0 md:overflow-hidden">
            <div className="p-6 pr-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shrink-0">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Price per person</p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-primary">${pkg.price}</span>
                {pkg.originalPrice && (
                  <span className="text-lg text-gray-400 line-through">${pkg.originalPrice}</span>
                )}
              </div>
            </div>

            <div className="p-6 flex-1 md:overflow-y-auto custom-scrollbar min-h-0">
              <h3 className="text-xl font-bold text-dark dark:text-white mb-6">Book this package</h3>
              
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                {bookingStep === 1 ? (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Travel Date</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="date"
                          name="date"
                          required
                          value={formData.date}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Number of Travelers</label>
                      <div className="relative">
                        <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <select
                          name="travelers"
                          value={formData.travelers}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                        >
                          {[1, 2, 3, 4, 5, 6].map(num => (
                            <option key={num} value={num}>{num} {num === 1 ? 'Person' : 'People'}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700 mt-6">
                      <div className="flex justify-between text-gray-600 dark:text-gray-300 mb-2">
                        <span>${pkg.price} x {formData.travelers}</span>
                        <span>${pkg.price * parseInt(formData.travelers)}</span>
                      </div>
                      <div className="flex justify-between text-gray-600 dark:text-gray-300 mb-4">
                        <span>Taxes & Fees</span>
                        <span>${Math.round(pkg.price * parseInt(formData.travelers) * 0.1)}</span>
                      </div>
                      <div className="flex justify-between text-xl font-bold text-dark dark:text-white">
                        <span>Total</span>
                        <span>${Math.round(pkg.price * parseInt(formData.travelers) * 1.1)}</span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary-hover text-white py-4 rounded-xl font-bold text-lg transition-colors mt-6 shadow-lg shadow-primary/30"
                    >
                      Continue to Details
                    </button>
                  </motion.div>
                ) : (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                    <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-xl mb-6 text-sm space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500 dark:text-gray-400">Date</span>
                        <span className="font-medium text-dark dark:text-white">{formData.date || 'Not selected'}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500 dark:text-gray-400">Travelers</span>
                        <span className="font-medium text-dark dark:text-white">{formData.travelers}</span>
                      </div>
                      <div className="flex justify-between items-center pt-3 border-t border-gray-200 dark:border-gray-600">
                        <span className="font-semibold text-dark dark:text-white">Total</span>
                        <span className="font-bold text-primary text-base">${Math.round(pkg.price * parseInt(formData.travelers) * 1.1)}</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder="+1 (555) 000-0000"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Special Requests (Optional)</label>
                      <textarea
                        name="requests"
                        rows={3}
                        placeholder="Dietary requirements, accessibility needs..."
                        value={formData.requests}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none"
                      />
                    </div>

                    <div className="flex gap-3 mt-6">
                      <button
                        type="button"
                        onClick={() => setBookingStep(1)}
                        className="w-1/3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white py-4 rounded-xl font-medium transition-colors"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-2/3 bg-primary hover:bg-primary-hover text-white py-4 rounded-xl font-bold transition-colors shadow-lg shadow-primary/30 disabled:opacity-70"
                      >
                        {isSubmitting ? 'Booking...' : 'Book Now'}
                      </button>
                    </div>
                  </motion.div>
                )}
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
