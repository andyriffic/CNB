import React from 'react';
import styled from 'styled-components';
import { ThemedMove } from '../../../contexts/ThemeProvider';

type PlayerWithRevealProps = {
  revealPlayer: boolean;
  revealMove: boolean;
  move: ThemedMove;
  playerAvatarUrl: string;
  position: 'LEFT' | 'RIGHT';
};

const Container = styled.div`
  position: relative;
`;

const PlayerCharacter = styled.img<{
  position: 'LEFT' | 'RIGHT';
  reveal: boolean;
}>`
  width: 20vmin;
  height: 30vmin;
  opacity: ${props => props.reveal ? '1' : '0'};
  transition: opacity 500ms ease-in-out;
  ${props => props.position === 'RIGHT' && 'transform: scaleX(-1);'}
`;

const PlayerMove = styled.img<{ position: 'LEFT' | 'RIGHT'; reveal: boolean }>`
  width: 15vmin;
  height: 15vmin;
  position: absolute;
  top: 25%;
  ${props => (props.position === 'LEFT' ? 'right: -70%' : 'left: -70%')};
  ${props => props.position === 'RIGHT' && 'transform: scaleX(-1);'}
  transition: opacity 500ms ease-in-out;
  opacity: ${props => props.reveal ? '1' : '0'};
`;

export const PlayerWithMoveReveal = ({
  revealPlayer,
  revealMove,
  move,
  playerAvatarUrl,
  position,
}: PlayerWithRevealProps) => {
  return (
    <Container className="margins-off">
      <PlayerCharacter
        position={position}
        reveal={revealPlayer}
        src={`${process.env.REACT_APP_SERVER_ENDPOINT || ''}${playerAvatarUrl}`}
      />
      <PlayerMove
        position={position}
        reveal={revealMove}
        src={`${process.env.REACT_APP_SERVER_ENDPOINT || ''}${move.imageUrl}`}
      />
    </Container>
  );
};
