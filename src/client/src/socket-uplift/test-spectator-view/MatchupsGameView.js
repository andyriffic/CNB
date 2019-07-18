import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { MatchupContext } from '../socket-context/MatchupProvider';

const MatchupListItem = styled.div`
  border: 1px solid black;
  border-radius: 5px;
  padding: 20px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
`;

const MatchupPlayer = styled.div`
  text-align: center;
`;

const Vs = styled.div`
  font-weight: bold;
  padding: 0 20px;
  font-size: 2rem;
`;

export const MatchupsGameView = ({ matchupId }) => {
  const { watchMatchup, currentMatchup, playGame } = useContext(MatchupContext);

  useEffect(() => {
    watchMatchup(matchupId);
  }, []);

  return (
    <React.Fragment>
      <h1>Matchup</h1>
      {currentMatchup && (
        <MatchupListItem>
          <MatchupPlayer>
            {currentMatchup.teams[0].name}
            <br />
            {currentMatchup.teams[0].points}
          </MatchupPlayer>
          <Vs>vs</Vs>
          <MatchupPlayer>
            {currentMatchup.teams[1].name}
            <br />
            {currentMatchup.teams[1].points}
          </MatchupPlayer>
          <div>
            (
            {currentMatchup.gameInProgress
              ? currentMatchup.gameInProgress.status
              : 'No Game'}
            )
            {currentMatchup.gameInProgress &&
              currentMatchup.gameInProgress.status === 'ReadyToPlay' && (
                <button type="text" onClick={() => playGame(matchupId)}>
                  PLAY!
                </button>
              )}
          </div>
        </MatchupListItem>
      )}
    </React.Fragment>
  );
};
