/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Plus, Check, Eye, MoveRight } from 'lucide-react';
import { FEATURED_COLLECTIONS, PRODUCTS } from '../data';
import { Product } from '../types';

interface FeaturedCollectionProps {
  onAddToCart: (product: Product, size: string) => void;
  onOpenProductModal: (product: Product) => void;
}

export default function FeaturedCollection({ onAddToCart, onOpenProductModal }: FeaturedCollectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});
  const [addedProductIds, setAddedProductIds] = useState<Record<string, boolean>>({});

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % FEATURED_COLLECTIONS.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + FEATURED_COLLECTIONS.length) % FEATURED_COLLECTIONS.length);
  };

  const handleSizeSelect = (productId: string, size: string) => {
    setSelectedSizes((prev) => ({ ...prev, [productId]: size }));
  };

  const handleAddAction = (product: Product) => {
    const size = selectedSizes[product.id] || product.sizes[0];
    onAddToCart(product, size);

    setAddedProductIds((prev) => ({ ...prev, [`${product.id}-${size}`]: true }));
    setTimeout(() => {
      setAddedProductIds((prev) => ({ ...prev, [`${product.id}-${size}`]: false }));
    }, 1800);
  };

  const activeCollection = FEATURED_COLLECTIONS[activeIndex];

  return (
    <section
      id="featured"
      className="relative w-full py-24 lg:py-32 bg-[#0c0c0c] border-b border-white/[0.03] overflow-hidden"
    >
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <div id="featured-top-layout" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center lg:items-stretch relative min-h-[60vh] md:min-h-[75vh]">
          <div
            id="featured-left-sidebar"
            className="lg:col-span-3 flex flex-row lg:flex-col items-center lg:items-start justify-between lg:justify-center h-full py-4 space-y-0 lg:space-y-12 z-20"
          >
            <div className="flex items-center lg:items-start lg:flex-col space-x-3 lg:space-x-0 lg:space-y-3 uppercase leading-none">
              <span className="font-mono text-[10px] tracking-[0.35em] text-[#8c8275] block">02 / 05</span>
              <span className="font-serif text-2xl tracking-[0.15em] text-[#e5e0db]/90 block">SS24 CAMPAIGN</span>
              <span className="font-mono text-[9px] tracking-[0.3em] text-zinc-500 block">SARTORIAL LAB</span>
            </div>

            <div className="font-mono text-sm tracking-[0.3em] text-[#8c8275]">
              <span className="text-[#e5e0db] font-semibold text-base">{(activeIndex + 1).toString().padStart(2, '0')}</span>
              <span className="opacity-40"> / </span>
              <span>{FEATURED_COLLECTIONS.length.toString().padStart(2, '0')}</span>
            </div>
          </div>

          <div
            id="featured-huge-logo-bg"
            className="absolute inset-y-0 left-0 lg:left-[5vw] w-full lg:w-auto flex items-center justify-center pointer-events-none select-none z-10"
          >
            <div className="text-center lg:text-left leading-none font-serif text-[28vw] lg:text-[22vw] font-medium text-white/[0.015] text-stroke-thin tracking-[0.05em]">
              SS <br className="hidden lg:block" /> 24
            </div>
          </div>

          <div id="featured-carousel-viewer" className="lg:col-span-6 flex justify-center items-center z-20 relative px-10">
            <div className="relative w-full max-w-[480px] aspect-[4/5] bg-neutral-900 border border-white/[0.04] overflow-hidden group shadow-2xl rounded">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCollection.id}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 w-full h-full flex flex-col justify-end"
                >
                  <img
                    src={activeCollection.imageUrl}
                    alt={activeCollection.title}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover grayscale brightness-[0.55] group-hover:scale-105 group-hover:grayscale-0 group-hover:brightness-[0.70] transition-all duration-[1200ms]"
                    referrerPolicy="no-referrer"
                  />

                  <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />

                  <div className="p-6 md:p-8 text-left z-20 space-y-4">
                    <span className="font-mono text-[9px] tracking-[0.3em] text-[#8c8275]">
                      {activeCollection.year} // CHRONO ARCHIVE
                    </span>

                    <h3 className="font-serif text-xl md:text-2xl tracking-widest font-light text-[#e5e0db]">
                      {activeCollection.title}
                    </h3>

                    <p className="font-sans text-xs text-[#e5e0db]/60 leading-relaxed tracking-wide font-light max-w-[340px]">
                      {activeCollection.description}
                    </p>

                    <div className="pt-2">
                      <button
                        onClick={() => {
                          const targetObj = PRODUCTS.find((p) => p.category.toLowerCase() === activeCollection.title.split(' ')[0].toLowerCase()) || PRODUCTS[0];
                          onOpenProductModal(targetObj);
                        }}
                        className="group flex items-center space-x-2 font-mono text-[10px] tracking-[0.25em] text-[#8c8275] hover:text-[#e5e0db] transition-colors"
                      >
                        <span>VIEW CAMPAIGN PIECES</span>
                        <MoveRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <button
              id="carousel-prev-button"
              onClick={handlePrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full border border-white/10 bg-black/90 hover:bg-[#8c8275] hover:border-[#8c8275] text-[#e5e0db] hover:text-[#121212] flex items-center justify-center transition-all shadow-lg text-lg"
              aria-label="Previous Slide"
            >
              <ChevronLeft strokeWidth={1.5} className="w-5 h-5" />
            </button>
            <button
              id="carousel-next-button"
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full border border-white/10 bg-black/90 hover:bg-[#8c8275] hover:border-[#8c8275] text-[#e5e0db] hover:text-[#121212] flex items-center justify-center transition-all shadow-lg text-lg"
              aria-label="Next Slide"
            >
              <ChevronRight strokeWidth={1.5} className="w-5 h-5" />
            </button>
          </div>

          <div
            id="featured-right-sidebar"
            className="lg:col-span-3 flex flex-col justify-center items-start lg:items-end text-left lg:text-right h-full py-4 z-20 space-y-6 lg:space-y-0"
          >
            <div className="space-y-4 lg:max-w-[280px]">
              <span className="font-mono text-[10px] tracking-widest text-[#8c8275] uppercase block">ATELIER PHILOSOPHY</span>
              <p className="font-sans text-[13px] text-[#e5e0db]/60 leading-relaxed font-light tracking-wide">
                Our silhouettes do not compromise. We construct outfits that act as protective shells, carving their own presence into the atmosphere. Mute tones, physical integrity, structured collars.
              </p>
              <div className="h-[1px] w-20 bg-[#8c8275]/30 lg:ml-auto" />
            </div>
          </div>
        </div>

        <div id="featured-wardrobe-showcase" className="mt-28 pt-20 border-t border-white/[0.04] space-y-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div className="space-y-2 text-left">
              <span className="font-mono text-[9px] tracking-[0.3em] text-[#8c8275]">THE HARDWARE BLUEPRINT</span>
              <h2 className="font-serif text-2xl md:text-3xl tracking-widest font-light text-[#e5e0db]">
                AVAILABLE PIECES
              </h2>
            </div>

            <p className="font-mono text-[10px] tracking-widest text-[#8c8275] max-w-[280px] leading-relaxed text-left md:text-right">
              Numbered campaign releases. Limited weave runs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRODUCTS.map((prod) => {
              const activeSize = selectedSizes[prod.id] || prod.sizes[0];
              const isAdded = addedProductIds[`${prod.id}-${activeSize}`];

              return (
                <div
                  key={prod.id}
                  id={`product-card-${prod.id}`}
                  className="group flex flex-col justify-between bg-zinc-950/20 border border-white/[0.03] p-4 hover:border-[#8c8275]/35 hover:bg-zinc-950/50 hover:shadow-[0_15px_30px_rgba(140,130,117,0.08)] transition-all duration-700 ease-out rounded-lg"
                >
                  <div className="relative aspect-[3/4] bg-neutral-900 border border-white/5 overflow-hidden mb-6 flex items-center justify-center rounded">
                    <img
                      src={prod.imageUrl}
                      alt={prod.name}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-95 group-hover:scale-105 transition-all duration-700 ease-out"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-3 z-10">
                      <button
                        onClick={() => onOpenProductModal(prod)}
                        className="p-3 bg-[#121212] rounded-full text-[#e5e0db] hover:bg-[#8c8275] hover:text-[#121212] border border-white/10 transition-colors"
                        title="View Detailed Blueprint"
                      >
                        <Eye strokeWidth={1.5} className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4 text-left">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <h4 className="font-serif text-lg tracking-wide text-[#e5e0db] font-medium leading-snug">
                          {prod.name}
                        </h4>
                        <span className="font-mono text-[10px] tracking-widest text-[#8c8275]">
                          {prod.numericalId} // {prod.category}
                        </span>
                      </div>
                      <span className="font-mono text-sm text-[#e5e0db] font-medium shrink-0 bg-white/[0.02] px-2.5 py-1 border border-white/[0.05]">
                        {prod.price}
                      </span>
                    </div>

                    <p className="font-sans text-xs text-[#e5e0db]/50 font-light leading-relaxed">
                      {prod.description}
                    </p>

                    <div className="space-y-1.5">
                      <span className="font-mono text-[9px] tracking-wider text-zinc-500 uppercase">
                        CHOOSE SIZE PROFILE
                      </span>
                      <div className="flex flex-wrap gap-1.5 h-8">
                        {prod.sizes.map((sz) => (
                          <button
                            key={sz}
                            id={`sz-select-${prod.id}-${sz}`}
                            onClick={() => handleSizeSelect(prod.id, sz)}
                            className={`font-mono text-[10px] w-8 h-7 flex items-center justify-center border transition-all ${
                              activeSize === sz
                                ? 'bg-[#8c8275] border-[#8c8275] text-[#121212] font-semibold'
                                : 'bg-transparent border-white/10 text-zinc-400 hover:border-white/30'
                            }`}
                          >
                            {sz}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      id={`add-bag-button-${prod.id}`}
                      onClick={() => handleAddAction(prod)}
                      className={`w-full py-3 mt-2 font-mono text-[10px] tracking-[0.2em] transition-all flex items-center justify-center space-x-2 ${
                        isAdded
                          ? 'bg-[#e5e0db] text-[#121212] font-semibold'
                          : 'bg-transparent border border-[#8c8275]/50 hover:border-[#8c8275] text-[#8c8275] hover:bg-[#8c8275]/5'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>ADDED TO BAG</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>ADD TO SARTORIAL BAG</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
