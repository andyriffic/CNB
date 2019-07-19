import React from 'react';
import View from './View';
import Sound from '../../sounds/Provider';
import GameSettings from '../../game-settings';

const ViewWithSound = () => (
  <Sound>
    <GameSettings>
      <View />
    </GameSettings>
  </Sound>
);
export default ViewWithSound;
