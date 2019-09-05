import React, { useContext } from 'react';
import { ConfettiContext } from '../../contexts/ConfettiProvider';

export const ConfettiTrigger = () => {
  const { isRunning, setConfettiOn } = useContext(ConfettiContext);

  return (
    <input
      type="checkbox"
      checked={isRunning}
      onChange={e => setConfettiOn(e.target.checked)}
    />
  );
};
