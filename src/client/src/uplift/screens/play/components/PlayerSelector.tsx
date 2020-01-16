import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { Player, PlayersContext } from '../../../contexts/PlayersProvider';
import { LoadingSpinner } from '../../../components/loading-spinner';
import { SecondaryButton } from '../../../components/SecondaryButton';

const PlayerList = styled.ul`
  margin: 0;
  padding: 0 0 50px;
`;

const PlayerItem = styled.li<{ highlighted: boolean }>`
  transition: background-color 200ms ease-in-out, transform 400ms ease-in-out;
  padding: 0.75em 0.8em;
  cursor: pointer;
  margin: 1em 0 0;
  border-radius: 0.15em;
  box-sizing: border-box;
  text-decoration: none;
  color: ${props => (props.highlighted ? '#ffffff' : '#2f4858')};
  background-color: ${props => (props.highlighted ? '#40bfc1' : '#fff5ee')};
  box-shadow: inset 0 -0.6em 0 -0.35em rgba(0, 0, 0, 0.17);
  text-align: left;
  position: relative;
  font-size: 1.4rem;

  display: flex;
  justify-content: space-between;
`;

type SelectPlayerProps = {
  selectedPlayer?: Player;
  selectPlayer: (player?: Player) => void;
};

export const PlayerSelector = ({
  selectedPlayer,
  selectPlayer,
}: SelectPlayerProps) => {
  const [highlightedPlayer, setHighlightedPlayer] = useState(selectedPlayer);
  const { allPlayers, loadingPlayers } = useContext(PlayersContext);

  return (
    <div>
      {loadingPlayers && <LoadingSpinner text="Loading players..." />}
      {!loadingPlayers && !selectedPlayer && (
        <PlayerList>
          {allPlayers
            .filter(p => !p.tags.includes('retired'))
            .map(player => {
              const isHighlighted =
                !!highlightedPlayer && highlightedPlayer.id === player.id;
              return (
                <PlayerItem
                  highlighted={isHighlighted}
                  onClick={() => setHighlightedPlayer(player)}
                  key={player.id}
                >
                  <span>{player.name}</span>
                  {isHighlighted && (
                    <SecondaryButton onClick={() => selectPlayer(player)}>
                      Play
                    </SecondaryButton>
                  )}
                </PlayerItem>
              );
            })}
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
