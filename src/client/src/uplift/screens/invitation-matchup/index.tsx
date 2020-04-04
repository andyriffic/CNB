import React from 'react';
import { RouteComponentProps } from '@reach/router';
import View from './View';
import { InvitationsProvider } from '../../contexts/InvitationsProvider';

export const InvitationMatchupScreen = (props: RouteComponentProps) => {
  return <View {...props} />;
};
