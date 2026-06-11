import assert from 'node:assert/strict';
import test from 'node:test';

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
