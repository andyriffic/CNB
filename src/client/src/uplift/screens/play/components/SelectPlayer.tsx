import React, { useContext } from 'react';
import styled from 'styled-components';
import { Player, PlayersContext } from '../../../contexts/PlayersProvider';
import { LoadingSpinner } from '../../../components/loading-spinner';

const PlayerList = styled.select``;
const PlayerItem = styled.option``;

type SelectPlayerProps = {
  selectedPlayer?: Player;
  selectPlayer: (player?: Player) => void;
};

export const SelectPlayer = ({
  selectedPlayer,
  selectPlayer,
}: SelectPlayerProps) => {
  const { allPlayers, loadingPlayers } = useContext(PlayersContext);

  return (
    <div>
      {loadingPlayers && <LoadingSpinner text="Loading players..." />}
      {!loadingPlayers && !selectedPlayer && (
        <PlayerList
          value={''}
          onChange={e => {
            const player = allPlayers.find(p => p.id === e.target.value);
            player && selectPlayer(player);
          }}
        >
          <PlayerItem key="" value="" disabled>
            Select player
          </PlayerItem>
          {allPlayers.map(player => (
            <PlayerItem key={player.id} value={player.id}>
              {player.name}
            </PlayerItem>
          ))}
        </PlayerList>
      )}
      {!loadingPlayers && selectedPlayer && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <h2>nǐ hǎo, {selectedPlayer.name}</h2>
          <a
            href="#"
            onClick={e => {
              e.preventDefault();
              selectPlayer(undefined);
            }}
          >
            Change player
          </a>
        </div>
      )}
    </div>
  );
};
