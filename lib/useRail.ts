"use client";

import { useCallback, useEffect, useState, type KeyboardEvent, type RefObject } from "react";

type RailState = {
  canPrev: boolean;
  canNext: boolean;
  page: number;
  pageCount: number;
  scrollBy: (direction: "prev" | "next") => void;
  scrollToPage: (page: number) => void;
  onKeyDown: (event: KeyboardEvent<HTMLDivElement>) => void;
};

const EDGE_THRESHOLD = 2;

/**
 * Shared behaviour for the horizontal card rails: paddle enable/disable state,
 * page dots, and keyboard control. Education and Projects previously carried
 * near-identical copies of this logic.
 */
export function useRail(
  ref: RefObject<HTMLDivElement | null>,
  cardSelector: string,
  itemCount: number,
): RailState {
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(1);

  // Stable across renders: the state setters are stable and `ref` is a ref
  // object, so the listeners below never need re-binding.
  const sync = useCallback(() => {
    const rail = ref.current;
    if (!rail) {
      return;
    }

    const maxScroll = rail.scrollWidth - rail.clientWidth;
    setCanPrev(rail.scrollLeft > EDGE_THRESHOLD);
    setCanNext(rail.scrollLeft < maxScroll - EDGE_THRESHOLD);

    const pages = Math.max(1, Math.ceil(rail.scrollWidth / rail.clientWidth));
    setPageCount(pages);
    setPage(Math.min(pages - 1, Math.round(rail.scrollLeft / rail.clientWidth)));
  }, [ref]);

  useEffect(() => {
    const rail = ref.current;
    if (!rail) {
      return;
    }

    sync();

    rail.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);

    // Card widths depend on fonts and images settling, so observe the rail too.
    const observer = new ResizeObserver(sync);
    observer.observe(rail);

    return () => {
      rail.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
      observer.disconnect();
    };
  }, [ref, itemCount, sync]);

  const step = useCallback(() => {
    const rail = ref.current;
    if (!rail) {
      return 0;
    }

    const card = rail.querySelector<HTMLElement>(cardSelector);
    const width = card?.offsetWidth ?? rail.clientWidth * 0.82;
    const styles = window.getComputedStyle(rail);
    const gap = Number.parseFloat(styles.columnGap || styles.gap || "0") || 0;

    return width + gap;
  }, [ref, cardSelector]);

  const scrollBy = useCallback(
    (direction: "prev" | "next") => {
      const rail = ref.current;
      if (!rail) {
        return;
      }

      const distance = step();
      rail.scrollBy({ left: direction === "next" ? distance : -distance, behavior: "smooth" });
    },
    [ref, step],
  );

  const scrollToPage = useCallback(
    (target: number) => {
      const rail = ref.current;
      if (!rail) {
        return;
      }

      rail.scrollTo({ left: target * rail.clientWidth, behavior: "smooth" });
    },
    [ref],
  );

  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      const rail = ref.current;
      if (!rail) {
        return;
      }

      switch (event.key) {
        case "ArrowRight":
          event.preventDefault();
          scrollBy("next");
          break;
        case "ArrowLeft":
          event.preventDefault();
          scrollBy("prev");
          break;
        case "Home":
          event.preventDefault();
          rail.scrollTo({ left: 0, behavior: "smooth" });
          break;
        case "End":
          event.preventDefault();
          rail.scrollTo({ left: rail.scrollWidth, behavior: "smooth" });
          break;
        default:
          break;
      }
    },
    [ref, scrollBy],
  );

  return { canPrev, canNext, page, pageCount, scrollBy, scrollToPage, onKeyDown };
}
