/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { CATEGORIES } from '../data';
import { Product } from '../types';

interface CategoriesSectionProps {
  onScrollToSection: (id: string) => void;
  onOpenProductModal: (product: Product) => void;
}

export default function CategoriesSection({ onScrollToSection, onOpenProductModal }: CategoriesSectionProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section
      id="categories"
      className="relative w-full py-24 lg:py-32 bg-[#0c0c0c] border-b border-white/[0.03]"
    >
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <div id="categories-header" className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3">
            <span className="font-mono text-[10px] tracking-[0.3em] text-[#8c8275]">02 / 05 â€¢ ARCHITECTURAL SECTIONS</span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light tracking-wider text-[#e5e0db]">
              CAMPAIGN WARDROBE
            </h2>
          </div>
          <p className="font-mono text-xs text-[#e5e0db]/55 tracking-wider max-w-[380px] leading-relaxed text-left md:text-right">
            Garments crafted under strict sculptural guidelines. Explore each department and find items matching your sartorial purpose.
          </p>
        </div>

        <motion.div
          id="categories-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10% 0px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {CATEGORIES.map((cat) => (
            <motion.div
              key={cat.id}
              id={`category-card-${cat.id}`}
              variants={itemVariants}
              className="group relative h-[65vh] md:h-[60vh] lg:h-[70vh] bg-zinc-950 border border-white/[0.04] hover:border-[#8c8275]/30 transition-all duration-700 ease-out flex flex-col justify-end cursor-pointer rounded hover:shadow-[0_15px_40px_rgba(140,130,117,0.12)]"
              onClick={() => {
                onScrollToSection('featured');
              }}
            >
              <div className="absolute inset-0 w-full h-full z-0 bg-neutral-950 overflow-hidden">
                <img
                  src={cat.imageUrl}
                  alt={cat.name}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-all duration-1000 ease-out grayscale brightness-[0.55] group-hover:scale-105 group-hover:grayscale-0 group-hover:brightness-[0.8]"
                  referrerPolicy="no-referrer"
                />

                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/95 via-black/40 to-transparent transition-opacity duration-500 z-1" />
                <div className="absolute inset-0 bg-[#0c0c0c]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-1" />
              </div>

              <div className="relative z-10 p-6 md:p-8 flex flex-col justify-between h-full w-full">
                <div className="flex justify-between items-start">
                  <span className="font-mono text-xs tracking-wider text-[#8c8275]">{cat.num} /</span>

                  <div className="w-8 h-8 rounded-full border border-white/10 group-hover:bg-[#e5e0db] group-hover:text-[#121212] group-hover:border-[#e5e0db] flex items-center justify-center transition-all duration-500 opacity-60 group-hover:opacity-100">
                    <ArrowUpRight strokeWidth={1} className="w-4 h-4" />
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-serif text-xl md:text-2xl tracking-[0.15em] font-medium text-[#e5e0db]/90 group-hover:text-[#e5e0db] transition-colors uppercase">
                    {cat.name}
                  </h3>

                  <div className="h-0 overflow-hidden group-hover:h-auto opacity-0 group-hover:opacity-100 transition-all duration-1000 ease-in-out">
                    <p className="font-sans text-xs tracking-wide text-[#e5e0db]/60 leading-relaxed text-left pt-2 border-t border-white/5">
                      {cat.description}
                    </p>
                    <span className="inline-block mt-4 font-mono text-[9px] tracking-widest text-[#8c8275] hover:text-[#e5e0db]">
                      VIEW PIECES • EXPLORE NOW
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-16 border-t border-white/[0.04] pt-8 flex flex-col md:flex-row justify-between items-start md:items-center text-[#e5e0db]/40 text-xs font-mono tracking-widest gap-4">
          <p>VALENZA SARTORIAL INC. • ESTABLISHED 2026</p>
          <div className="flex space-x-6">
            <span>TOKYO OUTPOST</span>
            <span>PARIS LAB</span>
            <span>LONDON OUTPOST</span>
          </div>
        </div>
      </div>
    </section>
  );
}
