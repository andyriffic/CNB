import React, { useState } from 'react';
import styled from 'styled-components';
import { usePlayersProvider } from '../../providers/PlayersProvider';

const Container = styled.div`
  padding: 5px;
`;

export const PlayerAdd = () => {
  const { addPlayer } = usePlayersProvider();
  const [playerId, setPlayerId] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [imageUrl, setImageUrl] = useState('-');

  return (
    <Container className="margins-off">
      <fieldset>
        <fieldset>
          <label>id</label>
          <input
            type="text"
            id="playerId"
            value={playerId}
            maxLength={20}
            onChange={e => setPlayerId(e.target.value)}
          />
        </fieldset>
        <fieldset>
          <label>name</label>
          <input
            type="text"
            id="playerName"
            maxLength={40}
            value={playerName}
            onChange={e => setPlayerName(e.target.value)}
          />
        </fieldset>
        <button
          type="button"
          onClick={() => {
            if (playerId && playerName && imageUrl) {
              addPlayer(playerId, playerName, imageUrl);
            }
          }}
        >
          Add
        </button>
      </fieldset>
    </Container>
  );
};
