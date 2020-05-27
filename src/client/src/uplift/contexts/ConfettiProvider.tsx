import React, { useState, useRef, ReactNode } from 'react';
import Confetti from 'react-confetti';

export type ConfettiService = {
  isRunning: boolean;
  setConfettiOn: (on: boolean) => void;
};

export const ConfettiContext = React.createContext<ConfettiService>({
  isRunning: false,
  setConfettiOn: () => {
    console.log('NOT IMPLEMENTED');
  },
});

export const ConfettiProvider = ({ children }: { children: ReactNode }) => {
  const [confettiRun, setConfettiRun] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const temp = (on: boolean) => {
    console.log('CONTEXT CONFETTI ON', on);
  };

  return (
    <ConfettiContext.Provider
      value={{
        isRunning: confettiRun,
        setConfettiOn: setConfettiRun,
      }}
    >
      <div className="margins-off">
        <Confetti
          style={{}}
          canvasRef={canvasRef}
          run={true}
          numberOfPieces={confettiRun ? 500 : 0}
        ></Confetti>
        {children}
      </div>
    </ConfettiContext.Provider>
  );
};
