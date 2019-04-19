/* @flow */
// flow:disable no typedefs for useState, useEffect yet
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

import PlayerResult from './components/player-result';
import PlayerScore from '../player-score';
import Draw from '../draw';
import Winner from './components/winner';
import Switch from '../../../../components/switch';
import {
  PlayerSpectatorContainer,
  PlayerSpectatorSection,
  Button,
  PageFooterContainer,
} from '../../../styled';
import MultiArea from '../../../../components/multi-area';
import VisibilityContainer from '../../../../components/visibility-placeholder';
import GameSoundContext from '../../../../contexts/GameSoundContext';
import PageLayout from '../../../../components/page-layout/FullPage';
import AwardedPowerUp from '../awarded-power-up';

import { Power4 } from 'gsap/EasePack';
import { CSSPlugin, TimelineLite } from 'gsap/all';
import { SOUND_KEYS } from '../../../../sounds/SoundService';
import PowerUpContext from '../../../../contexts/PowerUpContext';
import type { TrophyPoints } from '../../../../trophy-points/types';
import { POWER_UP_TYPE } from '../../../../power-ups/constants';
const plugins = [CSSPlugin]; // eslint-disable-line no-unused-vars

type Props = {
  result: Object,
  player1: Object,
  player2: Object,
  resetGame: () => void,
  trophyPoints: TrophyPoints,
};

const BonusPointSection = styled.div`
  text-align: center;
  //width: 20vmin;
  margin-top: 20px;
`;

const BonusHeading = styled.h2`
  margin: 0;
  font-size: 1rem;
`;

const MIDDLE_STATES = {
  VS: 0,
  FIGHT: 1,
  RESULT: 2,
};

