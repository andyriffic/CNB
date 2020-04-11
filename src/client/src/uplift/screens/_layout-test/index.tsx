import React from 'react';
import View from './View';
import { PlayersProvider } from '../../contexts/PlayersProvider';
import { RouteComponentProps } from '@reach/router';

export const LayoutTestView = (props: RouteComponentProps) => {
  return (
    <PlayersProvider>
      <View {...props} />
    </PlayersProvider>
  );
};
