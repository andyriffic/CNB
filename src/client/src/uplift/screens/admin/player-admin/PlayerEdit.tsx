import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { Player, PlayersContext } from '../../../contexts/PlayersProvider';
import { PlayerAvatar } from '../../../components/PlayerAvatar';

const Container = styled.div`
  padding: 5px;
`;

export const PlayerEdit = ({ player }: { player: Player }) => {
  const { updatePlayer } = useContext(PlayersContext);
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
      <PlayerAvatar
        player={player}
        overrideStyle="width: 60px; height: 90px;"
      />
      {/* <p>{player.avatarImageUrl}</p> */}
      <ul>
        {player.tags.map(tag => (
          <li key={tag}>
            {tag}{' '}
            <button type="button" onClick={() => deleteTag(tag)}>
              x
            </button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        maxLength={20}
        onChange={e => setNewTag(e.target.value)}
      />
      <button type="button" onClick={addTag}>
        Add tag
      </button>
    </Container>
  );
};
