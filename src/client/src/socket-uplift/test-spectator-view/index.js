import React from 'react';
import { MatchupProvider } from '../socket-context/MatchupProvider';
import { MatchupsSpectatorList } from './MatchupsSpectatorList';
import { MatchupsGameView } from './MatchupsGameView';

export default () => {
  var urlParams = new URLSearchParams(window.location.search);

  const requestedMatchupId = urlParams.get('matchupid');

  if (requestedMatchupId) {
    return (
      <React.Fragment>
        <MatchupProvider>
          <MatchupsGameView matchupId={requestedMatchupId} />
        </MatchupProvider>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <MatchupProvider>
        <MatchupsSpectatorList />
      </MatchupProvider>
    </React.Fragment>
  );
};
