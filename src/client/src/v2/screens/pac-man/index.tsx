import React from 'react';
import { RouteComponentProps } from '@reach/router';
import View from './View';
import { usePlayersProvider } from '../../providers/PlayersProvider';
import { LoadingSpinner } from '../../../uplift/components/loading-spinner';

export const PacManScreen = ({  }: RouteComponentProps) => {
  const { allPlayers } = usePlayersProvider();

  if (!allPlayers.length) {
    return <LoadingSpinner text="Loading Players..." />;
  }

  return <View allPlayers={allPlayers} />;
};
