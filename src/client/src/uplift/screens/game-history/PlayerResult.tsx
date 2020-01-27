import React, { useContext } from 'react';
import styled from 'styled-components';
import { PlayersContext } from '../../contexts/PlayersProvider';
import { PlayerAvatar } from '../../components/PlayerAvatar';
import { StampText } from '../../components/stamp-text';

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
  const { allPlayers } = useContext(PlayersContext);
  const player = allPlayers.find(p => p.name === playerName);

  if (!player) {
    return null;
  }

  return (
    <Container className="margins-off">
      <PlayerAvatar player={player} position={onRight ? 'right' : 'left'} />
      <PlayerName>{playerName}</PlayerName>
    </Container>
  );
};
