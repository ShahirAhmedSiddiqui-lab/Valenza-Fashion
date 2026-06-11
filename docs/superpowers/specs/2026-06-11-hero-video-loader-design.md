# Hero Video Loader Design

## Goal

Add a lightweight cinematic intro loader that plays on first visit only, while the hero background video starts loading immediately behind it. The loader should dismiss as soon as the hero video is ready to play smoothly, with a short safety timeout so users are never trapped on slow networks or small devices.

## User Experience

- On first load, users see a full-screen cinematic loader before interacting with the site.
- The loader shows the `VALENZA` wordmark, subtle motion, and a soft ambient gradient treatment.
- The hero video begins loading immediately under the loader.
- The loader fades out when either:
  - the hero video reaches a usable ready state such as `loadeddata` or `canplay`, or
  - a short timeout expires.
- The loader should not reappear during the same browsing session after the first reveal.
- The loader must remain lightweight so it improves perceived performance instead of becoming a bottleneck itself.

## Recommended Approach

Implement the loader in the app shell and treat hero video readiness as the main completion signal.

This keeps the loader orchestration centralized in `App`, while `HeroScene` owns the media element and reports readiness upward through a callback. That split keeps responsibilities clear:

- `App` decides whether the intro overlay is visible.
- `HeroScene` loads the video and reports when it is ready.

Serve the hero video as a bundled local asset instead of a remote URL. Place the source video in the Vite public pipeline so production builds emit it into `dist` and the hero can preload from the same origin as the page.

## Architecture

### `App`

Add intro-loading state in `App`:

- `showIntroLoader`: whether the overlay is currently visible
- `heroVideoReady`: whether the hero video has reached a usable ready state
- `introCompleted`: session-level guard so the loader only runs once per browsing session

Behavior:

- On first mount, check `sessionStorage` for a `valenza-intro-complete` flag.
- If the flag exists, skip the loader entirely.
- If the flag does not exist, show the loader immediately.
- Start a safety timer when the loader appears.
- Hide the loader when either:
  - `heroVideoReady` becomes `true`, or
  - the safety timer fires.
- Once hidden, persist `valenza-intro-complete` in `sessionStorage`.

### `HeroScene`

Add a callback prop such as `onVideoReady?: () => void`.

Behavior:

- Use a local bundled hero video path instead of the current remote Cloudinary URL.
- Load the video from the app bundle so production output contains the media in `dist`.
- Start loading the hero video immediately on mount.
- Keep the existing direct video background behavior with no visible static image fallback.
- Attempt autoplay on mount using the existing muted inline path.
- Notify `App` once the video reaches a usable state.

Ready events:

- Primary: `loadeddata`
- Secondary: `canplay`

The callback should be guarded so it only fires once.

### Bundled Video Asset

Store the hero video in a location that Vite copies into the final build, such as `public/media/valenza-hero.mp4`.

Behavior:

- The source file should be renamed to a stable deployment-friendly filename.
- The page should reference the local built asset rather than a third-party host.
- The app should preload the local video as early as possible so buffering begins before the hero is revealed.
- The final production build should include the file in `dist/media/valenza-hero.mp4`.

### `IntroLoader`

Create a dedicated lightweight component, likely `src/components/IntroLoader.tsx`.

Responsibilities:

- Render a full-screen overlay above the app
- Show the `VALENZA` wordmark
- Add restrained cinematic motion
- Fade away cleanly once dismissed

Visual direction:

- Dark charcoal base
- Soft radial or linear atmospheric gradients
- Minimal letter-spacing animation, shimmer, or opacity sweep
- No large images, no video, no external media

## Animation and Timing

Recommended timing:

- Minimum visible duration: brief but noticeable, around `700ms` to `1100ms`
- Safety timeout: around `1800ms` to `2500ms`
- Exit transition: around `400ms` to `700ms`

Rules:

- Do not hide instantly before users perceive the intro at all.
- Do not keep the loader onscreen long after the video is already ready.
- Prefer video readiness over fixed-duration waiting.

Implementation detail:

- Use one small minimum-duration gate plus one safety timeout.
- Final dismiss condition:
  - minimum duration satisfied, and
  - (`heroVideoReady === true` or safety timeout reached)

## Mobile Behavior

- The intro loader also runs on small-screen devices.
- The hero video should continue using `muted`, `defaultMuted`, `playsInline`, and direct `play()` attempt logic for mobile autoplay compatibility.
- The loader should not depend on hover or desktop-only interactions.
- Motion should remain subtle enough for low-power devices.

## Error Handling

- If the video never reaches ready state quickly, the safety timeout reveals the page anyway.
- If autoplay is delayed by the browser, the loader still exits after timeout so the site is usable.
- If `sessionStorage` is unavailable, fail gracefully by using in-memory state for the current page lifecycle.

## Performance Constraints

- No heavy media in the loader.
- No extra network requests for the loader.
- The hero video should be served from the same deployment bundle instead of a remote runtime dependency.
- Add an early preload hint for the bundled hero video so the browser can start fetching it before the hero is revealed.
- Keep animation GPU-friendly: opacity, transform, gradient movement only.
- Avoid expensive layout thrashing or large JS orchestration loops.

## Testing Plan

Verify:

1. First visit shows the loader.
2. Repeat navigation in the same session skips the loader.
3. Hero video begins loading during the loader phase.
4. Loader dismisses when the video becomes ready.
5. Loader also dismisses on timeout when readiness is delayed.
6. Mobile-sized viewport still gets the loader and still attempts video autoplay.
7. No visible static image fallback appears behind the loader.
8. Production output contains the bundled hero video and the hero uses that local path.

## Files Expected To Change

- `src/App.tsx`
- `src/components/HeroScene.tsx`
- `src/components/IntroLoader.tsx` (new)
- `public/media/valenza-hero.mp4` (new)
- `index.html`

## Out Of Scope

- Re-encoding the source video into multiple formats
- Adding external loader media
- Changing the rest of the site flow beyond the intro/video orchestration
