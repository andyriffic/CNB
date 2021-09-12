import React from 'react';
import styled from 'styled-components';
import { PlayerAvatar } from '../../../components/player-avatar';
import { GameBoardCell, GamePlayer } from '../types';

const OFFSET_X_PX = 50;
const OFFSET_Y_PX = 75;

const PositionContainer = styled.div`
  position: absolute;
  transition: all 250ms ease-in-out;
`;

const Container = styled.div`
  position: relative;
`;

const MovesRemaining = styled.div`
  position: absolute;
  bottom: 0;
  background: black;
  color: white;
`;

type Props = {
  gamePlayer: GamePlayer;
};

export const BoardPlayer = ({ gamePlayer }: Props): JSX.Element => {
  return (
    <PositionContainer
      style={{
        top: `${gamePlayer.cell.coordinates.y - OFFSET_Y_PX}px`,
        left: `${gamePlayer.cell.coordinates.x - OFFSET_X_PX}px`,
      }}
    >
      <Container>
        <PlayerAvatar
          player={gamePlayer.player}
          size="small"
          showZodiac={false}
        />
        {gamePlayer.movesRemaining > 0 && (
          <MovesRemaining>{gamePlayer.movesRemaining}</MovesRemaining>
        )}
        {gamePlayer.isMoving && <div>moving...</div>}
      </Container>
    </PositionContainer>
  );
};
