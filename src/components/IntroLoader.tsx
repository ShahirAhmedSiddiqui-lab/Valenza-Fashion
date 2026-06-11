import { AnimatePresence, motion } from 'motion/react';

interface IntroLoaderProps {
  isVisible: boolean;
}

export default function IntroLoader({ isVisible }: IntroLoaderProps) {
  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.div
          key="intro-loader"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-[120] overflow-hidden bg-[#070707] text-[#e5e0db]"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(140,130,117,0.22),transparent_42%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent_28%,rgba(0,0,0,0.36))]" />

          <motion.div
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
          >
            <motion.span
              initial={{ opacity: 0, letterSpacing: '0.45em' }}
              animate={{ opacity: 1, letterSpacing: '0.28em' }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-[12vw] leading-none md:text-[8vw] lg:text-[6vw]"
            >
              VALENZA
            </motion.span>

            <motion.div
              initial={{ opacity: 0, scaleX: 0.2 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 h-px w-32 origin-center bg-[#e5e0db]/35 md:w-44"
            />

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-5 font-mono text-[10px] tracking-[0.28em] text-[#e5e0db]/60"
            >
              PREPARING THE CAMPAIGN
            </motion.p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
