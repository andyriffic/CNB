import React, { useContext } from 'react';
import styled from 'styled-components';
import { RouteComponentProps, Link } from '@reach/router';
import { FullPageScreenLayout } from '../../components/layouts/FullPageScreenLayout';
import { PlayersContext } from '../../contexts/PlayersProvider';

const PlayerList = styled.ul`
  margin: 0;
  padding: 0 0 50px;
`;

const PlayerItem = styled.li`
  transition: background-color 200ms ease-in-out, transform 400ms ease-in-out;
  cursor: pointer;
  margin: 1em 0 0;
  border-radius: 0.15em;
  box-sizing: border-box;
  text-decoration: none;
  color: #2f4858;
  background-color: #fff5ee;
  box-shadow: inset 0 -0.6em 0 -0.35em rgba(0, 0, 0, 0.17);
  text-align: left;
  position: relative;
  font-size: 1.4rem;

  a {
    display: block;
    padding: 0.75em 0.8em;
    color: inherit;
    text-decoration: none;
  }
`;

export const SelectPlayerView = ({  }: RouteComponentProps) => {
  const { allPlayers } = useContext(PlayersContext);

  return (
    <FullPageScreenLayout title="" alignTop={true} scrollable={true}>
      <PlayerList>
        {allPlayers.map(player => (
          <PlayerItem key={player.id}>
            <Link to={`${player.id}`}>{player.name}</Link>
          </PlayerItem>
        ))}
      </PlayerList>
    </FullPageScreenLayout>
  );
};
