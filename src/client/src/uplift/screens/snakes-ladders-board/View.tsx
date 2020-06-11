import React, { useEffect, useContext } from 'react';
import styled from 'styled-components';
import { RouteComponentProps } from '@reach/router';
import { FullPageScreenLayout } from '../../components/layouts/FullPageScreenLayout';
import { GameSettingsDrawer } from '../../../game-settings';
import { Board } from './components/Board';
import { generateBoard as generateJungleBoard } from './boards/jungle';
import { generateBoard as generateCandylandBoard } from './boards/candyland';
import jungleBoardImage from './boards/jungle/board-green.jpg';
import candylandBoardImage from './boards/candyland/board.jpg';
import { GameBoardProvider } from './GameBoardContext';
import GameSoundContext from '../../../contexts/GameSoundContext';
import { SoundService } from '../../contexts/types';
import { JUNGLE_SOUND_KEYS } from '../../../sounds/SoundService';

import swingingMonkeyGif from './assets/monkey-swing.gif';
import gorillaGif from './assets/gorilla.gif';
import snakeGif from './assets/snake.gif';
import { PlayersContext } from '../../contexts/PlayersProvider';
import { ConfettiProvider } from '../../contexts/ConfettiProvider';
import { isFeatureEnabled } from '../../../featureToggle';

const Container = styled.div`
  margin: 0 auto;
  /* position: relative; */
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

const board = generateCandylandBoard();

const boardImage = candylandBoardImage;

const boardWidth = 1120;
const boardHeight = 800;

export default ({  }: RouteComponentProps) => {
  const soundService = useContext<SoundService>(GameSoundContext);
  const { triggerUpdate } = useContext(PlayersContext);

  useEffect(() => {
    triggerUpdate();
  }, []);

  useEffect(() => {
    soundService.load();
    soundService.loadJungle();
    // soundService.play(JUNGLE_SOUND_KEYS.BACKGROUND_MUSIC);

    return () => {
      soundService.stopAll();
    };
  }, []);

  return (
    <ConfettiProvider>
      <GameBoardProvider board={board}>
        <FullPageScreenLayout title="" alignTop={true} scrollable={true}>
          {/* <GameSettingsDrawer /> */}
          <Container>
            <Board
              board={board}
              boardImage={boardImage}
              width={boardWidth}
              height={boardHeight}
            />
            {/* <SwingingMonkey src={swingingMonkeyGif} alt="" />
            <Gorilla src={gorillaGif} alt="" />
            <Snake src={snakeGif} alt="" /> */}
          </Container>
        </FullPageScreenLayout>
      </GameBoardProvider>
    </ConfettiProvider>
  );
};
