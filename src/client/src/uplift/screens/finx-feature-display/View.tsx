import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { PlayerProfileStatsScreen } from '../player-profile-stats';
import { LeaderboardScreen } from '../leaderboard';
import { selectRandomOneOf } from '../../utils/random';

export default (routeProps: RouteComponentProps) => {
  const randomScreens = [
    <LeaderboardScreen {...routeProps} maxPlacing={3} />,
    <PlayerProfileStatsScreen {...routeProps} />,
  ];
  return selectRandomOneOf(randomScreens);
};
