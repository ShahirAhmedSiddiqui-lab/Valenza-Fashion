/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, X, Menu, ArrowRight, Trash2 } from 'lucide-react';
import { Product } from '../types';

interface HeaderProps {
  cart: { product: Product; size: string; quantity: number }[];
  onRemoveFromCart: (productId: string, size: string) => void;
  onUpdateCartQuantity: (productId: string, size: string, q: number) => void;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  onScrollToSection: (sectionId: string) => void;
}

export default function Header({
  cart,
  onRemoveFromCart,
  onUpdateCartQuantity,
  cartOpen,
  setCartOpen,
  onScrollToSection
}: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  // Calculate cart details
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPriceNumber = cart.reduce((total, item) => {
    const priceVal = parseFloat(item.product.price.replace(/[$,]/g, ''));
    return total + priceVal * item.quantity;
  }, 0);

  const cartTotalString = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(totalPriceNumber);

  const navLinks = [
    { label: 'HOME', id: 'hero' },
    { label: 'COLLECTION', id: 'categories' },
    { label: 'PHILOSOPHY', id: 'philosophy' },
    { label: 'FEATURED', id: 'featured' },
    { label: 'SHOWROOM', id: 'showroom' }
  ];

  const handleNavLinkClick = (id: string) => {
    setMenuOpen(false);
    onScrollToSection(id);
  };

  return (
    <>
      <header
        id="main-header"
        className="fixed top-0 left-0 w-full z-40 bg-zinc-950/20 backdrop-blur-md border-b border-white/[0.04] transition-all duration-300"
      >
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          
          {/* Brand Logo - Serif typeface */}
          <a
            id="brand-logo"
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleNavLinkClick('hero');
            }}
            className="font-serif text-2xl lg:text-3xl font-medium tracking-[0.18em] text-[#e5e0db] hover:opacity-85 transition-opacity"
          >
            VALENZA
          </a>

          {/* Desktop Navigation Links */}
          <nav id="desktop-nav" className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <a
                key={link.id}
                id={`nav-link-${link.id}`}
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavLinkClick(link.id);
                }}
                className="font-mono text-xs tracking-[0.2em] text-[#e5e0db]/70 hover:text-[#e5e0db] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* User Controls: Bag (Cart) & Menu Drawer trigger */}
          <div id="nav-controls" className="flex items-center space-x-6 lg:space-x-8">
            
            {/* Bag counter */}
            <button
              id="cart-trigger-button"
              onClick={() => setCartOpen(true)}
              className="flex items-center space-x-2 font-mono text-xs tracking-[0.15em] text-[#e5e0db] hover:opacity-80 transition-opacity"
            >
              <span className="hidden sm:inline">CART</span>
              <div className="relative p-1">
                <ShoppingBag strokeWidth={1.5} className="w-5 h-5 text-[#e5e0db]" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#8c8275] text-[#121212] font-semibold font-mono text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </div>
            </button>

            {/* Menu trigger button */}
            <button
              id="menu-trigger-button"
              onClick={() => setMenuOpen(true)}
              className="md:hidden flex items-center p-1 text-[#e5e0db] hover:opacity-80 transition-opacity"
            >
              <Menu strokeWidth={1.5} className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE FULL-SCREEN NAVIGATION OVERLAY */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-navigation-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="fixed inset-0 z-50 bg-[#0c0c0c] flex flex-col justify-between p-8 lg:p-16 h-screen"
          >
            {/* Close button header */}
            <div className="flex items-center justify-between w-full">
              <span className="font-serif text-xl tracking-[0.2em] font-medium text-[#e5e0db]">VALENZA</span>
              <button
                id="close-menu-button"
                onClick={() => setMenuOpen(false)}
                className="p-2 border border-white/10 rounded-full hover:bg-white/5 text-[#e5e0db] transition-colors"
              >
                <X strokeWidth={1.5} className="w-5 h-5" />
              </button>
            </div>

            {/* Structured Navigation Links */}
            <div className="flex flex-col space-y-6 text-left my-auto">
              <span className="font-mono text-[10px] tracking-[0.3em] text-[#8c8275]">MAIN DIRECTORY</span>
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.08, duration: 0.4 }}
                >
                  <a
                    id={`mobile-link-${link.id}`}
                    href={`#${link.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavLinkClick(link.id);
                    }}
                    className="font-serif text-4xl font-light tracking-[0.12em] text-[#e5e0db] hover:text-[#8c8275] transition-colors block py-1"
                  >
                    {link.label}
                  </a>
                </motion.div>
              ))}
            </div>

            {/* Campaign info at bottom of overlay menu */}
            <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between text-[#e5e0db]/50 gap-4">
              <div>
                <p className="font-mono text-[10px] tracking-widest text-[#8c8275]">SEASON / COLLECTION</p>
                <p className="font-mono text-xs tracking-wider text-[#e5e0db] mt-1">2026 OUTPOST / SS 24 CAMPAIGN</p>
              </div>
              <div>
                <p className="font-mono text-[10px] tracking-widest text-[#8c8275]">OUTPOST SHOWROOM</p>
                <p className="font-mono text-xs tracking-wider text-[#e5e0db] mt-1">94 SARTORIAL ST, LONDON</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SIDEBAR CART DRAWER */}
      <AnimatePresence>
        {cartOpen && (
          <>
            {/* Backdrop */}
            <div
              id="cart-backdrop"
              className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm pointer-events-auto"
              onClick={() => setCartOpen(false)}
            />

            {/* Slider Drawer */}
            <motion.div
              id="sidebar-cart-drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="fixed right-0 top-0 h-screen w-full max-w-[500px] bg-[#121212] z-50 shadow-2xl flex flex-col justify-between border-l border-white/5"
            >
              {/* Header */}
              <div className="px-6 py-6 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <ShoppingBag strokeWidth={1.5} className="w-5 h-5 text-[#8c8275]" />
                  <span className="font-serif text-xl tracking-[0.1em] text-[#e5e0db]">Sartorial Bag</span>
                  <span className="font-mono text-[11px] bg-white/5 px-2 py-0.5 text-zinc-400">
                    {totalItems} items
                  </span>
                </div>
                <button
                  id="close-cart-button"
                  onClick={() => setCartOpen(false)}
                  className="p-1 text-[#e5e0db]/70 hover:text-[#e5e0db] transition-colors"
                >
                  <X strokeWidth={1.5} className="w-5 h-5" />
                </button>
              </div>

              {/* Cart Content list */}
              <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-20">
                    <ShoppingBag strokeWidth={1} className="w-16 h-16 text-[#e5e0db]/20" />
                    <p className="font-serif text-lg tracking-[0.1em] text-[#e5e0db]/60">Your bag is currently empty</p>
                    <p className="font-mono text-xs text-[#e5e0db]/40 max-w-[280px]">
                      Explore the SS 24 editorial campaign and find key garments with purpose.
                    </p>
                    <button
                      id="cart-continue-shopping-button"
                      onClick={() => {
                        setCartOpen(false);
                        onScrollToSection('categories');
                      }}
                      className="mt-4 font-mono text-xs tracking-wider border border-white/20 px-6 py-2.5 text-[#e5e0db] hover:bg-white/5 transition-all"
                    >
                      EXPLORE COLLECTIONS
                    </button>
                  </div>
                ) : (
                  cart.map((item, index) => (
                    <motion.div
                      key={`${item.product.id}-${item.size}-${index}`}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex space-x-4 border-b border-white/[0.03] pb-6"
                    >
                      {/* Image */}
                      <div className="w-24 h-32 flex-shrink-0 bg-neutral-900 border border-white/5 overflow-hidden">
                        <img
                          src={item.product.imageUrl}
                          alt={item.product.name}
                          className="w-full h-full object-cover grayscale brightness-90 hover:grayscale-0 transition-all duration-500"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      {/* Info & controls */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between text-base">
                            <h4 className="font-serif tracking-wide text-[#e5e0db] font-medium">
                              {item.product.name}
                            </h4>
                            <span className="font-mono text-sm font-medium text-[#e5e0db] ml-2">
                              {item.product.price}
                            </span>
                          </div>
                          <p className="font-mono text-[10px] tracking-wider text-[#8c8275] mt-1">
                            CODE ID: {item.product.numericalId}
                          </p>
                          <div className="flex items-center space-x-3 mt-2">
                            <span className="font-mono text-xs text-zinc-400 bg-white/5 px-2 py-0.5 border border-white/5">
                              SIZE: {item.size}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-2">
                          {/* Quantity control */}
                          <div className="flex items-center border border-white/10 h-7">
                            <button
                              id={`qty-decrement-${item.product.id}-${item.size}`}
                              onClick={() => onUpdateCartQuantity(item.product.id, item.size, item.quantity - 1)}
                              className="px-2 h-full font-mono text-[#e5e0db] hover:bg-white/5 font-semibold text-xs transition-colors"
                            >
                              -
                            </button>
                            <span className="px-3 h-full flex items-center font-mono text-xs text-[#e5e0db] border-x border-white/10 bg-white/[0.02]">
                              {item.quantity}
                            </span>
                            <button
                              id={`qty-increment-${item.product.id}-${item.size}`}
                              onClick={() => onUpdateCartQuantity(item.product.id, item.size, item.quantity + 1)}
                              className="px-2 h-full font-mono text-[#e5e0db] hover:bg-white/5 font-semibold text-xs transition-colors"
                            >
                              +
                            </button>
                          </div>

                          {/* Delete */}
                          <button
                            id={`qty-delete-${item.product.id}-${item.size}`}
                            onClick={() => onRemoveFromCart(item.product.id, item.size)}
                            className="p-1 pb-1.5 text-zinc-500 hover:text-red-400 transition-colors"
                          >
                            <Trash2 strokeWidth={1.5} className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Footer and Checkout parameters */}
              {cart.length > 0 && (
                <div className="px-6 py-6 border-t border-white/5 bg-zinc-950/40 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-lg tracking-wider text-[#e5e0db]/70">CAMPAIGN ORDER TOTAL</span>
                    <span className="font-mono text-lg font-medium text-[#e5e0db] tracking-wider">
                      {cartTotalString}
                    </span>
                  </div>
                  <p className="font-mono text-[10px] text-zinc-500 tracking-wider text-left leading-normal">
                    Free secure air logistics. Taxes & duties calculated at garment dispatch. Packaged in custom Valenza heavy cardboard cases.
                  </p>
                  
                  <button
                    id="cart-checkout-button"
                    onClick={() => {
                      alert(`Thank you for placing order of ${cartTotalString}! Our personal tailoring concierge will reach out via email shortly to configure your individual measures.\n\nVALENZA EST. 2026`);
                      // Reset cart or do something cool
                    }}
                    className="w-full bg-[#8c8275] text-[#121212] font-mono text-xs font-semibold tracking-[0.2em] py-4 hover:bg-[#e5e0db] transition-all flex items-center justify-center space-x-2"
                  >
                    <span>SECURE CHECKOUT</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
