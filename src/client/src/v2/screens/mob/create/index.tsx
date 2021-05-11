import React from 'react';
import { RouteComponentProps } from '@reach/router';
import View from './View';

export const CreateMobScreen = ({ navigate }: RouteComponentProps) => {
  return <View navigate={navigate} />;
};
