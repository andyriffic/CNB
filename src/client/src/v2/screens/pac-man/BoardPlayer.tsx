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

type Props = {
  pacPlayer: PacManPlayer;
};

export function BoardPlayer({ pacPlayer }: Props): JSX.Element {
  const startingJailMoves = useRef(pacPlayer.jailTurnsCount);
  const accentColor = tinycolor
    .mostReadable(pacPlayer.color, ['#fff', '#000'])
    .toHexString();

  const goingToJail = useMemo(() => {
    return (
      pacPlayer.jailTurnsCount > 0 &&
      pacPlayer.jailTurnsCount > startingJailMoves.current
    );
  }, [pacPlayer.jailTurnsCount]);

  return (
    <Container goingToJail={goingToJail}>
      <PacManGhost color={pacPlayer.color} width="3vw" />
      <PlayerName
        style={{
          backgroundColor: pacPlayer.color,
          borderColor: accentColor,
          color: accentColor,
        }}
      >
        {pacPlayer.player.name}({pacPlayer.jailTurnsCount})
      </PlayerName>
    </Container>
  );
}
