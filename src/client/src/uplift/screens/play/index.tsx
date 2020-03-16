import React from 'react';
import { RouteComponentProps } from '@reach/router';
import View from './View';
import { InvitationsProvider } from '../../contexts/InvitationsProvider';

export const PlayView = (props: RouteComponentProps) => {
  return (
    <InvitationsProvider>
      <View {...props} />
    </InvitationsProvider>
  );
};
