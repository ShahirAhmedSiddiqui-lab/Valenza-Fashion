# Hero Video Loader Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Bundle the hero video locally and add a first-visit cinematic loader that hides only after the hero video is ready or a short safety timeout expires.

**Architecture:** `App` owns intro visibility, session gating, and dismissal timing. `HeroScene` owns the media element and reports readiness upward, while a small pure helper module encapsulates intro-session and dismissal rules so timing logic stays testable without adding a new test framework.

**Tech Stack:** React 19, TypeScript, Vite, motion/react, Tailwind CSS, tsx, Node built-in test runner

---

## File Structure

- Create: `public/media/valenza-hero.mp4`
  - Bundled local hero video copied into Vite's public pipeline so the production build emits `dist/media/valenza-hero.mp4`.
- Create: `src/components/IntroLoader.tsx`
  - First-visit cinematic overlay with restrained motion and no heavy assets.
- Create: `src/utils/introLoader.ts`
  - Pure helper functions for session gating and intro dismissal conditions.
- Create: `src/utils/introLoader.test.ts`
  - Focused tests for intro helper behavior using `tsx --test`.
- Modify: `package.json`
  - Add a narrow test script for the new helper module.
- Modify: `index.html`
  - Add an early preload hint for the local hero video.
- Modify: `src/components/HeroScene.tsx`
  - Switch from remote video URL to bundled local asset and report ready state back to `App`.
- Modify: `src/App.tsx`
  - Orchestrate loader visibility, first-visit session behavior, minimum intro duration, and safety timeout.

**Workspace note:** No `.git` repository is present in `d:\Valenza Fashion`, so commit steps are intentionally omitted in this plan.

### Task 1: Add Testable Intro Timing Helpers

**Files:**
- Create: `src/utils/introLoader.ts`
- Create: `src/utils/introLoader.test.ts`
- Modify: `package.json`

- [ ] **Step 1: Write the failing test**

Create `src/utils/introLoader.test.ts`:

```ts
import test from 'node:test';
import assert from 'node:assert/strict';

import {
  INTRO_SESSION_KEY,
  hasCompletedIntro,
  markIntroComplete,
  shouldDismissIntro,
} from './introLoader';

test('hasCompletedIntro returns false when storage is unavailable', () => {
  assert.equal(hasCompletedIntro(null), false);
});

test('hasCompletedIntro returns true only for the completion flag', () => {
  const storage = {
    getItem(key: string) {
      return key === INTRO_SESSION_KEY ? '1' : null;
    },
  };

  assert.equal(hasCompletedIntro(storage), true);
});

test('markIntroComplete writes the completion flag safely', () => {
  let writtenKey = '';
  let writtenValue = '';

  markIntroComplete({
    setItem(key: string, value: string) {
      writtenKey = key;
      writtenValue = value;
    },
  });

  assert.equal(writtenKey, INTRO_SESSION_KEY);
  assert.equal(writtenValue, '1');
});

test('shouldDismissIntro waits for the minimum duration before resolving', () => {
  assert.equal(
    shouldDismissIntro({
      minimumElapsed: false,
      heroVideoReady: true,
      timeoutElapsed: true,
    }),
    false,
  );
});

test('shouldDismissIntro resolves after minimum duration when video is ready', () => {
  assert.equal(
    shouldDismissIntro({
      minimumElapsed: true,
      heroVideoReady: true,
      timeoutElapsed: false,
    }),
    true,
  );
});

test('shouldDismissIntro resolves after minimum duration when timeout fires', () => {
  assert.equal(
    shouldDismissIntro({
      minimumElapsed: true,
      heroVideoReady: false,
      timeoutElapsed: true,
    }),
    true,
  );
});
```

- [ ] **Step 2: Run test to verify it fails**

Run:

```powershell
node_modules\.bin\tsx.cmd --test src\utils\introLoader.test.ts
```

Expected: FAIL with a module resolution error for `./introLoader` or missing exports.

- [ ] **Step 3: Write the minimal helper implementation**

Create `src/utils/introLoader.ts`:

