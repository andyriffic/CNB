import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { PlayerProfileStatsScreen } from '../player-profile-stats';

export default (routeProps: RouteComponentProps) => {
  return <PlayerProfileStatsScreen {...routeProps} />;
};
