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

const Container = styled.div`
  width: 790px;
  margin: 50px auto;
`;

const board = generateBoard();

export default ({  }: RouteComponentProps) => {
  const soundService = useContext<SoundService>(GameSoundContext);

  useEffect(() => {
    soundService.load();
    soundService.loadJungle();
    soundService.play(JUNGLE_SOUND_KEYS.BACKGROUND_MUSIC);
  }, []);

  return (
    <PlayersProvider>
      <GameBoardProvider>
        <FullPageScreenLayout
          title=""
          alignTop={true}
          scrollable={false}
          bodyStyle={{ backgroundColor: '#335145', backgroundImage: 'none' }}
        >
          <GameSettingsDrawer />
          <Container>
            <Board board={board} />
          </Container>
        </FullPageScreenLayout>
      </GameBoardProvider>
    </PlayersProvider>
  );
};