const View = ({ result, player1, player2, resetGame, trophyPoints }: Props) => {
  const soundService = useContext(GameSoundContext);
  const powerUpsState = useContext(PowerUpContext);

  const winner = result.winner === 'player1' ? player1 : player2;
  const isPlayer1Winner = result.winner === 'player1';
  const isPlayer2Winner = result.winner === 'player2';
  const [player1El, setPlayer1El] = useState(null);
  const [middleEl, setMiddleEl] = useState(null);
  const [player2El, setPlayer2El] = useState(null);
  const [animationTimeline, setAnimationTimeline] = useState(null);
  const [middleIndex, setMiddleIndex] = useState(MIDDLE_STATES.VS);
  const [showPlayerMoves, setShowPlayerMoves] = useState(false);
  const [showPowerUps, setShowPowerUps] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [showResetGameButton, setShowResetGameButton] = useState(false);
  const [timeouts] = useState([]);

  const onGameReset = () => {
    soundService.play(SOUND_KEYS.GAME_START, true);
    animationTimeline.duration(2).reverse();
  };

  console.log('RESULT VIEW', trophyPoints);

  useEffect(() => {
    if (!animationTimeline && player1El && player2El) {
      setAnimationTimeline(
        new TimelineLite({
          onComplete: () => {
            timeouts.push(
              setTimeout(() => {
                soundService.play(SOUND_KEYS.FIGHT, true);
                setMiddleIndex(MIDDLE_STATES.FIGHT);

                timeouts.push(
                  setTimeout(() => {
                    setShowPlayerMoves(true);
                    soundService.playWinningSound(winner.move, result.draw);

                    timeouts.push(
                      setTimeout(() => {
                        setMiddleIndex(MIDDLE_STATES.RESULT);
                        setShowResult(true);

                        timeouts.push(
                          setTimeout(() => {
                            winner.powerUp !== POWER_UP_TYPE.NONE &&
                              soundService.play(SOUND_KEYS.POWER_UP_WIN);
                            setShowPowerUps(true);

                            timeouts.push(
                              setTimeout(() => {
                                setShowResetGameButton(true);
                              }, 5000)
                            );
                          }, 3000)
                        );
                      }, 4000)
                    );
                  }, 3000)
                );
              }, 1000)
            );
          },
          onReverseComplete: () => {
            resetGame();
          },
        })
          .from(player1El, 0.5, {
            ease: Power4.easeOut,
            y: -1000,
            onStart: () => {
              soundService.play(SOUND_KEYS.RESULT_PLAYER_ENTER, true);
            },
          })
          .from(middleEl, 0.4, {
            scale: 0,
            opacity: 0,
            delay: 0,
            onStart: () => {
              soundService.play(SOUND_KEYS.VS, true);
            },
          })
          .from(player2El, 0.5, {
            ease: Power4.easeOut,
            y: -1000,
            delay: 0.5,
            onStart: () => {
              soundService.play(SOUND_KEYS.RESULT_PLAYER_ENTER, true);
            },
          })
          .delay(2)
      );
    }

    return () => {
      timeouts.forEach(timeout => {
        clearTimeout(timeout);
      });
    };
  }, [player1El, player2El, middleEl]);

  return (
    <PageLayout>
      <PlayerSpectatorContainer>
        <PlayerSpectatorSection>
          <PlayerResult
            player={player1}
            isWinner={isPlayer1Winner}
            otherPlayersMove={player2.move}
            isDraw={result.draw}
            isLeft
            setContainerRef={setPlayer1El}
            revealPlayersMove={showPlayerMoves}
            revealPowerUp={showPowerUps}
          />
          <VisibilityContainer visible={showResult}>
            <PlayerScore playerKey={player1.name} />
          </VisibilityContainer>
        </PlayerSpectatorSection>

        <PlayerSpectatorSection ref={setMiddleEl}>
          <MultiArea showIndex={middleIndex}>
            <p style={{ fontSize: '3rem' }}>VS</p>
            <p style={{ fontSize: '3rem' }}>GO!</p>
            <Switch>
              <Draw showIf={result.draw} />
              <Winner
                showIf={!result.draw}
                player1={player1}
                player2={player2}
                result={result}
              />
            </Switch>
          </MultiArea>

          <VisibilityContainer visible={showResult}>
            <BonusPointSection>
              <BonusHeading>BONUS 獎金</BonusHeading>
              <PlayerScore playerKey={'BONUS'} />
            </BonusPointSection>
          </VisibilityContainer>
        </PlayerSpectatorSection>

        <PlayerSpectatorSection>
          <PlayerResult
            player={player2}
            isWinner={isPlayer2Winner}
            otherPlayersMove={player1.move}
            isDraw={result.draw}
            isLeft={false}
            setContainerRef={setPlayer2El}
            revealPlayersMove={showPlayerMoves}
            revealPowerUp={showPowerUps}
          />
          <VisibilityContainer visible={showResult}>
            <PlayerScore playerKey={player2.name} />
          </VisibilityContainer>
        </PlayerSpectatorSection>
      </PlayerSpectatorContainer>
      <PageFooterContainer>
        <PlayerSpectatorContainer>
          <PlayerSpectatorSection>
            <VisibilityContainer visible={showResetGameButton}>
              <AwardedPowerUp
                powerUp={powerUpsState.awardedPowerUps[player1.name]}
              />
            </VisibilityContainer>
          </PlayerSpectatorSection>
          <PlayerSpectatorSection>
            <VisibilityContainer
              visible={showResetGameButton && !trophyPoints.winner}
            >
              <Button onClick={onGameReset}>
                Play again
                <br /> 再玩一次
              </Button>
            </VisibilityContainer>
          </PlayerSpectatorSection>
          <PlayerSpectatorSection>
            <VisibilityContainer visible={showResetGameButton}>
              <AwardedPowerUp
                powerUp={powerUpsState.awardedPowerUps[player2.name]}
              />
            </VisibilityContainer>
          </PlayerSpectatorSection>
        </PlayerSpectatorContainer>
      </PageFooterContainer>
    </PageLayout>
  );
};

export default View;
