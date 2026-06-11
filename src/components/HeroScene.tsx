/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { MoveRight } from 'lucide-react';

interface HeroSceneProps {
  onScrollToSection: (id: string) => void;
}

const HERO_VIDEO_SRC = `${import.meta.env.BASE_URL}video/BG%20video%20(1).mp4`;

export default function HeroScene({ onScrollToSection }: HeroSceneProps) {
  const { scrollY } = useScroll();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.setAttribute('playsinline', 'true');
    video.setAttribute('webkit-playsinline', 'true');
    video.defaultMuted = true;
    video.muted = true;
    video.playsInline = true;
    video.load();

    const playPromise = video.play();
    if (playPromise) {
      playPromise.catch(() => {});
    }
  }, []);

  const textY = useTransform(scrollY, [0, 800], [0, -80]);
  const valenzaScale = useTransform(scrollY, [0, 800], [1, 1.15]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0.0]);

  const letterVariants = {
    hidden: { y: 150, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.1 + i * 0.08,
        duration: 1.1,
        ease: [0.16, 1, 0.3, 1]
      }
    })
  };

  const valenzaLetters = ['V', 'A', 'L', 'E', 'N', 'Z', 'A'];

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden pt-24 pb-12 cursor-default select-none"
    >
      <div
        id="hero-background-wrapper"
        className="absolute inset-0 h-[115vh] w-full -z-20 overflow-hidden bg-[#0c0c0c] pointer-events-none"
      >
        <div className="relative w-full h-full">
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#0c0c0c] via-[#0c0c0c]/25 to-transparent z-10" />
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/60 to-transparent z-10" />

          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            defaultMuted
            playsInline
            preload="auto"
            aria-hidden="true"
            disablePictureInPicture
            className="h-full w-full object-cover opacity-95"
          >
            <source src={HERO_VIDEO_SRC} type="video/mp4" />
          </video>
        </div>
      </div>

      <div className="flex-1" />

      <div
        id="hero-massive-title-container"
        className="absolute inset-x-0 bottom-[15vh] md:bottom-[17vh] z-20 w-full flex flex-col items-center justify-center pointer-events-none"
      >
        <motion.div
          style={{ y: textY, scale: valenzaScale, opacity }}
          className="w-full text-center flex flex-col justify-center items-center select-none"
        >
          <h1
            id="hero-massive-valenza-text"
            className="font-serif font-medium text-[16vw] md:text-[14vw] lg:text-[13vw] tracking-[0.06em] text-[#e5e0db] leading-none text-center select-none opacity-90 filter drop-shadow-xl flex justify-center"
          >
            {valenzaLetters.map((letter, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={letterVariants}
                initial="hidden"
                animate="visible"
                className="inline-block"
              >
                {letter}
              </motion.span>
            ))}
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 md:mt-6 pointer-events-auto"
          >
            <button
              id="hero-explore-collection"
              onClick={() => onScrollToSection('categories')}
              className="group flex items-center space-x-4 border-b border-[#e5e0db]/25 pb-2 font-mono text-[10px] tracking-[0.25em] text-[#e5e0db] hover:border-[#e5e0db] transition-all"
            >
              <span>EXPLORE COLLECTION</span>
              <div className="w-7 h-7 rounded-full border border-[#e5e0db]/20 flex items-center justify-center group-hover:bg-[#e5e0db] group-hover:text-[#121212] group-hover:border-[#e5e0db] transition-all duration-350">
                <MoveRight strokeWidth={1} className="w-3.5 h-3.5" />
              </div>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
