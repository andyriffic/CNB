import React from 'react';
import { RouteComponentProps } from '@reach/router';
import View from './View';

type Props = {
  playerName?: string;
} & RouteComponentProps;

export const PlayerProfileScreen = ({ playerName }: Props) => {
  return <View playerName={playerName} />;
};
