import React from 'react';
import styled from 'styled-components';
import { PlayerAvatar } from '../../components/player-avatar';
import { boardConfig } from './boardConfig';
import { PacManGhost } from './PacManGhost';
import { Coordinates, PacManPlayer, PacManSquare } from './types';

const Container = styled.div``;

type Props = {
  pacPlayer: PacManPlayer;
};

export function BoardPlayer({ pacPlayer }: Props): JSX.Element {
  return (
    <Container>
      <PacManGhost color={pacPlayer.color} width="3vw" />
    </Container>
  );
}
