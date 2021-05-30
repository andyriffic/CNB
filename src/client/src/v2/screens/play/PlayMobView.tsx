import React, { useState, useContext, useEffect } from 'react';
import { usePlayer } from './hooks/usePlayer';
import { GameScreen } from '../../components/ui/GameScreen';
import { SelectBonusChoice } from './components/SelectBonusChoice';
import { DebugBonusChoice } from './components/DebugBonusChoice';
import { isPersistantFeatureEnabled } from '../../../featureToggle';
import {
  useMobGamePlayer,
  useMugGamePlayer,
} from '../../providers/hooks/useMobGame';
import { LoadingSpinner } from '../../../uplift/components/loading-spinner';
import { MobPlay } from './components/MobPlay';
import { MugPlay } from './components/MugPlay';

type Props = {
  playerId: string;
  mobGameId: string;
};

export const PlayMobView = ({ playerId, mobGameId }: Props) => {
  const player = usePlayer(playerId);
  const { mobGame, mobPlayer, makeMove } = useMobGamePlayer(
    mobGameId,
    playerId
  );
  const {
    mobGame: mobMugGame,
    mugPlayer,
    makeMove: makeMugMove,
  } = useMugGamePlayer(mobGameId, playerId);

  if (!((player && (mobGame && mobPlayer)) || (mobMugGame && mugPlayer))) {
    return <LoadingSpinner text="Loading..." />;
  }

  return (
    <GameScreen scrollable={false} showGameSettings={false}>
      {player && <SelectBonusChoice playerId={player.id} />}
      {player && isPersistantFeatureEnabled('cnb-debug') && (
        <DebugBonusChoice playerId={player.id} />
      )}
      {mobGame && mobPlayer && (
        <MobPlay mobGame={mobGame} mobPlayer={mobPlayer} makeMove={makeMove} />
      )}
      {mobMugGame && mugPlayer && (
        <MugPlay
          mobGame={mobMugGame}
          mugPlayer={mugPlayer}
          makeMove={makeMugMove}
        />
      )}
    </GameScreen>
  );
};
