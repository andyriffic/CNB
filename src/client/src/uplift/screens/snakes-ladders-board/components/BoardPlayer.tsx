import React, { useEffect, useContext, useState, useRef } from 'react';
import styled, { css } from 'styled-components';
import { GameBoardPlayer } from '../GameBoardContext';
import { Player, PlayersContext } from '../../../contexts/PlayersProvider';
import { PlayerAvatar } from '../../../components/PlayerAvatar';
import Rainbow from '../../../../components/rainbow-text';
import {
  pulseAnimation,
  bounceInAnimation,
  shakeAnimationRight,
  shakeAnimationLeft,
} from '../../../components/animations';
import { GameBoardCell } from '../types';
import { PlayerVictory } from './PlayerVictory';
import { ConfettiContext } from '../../../contexts/ConfettiProvider';
import { SplashText } from '../../../components/SplashText';
import {
  SoundService,
  JUNGLE_SOUND_KEYS,
} from '../../../../sounds/SoundService';
import GameSoundContext from '../../../../contexts/GameSoundContext';
import { selectWeightedRandomOneOf } from '../../../utils/random';
import { ReadableNumberFont } from '../../../../components/ReadableNumberFont';

export const ANIMATION_TIMEOUT_MS = 500;

enum FairyStates {
  HIDDEN = 'HIDDEN',
  SHOWING = 'SHOWING',
  SPEAKING = 'SPEAKING',
  DECIDING = 'DECIDING',
  DECISION_GOOD = 'DECISION_GOOD',
  DECISION_BAD = 'DECISION_BAD',
  FINISHED = 'FINISHED',
}

const offsets = [[0, 0], [-25, 0], [25, 0], [-35, 40], [-10, 40], [15, 40]];

const CellPlayer = styled.div<{
  x: number;
  y: number;
  priority: number;
  offset: number;
  hasMoves: boolean;
  inLead: boolean;
}>`
  box-sizing: border-box;
  position: absolute;
  transition: all ${ANIMATION_TIMEOUT_MS}ms ease-in-out;
  left: ${props => `${props.x - 15}px`};
  top: ${props => `${props.y - 60}px`};
  z-index: ${props => props.priority + props.offset};
  pointer-events: ${props => (props.priority ? 'auto' : 'none')};
  ${props =>
    props.hasMoves &&
    css`
      animation: ${bounceInAnimation} 800ms ease-in-out 0s infinite;
    `}

  ${props =>
    props.inLead &&
    css`
      animation: ${shakeAnimationLeft} 2s ease-in-out infinite;
    `}

  &:hover {
    cursor: pointer;
    transform: scale(1.3);
  }
`;

const MovesRemaining = styled.div`
  position: absolute;
  bottom: 0;
  left: 15px;
  background: black;
  border-radius: 50%;
  border: 2px solid black;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  /* animation: ${bounceInAnimation} 1000ms ease-in-out 0s infinite; */
`;

const WinningMedal = styled.div`
  position: absolute;
  top: 0;
  left: 25%;
  font-size: 1.1rem;
`;

const Fairy = styled.div<{ visible: boolean }>`
  position: absolute;
  top: -130px;
  left: -35px;
  transition: opacity 4s ease-in;
  opacity: ${props => (props.visible ? '1' : '0')};
  font-size: 3.5rem;
`;

const FairySpeak = styled.div`
  position: absolute;
  top: -70px;
  left: 40px;
  padding: 5px;
  width: 200px;
  font-size: 0.7rem;
  /* -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: black; */
  color: darkgreen;
  font-weight: bold;
  background-color: white;
  border-radius: 8px;
  text-align: center;
`;

type Props = {
  cell: GameBoardCell;
  movesRemaining: number;
  offset: number;
  player: Player;
  onClick: () => void;
  onArrived: () => void;
  inLead: boolean;
  boardPlayer: GameBoardPlayer;
  moving: boolean;
};

