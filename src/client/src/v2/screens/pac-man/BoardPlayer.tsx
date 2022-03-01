import React from 'react';
import styled from 'styled-components';
import tinycolor from 'tinycolor2';
import { PacManGhost } from './PacManGhost';
import { PacManPlayer } from './types';

const Container = styled.div`
  position: relative;
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
  const accentColor = tinycolor
    .mostReadable(pacPlayer.color, ['#fff', '#000'])
    .toHexString();

  return (
    <Container>
      <PacManGhost color={pacPlayer.color} width="3vw" />
      <PlayerName
        style={{
          backgroundColor: pacPlayer.color,
          borderColor: accentColor,
          color: accentColor,
        }}
      >
        {pacPlayer.player.name}
      </PlayerName>
    </Container>
  );
}
