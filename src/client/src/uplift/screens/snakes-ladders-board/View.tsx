import React, { useEffect, useContext } from 'react';
import styled from 'styled-components';
import { RouteComponentProps } from '@reach/router';
import { PlayersProvider } from '../../contexts/PlayersProvider';
import { FullPageScreenLayout } from '../../components/layouts/FullPageScreenLayout';
import { GameSettingsDrawer } from '../../../game-settings';
import { Board } from './components/Board';
import { generateBoard } from './board';
import { GameBoardProvider } from './GameBoardContext';
import GameSoundContext from '../../../contexts/GameSoundContext';
import { SoundService } from '../../contexts/types';
import { JUNGLE_SOUND_KEYS } from '../../../sounds/SoundService';

import swingingMonkeyGif from './assets/monkey-swing.gif';
import gorillaGif from './assets/gorilla.gif';
import snakeGif from './assets/snake.gif';

const Container = styled.div`
  width: 790px;
  margin: 50px auto;
  position: relative;
`;

const SwingingMonkey = styled.img`
  position: absolute;
  top: -70px;
  left: -130px;
  width: 200px;
`;

const Gorilla = styled.img`
  position: absolute;
  bottom: 40px;
  left: -40px;
  width: 100px;
`;

const Snake = styled.img`
  position: absolute;
  top: 30px;
  right: -40px;
  width: 100px;
`;

const board = generateBoard();

export default ({  }: RouteComponentProps) => {
  const soundService = useContext<SoundService>(GameSoundContext);

  useEffect(() => {
    soundService.load();
    soundService.loadJungle();
    soundService.play(JUNGLE_SOUND_KEYS.BACKGROUND_MUSIC);

    return () => {
      soundService.stop(JUNGLE_SOUND_KEYS.BACKGROUND_MUSIC);
    };
  }, []);

  return (
    <PlayersProvider>
      <GameBoardProvider>
        <FullPageScreenLayout
          title=""
          alignTop={true}
          scrollable={false}
          bodyStyle={{ backgroundColor: '#fed357', backgroundImage: 'none' }}
        >
          <GameSettingsDrawer />
          <Container>
            <Board board={board} />
            <SwingingMonkey src={swingingMonkeyGif} alt="" />
            <Gorilla src={gorillaGif} alt="" />
            <Snake src={snakeGif} alt="" />
          </Container>
        </FullPageScreenLayout>
      </GameBoardProvider>
    </PlayersProvider>
  );
};
