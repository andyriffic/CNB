import React, { useEffect } from 'react';
import styled from 'styled-components';
import { GameScreen } from '../../components/ui/GameScreen';
import { Board } from './components/Board';
import { generateBoard } from './boards/donkeyBoard';
import gameBoardBackground from './boards/classic-donkey-kong-board.png';
import { usePlayersProvider } from '../../providers/PlayersProvider';
import { GameBoardProvider } from './providers/GameBoardProvider';
import { BarrelProvider } from './providers/BarrelProvider';

const Container = styled.div`
  margin: 0 auto;
`;

const board = generateBoard();
const boardImage = gameBoardBackground;

const boardWidth = '1120px';
const boardHeight = '800px';

const View = () => {
  const { triggerUpdate } = usePlayersProvider();

  useEffect(() => {
    triggerUpdate();
  }, []);

  return (
    <GameScreen scrollable={false}>
      <Container>
        <GameBoardProvider board={board}>
          <BarrelProvider board={board}>
            <Board
              boardImage={boardImage}
              width={boardWidth}
              height={boardHeight}
            />
          </BarrelProvider>
        </GameBoardProvider>
      </Container>
    </GameScreen>
  );
};

export default View;
