/* @flow */
// flow:disable no typedefs for useState, useEffect yet
import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';

import PlayerStatus from '../player-status';
import PlayerScore from '../player-score';
import {
  PlayerSpectatorContainer,
  PlayerSpectatorSection,
} from '../../../styled';
import PageLayout from '../../../../components/page-layout/FullPage';
import IntroBanner from '../intro-banner';
import { Button } from '../../../styled';

import TweenLite from 'gsap/TweenLite';
import { Elastic } from 'gsap/EasePack';
import { CSSPlugin, TimelineLite } from 'gsap/all';
import GameSoundContext from '../../../../contexts/GameSoundContext';
import { SOUND_KEYS } from '../../../../sounds/SoundService';

type Props = {
  player1: Object,
  player2: Object,
};

const BonusPointSection = styled.div`
  text-align: center;
`;
const BonusHeading = styled.h2`
  margin: 0;
  font-size: 1rem;
`;

const View = ({ player1, player2, playGame }: Props) => {
  const [player1El, setPlayer1El] = useState(null);
  const [player2El, setPlayer2El] = useState(null);
  const [bonusPointsEl, setBonusPointsEl] = useState(null);
  const [buttonEl, setButtonEl] = useState(null);
  const [player1Timeline, setPlayer1Timeline] = useState(null);
  const [player2Timeline, setPlayer2Timeline] = useState(null);
  const [buttonTimeline, setButtonTimeline] = useState(null);
  const soundService = useContext(GameSoundContext);

  useEffect(() => {
    if (player1El && player2El && buttonEl && bonusPointsEl) {
      setPlayer1Timeline(
        // new TimelineLite()
        //   .from(player1El, 2, { ease: Elastic.easeOut.config(1.2, 1), y: 800 })
        //   .delay(2)

        new TimelineLite({
          onReverseComplete: () => {
            setTimeout(playGame, 2000);
          },
        })
          .staggerFrom(
            [player1El, player2El],
            2,
            {
              ease: Elastic.easeOut.config(1.2, 1),
              y: 800,
              onStart: () => {
                soundService.play(SOUND_KEYS.PLAYER_ENTER, true);
              },
            },
            0.2
          )
          .from(bonusPointsEl, 1, {
            ease: Elastic.easeOut.config(1.2, 1),
            y: 800,
            onStart: () => {
              soundService.play(SOUND_KEYS.BONUS_POINTS_ENTER, true);
            },
          })
          .from(buttonEl, 2, { ease: Elastic.easeOut.config(1.2, 1), scale: 0 })
          .delay(2)
      );
      // setPlayer2Timeline(
      //   new TimelineLite()
      //     .from(player2El, 2, { ease: Elastic.easeOut.config(1.2, 1), y: 800 })
      //     .delay(2.2)
      // );
    }
  }, [player1El, player2El, buttonEl, bonusPointsEl]);

  // useEffect(() => {
  //   // if (buttonEl) {
  //   //   setButtonTimeline(
  //   //     new TimelineLite()
  //   //       .from(buttonEl, 2, { ease: Elastic.easeOut.config(1.2, 1), scale: 0 })
  //   //       .delay(4.2)
  //   //   );
  //   //}
  // }, [player2El]);

  const clearAnim = () => {
    // if (player1Timeline) {
    //   player1Timeline.duration(1).reverse();
    // }
    // if (player2Timeline) {
    //   player2Timeline.duration(1).reverse();
    // }
    if (player1Timeline) {
      soundService.stop(SOUND_KEYS.WAITING_MUSIC);
      soundService.play(SOUND_KEYS.GAME_START, true);
      player1Timeline.duration(2).reverse();
    }
  };

  return (
    <PageLayout>
      <IntroBanner />
      <PlayerSpectatorContainer>
        <PlayerSpectatorSection ref={setPlayer1El}>
          <PlayerStatus {...player1} animationDelay={0} />
          <PlayerScore playerKey={player1.name} />
        </PlayerSpectatorSection>
        <PlayerSpectatorSection ref={setButtonEl}>
          {player1.moved && player2.moved ? (
            <Button onClick={clearAnim}>PLAY 玩</Button>
          ) : (
            <div style={{ textAlign: 'center' }}>
              Make your move
              <br />
              做你的動作
            </div>
          )}
        </PlayerSpectatorSection>
        <PlayerSpectatorSection ref={setPlayer2El}>
          <PlayerStatus {...player2} animationDelay={0.5} />
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
