import React, { useContext, useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { ThemedMove } from '../../../contexts/ThemeProvider';
import star from './star-md.png';
import {
  rotateAnimation,
  growAnimation,
  shakeAnimationRight,
  shakeAnimationLeft,
  hadoukenAnimation,
  spinAwayAnimationRight,
  spinAwayAnimationLeft,
} from '../../../components/animations';
import { SOCKETS_ENDPOINT } from '../../../../environment';
import hadoukenImage from './hadouken-ball.png';
import GameSoundContext from '../../../../contexts/GameSoundContext';
import { SoundService } from '../../../contexts/types';
import { SOUND_KEYS } from '../../../../sounds/SoundService';

type PlayerWithRevealProps = {
  revealPlayer: boolean;
  revealMove: boolean;
  move: ThemedMove;
  playerAvatarUrl: string;
  position: 'LEFT' | 'RIGHT';
  winner: boolean;
  revealResult: boolean;
  playWinnerAnimation: boolean;
  playLoserAnimation: boolean;
};

const blowAwayCssLeft = css`
  animation: ${spinAwayAnimationLeft} 1s ease-in-out 1 forwards;
`;

const blowAwayCssRight = css`
  animation: ${spinAwayAnimationRight} 1s ease-in-out 1 forwards;
`;

const Container = styled.div<{
  playLoserAnimation: boolean;
  position: 'LEFT' | 'RIGHT';
}>`
  ${props =>
    props.playLoserAnimation && (props.position === 'LEFT'
      ? blowAwayCssLeft
      : blowAwayCssRight)}
`;

const shakeCssLeft = css`
  animation: ${shakeAnimationLeft} 2s infinite;
`;

const shakeCssRight = css`
  transform-origin: center;
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

const Hadouken = styled.div`
  position: relative;
  width: 50px;
  height: 50px;
  background: transparent url(${hadoukenImage}) no-repeat center center;
  background-size: contain;
  animation: ${hadoukenAnimation} 2s linear 1 0s forwards;
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
  revealResult,
  playWinnerAnimation,
  playLoserAnimation,
}: PlayerWithRevealProps) => {
  const soundService = useContext<SoundService>(GameSoundContext);

  const winnerSoundPlayed = useRef(false);
  const loserSoundPlayed = useRef(false);

  useEffect(() => {
    if (playWinnerAnimation && !winnerSoundPlayed.current) {
      soundService.play(SOUND_KEYS.HADOUKEN);
      winnerSoundPlayed.current = true;
    }
  }, [playWinnerAnimation]);

  useEffect(() => {
    if (playLoserAnimation && !loserSoundPlayed.current) {
      soundService.play(SOUND_KEYS.SCREAM);
      loserSoundPlayed.current = true;
    }
  }, [playLoserAnimation]);

  return (
    <Container
      className="margins-off"
      position={position}
      playLoserAnimation={playLoserAnimation && !winner}
    >
      <PlayerCharacter
        position={position}
        reveal={revealPlayer}
        winner={revealResult && winner}
        src={`${SOCKETS_ENDPOINT}${playerAvatarUrl}`}
      />
      <PlayerMoveContainer
        position={position}
        reveal={revealMove}
        className="margins-off"
      >
        {revealResult && winner && (
          <WinnerIndicator position={position} reveal={revealMove} />
        )}
        <PlayerMove
          position={position}
          reveal={revealMove}
          src={`${SOCKETS_ENDPOINT}${move.imageUrl}`}
        />
        {playWinnerAnimation && winner && <Hadouken />}
      </PlayerMoveContainer>
    </Container>
  );
};
