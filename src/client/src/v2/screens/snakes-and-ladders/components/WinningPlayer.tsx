import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { enterTopAnimation } from '../../../../uplift/components/animations';
import { PlayerAvatar } from '../../../components/player-avatar';
import { useSoundProvider } from '../../../providers/SoundProvider';
import { useGameBoardProvider } from '../providers/GameBoardProvider';
import confettiGif from './confetti.gif';
import winnerGif from './winner.gif';

const Container = styled.div`
  position: absolute;
  top: 100px;
  left: 37%;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 1px 2px 15px 5px #000000;
  text-align: center;
  animation: ${enterTopAnimation} 2s ease-in both;
  animation-delay: 2s;
`;

const Confetti = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export const WinningPlayer = () => {
  const { gameBoardPlayers } = useGameBoardProvider();
  const { play } = useSoundProvider();
  const soundPlayed = useRef(false);

  const winningPlayer = gameBoardPlayers.find(p => p.isWinner);

  if (!winningPlayer) return null;

  if (!soundPlayed.current) {
    soundPlayed.current = true;
    play('SnakesAndLaddersWinner');
  }

  return (
    <Container>
      <img src={winnerGif} style={{ width: '125px' }} />
      <PlayerAvatar player={winningPlayer.player} size="medium" />
      <Confetti src={confettiGif} />
    </Container>
  );
};
