/* @flow */
// flow:disable no typedefs for useState, useEffect yet
import React, {useContext, useState, useEffect} from 'react';
import GameStateContext from '../../contexts/GameStateContext';
import ServerMessagesContext from '../../contexts/ServerMessagesContext';
import useGetGameState from '../hooks/useGetGameState';
import DebugOutput from '../../DebugOutput';
import Switch from '../../components/switch';

import Waiting from './components/waiting';
import Loading from './components/loading';
import Ready from './components/ready';
import Countdown from './components/countdown';
import {SOUND_KEYS} from '../../sounds/SoundService';
import GameSoundContext from '../../contexts/GameSoundContext';
import {GameSettingsDrawer} from '../../game-settings';
import GameThemeContext from '../../contexts/GameThemeContext';

const waitingStatuses = ['EMPTY', 'WAITING_FOR_PLAYER_1', 'WAITING_FOR_PLAYER_2'];

const View = () => {
  const [showCountdown, setShowCountdown] = useState(null);
  const gameState = useContext(GameStateContext);
  const serverMessages = useContext(ServerMessagesContext);
  const soundService = useContext(GameSoundContext);
  const theme = useContext(GameThemeContext);

  soundService.load();

  useEffect(() => {
    if (gameState && gameState.status === 'FINISHED') {
      setShowCountdown(true);
      setTimeout(() => {
        setShowCountdown(false);
      }, 3500);
    }
  }, [gameState]);

  useEffect(() => {
    if(gameState && gameState.status === 'FINISHED' ) {
      soundService.stop(SOUND_KEYS.WAITING_MUSIC);
    }

    if (gameState && gameState.status !== 'FINISHED') {
      soundService.play(SOUND_KEYS.WAITING_MUSIC);
    }
  }, [gameState]);

  useEffect(() => {
    //Um, pretty bad logic but it'll do. Play a sound if user makes selection
    if (gameState &&
      (gameState.status === 'WAITING_FOR_PLAYER_1' || gameState.status === 'WAITING_FOR_PLAYER_2' | gameState.status === 'READY')) {
      soundService.play(SOUND_KEYS.PLAYER_MOVED_SELECTED);
    }
  }, [gameState]);

  useGetGameState();

  const ResultScreenComponent = theme.gameplay.resultScreen;

  const resetGame = () => {
    soundService.stopAll();
    serverMessages.resetGame();
  };

  return (
    <React.Fragment>
      <GameSettingsDrawer/>
      {
        gameState ? (
          <Switch>
            <Waiting
              showIf={waitingStatuses.includes(gameState.status)}
              player1={gameState.player1}
              player2={gameState.player2}/>
            <Ready
              showIf={gameState.status === 'READY'}
              player1={gameState.player1}
              player2={gameState.player2}
              playGame={serverMessages.playGame}
            />
            <Countdown
              showIf={gameState.status === 'FINISHED' && (showCountdown !== null && showCountdown === true)}
            />
            <ResultScreenComponent
              showIf={gameState.status === 'FINISHED' && (showCountdown !== null && showCountdown === false)}
              result={gameState.result}
              player1={gameState.player1}
              player2={gameState.player2}
              resetGame={resetGame}
            />
          </Switch>
        ) : (
          <Loading/>
        )
      }

      <DebugOutput data={gameState}/>
    </React.Fragment>
  );
};

export default View;
