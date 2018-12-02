/* @flow */
// flow:disable no typedefs for useState, useEffect yet
import React, {useContext} from 'react';

import useGetGameState from '../hooks/useGetGameState';
import usePlayerState from './hooks/usePlayerState';
import DebugOutput from '../../DebugOutput';
import SelectMove from './components/select-move';
import SelectedMove from './components/selected-move';
import GameResult from './components/game-result';
import ServerMessagesContext from '../../contexts/ServerMessagesContext';
import GameStateContext from '../../contexts/GameStateContext';
import Switch from '../../components/switch';
import { Page, PageHeader, PageBody } from '../styled';

import TranslatedPlayerName from '../../components/translated-player-name';
import GameThemeContext from '../../contexts/GameThemeContext';

type Props = {
  //todo: do better than this
  playerKey: 'XIAN'|'MELB',
};

const hasGameResult = (gameState) => !!(gameState && gameState.result);
const playerHasMoved = (gameState, playerState) => playerState && playerState.player && playerState.player.moved;

const View = ( { playerKey }: Props ) => {
  const theme = useContext(GameThemeContext);
  const playerState = usePlayerState(playerKey);
  const serverMessages = useContext(ServerMessagesContext);
  const gameState = useContext(GameStateContext);

  useGetGameState();

  const onSelection = (move) => {
    serverMessages.makeMove(playerState.slot, move);
  }

  if (!playerState) return null;

  return (
    <Page { ...theme.style }>
      <PageHeader { ...theme.style }>
        <TranslatedPlayerName playerName={playerState.player.name} />
      </PageHeader>
      <PageBody column={ true }>
        <Switch>
          <SelectMove showIf={ !hasGameResult(gameState) && !playerHasMoved(gameState, playerState) } onSelection={ onSelection }/>
          <SelectedMove
            showIf={ !hasGameResult(gameState) && playerHasMoved(gameState, playerState) }
            title="You chose 你选择了"
            selectedMove={ playerState.player.move }/>
          <GameResult
            showIf={ hasGameResult(gameState) }
            gameState={ gameState }
            playerState={ playerState } />
        </Switch>
      </PageBody>
      <DebugOutput data={ playerState } />
      <DebugOutput data={ gameState } />
    </Page>
  )
}

export default View;
