import React from 'react';
import { RouteComponentProps } from '@reach/router';
import View from './View';

type Props = {
  mobGameId: string;
} & RouteComponentProps;

export const MobSpectatorScreen = ({ mobGameId }: Props) => {
  return <View mobGameId={mobGameId} />;
};
