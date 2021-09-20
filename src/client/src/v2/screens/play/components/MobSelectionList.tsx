import React, { useState, useContext, useEffect, useMemo } from 'react';
import { usePlayer } from '../hooks/usePlayer';
import { GameScreen } from '../../../components/ui/GameScreen';
import { SelectBonusChoice } from './SelectBonusChoice';
import { DebugBonusChoice } from './DebugBonusChoice';
import { LoadingSpinner } from '../../../../uplift/components/loading-spinner';
import { Button } from '../../../components/ui/buttons';
import { RouteComponentProps } from '@reach/router';
import { MobGame, useMobProvider } from '../../../providers/MobProvider';
import { Player } from '../../../providers/PlayersProvider';

type Props = {
  playerId: string;
  onMobSelected: (mobGameId: string) => void;
};

export const MobSelectionList = ({ playerId, onMobSelected }: Props) => {
  const { mobGames } = useMobProvider();
  const playerMobGames = useMemo<MobGame[]>(
    () =>
      mobGames
        ? mobGames.filter(
            mg =>
              (mg.mobPlayers.find(mp => mp.playerId === playerId) ||
                mg.mugPlayer.playerId === playerId) &&
              !mg.gameOver
          )
        : [],
    [mobGames]
  );

  if (!playerMobGames.length) {
    return null;
  }

  return (
    <div>
      <h3 style={{ textAlign: 'center' }}>Mobs</h3>
      {playerMobGames.map(mpg => (
        <div key={mpg.id}>
          <Button onClick={() => onMobSelected(mpg.id)}>{mpg.id}</Button>
        </div>
      ))}
    </div>
  );
};
