import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import FullPageLayout from '../../../components/page-layout/FullPage';
import { LoadingSpinner } from '../../components/loading-spinner';
import { RouteComponentProps } from '@reach/router';
import { MatchupContext, GAME_STATUS } from '../../contexts/MatchupProvider';
import { TeamDetail } from './components/TeamDetail';
import { StartGame } from './components/StartGame';
import { Button } from '../../../screens/styled';
import { GameWaitingOnPlayers } from './components/GameWaitingOnPlayers';

const MatchupsContainer = styled.div`
  width: 95%;
  padding: 40px 0;
  margin: 0 auto;
`;

const TeamDetailsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TeamContainer = styled.div`
  flex: 1;
`;

const Vs = styled.div`
  padding: 0 20px;
`;

type MatchupViewProps = {
  matchupId?: string;
} & RouteComponentProps;

export default ({ matchupId }: MatchupViewProps) => {
  const {
    subscribeToMatchup,
    currentMatchup,
    clearCurrentMatchup,
    startGameForMatchup,
  } = useContext(MatchupContext);

  useEffect(() => {
    matchupId && subscribeToMatchup(matchupId);

    return () => {
      clearCurrentMatchup();
    };
  }, []);

  return (
    <FullPageLayout pageTitle="" alignTop={true}>
      <MatchupsContainer>
        {!currentMatchup ? (
          <LoadingSpinner text="Loading matchup..." />
        ) : (
          <React.Fragment>
            <TeamDetailsContainer className="margins-off">
              <TeamContainer>
                <TeamDetail team={currentMatchup.teams[0]} />
              </TeamContainer>
              <Vs>vs</Vs>
              <TeamContainer>
                <TeamDetail team={currentMatchup.teams[1]} />
              </TeamContainer>
            </TeamDetailsContainer>
            {!currentMatchup.gameInProgress && (
              <Button
                onClick={() => matchupId && startGameForMatchup(matchupId)}
              >
                PLAY
              </Button>
            )}
            {currentMatchup.gameInProgress &&
              currentMatchup.gameInProgress.status ===
                GAME_STATUS.WaitingPlayerMoves && (
                <GameWaitingOnPlayers
                  moves={currentMatchup.gameInProgress.moves}
                />
              )}
          </React.Fragment>
        )}
      </MatchupsContainer>
    </FullPageLayout>
  );
};
