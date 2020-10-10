import React, { useEffect } from 'react';
import styled from 'styled-components';
import { GameScreen } from '../../components/ui/GameScreen';
import { Board } from './components/Board';
import { generateBoard } from './boards/snake';
import boardSnakeImage from './boards/snake/board.jpg';
import { usePlayersProvider } from '../../providers/PlayersProvider';
import { GameBoardProvider } from './providers/GameBoardProvider';

const Container = styled.div`
  margin: 0 auto;
`;

const board = generateBoard();
const boardImage = boardSnakeImage;

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
          <Board
            boardImage={boardImage}
            width={boardWidth}
            height={boardHeight}
          />
        </GameBoardProvider>
      </Container>
    </GameScreen>
  );
};

export default View;
