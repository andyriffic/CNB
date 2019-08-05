import React, { useEffect, useState, useContext } from 'react';
import styled, { keyframes } from 'styled-components';

import PlayerStatus from '../player-status';
import PlayerScore from '../player-score';
import {
  Button,
  PlayerSpectatorContainer,
  PlayerSpectatorSection,
} from '../../../styled';
import PageLayout from '../../../../components/page-layout/FullPage';
import IntroBanner from '../intro-banner';

import { Elastic, Power4 } from 'gsap/EasePack';
import { CSSPlugin, TimelineLite } from 'gsap/all';
import GameSoundContext from '../../../../contexts/GameSoundContext';
import { SOUND_KEYS } from '../../../../sounds/SoundService';
import MultiArea from '../../../../components/multi-area';
import PowerUpBadge from '../../../../components/power-up-badges';
import BaseBadge from '../../../../components/power-up-badges/BaseBadge';
import TrophyTotal from '../../../../components/trophy-total';
import TrophyGoal from '../../../../components/trophy-goal';
import { POWER_UP_TYPE } from '../../../../power-ups/constants';
import GameDataContext from '../../../../game-data/GameDataContext';
import grootImage from './Baby-Groot.png';
import sunImage from './sun.png';
import snowImage from './snow.png';

const plugins = [CSSPlugin]; // eslint-disable-line no-unused-vars

const BonusPointSection = styled.div`
  text-align: center;
`;
const BonusHeading = styled.h2`
  margin: 0;
  font-size: 1rem;
`;

const PointGoalContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const pulse = keyframes`
  from {
    transform: scale3d(1, 1, 1) rotate(0deg);
  }

  50% {
    transform: scale3d(1.2, 1.2, 1.2) rotate(30deg);
  }

  to {
    transform: scale3d(1, 1, 1) rotate(0deg);
  }
`;

const PowerUpBanner = styled.div`
  position: absolute;
  z-index: 9;
  width: 15vmin;
  height: 15vmin;
  bottom: 0;
  left: 0;
  display: flex;
  transform: rotate(20deg);
  animation: ${pulse} 3s ease infinite forwards;
  font-size: 0.8rem;
`;

const View = ({ player1, player2, playGame, trophyPoints }) => {
  const [player1El, setPlayer1El] = useState(null);
  const [player2El, setPlayer2El] = useState(null);
  const [bonusPointsEl, setBonusPointsEl] = useState(null);
  const [buttonEl, setButtonEl] = useState(null);
  const [player1Timeline, setPlayer1Timeline] = useState(null);
  const soundService = useContext(GameSoundContext);
  const gameData = useContext(GameDataContext);
  const [badgeVariation] = useState(Math.floor(Math.random() * 3));

  useEffect(() => {
    gameData.set({ autoPlayResult: true });
  }, []);

  useEffect(() => {});

  useEffect(() => {
    if (player1El && player2El && buttonEl && bonusPointsEl) {
      setPlayer1Timeline(
        new TimelineLite({
          onComplete: () => {
            soundService.play(SOUND_KEYS.WAITING_MUSIC);
          },
          onReverseComplete: () => {
            setTimeout(playGame, 2000);
          },
        })
          .staggerFrom(
            [player1El, player2El],
            1,
            {
              ease: Power4.easeOut,
              y: 800,
              onStart: () => {
                soundService.play(SOUND_KEYS.PLAYER_ENTER, true);
              },
            },
            0.2
          )
          .from(bonusPointsEl, 1, {
            ease: Elastic.easeOut.config(1.2, 1),
            delay: 1,
            y: 800,
            onStart: () => {
              soundService.play(SOUND_KEYS.BONUS_POINTS_ENTER, true);
            },
          })
          .from(buttonEl, 2, { ease: Elastic.easeOut.config(1.2, 1), scale: 0 })
          .delay(2)
      );
    }
  }, [player1El, player2El, buttonEl, bonusPointsEl]);

  const clearAnim = () => {
    if (player1Timeline) {
      soundService.stop(SOUND_KEYS.WAITING_MUSIC);
      soundService.play(SOUND_KEYS.GAME_START, true);
      player1Timeline.duration(2).reverse();
    }
  };

  return (
    <PageLayout>
      <PowerUpBanner>
        {badgeVariation === 0 && (
          <BaseBadge
            text={<img src={snowImage} />}
            backgroundColor="#6389df"
            textShadowColor="#1f2b6c"
          />
        )}
        {badgeVariation === 1 && (
          <BaseBadge
            text={<img src={sunImage} />}
            backgroundColor="#f9ab00"
            textShadowColor="#e2683c"
          />
        )}
        {badgeVariation === 2 && (
          <BaseBadge
            text={<img src={grootImage} />}
            backgroundColor="#7e00df"
          />
        )}
      </PowerUpBanner>
      <IntroBanner />
      <PointGoalContainer>
        {trophyPoints.loaded && <TrophyGoal goal={trophyPoints.goal} />}
      </PointGoalContainer>
      <PlayerSpectatorContainer>
        <PlayerSpectatorSection ref={setPlayer1El}>
          {trophyPoints.loaded && (
            <TrophyTotal total={trophyPoints.players[player1.name]} />
          )}
          <PlayerStatus
            {...player1}
            animationDelay={0}
            badge={
              player1.powerUp &&
              player1.powerUp !== POWER_UP_TYPE.NONE && (
                <PowerUpBadge type="HIDDEN" />
              )
            }
          />
          <PlayerScore playerKey={player1.name} />
        </PlayerSpectatorSection>
        <PlayerSpectatorSection>
          <MultiArea
            setRef={setButtonEl}
            showIndex={player1.moved && player2.moved ? 1 : 0}
          >
            <div style={{ textAlign: 'center' }}>
              Make your move
              <br />
              做你的動作
            </div>
            <Button className="radioactive" onClick={clearAnim}>
              PLAY 玩
            </Button>
          </MultiArea>
        </PlayerSpectatorSection>
        <PlayerSpectatorSection ref={setPlayer2El}>
          {trophyPoints.loaded && (
            <TrophyTotal total={trophyPoints.players[player2.name]} />
          )}
          <PlayerStatus
            {...player2}
            animationDelay={0.5}
            badge={
              player2.powerUp &&
              player2.powerUp !== POWER_UP_TYPE.NONE && (
                <PowerUpBadge type="HIDDEN" />
              )
            }
          />
          <PlayerScore playerKey={player2.name} />
        </PlayerSpectatorSection>
      </PlayerSpectatorContainer>
      <BonusPointSection ref={setBonusPointsEl}>
        <BonusHeading>BONUS 獎金</BonusHeading>
        <PlayerScore playerKey={'BONUS'} />
      </BonusPointSection>
    </PageLayout>
  );
};

export default View;
