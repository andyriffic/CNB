import React, { useContext } from 'react';
import styled from 'styled-components';
import { RouteComponentProps, Link } from '@reach/router';
import { FullPageScreenLayout } from '../../components/layouts/FullPageScreenLayout';
import { PlayersContext } from '../../contexts/PlayersProvider';

export const SelectPlayerView = ({  }: RouteComponentProps) => {
  const { allPlayers } = useContext(PlayersContext);

  return (
    <FullPageScreenLayout
      title="Select player"
      alignTop={true}
      scrollable={true}
    >
      {allPlayers.map(player => (
        <p key={player.id}>
          <Link to={`${player.id}`}>{player.name}</Link>
        </p>
      ))}
    </FullPageScreenLayout>
  );
};
