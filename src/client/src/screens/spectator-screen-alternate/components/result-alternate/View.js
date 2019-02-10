/* @flow */
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
import GameSoundContext from '../../../../contexts/GameSoundContext';
import PageLayout from '../../../../components/page-layout/FullPage';

import { Power4 } from 'gsap/EasePack';
import { CSSPlugin, TimelineLite } from 'gsap/all';
import { SOUND_KEYS } from '../../../../sounds/SoundService';

type Props = {
  result: Object,
  player1: Object,
  player2: Object,
  resetGame: () => void,
};

const BonusPointSection = styled.div`
  text-align: center;
  width: 20vmin;
  margin-top: 20px;
`;

const BonusHeading = styled.h2`
  margin: 0;
  font-size: 1rem;
`;

const View = ({ result, player1, player2, resetGame }: Props) => {
  const soundService = useContext(GameSoundContext);

  const winner = result.winner === 'player1' ? player1 : player2;
  const isPlayer1Winner = result.winner === 'player1';
  const isPlayer2Winner = result.winner === 'player2';
  const [player1El, setPlayer1El] = useState(null);
  const [middleEl, setMiddleEl] = useState(null);
  const [player2El, setPlayer2El] = useState(null);
  const [animationTimeline, setAnimationTimeline] = useState(null);
  const [middleIndex, setMiddleIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     soundService.playWinningSound(winner.move, result.draw);
  //   }, 1000);

  //   return () => {
  //     clearTimeout(timeout);
  //   };
  // }, []);

  useEffect(() => {
    if (!animationTimeline && player1El && player2El) {
      setAnimationTimeline(true);

      new TimelineLite({
        onComplete: () => {
          setTimeout(() => {
            setMiddleIndex(1);
            soundService.play(SOUND_KEYS.FIGHT, true);
            setTimeout(() => {
              setShowResult(true);
              soundService.playWinningSound(winner.move, result.draw);
              setMiddleIndex(2);
            }, 3000);
          }, 1000);
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
        .delay(2);
    }
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
            reveal={showResult}
          />
          <PlayerScore playerKey={player1.name} />
        </PlayerSpectatorSection>

        <PlayerSpectatorSection ref={setMiddleEl}>
          <MultiArea showIndex={middleIndex}>
            <p style={{ fontSize: '3rem' }}>VS</p>
            <p style={{ fontSize: '3rem' }}>FIGHT!</p>
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

          {/*  */}
          {/* <BonusPointSection>
            <BonusHeading>BONUS 獎金</BonusHeading>
            <PlayerScore playerKey={'BONUS'} />
          </BonusPointSection> */}
        </PlayerSpectatorSection>

        <PlayerSpectatorSection>
          <PlayerResult
            player={player2}
            isWinner={isPlayer2Winner}
            otherPlayersMove={player1.move}
            isDraw={result.draw}
            isLeft={false}
            setContainerRef={setPlayer2El}
            reveal={showResult}
          />
          <PlayerScore playerKey={player2.name} />
        </PlayerSpectatorSection>
      </PlayerSpectatorContainer>
      <PageFooterContainer>
        {<Button onClick={resetGame}>
          Play again <br /> 再玩一次
        </Button>}
      </PageFooterContainer>
    </PageLayout>
  );
};

export default View;
