import React from 'react';
import { RouteComponentProps } from '@reach/router';
import View from './View';

type Props = {
  continueUrl?: string;
} & RouteComponentProps;

export const WhosThatSupersquadMemberScreen = (props: RouteComponentProps) => {
  const urlParams = new URLSearchParams(props.location!.search);
  return (
    <View
      continueUrl={urlParams.get('continueUrl')}
      playerId={urlParams.get('playerId')}
      {...props}
    />
  );
};
