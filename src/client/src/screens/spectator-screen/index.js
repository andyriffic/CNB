/* @flow */
import React from 'react';
import View from './View';
import Sound from '../../sounds/Provider';
import GameSettings from '../../game-settings';
import TrophyPointsProvider from '../../trophy-points/Provider';

const ViewWithSound = () => (
  <Sound>
    <GameSettings>
      <TrophyPointsProvider>
        <View />
      </TrophyPointsProvider>
    </GameSettings>
  </Sound>
);
export default ViewWithSound;
