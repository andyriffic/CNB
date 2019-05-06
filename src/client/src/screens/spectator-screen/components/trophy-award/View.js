/* @flow */
// flow:disable no typedefs for useState, useEffect yet
import React, { useEffect, useContext, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import {
  Button,
  PlayerSpectatorContainer,
  PlayerSpectatorSection,
} from '../../../styled';
import PageLayout from '../../../../components/page-layout/FullPage';

import TrophyImage from './trophy.png';
import GameSoundContext from '../../../../contexts/GameSoundContext';
import { SOUND_KEYS } from '../../../../sounds/SoundService';
import VisibilityContainer from '../../../../components/visibility-placeholder';
import type { TrophyPoints } from '../../../../trophy-points/types';
import { FancyLink } from '../../../../components/FancyLink';

const Pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

const Grow = keyframes`
  0% { transform: scale(0.2); }
  100% { transform: scale(1); }
`;

const Rotate = keyframes`
  0% { transform: rotate3d(0); }
  100% { transform: rotate(360deg); }
`;

const TrophyContainer = styled.div`
  position: absolute;
  top: 20%;
  animation: ${Pulse} 3s linear 5s infinite, ${Grow} 5s linear;
`;

const Trophy = styled.div`
  position: relative;
`;

const TrophyWinner = styled.div`
  margin: 0 auto;
  width: 100%;
  text-align: center;
  position: absolute;
  bottom: 11%;
  color: black;
`;

const StarContainer = styled.div`
  animation: ${Rotate} 20s linear infinite;
  pointer-events: none;
`;

const Star = styled.div`
  position: relative;

  display: inline-block;
  width: 0;
  height: 0;

  margin-left: 0.9em;
  margin-right: 0.9em;
  margin-bottom: 1.2em;

  border-right: 0.3em solid transparent;
  border-bottom: 0.7em solid #fc0;
  border-left: 0.3em solid transparent;

  /* Controlls the size of the stars. */
  font-size: 35vmin;

  &:before,
  &:after {
    content: '';

    display: block;
    width: 0;
    height: 0;

    position: absolute;
    top: 0.6em;
    left: -1em;

    border-right: 1em solid transparent;
    border-bottom: 0.7em solid #fc0;
    border-left: 1em solid transparent;

    transform: rotate(-35deg);
  }

  &:after {
    transform: rotate(35deg);
  }
`;

const Image = styled.img`
  width: 35vmin;
`;

type Props = {
  trophyPoints: TrophyPoints,
  resetGame: () => void,
};

const View = ({ trophyPoints, resetGame }: Props) => {
  const soundService = useContext(GameSoundContext);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    soundService.stopAll();
    soundService.play(SOUND_KEYS.AWARD_TROPHY);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setShowButton(true);
    }, 10000);
  }, []);

  const onReset = () => {
    trophyPoints.setWinner(trophyPoints, null);
    resetGame();
  };

  return (
    <PageLayout>
      <PlayerSpectatorContainer>
        <PlayerSpectatorSection>
          <StarContainer>
            <Star />
          </StarContainer>
          <TrophyContainer>
            <Trophy>
              <TrophyWinner>{trophyPoints.winner}</TrophyWinner>
              <Image src={TrophyImage} alt="trophy" />
            </Trophy>
          </TrophyContainer>
          <VisibilityContainer visible={showButton} style={{ zIndex: 1 }}>
            <Button onClick={onReset} className="radioactive">
              Play Again
            </Button>
            <div>
              <FancyLink href="/player-stats">See Leaderboard</FancyLink>
            </div>
          </VisibilityContainer>
        </PlayerSpectatorSection>
      </PlayerSpectatorContainer>
    </PageLayout>
  );
};

export default View;
