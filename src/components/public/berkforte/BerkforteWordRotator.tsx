"use client";

import { useEffect } from "react";

const ROTATE_MS = 2500;
const ANIM_MS = 600;

function syncWordsWidth(wordsEl: HTMLElement) {
  const visible = wordsEl.querySelector<HTMLElement>("b.is-visible");
  if (!visible) return;
  wordsEl.style.width = `${visible.offsetWidth}px`;
}

function initSlideWordRotators(root: Element) {
  root.querySelectorAll<HTMLElement>(".word-rotator.slide").forEach((rotator) => {
    if (rotator.dataset.lhwWordRotator === "1") return;
    rotator.dataset.lhwWordRotator = "1";

    const wordsEl = rotator.querySelector<HTMLElement>(".word-rotator-words");
    if (!wordsEl) return;

    const items = Array.from(wordsEl.querySelectorAll<HTMLElement>("b"));
    if (items.length < 2) return;

    let index = items.findIndex((el) => el.classList.contains("is-visible"));
    if (index < 0) {
      index = 0;
      items.forEach((el, i) => {
        el.classList.toggle("is-visible", i === 0);
        el.classList.remove("is-hidden");
      });
    }

    items.forEach((el, i) => {
      if (i !== index) {
        el.classList.remove("is-visible", "is-hidden");
      }
    });

    syncWordsWidth(wordsEl);

    window.setInterval(() => {
      const current = items[index];
      index = (index + 1) % items.length;
      const next = items[index];

      current.classList.remove("is-visible");
      current.classList.add("is-hidden");
      next.classList.remove("is-hidden");
      next.classList.add("is-visible");

      window.setTimeout(() => current.classList.remove("is-hidden"), ANIM_MS);
      syncWordsWidth(wordsEl);
    }, ROTATE_MS);
  });
}

/** Cycles Porto `.word-rotator.slide` headings (hero “Brokerage for …”). */
export function BerkforteWordRotator() {
  useEffect(() => {
    const root = document.querySelector(".berkforte-porto-page");
    if (!root) return;

    initSlideWordRotators(root);

    const onLoad = () => initSlideWordRotators(root);
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  return null;
}
