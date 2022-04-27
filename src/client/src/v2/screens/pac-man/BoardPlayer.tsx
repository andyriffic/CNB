import React, { useMemo, useRef } from 'react';
import styled, { css } from 'styled-components';
import tinycolor from 'tinycolor2';
import { spinAnimation } from '../../../uplift/components/animations';
import { PacManGhost } from './PacManGhost';
import { PacManPlayer } from './types';

const Container = styled.div<{ goingToJail: boolean }>`
  position: relative;
  ${({ goingToJail }) =>
    goingToJail &&
    css`
      animation: ${spinAnimation} 1000ms linear;
    `}
`;

const PlayerName = styled.div`
  background-color: white;
  text-transform: uppercase;
  color: red;
  padding: 3px;
  border-radius: 5px;
  font-size: 0.4rem;
  text-align: center;
  position: absolute;
  top: -10px;
  border: 1px solid;
  white-space: nowrap;
`;

const MovesRemaining = styled.div`
  position: absolute;
  bottom: -15%;
  left: 15%;
  padding: 0.1rem;
  background: black;
  border-radius: 50%;
  border: 2px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
  color: red;
  font-family: ${({ theme }) => theme.fontFamily.numbers};
  font-size: 0.6rem;
`;

const PowerPill = styled.div`
  position: absolute;
  bottom: -15%;
  right: 15%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
`;

type Props = {
  pacPlayer: PacManPlayer;
};

export function BoardPlayer({ pacPlayer }: Props): JSX.Element {
  const startingJailMoves = useRef(pacPlayer.jailTurnsCount);
  const inJail = pacPlayer.jailTurnsCount > 0;
  const accentColor = tinycolor
    .mostReadable(pacPlayer.color, ['#fff', '#000'])
    .toHexString();

  const goingToJail = useMemo(() => {
    return inJail && pacPlayer.jailTurnsCount > startingJailMoves.current;
  }, [pacPlayer.jailTurnsCount]);

  return (
    <Container goingToJail={goingToJail}>
      <PacManGhost color={inJail ? '#777777' : pacPlayer.color} width="3vw" />
      <PlayerName
        style={{
          backgroundColor: pacPlayer.color,
          borderColor: accentColor,
          color: accentColor,
        }}
      >
        {pacPlayer.player.name}
      </PlayerName>
      {pacPlayer.movesRemaining > 0 && (
        <MovesRemaining>{pacPlayer.movesRemaining}</MovesRemaining>
      )}
      {pacPlayer.powerPill && <PowerPill>💊</PowerPill>}
    </Container>
  );
}
