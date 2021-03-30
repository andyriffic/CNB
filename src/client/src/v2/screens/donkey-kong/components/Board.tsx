import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { GameBoard } from '../types';
import { BoardCell } from './BoardCell';
import { BoardPlayer, ANIMATION_TIMEOUT_MS } from './BoardPlayer';
import { useGameBoardProvider } from '../providers/GameBoardProvider';
import { PositionedPlayer } from './PositionedPlayer';
import { LoadingSpinner } from '../../../../uplift/components/loading-spinner';
import { Barrels } from './Barrels';

const BoardContainer = styled.div<{
  boardImage: any;
  width: string;
  height: string;
}>`
  width: ${props => props.width};
  height: ${props => props.height};
  background: transparent url(${props => props.boardImage}) no-repeat top left;
  background-size: contain;
  position: relative;
  margin: 0 auto;
`;

type Props = {
  boardImage: any;
  width: string;
  height: string;
};

export const Board = ({ boardImage, width, height }: Props) => {
  const { gameBoardPlayers, cellsWithPlayers } = useGameBoardProvider();
  const [createBarrels, setCreateBarrels] = useState(false);
  const [throwBarrels, setThrowBarrels] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setCreateBarrels(true);
      setTimeout(() => {
        setThrowBarrels(true);
      }, 4000);
    }, 2000);
  }, []);

  if (!(gameBoardPlayers.length && cellsWithPlayers.length)) {
    return <LoadingSpinner text="Loading players" />;
  }

  return (
    <BoardContainer boardImage={boardImage} width={width} height={height}>
      {cellsWithPlayers.map(cell => (
        <BoardCell key={cell.number} cell={cell} />
      ))}
      {gameBoardPlayers.map(boardPlayer => {
        return (
          <PositionedPlayer
            key={`${boardPlayer.player.id}`}
            cell={cellsWithPlayers[boardPlayer.boardCellIndex]}
            playerId={boardPlayer.player.id}
          >
            <BoardPlayer
              gameBoardPlayer={boardPlayer}
              cell={cellsWithPlayers[boardPlayer.boardCellIndex]}
            />
          </PositionedPlayer>
        );
      })}
      <Barrels
        autoCreateBarrels={createBarrels}
        autoThrowBarrels={throwBarrels}
      />
    </BoardContainer>
  );
};
