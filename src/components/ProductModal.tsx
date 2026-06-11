/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, ShoppingBag, Plus, Sparkles, HelpCircle } from 'lucide-react';
import { Product } from '../types';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: string) => void;
}

export default function ProductModal({ product, onClose, onAddToCart }: ProductModalProps) {
  const [selectedSize, setSelectedSize] = useState('');
  const [added, setAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  // Initialize selected size if empty
  const activeSize = selectedSize || product.sizes[0];

  const handleAdd = () => {
    for (let i = 0; i < quantity; i++) {
      onAddToCart(product, activeSize);
    }
    
    // Animate feedback
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <AnimatePresence>
      <div id="product-modal-root" className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
        
        {/* Backdrop glass */}
        <motion.div
          id="product-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md pointer-events-auto"
        />

        {/* Modal Core Case */}
        <motion.div
          id="product-modal-content-panel"
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative w-full max-w-4xl bg-[#121212] border border-white/[0.08] shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12 z-10"
        >
          {/* Close trigger button */}
          <button
            id="close-product-modal-button"
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 text-zinc-400 hover:text-[#e5e0db] bg-[#1a1a1a]/80 hover:bg-[#222] border border-white/10 rounded-full transition-all"
            aria-label="Close modal"
          >
            <X strokeWidth={1.5} className="w-5 h-5" />
          </button>

          {/* LEFT: GRAPHIC HIGH-CONTRAST PORTRAIT FRAME */}
          <div className="md:col-span-6 bg-neutral-900 border-r border-white/5 relative aspect-[1/1.2] md:aspect-auto md:h-[70vh]">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="absolute inset-0 w-full h-full object-cover grayscale brightness-90 hover:grayscale-0 transition-all duration-[1200ms]"
              referrerPolicy="no-referrer"
              style={{ filter: 'grayscale(100%) brightness(75%)' }}
            />
            {/* Visual moody vignette */}
            <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#121212] via-transparent to-transparent" />
            
            {/* Decorative blueprint badge */}
            <div className="absolute bottom-4 left-4 z-10 font-mono text-[9px] bg-[#121212]/80 border border-white/5 px-3 py-1 text-zinc-400 uppercase tracking-widest">
              ATELIER SHOT CODE
            </div>
          </div>

          {/* RIGHT: COMPREHENSIVE TEXT DETAILS */}
          <div className="md:col-span-6 p-8 md:p-10 flex flex-col justify-between text-left space-y-6">
            
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <span className="font-mono text-[9px] bg-white/5 border border-white/5 px-2.5 py-1 text-[#8c8275] tracking-widest uppercase">
                  ACTIVE GARMENT BLUEPRINT
                </span>
                <span className="font-mono text-sm tracking-wider text-[#8c8275]">
                  {product.numericalId}
                </span>
              </div>

              {/* Title & Price pairing */}
              <div className="space-y-1">
                <h3 className="font-serif text-2xl md:text-3xl tracking-widest font-medium text-[#e5e0db]">
                  {product.name}
                </h3>
                <p className="font-mono text-[#e5e0db] font-semibold tracking-wider text-lg">
                  {product.price}
                </p>
              </div>

              {/* Fabric Specs details */}
              <div className="space-y-2 border-t border-b border-white/[0.04] py-4">
                <p className="font-mono text-[9px] tracking-widest text-zinc-500 uppercase flex items-center space-x-1.5Line">
                  <Sparkles className="w-3 h-3 text-[#8c8275]" />
                  <span>Specification Manifesto</span>
                </p>
                <p className="font-sans text-xs text-[#e5e0db]/60 leading-relaxed font-light">
                  {product.description} Cut from customized heavy-grade structures sourced responsibly from modern European mills. Features dynamic edge reinforcements, ergonomic muscle curve mappings, and bespoke brand custom zippers.
                </p>
              </div>

              {/* Size selector */}
              <div className="space-y-2">
                <span className="font-mono text-[9.5px] tracking-widest text-[#8c8275] uppercase block">
                  CHOOSE SIZE PROFILE
                </span>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      id={`modal-sz-select-${product.id}-${sz}`}
                      onClick={() => setSelectedSize(sz)}
                      className={`font-mono text-xs w-11 h-9 flex items-center justify-center border transition-all ${
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

              {/* Quantity selectors */}
              <div className="space-y-2 pt-2">
                <span className="font-mono text-[9px] tracking-widest text-[#8c8275] uppercase block">
                  Garment Quantity
                </span>
                <div className="flex items-center border border-white/10 w-28 h-9">
                  <button
                    id="modal-qty-dec"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="flex-1 h-full font-mono text-[#e5e0db] hover:bg-white/5 flex items-center justify-center font-semibold text-sm"
                  >
                    -
                  </button>
                  <span className="flex-1 h-full flex items-center justify-center font-mono text-xs text-[#e5e0db] border-x border-white/10 bg-white/[0.02]">
                    {quantity}
                  </span>
                  <button
                    id="modal-qty-inc"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="flex-1 h-full font-mono text-[#e5e0db] hover:bg-white/5 flex items-center justify-center font-semibold text-xs"
                  >
                    +
                  </button>
                </div>
              </div>

            </div>

            {/* Action triggering */}
            <div className="space-y-2 pt-4">
              <button
                id="modal-add-bag-button"
                onClick={handleAdd}
                className={`w-full py-4 font-mono text-xs font-semibold tracking-[0.2em] transition-all flex items-center justify-center space-x-2 ${
                  added
                    ? 'bg-[#e5e0db] text-[#121212]'
                    : 'bg-[#8c8275] hover:bg-[#e5e0db] text-[#121212]'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>GARMENT SECURED IN BAG</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>ADD TO SARTORIAL BAG</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center space-x-1.5 text-[9px] font-mono text-zinc-500">
                <HelpCircle className="w-3.5 h-3.5 text-[#8c8275]" />
                <span>COMPLEMENTARY TAILORING ASSISTANCE CARRIED OUT FREE OF CHARGE</span>
              </div>
            </div>

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
