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
import { SoundService, SOUND_KEYS } from '../../../sounds/SoundService';
import GameSoundContext from '../../../contexts/GameSoundContext';

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
    setGameViewed,
  } = useContext(MatchupContext);

  const [showScoreUpdate, setShowScoreUpdate] = useState(false);
  const [showNewGame, setShowNewGame] = useState(false);
  const [delayedTeamDetails, setDelayedTeamDetails] = useState();
  const soundService = useContext<SoundService>(GameSoundContext);

  useEffect(() => {
    soundService.load();
  }, []);

  const onGameViewFinished = () => {
    setTimeout(() => {
      setShowScoreUpdate(true);
      soundService.play(SOUND_KEYS.COLLECT_POINTS);

      setTimeout(() => {
        setShowNewGame(true);
        currentMatchup && setGameViewed(currentMatchup.id);
      }, 2000);
    }, 2000);
  };

  useEffect(() => {
    if (!currentMatchup) {
      return;
    }

    if (!delayedTeamDetails || showScoreUpdate) {
      setDelayedTeamDetails(currentMatchup.teams);
    }
  }, [currentMatchup, showScoreUpdate]);

  useEffect(() => {
    matchupId && subscribeToMatchup(matchupId);

    return () => {
      clearCurrentMatchup();
    };
  }, []);

  return (
    <FullPageLayout pageTitle="" alignTop={true}>
      <MatchupsContainer>
        {!(currentMatchup && delayedTeamDetails) ? (
          <LoadingSpinner text="Loading matchup..." />
        ) : (
          <React.Fragment>
            <TeamDetailsContainer className="margins-off">
              <TeamContainer>
                <TeamDetail
                  team={delayedTeamDetails && delayedTeamDetails[0]}
                  trophyGoal={currentMatchup.trophyGoal}
                  showPointDiff={
                    !!currentMatchup.gameInProgress &&
                    currentMatchup.gameInProgress.status ===
                      GAME_STATUS.Finished
                  }
                />
              </TeamContainer>
              <Vs>vs</Vs>
              <TeamContainer>
                <TeamDetail
                  team={delayedTeamDetails && delayedTeamDetails[1]}
                  reverse
                  trophyGoal={currentMatchup.trophyGoal}
                  showPointDiff={
                    !!currentMatchup.gameInProgress &&
                    currentMatchup.gameInProgress.status ===
                      GAME_STATUS.Finished
                  }
                />
              </TeamContainer>
            </TeamDetailsContainer>
            {!currentMatchup.gameInProgress && (
              <div style={{ textAlign: 'center' }}>
                <Button
                  onClick={() => matchupId && startGameForMatchup(matchupId)}
                >
                  Start a game
                </Button>
              </div>
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
                <div style={{ textAlign: 'center' }}>
                  <Button
                    className="radioactive"
                    onClick={() => {
                      if (matchupId) {
                        setShowScoreUpdate(false);
                        playGameForMatchup(matchupId);
                      }
                    }}
                  >
                    PLAY!
                  </Button>
                </div>
              )}
            {currentMatchup.gameInProgress &&
              currentMatchup.gameInProgress.status === GAME_STATUS.Finished && (
                <GameResult
                  game={currentMatchup.gameInProgress!}
                  gameViewFinished={onGameViewFinished}
                />
              )}
            {showNewGame && (
              <div style={{ textAlign: 'center' }}>
                <Button
                  onClick={() => {
                    if (matchupId) {
                      startGameForMatchup(matchupId);
                      setShowNewGame(false);
                    }
                  }}
                >
                  New Game
                </Button>
              </div>
            )}
          </React.Fragment>
        )}
      </MatchupsContainer>
    </FullPageLayout>
  );
};
