import React, { useContext, useEffect } from 'react';
import { GameServiceContext } from '../socket-context/GameServiceProvider';
import { DebugView } from './DebugView';

export const GameStateView = () => {
  const { game } = useContext(GameServiceContext);
  useEffect(() => {
    console.log('GameStateView::mount');
  }, []);

  return <DebugView title="Game" value={game} />;
};
