import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { InvitationsProvider } from '../../contexts/InvitationsProvider';
import { SelectPlayerView } from './SelectPlayerView';
import { PlayersProvider } from '../../contexts/PlayersProvider';
import { SelectMatchupView } from './SelectMatchupView';
import { PlayMatchupView } from './PlayMatchupView';

const viewWithProviders = (component: React.ReactElement) => {
  return (
    <PlayersProvider>
      <InvitationsProvider>{component}</InvitationsProvider>
    </PlayersProvider>
  );
};

export const SelectPlayerScreen = (props: RouteComponentProps) => {
  return <SelectPlayerView {...props} />;
};

export const SelectMatchupScreen = (props: RouteComponentProps) => {
  return <SelectMatchupView playerId={''} {...props} />;
};

export const PlayMatchupScreen = (props: RouteComponentProps) => {
  return <PlayMatchupView playerId="" matchupId="" {...props} />;
};
