import React, { useEffect, useContext } from 'react';
import styled from 'styled-components';
import { RouteComponentProps } from '@reach/router';
import { FullPageScreenLayout } from '../../components/layouts/FullPageScreenLayout';
// import { GameSettingsDrawer } from '../../../game-settings';
import { Board } from './components/Board';
import { generateBoard as generateCandylandBoard } from './boards/candyland';
import candylandBoardImage from './boards/candyland/board.png';
import { generateBoard as generateSnakeBoard } from './boards/snake';
import snakeBoardImage from './boards/snake/board.jpg';
import { GameBoardProvider } from './GameBoardContext';
import GameSoundContext from '../../../contexts/GameSoundContext';
import { SoundService } from '../../contexts/types';
import { JUNGLE_SOUND_KEYS } from '../../../sounds/SoundService';
import { PlayersContext } from '../../contexts/PlayersProvider';
import { ConfettiProvider } from '../../contexts/ConfettiProvider';
import { isFeatureEnabled } from '../../../featureToggle';

const Container = styled.div`
  margin: 0 auto;
  /* position: relative; */
`;

const newBoardEnabled = isFeatureEnabled('v2');

const board = newBoardEnabled ? generateSnakeBoard() : generateCandylandBoard();
const boardImage = newBoardEnabled ? snakeBoardImage : candylandBoardImage;

const boardWidth = newBoardEnabled ? '1120px' : '1120px';
const boardHeight = newBoardEnabled ? '800px' : '800px';

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
