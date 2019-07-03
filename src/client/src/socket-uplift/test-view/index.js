import React from 'react';
import View from './View';
import { GameServiceProvider } from '../socket-context/GameServiceProvider';

export default () => {
  return (
    <GameServiceProvider>
      <View />
    </GameServiceProvider>
  );
};
