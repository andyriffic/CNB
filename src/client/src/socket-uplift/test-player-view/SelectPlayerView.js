import React, { useContext } from 'react';
import styled from 'styled-components';
import { GameServiceContext } from '../socket-context/GameServiceProvider';

const PlayerList = styled.select``;
const PlayerItem = styled.option``;

export const SelectPlayerView = ({ setSelectedPlayer }) => {
  const { players } = useContext(GameServiceContext);

  console.log('HERE ARE YOUR PLAYERS', players);

  return (
    <PlayerList
      onChange={e => {
        console.log('change handler', e.target.value);
        setSelectedPlayer(e.target.value);
      }}
    >
      {players && (
        <React.Fragment>
          <PlayerItem key="" value="">
            Select
          </PlayerItem>
          {players.map(player => (
            <PlayerItem key={player.id} value={player.imageName}>
              {player.name}
            </PlayerItem>
          ))}
        </React.Fragment>
      )}
    </PlayerList>
  );
};
