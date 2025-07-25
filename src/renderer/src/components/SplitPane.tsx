import React, { useState, useRef, useCallback } from 'react';

interface SplitPaneProps {
  children: [React.ReactNode, React.ReactNode];
  split?: 'vertical' | 'horizontal';
  defaultSize?: string;
}

const SplitPane: React.FC<SplitPaneProps> = ({ children, split = 'vertical' }) => {
  const [size, setSize] = useState(50);
  const splitPaneRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (splitPaneRef.current) {
        const rect = splitPaneRef.current.getBoundingClientRect();
        if (split === 'vertical') {
          const newSize = ((e.clientX - rect.left) / rect.width) * 100;
          setSize(Math.max(10, Math.min(90, newSize)));
        } else {
          const newSize = ((e.clientY - rect.top) / rect.height) * 100;
          setSize(Math.max(10, Math.min(90, newSize)));
        }
      }
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [split]);

  const styleA = split === 'vertical' ? { width: `${size}%` } : { height: `${size}%` };
  const styleB = split === 'vertical' ? { width: `${100 - size}%` } : { height: `${100 - size}%` };

  return (
    <div ref={splitPaneRef} className={`flex ${split === 'vertical' ? 'flex-row' : 'flex-col'} w-full h-full`}>
      <div style={styleA}>{children[0]}</div>
      <div
        className={`cursor-col-resize bg-gray-300 hover:bg-gray-400 ${split === 'vertical' ? 'w-2' : 'h-2'}`}
        onMouseDown={handleMouseDown}
      />
      <div style={styleB}>{children[1]}</div>
    </div>
  );
};

export default SplitPane;
