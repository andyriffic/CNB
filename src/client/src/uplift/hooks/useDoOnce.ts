import { useRef, useEffect } from 'react';

/** 
  Fire an event once when condition goes from false to true.
  Will not fire if initial condition is true.
*/
export const useDoOnce = (isTrue: boolean, callback: () => void) => {
  const initialValue = useRef(isTrue);
  const hasTriggered = useRef(false);

  useEffect(() => {
    console.log('DOING ONCE...', callback, hasTriggered.current, isTrue);

    if (!hasTriggered.current && isTrue) {
      hasTriggered.current = true;
      callback();
    }
  }, [isTrue]);
};
