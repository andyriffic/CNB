/* @flow */
// flow:disable no typedefs for useState, useEffect yet
import React, { useContext, useEffect } from 'react';
import GameStateContext from '../../contexts/GameStateContext';
import ServerMessagesContext from '../../contexts/ServerMessagesContext';
import useGetGameState from '../hooks/useGetGameState';
import DebugOutput from '../../DebugOutput';
import Switch from '../../components/switch';

import Waiting from './components/waiting';
import Loading from './components/loading';
import { SOUND_KEYS } from '../../sounds/SoundService';
import GameSoundContext from '../../contexts/GameSoundContext';
import { GameSettingsDrawer } from '../../game-settings';
import GameThemeContext from '../../contexts/GameThemeContext';

const waitingStatuses = [
  'EMPTY',
  'WAITING_FOR_PLAYER_1',
  'WAITING_FOR_PLAYER_2',
  'READY',
];

const View = () => {
  const gameState = useContext(GameStateContext);
  const serverMessages = useContext(ServerMessagesContext);
  const soundService = useContext(GameSoundContext);
  const theme = useContext(GameThemeContext);

  soundService.load();

  useEffect(() => {
    // Um, pretty bad logic but it'll do. Play a sound if user makes selection
    if (
      gameState &&
      (gameState.status === 'WAITING_FOR_PLAYER_1' ||
        gameState.status === 'WAITING_FOR_PLAYER_2' ||
        gameState.status === 'READY')
    ) {
      soundService.play(SOUND_KEYS.PLAYER_MOVED_SELECTED);
    }
  }, [gameState]);

  useGetGameState();

  const ResultScreenComponent = theme.gameplay.resultScreen;

  const resetGame = () => {
    soundService.stopAll();
    serverMessages.resetGame();
  };

  const playGame = () => {
    console.log('PLAY GAME');
    // soundService.stop(SOUND_KEYS.WAITING_MUSIC);
    serverMessages.playGame();
  };

  return (
    <div>
      <GameSettingsDrawer />
      {gameState ? (
        <Switch>
          <Waiting
            showIf={waitingStatuses.includes(gameState.status)}
            player1={gameState.player1}
            player2={gameState.player2}
            playGame={playGame}
          />
          <ResultScreenComponent
            showIf={gameState.status === 'FINISHED'}
            result={gameState.result}
            player1={gameState.player1}
            player2={gameState.player2}
            resetGame={resetGame}
          />
        </Switch>
      ) : (
        <Loading />
      )}

      <DebugOutput data={gameState} />
    </div>
  );
};

export default View;
