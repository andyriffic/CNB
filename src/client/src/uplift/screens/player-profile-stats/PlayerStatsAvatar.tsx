import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { PlayersContext, Player } from '../../contexts/PlayersProvider';
import { PlayerAvatar } from '../../components/PlayerAvatar';

const Container = styled.div``;

type Props = {
  name: string;
};

export const PlayerStatsAvatar = ({ name }: Props) => {
  const { allPlayers } = useContext(PlayersContext);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | undefined>();

  useEffect(() => {
    if (allPlayers.length && !selectedPlayer) {
      setSelectedPlayer(allPlayers.find(p => p.name === name));
    }
  }, [allPlayers, selectedPlayer]);

  return (
    <Container>
      {selectedPlayer && (
        <PlayerAvatar
          player={selectedPlayer}
          overrideStyle="width: 260px; height: 390px;"
        />
      )}
    </Container>
  );
};
