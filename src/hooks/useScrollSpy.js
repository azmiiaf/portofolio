import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Tracks which section is currently visible in the viewport.
 * @param {string[]} sectionIds - Array of section element IDs to spy on.
 * @returns {string} - The ID of the currently active section.
 */
export function useScrollSpy(sectionIds) {
  const [activeId, setActiveId] = useState('');
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== '/') {
      setActiveId('');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0,
      }
    );

    const timeoutId = setTimeout(() => {
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [sectionIds, location.pathname]);

  return activeId;
}
