import React, { useContext } from 'react';
import styled from 'styled-components';
import { GameServiceContext } from '../socket-context/GameServiceProvider';

const PlayerList = styled.select``;
const PlayerItem = styled.option``;

export const SelectPlayerView = ({ setSelectedPlayer }) => {
  const { players } = useContext(GameServiceContext);

  return (
    <PlayerList
      onChange={(e) => {
        setSelectedPlayer(e.target.value);
      }}
    >
      {players &&
        players.map(player => (
          <PlayerItem key={player.id} value={player.id}>
            {player.name}
          </PlayerItem>
        ))}
    </PlayerList>
  );
};
