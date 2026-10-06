"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type DragEvent,
  type KeyboardEvent,
  type MouseEvent,
  type PointerEvent,
  type RefObject,
} from "react";

type RailState = {
  canPrev: boolean;
  canNext: boolean;
  page: number;
  pageCount: number;
  scrollBy: (direction: "prev" | "next") => void;
  scrollToPage: (page: number) => void;
  onKeyDown: (event: KeyboardEvent<HTMLDivElement>) => void;
  onPointerDown: (event: PointerEvent<HTMLDivElement>) => void;
  onPointerMove: (event: PointerEvent<HTMLDivElement>) => void;
  onPointerUp: (event: PointerEvent<HTMLDivElement>) => void;
  onPointerCancel: (event: PointerEvent<HTMLDivElement>) => void;
  onClick: (event: MouseEvent<HTMLDivElement>) => void;
  onDragStart: (event: DragEvent<HTMLDivElement>) => void;
  isDragging: boolean;
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
  const [isDragging, setIsDragging] = useState(false);
  const hasBeenVisible = useRef(false);
  const shouldResetOnReturn = useRef(false);
  const dragState = useRef<{
    pointerId: number;
    startX: number;
    startScrollLeft: number;
    moved: boolean;
    previousScrollBehavior: string;
  } | null>(null);
  const suppressClick = useRef(false);

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

  const getPageOffsets = useCallback(() => {
    const rail = ref.current;
    if (!rail) {
      return [];
    }

    const maxScroll = Math.max(0, rail.scrollWidth - rail.clientWidth);
    return Array.from(rail.querySelectorAll<HTMLElement>(cardSelector))
      .map((card) => Math.min(card.offsetLeft, maxScroll))
      .filter((offset, index, offsets) => index === 0 || offset > offsets[index - 1]);
  }, [cardSelector, ref]);

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

    const pageOffsets = getPageOffsets();
    const pages = Math.max(1, pageOffsets.length || itemCount);
    setPageCount(pages);
    setPage(
      pageOffsets.length > 0
        ? pageOffsets.reduce(
            (closestIndex, offset, index) =>
              Math.abs(offset - rail.scrollLeft) <
              Math.abs(pageOffsets[closestIndex] - rail.scrollLeft)
                ? index
                : closestIndex,
            0,
          )
        : 0,
    );
  }, [getPageOffsets, itemCount, ref]);

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
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (shouldResetOnReturn.current && !dragState.current) {
            const prefersReducedMotion = window.matchMedia(
              "(prefers-reduced-motion: reduce)",
            ).matches;
            rail.scrollTo({ left: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
            shouldResetOnReturn.current = false;
          }
          hasBeenVisible.current = true;
          return;
        }

        if (hasBeenVisible.current && rail.scrollLeft > EDGE_THRESHOLD) {
          shouldResetOnReturn.current = true;
        }
      },
      { threshold: 0.01 },
    );
    visibilityObserver.observe(rail);

    return () => {
      rail.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
      observer.disconnect();
      visibilityObserver.disconnect();
    };
  }, [ref, itemCount, sync]);

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

      const pageOffsets = getPageOffsets();
      const left = pageOffsets[target] ?? 0;
      rail.scrollTo({ left, behavior: "smooth" });
    },
    [getPageOffsets, ref],
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

  const onPointerDown = useCallback((event: PointerEvent<HTMLDivElement>) => {
    if (!event.isPrimary || event.button !== 0) {
      return;
    }

    const rail = ref.current;
    if (!rail || rail.scrollWidth <= rail.clientWidth) {
      return;
    }

    dragState.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startScrollLeft: rail.scrollLeft,
      moved: false,
      previousScrollBehavior: rail.style.scrollBehavior,
    };
    rail.style.scrollBehavior = "auto";
    suppressClick.current = false;
    rail.setPointerCapture(event.pointerId);
  }, [ref]);

  const onPointerMove = useCallback((event: PointerEvent<HTMLDivElement>) => {
    const drag = dragState.current;
    const rail = ref.current;
    if (!drag || !rail || drag.pointerId !== event.pointerId) {
      return;
    }

    const distance = event.clientX - drag.startX;
    if (!drag.moved && distance === 0) {
      return;
    }

    drag.moved = true;
    suppressClick.current = true;
    setIsDragging(true);
    rail.scrollLeft = drag.startScrollLeft - distance;
    event.preventDefault();
  }, [ref]);

  const finishDrag = useCallback((event: PointerEvent<HTMLDivElement>) => {
    const rail = ref.current;
    const drag = dragState.current;
    if (!drag || drag.pointerId !== event.pointerId) {
      return;
    }

    if (rail?.hasPointerCapture(event.pointerId)) {
      rail.releasePointerCapture(event.pointerId);
    }
    if (rail) {
      rail.style.scrollBehavior = drag.previousScrollBehavior;
    }
    dragState.current = null;
    setIsDragging(false);
  }, [ref]);

  const onClick = useCallback((event: MouseEvent<HTMLDivElement>) => {
    if (!suppressClick.current) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    suppressClick.current = false;
  }, []);

  const onDragStart = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);

  return {
    canPrev,
    canNext,
    page,
    pageCount,
    scrollBy,
    scrollToPage,
    onKeyDown,
    onPointerDown,
    onPointerMove,
    onPointerUp: finishDrag,
    onPointerCancel: finishDrag,
    onClick,
    onDragStart,
    isDragging,
  };
}
