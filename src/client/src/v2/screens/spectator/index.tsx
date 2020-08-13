import React, { useContext, useEffect } from 'react';
import { RouteComponentProps } from '@reach/router';
import View from './View';
import { MatchupContext } from '../../../uplift/contexts/MatchupProvider';
import { LoadingSpinner } from '../../../uplift/components/loading-spinner';

type Props = {
  matchupId: string;
} & RouteComponentProps;

const Screen = ({ matchupId }: Props) => {
  const { subscribeToMatchup, currentMatchup } = useContext(MatchupContext);

  useEffect(() => {
    subscribeToMatchup(matchupId);
  }, []);

  if (!currentMatchup || !currentMatchup.gameInProgress) {
    return <LoadingSpinner />;
  }

  return <View game={currentMatchup.gameInProgress} />;
};

export default Screen;
