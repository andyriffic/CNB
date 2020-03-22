import React, { useContext } from 'react';
import { ConfettiContext } from '../../contexts/ConfettiProvider';

export const ConfettiTrigger = () => {
  const { isRunning, setConfettiOn } = useContext(ConfettiContext);

  return (
    <React.Fragment>
      <input
        id="confetti_enabled"
        type="checkbox"
        checked={isRunning}
        onChange={e => setConfettiOn(e.target.checked)}
      />
      <label htmlFor="confetti_enabled">confetti</label>
    </React.Fragment>
  );
};