```ts
export const INTRO_SESSION_KEY = 'valenza-intro-complete';

type ReadableStorage = Pick<Storage, 'getItem'> | null | undefined;
type WritableStorage = Pick<Storage, 'setItem'> | null | undefined;

export interface IntroDismissState {
  minimumElapsed: boolean;
  heroVideoReady: boolean;
  timeoutElapsed: boolean;
}

export function hasCompletedIntro(storage: ReadableStorage): boolean {
  try {
    return storage?.getItem(INTRO_SESSION_KEY) === '1';
  } catch {
    return false;
  }
}

export function markIntroComplete(storage: WritableStorage): void {
  try {
    storage?.setItem(INTRO_SESSION_KEY, '1');
  } catch {
    // Ignore storage failures and continue normally.
  }
}

export function shouldDismissIntro(state: IntroDismissState): boolean {
  return state.minimumElapsed && (state.heroVideoReady || state.timeoutElapsed);
}
```

- [ ] **Step 4: Add the narrow test script**

Update `package.json` scripts:

```json
{
  "scripts": {
    "dev": "vite --port=3000 --host=0.0.0.0",
    "build": "vite build",
    "preview": "vite preview",
    "clean": "rm -rf dist server.js",
    "lint": "tsc --noEmit",
    "test:intro-loader": "tsx --test src/utils/introLoader.test.ts"
  }
}
```

- [ ] **Step 5: Run the helper test to verify it passes**

Run:

```powershell
npm.cmd run test:intro-loader
```

Expected: PASS with all intro helper tests green.

### Task 2: Bundle and Preload the Local Hero Video

**Files:**
- Create: `public/media/valenza-hero.mp4`
- Modify: `index.html`
- Modify: `src/components/HeroScene.tsx`

- [ ] **Step 1: Copy the hero video into the public asset pipeline**

Copy:

```text
src/assets/images/BG video (1).mp4
```

to:

```text
public/media/valenza-hero.mp4
```

The filename should stay stable so the preload path is predictable.

- [ ] **Step 2: Add an early preload hint in `index.html`**

Update the `<head>` in `index.html`:

```html
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="preload" as="video" href="./media/valenza-hero.mp4" type="video/mp4" />
  <title>VALENZA | Editorial Fashion House & Atelier</title>
</head>
```

- [ ] **Step 3: Switch `HeroScene` to the bundled local video and add readiness reporting**

Update `src/components/HeroScene.tsx`:

```tsx
import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { MoveRight } from 'lucide-react';

interface HeroSceneProps {
  onScrollToSection: (id: string) => void;
  onVideoReady?: () => void;
}

const HERO_VIDEO_SRC = `${import.meta.env.BASE_URL}media/valenza-hero.mp4`;

export default function HeroScene({ onScrollToSection, onVideoReady }: HeroSceneProps) {
  const { scrollY } = useScroll();
  const videoRef = useRef<HTMLVideoElement>(null);
  const readyNotifiedRef = useRef(false);

  const notifyReady = () => {
    if (readyNotifiedRef.current) return;
    readyNotifiedRef.current = true;
    onVideoReady?.();
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.defaultMuted = true;
    video.muted = true;
    video.playsInline = true;
    video.load();

    const playPromise = video.play();
    if (playPromise) {
      playPromise.catch(() => {});
    }

    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      notifyReady();
    }
  }, [onVideoReady]);

  const bgY = useTransform(scrollY, [0, 800], [0, 160]);
  const textY = useTransform(scrollY, [0, 800], [0, -80]);
  const valenzaScale = useTransform(scrollY, [0, 800], [1, 1.15]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0.0]);

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden pt-24 pb-12 cursor-default select-none"
    >
      <motion.div
        id="hero-background-wrapper"
        style={{ y: bgY }}
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
            onLoadedData={notifyReady}
            onCanPlay={notifyReady}
            className="h-full w-full object-cover opacity-95 [transform:translateZ(0)]"
          >
            <source src={HERO_VIDEO_SRC} type="video/mp4" />
          </video>
        </div>
      </motion.div>

      {/* keep the existing hero content below unchanged */}
    </section>
  );
}
```

- [ ] **Step 4: Run a production build to verify the video is emitted into `dist`**

Run:

```powershell
npm.cmd run build
```

Then confirm the bundled file exists:

```powershell
Test-Path dist\media\valenza-hero.mp4
```

Expected:

- `npm.cmd run build` exits successfully
- `Test-Path` returns `True`

### Task 3: Build the Cinematic Intro Loader Overlay

