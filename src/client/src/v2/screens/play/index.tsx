import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { SelectPlayerView } from './SelectPlayerView';
import { SelectMatchupView } from './SelectMatchupView';
import { PlayMatchupView } from './PlayMatchupView';
import { PlayMobView } from './PlayMobView';
import { PlayGasView } from './PlayGasView';

export const SelectPlayerScreen = ({  }: RouteComponentProps) => {
  return <SelectPlayerView />;
};

export const SelectMatchupScreen = (props: RouteComponentProps) => {
  return <SelectMatchupView playerId={''} {...props} />;
};

export const PlayMatchupScreen = (props: RouteComponentProps) => {
  return <PlayMatchupView playerId="" matchupId="" {...props} />;
};

export const PlayMobScreen = (props: RouteComponentProps) => {
  return <PlayMobView playerId="" mobGameId="" {...props} />;
};

export const PlayGasScreen = (props: RouteComponentProps) => {
  return <PlayGasView playerId="" gasGameId="" {...props} />;
};
