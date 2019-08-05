import React from 'react';
import styled, { css } from 'styled-components';
import { ThemedMove } from '../../../contexts/ThemeProvider';
import star from './star-md.png';
import {
  rotateAnimation,
  growAnimation,
  shakeAnimationRight,
  shakeAnimationLeft,
} from '../../../components/animations';
import { SOCKETS_ENDPOINT } from '../../../../environment';

type PlayerWithRevealProps = {
  revealPlayer: boolean;
  revealMove: boolean;
  move: ThemedMove;
  playerAvatarUrl: string;
  position: 'LEFT' | 'RIGHT';
  winner: boolean;
};

const Container = styled.div`
  position: relative;
`;

const shakeCssLeft = css`
  animation: ${shakeAnimationLeft} 2s infinite;
`;

const shakeCssRight = css`
  animation: ${shakeAnimationRight} 2s infinite;
`;

const PlayerCharacter = styled.img<{
  position: 'LEFT' | 'RIGHT';
  reveal: boolean;
  winner: boolean;
}>`
  width: 20vmin;
  height: 30vmin;
  opacity: ${props => (props.reveal ? '1' : '0')};
  transition: opacity 500ms ease-in-out;
  ${props => props.position === 'RIGHT' && 'transform: scaleX(-1);'}
  ${props =>
    props.reveal &&
    props.winner &&
    (props.position === 'RIGHT' ? shakeCssRight : shakeCssLeft)}
`;

const WinnerIndicator = styled.div<{
  position: 'LEFT' | 'RIGHT';
  reveal: boolean;
}>`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: transparent url(${star}) no-repeat center center;
  background-size: contain;
  animation: ${growAnimation} 300ms linear 0s backwards,
    ${rotateAnimation} 5s linear 300ms infinite;
`;

const PlayerMoveContainer = styled.div<{
  position: 'LEFT' | 'RIGHT';
  reveal: boolean;
}>`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20vmin;
  height: 20vmin;
  top: 25%;
  ${props => (props.position === 'LEFT' ? 'right: -70%' : 'left: -70%')};
  ${props => props.position === 'RIGHT' && 'transform: scaleX(-1);'}
`;

const PlayerMove = styled.img<{ position: 'LEFT' | 'RIGHT'; reveal: boolean }>`
  width: 80%;
  height: 80%;
  transition: opacity 500ms ease-in-out;
  opacity: ${props => (props.reveal ? '1' : '0')};
  position: absolute;
`;

export const PlayerWithMoveReveal = ({
  revealPlayer,
  revealMove,
  move,
  playerAvatarUrl,
  position,
  winner,
}: PlayerWithRevealProps) => {
  return (
    <Container className="margins-off">
      <PlayerCharacter
        position={position}
        reveal={revealPlayer}
        winner={winner}
        src={`${SOCKETS_ENDPOINT}${playerAvatarUrl}`}
      />
      <PlayerMoveContainer
        position={position}
        reveal={revealMove}
        className="margins-off"
      >
        {winner && <WinnerIndicator position={position} reveal={revealMove} />}
        <PlayerMove
          position={position}
          reveal={revealMove}
          src={`${SOCKETS_ENDPOINT}${move.imageUrl}`}
        />
      </PlayerMoveContainer>
    </Container>
  );
};
