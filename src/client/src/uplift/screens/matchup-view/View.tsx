import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import FullPageLayout from '../../../components/page-layout/FullPage';
import { LoadingSpinner } from '../../components/loading-spinner';
import { RouteComponentProps } from '@reach/router';
import { MatchupContext, GAME_STATUS } from '../../contexts/MatchupProvider';
import { TeamDetail } from './components/TeamDetail';
import { Button } from '../../../screens/styled';
import { GameWaitingOnPlayers } from './components/GameWaitingOnPlayers';
import { GameResult } from './components/GameResult';

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
    playGameForMatchup,
  } = useContext(MatchupContext);

  const [showScoreUpdate, setShowScoreUpdate] = useState(false);

  const onGameViewFinished = () => {
    setTimeout(() => {
      setShowScoreUpdate(true);
    }, 2000);
  };

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
                <TeamDetail
                  team={currentMatchup.teams[0]}
                  showUpdatedValue={showScoreUpdate}
                />
              </TeamContainer>
              <Vs>vs</Vs>
              <TeamContainer>
                <TeamDetail
                  team={currentMatchup.teams[1]}
                  showUpdatedValue={showScoreUpdate}
                  reverse
                />
              </TeamContainer>
            </TeamDetailsContainer>
            {!currentMatchup.gameInProgress && (
              <Button
                onClick={() => matchupId && startGameForMatchup(matchupId)}
              >
                Start a game
              </Button>
            )}
            {currentMatchup.gameInProgress &&
              currentMatchup.gameInProgress.status !== GAME_STATUS.Finished && (
                <GameWaitingOnPlayers
                  moves={currentMatchup.gameInProgress.moves}
                />
              )}
            {currentMatchup.gameInProgress &&
              currentMatchup.gameInProgress.status ===
                GAME_STATUS.ReadyToPlay && (
                <Button
                  className="radioactive"
                  style={{ width: '100%' }}
                  onClick={() => {
                    if (matchupId) {
                      setShowScoreUpdate(false);
                      playGameForMatchup(matchupId);
                    }
                  }}
                >
                  PLAY!
                </Button>
              )}
            {currentMatchup.gameInProgress &&
              currentMatchup.gameInProgress.status === GAME_STATUS.Finished && (
                <GameResult
                  game={currentMatchup.gameInProgress!}
                  startNewGame={() =>
                    matchupId && startGameForMatchup(matchupId)
                  }
                  gameViewFinished={onGameViewFinished}
                />
              )}
          </React.Fragment>
        )}
      </MatchupsContainer>
    </FullPageLayout>
  );
};
