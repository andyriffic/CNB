/* @flow */
// flow:disable no typedefs for useState, useEffect yet
import React, { useContext, useEffect, useState } from 'react';
import GameStateContext from '../../contexts/GameStateContext';
import ServerMessagesContext from '../../contexts/ServerMessagesContext';
import useGetGameState from '../hooks/useGetGameState';
import DebugOutput from '../../DebugOutput';
import Switch from '../../components/switch';

import Waiting from './components/waiting';
import Loading from './components/loading';
import TrophyAward from './components/trophy-award';
import { SOUND_KEYS } from '../../sounds/SoundService';
import GameSoundContext from '../../contexts/GameSoundContext';
import { GameSettingsDrawer } from '../../game-settings';
import GameThemeContext from '../../contexts/GameThemeContext';
import TrophyPointsContext from '../../trophy-points/Context';

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
  const trophyPoints = useContext(TrophyPointsContext);

  const [showTrophyAward, setShowTrophyAward] = useState(!!trophyPoints.winner);

  soundService.load();

  useEffect(() => {
    trophyPoints.init();
  }, []);

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

  useEffect(() => {
    if (trophyPoints.winner) {
      setTimeout(() => {
        setShowTrophyAward(true);
      }, 30000);
    } else {
      setShowTrophyAward(false);
    }
  }, [trophyPoints.winner]);

  const ResultScreenComponent = theme.gameplay.resultScreen;

  const resetGame = () => {
    soundService.stopAll();
    serverMessages.resetGame();
    window.location.reload(); // TODO: just being lazy and doing this here. Need to sort out refreshing points after winning a trophy
  };

  const playGame = () => {
    console.log('PLAY GAME');
    // soundService.stop(SOUND_KEYS.WAITING_MUSIC);
    serverMessages.playGame();
  };

  console.log('SPECTATOR, gameState', gameState);

  return (
    <div>
      <GameSettingsDrawer />
      {gameState ? (
        <Switch>
          <Waiting
            showIf={
              waitingStatuses.includes(gameState.status) && !showTrophyAward
            }
            player1={gameState.player1}
            player2={gameState.player2}
            playGame={playGame}
            trophyPoints={trophyPoints}
          />
          <ResultScreenComponent
            showIf={gameState.status === 'FINISHED' && !showTrophyAward}
            result={gameState.result}
            player1={gameState.player1}
            player2={gameState.player2}
            resetGame={resetGame}
            trophyPoints={trophyPoints}
          />
          <TrophyAward
            showIf={showTrophyAward}
            trophyPoints={trophyPoints}
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