export const BoardPlayer = ({
  cell,
  movesRemaining,
  offset,
  player,
  onClick,
  onArrived,
  inLead,
  boardPlayer,
  moving,
}: Props) => {
  const soundService = useContext<SoundService>(GameSoundContext);
  const holdMoving = useRef(false);
  const [fairyState, setFairyState] = useState(FairyStates.HIDDEN);

  const { updatePlayer } = useContext(PlayersContext);
  const { setConfettiOn } = useContext(ConfettiContext);

  useEffect(() => {
    if (!moving) {
      if (
        !holdMoving.current &&
        cell.fairy &&
        fairyState === FairyStates.HIDDEN
      ) {
        holdMoving.current = true;
        soundService.play(JUNGLE_SOUND_KEYS.FAIRY_APPEARS);
        setTimeout(() => {
          setFairyState(FairyStates.SHOWING);
        }, 1000);
      } else if (
        fairyState === FairyStates.DECISION_BAD ||
        fairyState === FairyStates.HIDDEN
      ) {
        console.log('Arrived', fairyState);
        holdMoving.current = false;
        setTimeout(onArrived, ANIMATION_TIMEOUT_MS + 400);
      }
    }
  }, [cell, moving, fairyState]);

  useEffect(() => {
    if (fairyState === FairyStates.SHOWING) {
      setTimeout(() => setFairyState(FairyStates.SPEAKING), 4000);
      setTimeout(() => setFairyState(FairyStates.DECIDING), 7000);
    }
    if (fairyState === FairyStates.DECIDING) {
      const decision = selectWeightedRandomOneOf<FairyStates>([
        { weight: 1, item: FairyStates.DECISION_GOOD },
        { weight: 2, item: FairyStates.DECISION_BAD },
      ]);
      if (decision === FairyStates.DECISION_BAD) {
        setFairyState(FairyStates.DECISION_BAD);
        holdMoving.current = false;
        soundService.play(JUNGLE_SOUND_KEYS.SNAKE_DOWN);
        onArrived();
        setTimeout(() => setFairyState(FairyStates.HIDDEN), 2000);
      }
      if (decision === FairyStates.DECISION_GOOD) {
        setFairyState(FairyStates.DECISION_GOOD);
        soundService.play(JUNGLE_SOUND_KEYS.LADDER_UP);
        updatePlayer(
          player.id,
          [
            ...player.tags.filter(t => !t.startsWith('sl_moves')),
            'sl_moves:1',
            'sl_moving',
          ],
          () => {
            setFairyState(FairyStates.HIDDEN);
          }
        );
      }
    }
  }, [fairyState]);

  useEffect(() => {
    if (boardPlayer.isWinner) {
      setConfettiOn(true);
      updatePlayer(player.id, [
        ...player.tags.filter(t => t !== 'badge:candyland_winner'),
        'badge:candyland_winner',
      ]);
    }
  }, [boardPlayer.isWinner]);

  const appliedOffset = offsets[offset] || [0, 0];

  return (
    <>
      {fairyState === FairyStates.SHOWING && (
        <SplashText>A fairy appears</SplashText>
      )}
      <PlayerVictory show={boardPlayer.isWinner}>
        <CellPlayer
          onClick={() => {
            setFairyState(FairyStates.HIDDEN);
            onClick();
          }}
          hasMoves={moving}
          priority={movesRemaining}
          offset={offset}
          x={cell.coordinates[0] + appliedOffset[0]}
          y={cell.coordinates[1] + appliedOffset[1]}
          inLead={inLead}
        >
          <div style={{ position: 'relative' }}>
            <PlayerAvatar
              player={player}
              overrideStyle="width: 50px; height: 75px;"
            />
            {!!movesRemaining && (
              <MovesRemaining>
                <ReadableNumberFont>
                  <Rainbow>{movesRemaining}</Rainbow>
                </ReadableNumberFont>
              </MovesRemaining>
            )}
            <Fairy visible={fairyState !== FairyStates.HIDDEN}>🧚‍♂️</Fairy>
            {fairyState === FairyStates.SPEAKING && (
              <FairySpeak>Today I'm feeling...</FairySpeak>
            )}
            {fairyState === FairyStates.DECISION_GOOD && (
              <FairySpeak>🎉GOOD🎉</FairySpeak>
            )}
            {fairyState === FairyStates.DECISION_BAD && (
              <FairySpeak>😈BAD😈</FairySpeak>
            )}
            {inLead && <WinningMedal>🥇</WinningMedal>}
          </div>
        </CellPlayer>
      </PlayerVictory>
    </>
  );
};
