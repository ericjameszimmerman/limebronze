import React, { createContext, useState, ReactNode } from 'react';

interface ViewBoxContextType {
  scale: number;
  setScale: (scale: number) => void;
  stagePos: { x: number; y: number };
  setStagePos: (pos: { x: number; y: number }) => void;
}

export const ViewBoxContext = createContext<ViewBoxContextType | undefined>(undefined);

export const ViewBoxProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [scale, setScale] = useState(1);
  const [stagePos, setStagePos] = useState({ x: 0, y: 0 });

  return (
    <ViewBoxContext.Provider value={{ scale, setScale, stagePos, setStagePos }}>
      {children}
    </ViewBoxContext.Provider>
  );
};
