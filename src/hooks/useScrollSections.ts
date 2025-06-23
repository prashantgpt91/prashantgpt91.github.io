
import { useEffect, useState, useCallback } from 'react';

interface ScrollSection {
  id: string;
  element: HTMLElement | null;
}

export const useScrollSections = (sectionIds: string[]) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [sections, setSections] = useState<ScrollSection[]>([]);

  // Initialize sections
  useEffect(() => {
    const sectionElements = sectionIds.map(id => ({
      id,
      element: document.getElementById(id)
    }));
    setSections(sectionElements);
  }, [sectionIds]);

  const scrollToSection = useCallback((sectionIndex: number) => {
    const section = sections[sectionIndex];
    if (section?.element && !isScrolling) {
      setIsScrolling(true);
      section.element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      
      // Reset scrolling flag after animation
      setTimeout(() => {
        setIsScrolling(false);
        setCurrentSection(sectionIndex);
      }, 700); // Reduced duration for faster animation
    }
  }, [sections, isScrolling]);

  const handleWheel = useCallback((event: WheelEvent) => {
    if (isScrolling) {
      // event.preventDefault(); // Allow native scroll snap to work
      return;
    }

    // event.preventDefault(); // Allow native scroll snap to work
    
    // The following logic might be redundant if CSS scroll snap is fully effective.
    // Keeping it commented out for now, can be re-enabled or adapted if needed.
    /*
    if (event.deltaY > 0) {
      // Scrolling down
      const nextSection = Math.min(currentSection + 1, sections.length - 1);
      if (nextSection !== currentSection) {
        scrollToSection(nextSection);
      }
    } else {
      // Scrolling up
      const prevSection = Math.max(currentSection - 1, 0);
      if (prevSection !== currentSection) {
        scrollToSection(prevSection);
      }
    }
    */
  }, [currentSection, sections.length, isScrolling, scrollToSection]);

  useEffect(() => {
    window.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [handleWheel]);

  return {
    currentSection,
    scrollToSection,
    isScrolling
  };
};
