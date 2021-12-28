import React from 'react';
import { RouteComponentProps } from '@reach/router';
import View from './View';

type Props = {
  gameId: string;
} & RouteComponentProps;

export const GasGameSpectatorScreen = ({ gameId, navigate }: Props) => {
  return <View gameId={gameId} navigate={navigate} />;
};
