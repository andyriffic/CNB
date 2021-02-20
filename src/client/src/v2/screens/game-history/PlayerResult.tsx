import React, { useContext } from 'react';
import styled from 'styled-components';
import { PlayerAvatar } from '../../components/player-avatar';
import { usePlayersProvider } from '../../providers/PlayersProvider';

const Container = styled.div`
  position: relative;
`;
const PlayerName = styled.p`
  text-align: center;
`;

type Props = {
  playerName: string;
  onRight?: boolean;
};

export const PlayerResult = ({ playerName, onRight = false }: Props) => {
  const { allPlayers } = usePlayersProvider();
  const player = allPlayers.find(p => p.name === playerName);

  if (!player) {
    return null;
  }

  return (
    <Container className="margins-off">
      <PlayerAvatar player={player} size="medium" />
      <PlayerName>{playerName}</PlayerName>
    </Container>
  );
};
