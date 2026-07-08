/**
 * Shared scroll-lock utility.
 *
 * Problem: Both WelcomeSplash and EnquiryModal manipulate
 * `document.body.style.overflow` independently. If one locks scroll,
 * the other captures that locked state as "previous", then restores it
 * on close — leaving the page permanently scroll-locked.
 *
 * Solution: Use a reference counter. Body scroll is locked when counter > 0
 * and unlocked when it returns to 0. Every consumer calls lockScroll() and
 * unlockScroll() — they never touch overflow directly.
 */

let lockCount = 0;

export function lockScroll() {
  lockCount++;
  if (lockCount === 1) {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
  }
}

export function unlockScroll() {
  if (lockCount <= 0) return;
  lockCount--;
  if (lockCount === 0) {
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";
  }
}
