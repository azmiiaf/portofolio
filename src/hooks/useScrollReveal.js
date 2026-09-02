import { useEffect, useRef } from 'react';

/**
 * Reveals elements marked with data-reveal when they enter the viewport.
 * Call once at the page/layout level.
 */
export function useScrollReveal() {
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[data-reveal]');
    elements.forEach((element) => observerRef.current?.observe(element));

    return () => observerRef.current?.disconnect();
  }, []);
}
