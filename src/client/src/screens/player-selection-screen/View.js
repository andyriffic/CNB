/* @flow */
// flow:disable no typedefs for useState, useEffect yet
import React, { useContext, useState } from 'react';

import useGetGameState from '../hooks/useGetGameState';
import usePlayerState from './hooks/usePlayerState';
import SelectMove from './components/select-move';
import SelectedMove from './components/selected-move';
import SelectPowerUp from './components/select-power-up';
import GameResult from './components/game-result';
import ServerMessagesContext from '../../contexts/ServerMessagesContext';
import GameStateContext from '../../contexts/GameStateContext';
import Switch from '../../components/switch';
import PageLayout from '../../components/page-layout/FullPage';

import { safeGetTranslation } from '../../components/translated-player-name/View';
import PowerUpContext from '../../contexts/PowerUpContext';

type Props = {
  // todo: do better than this
  playerKey: 'XIAN' | 'MELB',
};

const hasGameResult = gameState => !!(gameState && gameState.result);
const playerHasMoved = (gameState, playerState) =>
  playerState && playerState.player && playerState.player.moved;

const View = ({ playerKey }: Props) => {
  const playerState = usePlayerState(playerKey);
  const [selectedMove, setSelectedMove] = useState(null);
  const [selectedPowerUp, setSelectedPowerUp] = useState(null);
  const serverMessages = useContext(ServerMessagesContext);
  const gameState = useContext(GameStateContext);
  const powerUps = useContext(PowerUpContext);

  console.log('player powerups', powerUps[playerKey]);

  useGetGameState();

  const onSelection = move => {
    serverMessages.makeMove(playerState.slot, move);
  };

  const onPowerUpSelected = powerUp => {
    setSelectedPowerUp(powerUp);
  };

  if (!playerState) return null;

  return (
    <PageLayout pageTitle={safeGetTranslation(playerState.player.name)}>
      <Switch>
        <SelectPowerUp
          showIf={!selectedPowerUp}
          playerKey={playerKey}
          onPowerUpSelected={onPowerUpSelected}
        />
        <SelectMove
          showIf={
            selectedPowerUp && !hasGameResult(gameState) && !playerHasMoved(gameState, playerState)
          }
          onSelection={onSelection}
        />
        <SelectedMove
          showIf={
            !hasGameResult(gameState) && playerHasMoved(gameState, playerState)
          }
          title="You chose 你选择了"
          selectedMove={playerState.player.move}
        />
        <GameResult
          showIf={hasGameResult(gameState)}
          gameState={gameState}
          playerState={playerState}
        />
      </Switch>
    </PageLayout>
  );
};

export default View;
