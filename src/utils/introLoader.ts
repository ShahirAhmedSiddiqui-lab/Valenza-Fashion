export const INTRO_SESSION_KEY = 'valenza-intro-complete';
export const INTRO_MIN_DURATION_MS = 1600;
export const INTRO_TIMEOUT_MS = 3200;

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
