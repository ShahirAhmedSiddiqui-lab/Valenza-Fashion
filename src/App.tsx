/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { lazy, Suspense, startTransition, useEffect, useRef, useState } from 'react';
import Header from './components/Header';
import HeroScene from './components/HeroScene';
import CategoriesSection from './components/CategoriesSection';
import PhilosophySection from './components/PhilosophySection';
import FeaturedCollection from './components/FeaturedCollection';
import ReservationCTA from './components/ReservationCTA';
import { Product } from './types';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ThreeCanvas = lazy(() => import('./components/ThreeCanvas'));
const ProductModal = lazy(() => import('./components/ProductModal'));

export default function App() {
  const [cart, setCart] = useState<{ product: Product; size: string; quantity: number }[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showSceneEnhancements, setShowSceneEnhancements] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const enhancementDelay = window.setTimeout(() => {
      startTransition(() => setShowSceneEnhancements(true));
    }, 450);

    return () => window.clearTimeout(enhancementDelay);
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: isMobile ? 1 : 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      lerp: isMobile ? 0.11 : 0.085,
    } as any);

    lenisRef.current = lenis;
    (window as any).lenis = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    const animationTimeout = setTimeout(() => {
      gsap.utils.toArray('[id^="category-card-"]').forEach((card: any) => {
        gsap.fromTo(card,
          { y: 80, opacity: 0, skewY: 1.5 },
          {
            y: 0,
            opacity: 1,
            skewY: 0,
            duration: 1.4,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 92%',
              toggleActions: 'play none none none',
            }
          }
        );

        const img = card.querySelector('img');
        if (img) {
          gsap.fromTo(img,
            { yPercent: -10 },
            {
              yPercent: 10,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              }
            }
          );
        }
      });

      gsap.utils.toArray('h2').forEach((title: any) => {
        gsap.fromTo(title,
          { y: 40, opacity: 0, letterSpacing: '0.04em' },
          {
            y: 0,
            opacity: 1,
            letterSpacing: '0.12em',
            duration: 1.5,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: title,
              start: 'top 90%',
              toggleActions: 'play none none none',
            }
          }
        );
      });

      gsap.utils.toArray('main p').forEach((p: any) => {
        gsap.fromTo(p,
          { y: 25, opacity: 0 },
          {
            y: 0,
            opacity: 0.65,
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: p,
              start: 'top 92%',
              toggleActions: 'play none none none',
            }
          }
        );
      });

      const philImg = document.querySelector('#philosophy-film-card img');
      if (philImg) {
        gsap.fromTo(philImg,
          { yPercent: -15, scale: 1.15 },
          {
            yPercent: 15,
            scale: 1.0,
            ease: 'none',
            scrollTrigger: {
              trigger: '#philosophy',
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            }
          }
        );
      }

      const productCards = gsap.utils.toArray('[id^="product-card-"]');
      if (productCards.length > 0) {
        gsap.fromTo(productCards,
          { y: 65, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '#featured-wardrobe-showcase',
              start: 'top 85%',
              toggleActions: 'play none none none',
            }
          }
        );

        productCards.forEach((card: any) => {
          const img = card.querySelector('img');
          if (img) {
            gsap.fromTo(img,
              { yPercent: -8 },
              {
                yPercent: 8,
                ease: 'none',
                scrollTrigger: {
                  trigger: card,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: true,
                }
              }
            );
          }
        });
      }

      const giantLogo = document.querySelector('#featured-huge-logo-bg div');
      if (giantLogo) {
        gsap.fromTo(giantLogo,
          { yPercent: -20 },
          {
            yPercent: 20,
            ease: 'none',
            scrollTrigger: {
              trigger: '#featured-top-layout',
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            }
          }
        );
      }

      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(animationTimeout);
      lenis.destroy();
      gsap.ticker.remove(tickerCallback);
      lenisRef.current = null;
      delete (window as any).lenis;
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isMobile]);

  const handleAddToCart = (product: Product, size: string) => {
    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.product.id === product.id && item.size === size
      );

      if (existingIdx > -1) {
        const nextCart = [...prev];
        nextCart[existingIdx] = {
          ...nextCart[existingIdx],
          quantity: nextCart[existingIdx].quantity + 1,
        };
        return nextCart;
      }

      return [...prev, { product, size, quantity: 1 }];
    });

    setCartOpen(true);
  };

  const handleRemoveFromCart = (productId: string, size: string) => {
    setCart((prev) => prev.filter((item) => !(item.product.id === productId && item.size === size)));
  };

  const handleUpdateCartQuantity = (productId: string, size: string, amount: number) => {
    if (amount <= 0) {
      handleRemoveFromCart(productId, size);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.size === size
          ? { ...item, quantity: amount }
          : item
      )
    );
  };

  const handleScrollToSection = (sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (target) {
      if ((window as any).lenis) {
        (window as any).lenis.scrollTo(target, {
          duration: 1.8,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      } else {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <div id="valenza-app" className="relative min-h-screen font-sans bg-[#0c0c0c] text-[#e5e0db] selection:bg-[#8c8275] selection:text-[#121212]">
      <Suspense fallback={null}>
        {showSceneEnhancements ? <ThreeCanvas /> : null}
      </Suspense>

      <Header
        cart={cart}
        onRemoveFromCart={handleRemoveFromCart}
        onUpdateCartQuantity={handleUpdateCartQuantity}
        cartOpen={cartOpen}
        setCartOpen={setCartOpen}
        onScrollToSection={handleScrollToSection}
      />

      <main id="story-timeline" className="relative z-10 w-full overflow-hidden">
        <HeroScene onScrollToSection={handleScrollToSection} />

        <CategoriesSection
          onScrollToSection={handleScrollToSection}
          onOpenProductModal={setSelectedProduct}
        />

        <PhilosophySection />

        <FeaturedCollection
          onAddToCart={handleAddToCart}
          onOpenProductModal={setSelectedProduct}
        />

        <ReservationCTA />
      </main>

      {selectedProduct && (
        <Suspense fallback={null}>
          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onAddToCart={handleAddToCart}
          />
        </Suspense>
      )}
    </div>
  );
}
