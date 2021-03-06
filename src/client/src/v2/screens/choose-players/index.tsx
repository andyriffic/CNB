import React, { useEffect, useRef } from 'react';
import { RouteComponentProps } from '@reach/router';
import View from './View';

export const ChoosePlayerScreen = ({ navigate }: RouteComponentProps) => {
  return <View navigate={navigate} />;
};
