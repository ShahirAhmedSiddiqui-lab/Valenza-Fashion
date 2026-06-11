/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowUpRight, History, Shield, Compass, Cpu } from 'lucide-react';
import { IMAGES } from '../data';

export default function PhilosophySection() {
  const [isJourneyOpen, setIsJourneyOpen] = useState(false);

  return (
    <section
      id="philosophy"
      className="relative w-full py-24 lg:py-32 bg-[#0a0a0a] border-b border-white/[0.03] overflow-hidden"
    >
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-center">
        <motion.div
          id="philosophy-text-block"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 space-y-8 text-left"
        >
          <div className="space-y-3">
            <span className="font-mono text-[10px] tracking-[0.3em] text-[#8c8275]">03 / 05 â€¢ OUR MANIFESTO</span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light tracking-wide text-[#e5e0db]/95 leading-[1.15]">
              FASHION IS TEMPORARY. <br />
              <span className="font-medium italic text-[#8c8275]">IMPACT IS NOT.</span>
            </h2>
          </div>

          <p className="font-sans text-[15px] text-[#e5e0db]/60 leading-relaxed font-light tracking-wide max-w-[450px]">
            We design with intention. Every single piece is a physical statement of who you are and what you stand for. No ephemeral trends. Just persistent sculptural design cut for structural longevity.
          </p>

          <div className="pt-4 flex flex-col items-start">
            <button
              id="philosophy-read-journey"
              onClick={() => setIsJourneyOpen(true)}
              className="group flex items-center space-x-2 border-b border-[#e5e0db]/20 pb-1.5 font-mono text-xs tracking-[0.18em] text-[#e5e0db] hover:border-[#e5e0db] transition-colors"
            >
              <span>READ OUR JOURNEY</span>
              <ArrowUpRight strokeWidth={1} className="w-4 h-4 text-[#8c8275] group-hover:text-[#e5e0db] transition-colors" />
            </button>
          </div>
        </motion.div>

        <motion.div
          id="philosophy-film-trigger-wrapper"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 flex justify-center lg:justify-end"
        >
          <div
            id="philosophy-film-card"
            onClick={() => setIsJourneyOpen(true)}
            className="group relative w-full max-w-[750px] aspect-[16/10] sm:aspect-[16/9] bg-neutral-900 border border-white/[0.05] overflow-hidden flex items-center justify-center cursor-pointer shadow-2xl rounded"
          >
            <img
              src={IMAGES.filmThumbnail}
              alt="Valenza Philosophy Brand Art"
              className="absolute inset-0 w-full h-full object-cover grayscale brightness-[0.55] group-hover:scale-105 group-hover:grayscale-0 group-hover:brightness-[0.75] transition-all duration-[1200ms] ease-out"
              referrerPolicy="no-referrer"
            />

            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/85 via-transparent to-transparent z-10" />
            <div className="absolute inset-0 bg-[#8c8275]/5 mix-blend-color opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="relative z-20 pointer-events-none text-center p-6 flex flex-col items-center justify-center h-full">
              <div className="w-14 h-14 rounded-full border border-[#8c8275]/40 flex items-center justify-center bg-black/60 backdrop-blur-md group-hover:bg-[#8c8275] group-hover:border-[#8c8275] transition-all duration-350 shadow-xl group-hover:scale-[1.08]">
                <ArrowUpRight className="w-5 h-5 text-[#e5e0db] group-hover:text-black transition-colors" />
              </div>
              <p className="mt-4 font-mono text-[9px] tracking-[0.25em] text-[#e5e0db]/65 group-hover:text-[#e5e0db] transition-colors">
                EXPLORE ATELIER HISTORIES
              </p>
            </div>

            <div className="absolute bottom-6 left-6 z-15 text-left flex items-center space-x-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#8c8275]" />
              <span className="font-mono text-[9px] tracking-widest text-[#e5e0db]/70">
                SS24 // ATELIER JOURNAL ARCHIVE
              </span>
            </div>

            <div className="absolute bottom-6 right-6 z-15 font-mono text-[9px] tracking-widest text-zinc-500 hidden sm:block">
              FIG. 03 // BEYOND TIME
            </div>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {isJourneyOpen && (
          <motion.div
            id="philosophy-journey-theatre-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsJourneyOpen(false)}
            className="fixed inset-0 z-50 bg-[#060606]/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 15 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl bg-[#0d0d0d] border border-white/[0.08] shadow-2xl rounded overflow-hidden grid grid-cols-1 md:grid-cols-12 max-h-[90vh] md:max-h-[85vh] text-[#e5e0db]"
            >
              <div className="md:col-span-5 relative bg-zinc-900 border-r border-white/[0.04] hidden md:flex flex-col justify-between p-10 min-h-[400px]">
                <img
                  src={IMAGES.filmThumbnail}
                  alt="Valenza Workshop Portrait"
                  className="absolute inset-0 w-full h-full object-cover grayscale brightness-[0.35]"
                  referrerPolicy="no-referrer"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/10 z-10" />

                <div className="relative z-20 space-y-1.5">
                  <span className="font-mono text-[9px] tracking-[0.35em] text-[#8c8275] block">VALENZA BRAND LAB</span>
                  <span className="font-serif text-lg tracking-[0.2em] uppercase text-[#e5e0db]/90 font-light block">LONDON ATELIER</span>
                </div>

                <div className="relative z-20 space-y-4">
                  <div className="h-[1px] w-12 bg-[#8c8275]" />
                  <p className="font-serif text-lg italic tracking-wide text-[#e5e0db]/80 leading-relaxed">
                    "Clothing is the architecture of the body, crafted to respond to continuous utility."
                  </p>
                  <p className="font-mono text-[8px] tracking-widest text-[#8c8275]">
                    â€” ATELIER BLUEPRINT
                  </p>
                </div>
              </div>

              <div className="col-span-12 md:col-span-7 flex flex-col justify-between max-h-[90vh] md:max-h-[85vh]">
                <div className="overflow-y-auto px-6 py-10 sm:p-12 space-y-8 flex-1 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
                  <div className="space-y-2 border-b border-white/[0.05] pb-6">
                    <span className="font-mono text-[9px] tracking-[0.3em] text-[#8c8275] block">COMPANY MANIFESTO & HISTORY</span>
                    <h3 className="font-serif text-3xl tracking-widest font-light text-white">OUR JOURNEY</h3>
                    <p className="font-sans text-xs text-[#e5e0db]/50 tracking-wider">
                      Established in London, sourcing globally, detailing meticulously.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2 text-left">
                      <div className="flex items-center space-x-3">
                        <div className="p-1.5 rounded bg-zinc-900 border border-white/5 text-[#8c8275]">
                          <History className="w-3.5 h-3.5" />
                        </div>
                        <h4 className="font-mono text-[10px] tracking-widest uppercase text-[#e5e0db]">01 / THE BIRTH OF AN ATELIER</h4>
                      </div>
                      <p className="font-sans text-[13px] text-[#e5e0db]/65 leading-relaxed font-light tracking-wide pl-8">
                        VALENZA began in London as a collaborative design lab combining material science, structural engineering, and traditional modernist tailoring. We reject ephemeral trends in favor of slow, numbered capsule designs that stand as architectural expressions of style.
                      </p>
                    </div>

                    <div className="space-y-2 text-left">
                      <div className="flex items-center space-x-3">
                        <div className="p-1.5 rounded bg-zinc-900 border border-white/5 text-[#8c8275]">
                          <Compass className="w-3.5 h-3.5" />
                        </div>
                        <h4 className="font-mono text-[10px] tracking-widest uppercase text-[#e5e0db]">02 / TRACEABLE SOURCING & FIBERS</h4>
                      </div>
                      <p className="font-sans text-[13px] text-[#e5e0db]/65 leading-relaxed font-light tracking-wide pl-8">
                        Every single textile is custom-woven in limited runs. We partner directly with family-run mills in Biella, Italy and the Outer Hebrides of Scotland. Our high-micron raw wools, organic silks, and organic alpaca are processed to preserve original texture while offering comfortable, continuous daily utility.
                      </p>
                    </div>

                    <div className="space-y-2 text-left">
                      <div className="flex items-center space-x-3">
                        <div className="p-1.5 rounded bg-zinc-900 border border-white/5 text-[#8c8275]">
                          <Shield className="w-3.5 h-3.5" />
                        </div>
                        <h4 className="font-mono text-[10px] tracking-widest uppercase text-[#e5e0db]">03 / THE CAPSULE INTEGRITY</h4>
                      </div>
                      <p className="font-sans text-[13px] text-[#e5e0db]/65 leading-relaxed font-light tracking-wide pl-8">
                        We produce items in batches of strictly 100 numbered pieces. When raw materials are exhausted, the silhouette is moved into the historical chronos archive. This zero-compromise approach preserves the uniqueness of every piece and honors the resources used in production.
                      </p>
                    </div>

                    <div className="space-y-2 text-left">
                      <div className="flex items-center space-x-3">
                        <div className="p-1.5 rounded bg-zinc-900 border border-white/5 text-[#8c8275]">
                          <Cpu className="w-3.5 h-3.5" />
                        </div>
                        <h4 className="font-mono text-[10px] tracking-widest uppercase text-[#e5e0db]">04 / KINETIC STRUCTURE & FINISH</h4>
                      </div>
                      <p className="font-sans text-[13px] text-[#e5e0db]/65 leading-relaxed font-light tracking-wide pl-8">
                        Each garment's layout represents honesty in construction. We deliberately leave hemlines raw and pair them with hand-taped, reinforced double seams. This structural play lets the fabric age organically and wear in unique lines personal to your daily movement.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 border-t border-white/[0.05] pt-6 text-left font-mono text-[10px]">
                    <div className="space-y-1">
                      <span className="text-[#8c8275] block">FOUNDATION:</span>
                      <span className="text-white">LONDON ATELIER 2024</span>
                    </div>
                    <div className="space-y-1 col-span-1">
                      <span className="text-[#8c8275] block">CAPSULE CAP:</span>
                      <span className="text-white">100 PIECES (GLOBAL)</span>
                    </div>
                  </div>
                </div>

                <div className="sticky bottom-0 border-t border-white/[0.05] bg-[#0d0d0d] p-6 flex justify-between items-center z-20">
                  <span className="font-mono text-[9px] tracking-wider text-zinc-500">
                    VALENZA CO. ALL SHAPES ARCHIVED
                  </span>
                  <button
                    onClick={() => setIsJourneyOpen(false)}
                    className="bg-white text-black hover:bg-[#8c8275] hover:text-black border border-transparent font-mono text-[10px] font-semibold tracking-widest px-6 py-2.5 rounded transition-all"
                  >
                    CLOSE DIRECTORY
                  </button>
                </div>
              </div>

              <button
                onClick={() => setIsJourneyOpen(false)}
                className="absolute top-4 right-4 z-30 p-2.5 rounded-full border border-white/5 bg-zinc-950 hover:bg-[#8c8275] hover:text-black text-[#e5e0db] transition-colors"
                aria-label="Close Journey"
              >
                <X strokeWidth={1.5} className="w-4 h-4" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