**Files:**
- Create: `src/components/IntroLoader.tsx`

- [ ] **Step 1: Create the intro loader component**

Create `src/components/IntroLoader.tsx`:

```tsx
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
```

- [ ] **Step 2: Verify the new component stays type-safe**

Run:

```powershell
npm.cmd run lint
```

Expected: PASS with no TypeScript errors from the new component file.

### Task 4: Wire the Loader Into `App` and Verify the Full Flow

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/components/HeroScene.tsx`

- [ ] **Step 1: Add intro orchestration to `App`**

Update `src/App.tsx` imports:

```tsx
import { lazy, Suspense, startTransition, useEffect, useRef, useState } from 'react';
import Header from './components/Header';
import HeroScene from './components/HeroScene';
import CategoriesSection from './components/CategoriesSection';
import PhilosophySection from './components/PhilosophySection';
import FeaturedCollection from './components/FeaturedCollection';
import ReservationCTA from './components/ReservationCTA';
import IntroLoader from './components/IntroLoader';
import {
  hasCompletedIntro,
  markIntroComplete,
  shouldDismissIntro,
} from './utils/introLoader';
```

Add the intro state near the top of `App`:

```tsx
const [showIntroLoader, setShowIntroLoader] = useState(false);
const [minimumElapsed, setMinimumElapsed] = useState(false);
const [timeoutElapsed, setTimeoutElapsed] = useState(false);
const [heroVideoReady, setHeroVideoReady] = useState(false);
```

Add the session/timer effect:

```tsx
useEffect(() => {
  if (hasCompletedIntro(window.sessionStorage)) {
    setShowIntroLoader(false);
    setMinimumElapsed(true);
    setTimeoutElapsed(false);
    return;
  }

  setShowIntroLoader(true);

  const minimumTimer = window.setTimeout(() => setMinimumElapsed(true), 850);
  const timeoutTimer = window.setTimeout(() => setTimeoutElapsed(true), 2200);

  return () => {
    window.clearTimeout(minimumTimer);
    window.clearTimeout(timeoutTimer);
  };
}, []);
```

Add the dismissal effect:

```tsx
useEffect(() => {
  if (!showIntroLoader) return;

  if (
    shouldDismissIntro({
      minimumElapsed,
      heroVideoReady,
      timeoutElapsed,
    })
  ) {
    setShowIntroLoader(false);
    markIntroComplete(window.sessionStorage);
  }
}, [heroVideoReady, minimumElapsed, showIntroLoader, timeoutElapsed]);
```

- [ ] **Step 2: Render the loader and connect hero readiness**

Update the top-level JSX in `App`:

```tsx
return (
  <div id="valenza-app" className="relative min-h-screen font-sans bg-[#0c0c0c] text-[#e5e0db] selection:bg-[#8c8275] selection:text-[#121212]">
    <IntroLoader isVisible={showIntroLoader} />

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
      <HeroScene
        onScrollToSection={handleScrollToSection}
        onVideoReady={() => setHeroVideoReady(true)}
      />

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

    {/* keep the rest of App unchanged */}
  </div>
);
```

- [ ] **Step 3: Run the complete verification set**

Run:

```powershell
npm.cmd run test:intro-loader
npm.cmd run lint
npm.cmd run build
```

Expected:

- helper tests PASS
- TypeScript check PASS
- production build PASS

- [ ] **Step 4: Manually verify first-visit, repeat-visit, and mobile flow**

Run the local app:

```powershell
npm.cmd run dev
```

Verify manually:

1. Desktop first load: the intro overlay appears, the hero stays hidden briefly, and the page reveals once the video is ready or the timeout expires.
2. Same-session reload: the intro overlay does not reappear.
3. Mobile viewport (for example `390x844`): the intro overlay still appears and the hero video attempts autoplay without showing a static fallback image.
4. Production output contains `dist/media/valenza-hero.mp4`.

## Self-Review

- Spec coverage: this plan covers first-visit gating, minimum-duration + timeout dismissal, mobile autoplay handling, local bundled video delivery, and production output verification.
- Placeholder scan: no `TODO` or vague instructions remain; each file path, command, and code block is explicit.
- Type consistency: `onVideoReady`, `showIntroLoader`, `hasCompletedIntro`, `markIntroComplete`, and `shouldDismissIntro` are used consistently across tasks.
