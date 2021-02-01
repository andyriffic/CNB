import React, { useState } from 'react';
import styled from 'styled-components';
import { PlayerAvatar } from '../../components/player-avatar';
import { Player, usePlayersProvider } from '../../providers/PlayersProvider';

const Container = styled.div`
  padding: 5px;
`;

const Tag = styled.span`
  font-size: 0.7rem;
`;

export const PlayerEdit = ({ player }: { player: Player }) => {
  const { updatePlayer } = usePlayersProvider();
  const [newTag, setNewTag] = useState('');

  const addTag = () => {
    if (!newTag) {
      return;
    }

    const tags = [...player.tags, newTag];
    updatePlayer(player.id, tags);
  };

  const deleteTag = (tagName: string) => {
    const tags = player.tags.filter(t => t !== tagName);
    updatePlayer(player.id, tags);
  };

  return (
    <Container className="margins-off">
      <h3>{player.name}</h3>
      <div style={{ width: '4vw', height: '8vw' }}>
        <PlayerAvatar player={player} size="small" />
      </div>
      {/* <p>{player.avatarImageUrl}</p> */}
      <ul style={{ margin: '0', padding: '0' }}>
        {player.tags.map(tag => (
          <li
            key={tag}
            style={{ margin: '0', padding: '0', listStyleType: 'none' }}
          >
            <Tag>{tag}</Tag>{' '}
            <button type="button" onClick={() => deleteTag(tag)}>
              x
            </button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        maxLength={50}
        onChange={e => setNewTag(e.target.value)}
      />
      <button type="button" onClick={addTag}>
        Add tag
      </button>
    </Container>
  );
};
