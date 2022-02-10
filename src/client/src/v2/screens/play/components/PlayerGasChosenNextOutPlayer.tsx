import React from 'react';
import styled from 'styled-components';
import { PlayerAvatar } from '../../../components/player-avatar';
import { GasPlayer } from '../../../providers/GasProvider';

const Container = styled.div`
  display: flex;
  justify-content: center;
  gap: 10vw;
  position: relative;
`;

const Icon = styled.div`
  font-size: 2.5rem;
  position: absolute;
  top: 25%;
  left: 50%;
  transform: translateX(-50%);
`;

const Text = styled.p`
  margin: 10px 0 0;
  padding: 0;
  font-size: ${({ theme }) => theme.fontSize.medium};
  text-align: center;
`;

type Props = {
  allPlayers: GasPlayer[];
  selectedPlayerId: string;
};

export const PlayerGasChosenNextOutPlayer = ({
  allPlayers,
  selectedPlayerId,
}: Props): JSX.Element | null => {
  const player = allPlayers.find(p => p.player.id === selectedPlayerId);

  if (!player) {
    return null;
  }

  return (
    <>
      <Container>
        <PlayerAvatar player={player.player} size="large" showZodiac={false} />
        <Icon>☠️</Icon>
      </Container>
      <Text>Marked for death!</Text>
    </>
  );
};
