/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, ArrowRight, CornerDownRight, CheckCircle2, ShieldCheck, Instagram, Twitter, MapPin } from 'lucide-react';

export default function ReservationCTA() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    location: 'London Outpost',
    fittingDate: '',
    interest: 'Bespoke Trench Tailoring'
  });

  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.fittingDate) {
      alert('Please fill in all requested fields to configure our tailoring queue.');
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setBookingSuccess(true);
    }, 1200);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section
      id="showroom"
      className="relative w-full py-24 lg:py-32 bg-[#090a0a] border-t border-white/[0.03] overflow-hidden"
    >
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 relative z-25">
        <div id="showroom-header" className="max-w-2xl mx-auto text-center space-y-4 mb-16">
          <span className="font-mono text-[9px] tracking-[0.35em] text-[#8c8275] uppercase">
            04 / 05 â€¢ ATELIER ACCREDITATION
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-light tracking-wide text-[#e5e0db]">
            OUTPOST SHOWROOM <br />
            <span className="italic font-normal text-[#8c8275]">PRIVATE SCHEDULING</span>
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#e5e0db]/50 max-w-[500px] mx-auto leading-relaxed">
            Configure an individual fitting time block. Our London, Paris, and Tokyo ateliers host private wardrobe reviews with full measurements matching.
          </p>
        </div>

        <div id="showroom-body" className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-start max-w-6xl mx-auto">
          <div className="lg:col-span-7 bg-[#121212]/40 border border-white/[0.04] p-8 md:p-10 shadow-2xl relative">
            <AnimatePresence mode="wait">
              {!bookingSuccess ? (
                <motion.form
                  key="showroom-booking-form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6 text-left"
                >
                  <p className="font-mono text-[10px] tracking-widest text-[#8c8275] border-b border-white/5 pb-3">
                    TAILORING REQUEST FORM
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="font-mono text-[9px] tracking-widest text-zinc-500 uppercase flex items-center space-x-1">
                        <CornerDownRight className="w-3 h-3 text-[#8c8275]" />
                        <span>Sartorial Name</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g., Alexander Vance"
                        className="w-full bg-[#161616] border border-white/10 px-4 py-3 text-sm text-[#e5e0db] placeholder-zinc-700 focus:outline-none focus:border-[#8c8275] focus:ring-1 focus:ring-[#8c8275] transition-all font-sans"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-mono text-[9px] tracking-widest text-zinc-500 uppercase flex items-center space-x-1">
                        <CornerDownRight className="w-3 h-3 text-[#8c8275]" />
                        <span>Digital Mail</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g., alex@domain.com"
                        className="w-full bg-[#161616] border border-white/10 px-4 py-3 text-sm text-[#e5e0db] placeholder-zinc-700 focus:outline-none focus:border-[#8c8275] focus:ring-1 focus:ring-[#8c8275] transition-all font-sans"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="font-mono text-[9px] tracking-widest text-zinc-500 uppercase flex items-center space-x-1">
                        <CornerDownRight className="w-3 h-3 text-[#8c8275]" />
                        <span>Outpost Atelier</span>
                      </label>
                      <select
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="w-full bg-[#161616] border border-white/10 px-4 py-3 text-sm text-[#e5e0db] focus:outline-none focus:border-[#8c8275] focus:ring-1 focus:ring-[#8c8275] transition-all font-mono tracking-wide"
                      >
                        <option value="London Outpost">London (94 Sartorial St)</option>
                        <option value="Paris Atelier">Paris (14 Rue de L'Arc)</option>
                        <option value="Tokyo Outpost">Tokyo (Minami-Aoyama Lab)</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-mono text-[9px] tracking-widest text-zinc-500 uppercase flex items-center space-x-1">
                        <CornerDownRight className="w-3 h-3 text-[#8c8275]" />
                        <span>Preferred Date</span>
                      </label>
                      <input
                        type="date"
                        name="fittingDate"
                        value={formData.fittingDate}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-[#161616] border border-white/10 px-4 py-3 text-sm text-[#e5e0db] focus:outline-none focus:border-[#8c8275] focus:ring-1 focus:ring-[#8c8275] transition-all font-mono"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-mono text-[9px] tracking-widest text-zinc-500 uppercase flex items-center space-x-1">
                      <CornerDownRight className="w-3 h-3 text-[#8c8275]" />
                      <span>Primary Silhouette of Interest</span>
                    </label>
                    <select
                      name="interest"
                      value={formData.interest}
                      onChange={handleInputChange}
                      className="w-full bg-[#161616] border border-white/10 px-4 py-3 text-sm text-[#e5e0db] focus:outline-none focus:border-[#8c8275] focus:ring-1 focus:ring-[#8c8275] transition-all font-mono tracking-wide"
                    >
                      <option value="Bespoke Trench Tailoring">Nocturne Capsule Outerwear Collection</option>
                      <option value="Fine Knitwear Stitching">White Knitted Studio Pieces</option>
                      <option value="Sartorial Triple-Pleated Pants">Modern Trousers Measure Mapping</option>
                      <option value="Solid Sterling Silver Adornments">Sterling Silver Geometric Accessories</option>
                    </select>
                  </div>

                  <div className="pt-4">
                    <button
                      id="submit-showroom-booking-button"
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-[#8c8275] hover:bg-[#e5e0db] text-[#121212] font-mono text-xs font-semibold tracking-[0.2em] py-4 transition-all flex items-center justify-center space-x-2"
                    >
                      {submitting ? (
                        <span>PROCESSING PROTOCOLS...</span>
                      ) : (
                        <>
                          <span>REQUEST RESERVATION CONCIERGE</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>

                  <div className="flex items-start space-x-2 pt-2 text-zinc-500">
                    <ShieldCheck strokeWidth={1} className="w-4 h-4 text-[#8c8275] mt-0.5 shrink-0" />
                    <p className="font-mono text-[9px] text-left leading-normal">
                      Submission registers an entry in our tailoring database. Concierge replies within 24 hours. Confidentiality secured.
                    </p>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="showroom-booking-success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="py-16 text-center space-y-6 flex flex-col items-center justify-center"
                >
                  <div className="w-16 h-16 rounded-full bg-[#8c8275]/10 border border-[#8c8275]/30 flex items-center justify-center text-[#8c8275]">
                    <CheckCircle2 strokeWidth={1} className="w-8 h-8" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-serif text-2xl tracking-wide text-[#e5e0db]">RESERVATION SECURED</h3>
                    <p className="font-mono text-[10px] tracking-widest text-[#8c8275]">CODE ID: RES-2026-VAL</p>
                  </div>

                  <div className="max-w-[400px] font-sans text-xs text-[#e5e0db]/60 leading-relaxed font-light">
                    Hello <span className="font-medium text-[#e5e0db]">{formData.fullName}</span>, we have successfully booked your slot for <span className="font-medium text-[#e5e0db]">{formData.fittingDate}</span> at the <span className="font-medium text-[#e5e0db]">{formData.location}</span>. A tailored confirmation containing measurements guidelines is dispatched to <span className="font-medium text-emerald-400 break-all">{formData.email}</span>.
                  </div>

                  <button
                    id="showroom-book-another-button"
                    onClick={() => setBookingSuccess(false)}
                    className="font-mono text-[10px] tracking-widest text-[#8c8275] border border-white/10 hover:border-white/30 px-6 py-2 hover:bg-white/5 transition-all"
                  >
                    REGISTER ANOTHER SLOT
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div id="showroom-outposts" className="lg:col-span-5 text-left space-y-12 lg:pl-6">
            <div className="space-y-4">
              <span className="font-mono text-[10px] tracking-[0.25em] text-[#8c8275] block">
                PHYSICAL OUTPOSTS
              </span>
              <p className="font-sans text-xs text-[#e5e0db]/50 leading-relaxed font-light">
                Our continuous outposts represent concrete manifestations of physical geometries. Stop by to view live collections or consult tailoring specialists directly.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex space-x-4 border-b border-white/[0.03] pb-4">
                <MapPin strokeWidth={1} className="w-5 h-5 text-[#8c8275] mt-1" />
                <div className="space-y-1">
                  <h4 className="font-serif text-md tracking-wider text-[#e5e0db]">LONDON SHOWROOM</h4>
                  <p className="font-sans text-xs text-[#e5e0db]/55 font-light">94 SARTORIAL STREET, SHOREDITCH</p>
                  <p className="font-mono text-[9px] text-zinc-500 tracking-wider">HRS: 10:00 â€“ 19:00 // TUE â€“ SUN</p>
                </div>
              </div>

              <div className="flex space-x-4 border-b border-white/[0.03] pb-4">
                <MapPin strokeWidth={1} className="w-5 h-5 text-[#8c8275] mt-1" />
                <div className="space-y-1">
                  <h4 className="font-serif text-md tracking-wider text-[#e5e0db]">PARIS ATELIER</h4>
                  <p className="font-sans text-xs text-[#e5e0db]/55 font-light">14 RUE DE L'ARC DE TRIOMPHE, PARIS</p>
                  <p className="font-mono text-[9px] text-zinc-500 tracking-wider">HRS: 09:30 â€“ 18:00 // MON â€“ FRI</p>
                </div>
              </div>

              <div className="flex space-x-4">
                <MapPin strokeWidth={1} className="w-5 h-5 text-[#8c8275] mt-1" />
                <div className="space-y-1">
                  <h4 className="font-serif text-md tracking-wider text-[#e5e0db]">TOKYO LAB</h4>
                  <p className="font-sans text-xs text-[#e5e0db]/55 font-light">3-14 MINAMI-AOYAMA, MINATO, TOKYO</p>
                  <p className="font-mono text-[9px] text-zinc-500 tracking-wider">HRS: 11:00 â€“ 20:00 // TUE â€“ SUN</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="showroom-footer" className="mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] font-mono tracking-[0.25em] text-zinc-500 gap-6">
          <div className="flex space-x-2">
            <span>Â© 2026 VALENZA DESIGN LAB.</span>
            <span className="hidden sm:inline">ALL CORES RECONSTRUCTED.</span>
          </div>

          <div className="flex space-x-8 items-center text-zinc-500">
            <a href="https://instagram.com" target="_blank" className="hover:text-[#e5e0db] transition-colors flex items-center space-x-1.5 py-1">
              <Instagram className="w-3.5 h-3.5" />
              <span className="hidden md:inline">INSTAGRAM</span>
            </a>
            <a href="https://twitter.com" target="_blank" className="hover:text-[#e5e0db] transition-colors flex items-center space-x-1.5 py-1">
              <Twitter className="w-3.5 h-3.5" />
              <span className="hidden md:inline">X CHANNEL</span>
            </a>
            <a href="mailto:concierge@valenza.com" className="hover:text-[#e5e0db] transition-colors flex items-center space-x-1.5 py-1">
              <Mail className="w-3.5 h-3.5" />
              <span className="hidden md:inline">MAIL CONCIERGE</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
