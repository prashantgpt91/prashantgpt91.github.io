import React, { useState, useEffect, useRef, useCallback } from 'react';

interface VirtualScrollListProps<T> {
  items: T[];
  itemHeight: number;
  containerHeight: number;
  renderItem: (item: T, index: number) => React.ReactNode;
  className?: string;
  overscan?: number; // Number of items to render outside visible area
}

export function VirtualScrollList<T>({
  items,
  itemHeight,
  containerHeight,
  renderItem,
  className = '',
  overscan = 5
}: VirtualScrollListProps<T>) {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalHeight = items.length * itemHeight;
  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(
    startIndex + Math.ceil(containerHeight / itemHeight) + overscan,
    items.length - 1
  );

  const visibleItems = items.slice(
    Math.max(0, startIndex - overscan),
    endIndex + 1
  );

  const offsetY = Math.max(0, (startIndex - overscan) * itemHeight);

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`overflow-auto ${className}`}
      style={{ height: containerHeight }}
      onScroll={handleScroll}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div
          style={{
            transform: `translateY(${offsetY}px)`,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
          }}
        >
          {visibleItems.map((item, index) => {
            const actualIndex = Math.max(0, startIndex - overscan) + index;
            return (
              <div key={actualIndex} style={{ height: itemHeight }}>
                {renderItem(item, actualIndex)}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Hook for calculating optimal item height based on content
export function useItemHeight(sampleContent: string, className: string = '') {
  const [height, setHeight] = useState(200); // Default height
  
  useEffect(() => {
    // Create a temporary element to measure height
    const tempElement = document.createElement('div');
    tempElement.className = className;
    tempElement.style.visibility = 'hidden';
    tempElement.style.position = 'absolute';
    tempElement.style.top = '-9999px';
    tempElement.innerHTML = sampleContent;
    
    document.body.appendChild(tempElement);
    const measuredHeight = tempElement.offsetHeight;
    document.body.removeChild(tempElement);
    
    setHeight(Math.max(measuredHeight, 150)); // Minimum height of 150px
  }, [sampleContent, className]);
  
  return height;
}
