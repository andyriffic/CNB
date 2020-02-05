import React, { useContext, useRef, useEffect } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { ThemedMove } from '../../../contexts/ThemeProvider';
import star from './star-md.png';
import {
  rotateAnimation,
  growAnimation,
  shakeAnimationRight,
  shakeAnimationLeft,
  spinAwayAnimationRight,
  spinAwayAnimationLeft,
  spinAwayAnimationUp,
} from '../../../components/animations';
import { SOCKETS_ENDPOINT } from '../../../../environment';
import hadoukenImage from './hadouken-ball.png';
import GameSoundContext from '../../../../contexts/GameSoundContext';
import { SoundService } from '../../../contexts/types';
import { SOUND_KEYS } from '../../../../sounds/SoundService';
import { useDoOnce } from '../../../hooks/useDoOnce';
import { selectRandomOneOf } from '../../../utils/random';

type PlayerWithRevealProps = {
  playerId: string | null;
  revealPlayer: boolean;
  revealMove: boolean;
  move: ThemedMove;
  playerAvatarUrl: string;
  position: 'LEFT' | 'RIGHT';
  winner: boolean;
  showWinnerMoveHighlight: boolean;
  draw: boolean;
  revealResult: boolean;
  playWinnerAnimation: boolean;
  playLoserAnimation: boolean;
};

const blowAwayCssUp = css`
  animation: ${spinAwayAnimationUp} 1s ease-in-out 1 forwards;
`;

const Container = styled.div<{
  playLoserAnimation: boolean;
  position: 'LEFT' | 'RIGHT';
}>`
  ${props => props.playLoserAnimation && blowAwayCssUp}
`;

const shakeCssLeft = css`
  animation: ${shakeAnimationLeft} 2s infinite;
`;

const shakeCssRight = css`
  transform-origin: center;
  animation: ${shakeAnimationRight} 2s infinite;
`;

const attackLeft = keyframes`
  0% {transform: translate(0, 0);}
  50% {transform: translate(400px, 0);}
  100% {transform: translate(0, 0);}
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

const PlayerMove = styled.img<{
  position: 'LEFT' | 'RIGHT';
  reveal: boolean;
  playWinnerAnimation: boolean;
  playLoserAnimation: boolean;
}>`
  width: 80%;
  height: 80%;
  transition: opacity 500ms ease-in-out;
  opacity: ${props => (props.reveal ? '1' : '0')};
  position: absolute;
  ${props =>
    props.playWinnerAnimation &&
    css`
      animation: ${attackLeft} 400ms linear 0s 1 forwards;
    `}

  ${props =>
    props.playLoserAnimation &&
    css`
      animation: ${spinAwayAnimationLeft} 800ms linear 200ms 1 forwards;
    `}
`;

export const PlayerWithMoveRevealTimebomb = ({
  playerId,
  revealPlayer,
  revealMove,
  move,
  playerAvatarUrl,
  position,
  winner,
  showWinnerMoveHighlight,
  draw,
  revealResult,
  playWinnerAnimation,
  playLoserAnimation,
}: PlayerWithRevealProps) => {
  const soundService = useContext<SoundService>(GameSoundContext);

  useDoOnce(draw && playWinnerAnimation, () => {
    soundService.play(SOUND_KEYS.DRAW);
  });

  useDoOnce(winner && playLoserAnimation, () => {
    // Timebomb has gone off
    soundService.play(
      selectRandomOneOf([
        SOUND_KEYS.SCREAM_01,
        SOUND_KEYS.SCREAM_02,
        SOUND_KEYS.SCREAM_03,
        SOUND_KEYS.SCREAM_04,
      ])
    );
  });

  useDoOnce(!draw && winner && playWinnerAnimation, () => {
    // Player has winning move
    soundService.play(SOUND_KEYS.MOVE_ATTACH_WHOOSH);
  });

  useDoOnce(!draw && !winner && playWinnerAnimation, () => {
    // Player has losing move
    soundService.play(SOUND_KEYS.MOVE_LOSE);
  });

  return (
    <Container
      className="margins-off"
      position={position}
      playLoserAnimation={playLoserAnimation && !winner}
    >
      <PlayerCharacter
        position={position}
        reveal={revealPlayer}
        winner={revealResult && winner && showWinnerMoveHighlight}
        src={`${SOCKETS_ENDPOINT}${playerAvatarUrl}`}
      />
      <PlayerMoveContainer
        position={position}
        reveal={revealMove}
        className="margins-off"
      >
        {revealResult && showWinnerMoveHighlight && (
          <WinnerIndicator position={position} reveal={revealMove} />
        )}
        <PlayerMove
          position={position}
          reveal={revealMove && !(playLoserAnimation && !winner)}
          src={`${SOCKETS_ENDPOINT}${move.imageUrl}`}
          playWinnerAnimation={!draw && playWinnerAnimation && winner}
          playLoserAnimation={!draw && playWinnerAnimation && !winner}
        />
      </PlayerMoveContainer>
    </Container>
  );
};
