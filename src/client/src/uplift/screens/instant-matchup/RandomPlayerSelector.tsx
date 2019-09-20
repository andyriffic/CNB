import React from 'react';
import { Player } from '../../contexts/PlayersProvider';

type RandomPlayerSelectorProps = {
  selectedPlayer?: Player;
  reroll: () => void;
};

export const RandomPlayerSelector = ({
  selectedPlayer,
  reroll,
}: RandomPlayerSelectorProps) => {
  return (
    <div>
      <h2>{selectedPlayer && selectedPlayer.name}</h2>
      {selectedPlayer && <button onClick={reroll}>Someone else</button>}
    </div>
  );
};
