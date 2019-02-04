/* @flow */
// flow:disable no typedefs for useState, useEffect yet
import React, { useContext } from 'react';

import useGetGameState from '../hooks/useGetGameState';
import usePlayerState from './hooks/usePlayerState';
import SelectMove from './components/select-move';
import SelectedMove from './components/selected-move';
import GameResult from './components/game-result';
import ServerMessagesContext from '../../contexts/ServerMessagesContext';
import GameStateContext from '../../contexts/GameStateContext';
import Switch from '../../components/switch';
import PageLayout from '../../components/page-layout/FullPage';

import { safeGetTranslation } from '../../components/translated-player-name/View';

type Props = {
  // todo: do better than this
  playerKey: 'AUS' | 'NZ',
};

const hasGameResult = gameState => !!(gameState && gameState.result);
const playerHasMoved = (gameState, playerState) =>
  playerState && playerState.player && playerState.player.moved;

const View = ({ playerKey }: Props) => {
  const playerState = usePlayerState(playerKey);
  const serverMessages = useContext(ServerMessagesContext);
  const gameState = useContext(GameStateContext);

  useGetGameState();

  const onSelection = move => {
    serverMessages.makeMove(playerState.slot, move);
  };

  if (!playerState) return null;

  return (
    <PageLayout pageTitle={safeGetTranslation(playerState.player.name)}>
      <Switch>
        <SelectMove
          showIf={
            !hasGameResult(gameState) && !playerHasMoved(gameState, playerState)
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
