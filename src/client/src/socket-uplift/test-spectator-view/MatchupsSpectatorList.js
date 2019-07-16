import React, { useContext } from 'react';
import styled from 'styled-components';
import { MatchupContext } from '../socket-context/MatchupProvider';

const MatchupListItem = styled.div`
  border: 1px solid black;
  border-radius: 5px;
  padding: 20px;
  margin-bottom: 20px;
  cursor: pointer;
`;

export const MatchupsSpectatorList = () => {
  const { matchups } = useContext(MatchupContext);

  return (
    <React.Fragment>
      <h1>Matchups</h1>
      {matchups.map(matchup => (
        <MatchupListItem
          key={matchup.id}
          onClick={() =>
            window.open(
              `/?feature=uplift-spectator&matchupid=${matchup.id}`,
              '_self'
            )
          }
        >
          {matchup.teamIds[0]} <strong>vs</strong> {matchup.teamIds[1]}
        </MatchupListItem>
      ))}
    </React.Fragment>
  );
};
