import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import FullPageLayout from '../../../components/page-layout/FullPage';
import { LoadingSpinner } from '../../components/loading-spinner';
import { RouteComponentProps } from '@reach/router';
import { MatchupContext, GAME_STATUS } from '../../contexts/MatchupProvider';
import { TeamDetailItem } from './components/TeamDetailItem';
import { Button } from '../../../screens/styled';
import { GameWaitingOnPlayers } from './components/GameWaitingOnPlayers';
import { GameResult } from './components/GameResult';
import { SoundService, SOUND_KEYS } from '../../../sounds/SoundService';
import GameSoundContext from '../../../contexts/GameSoundContext';
import { TeamDetailsSection } from './components/TeamDetailSection';
import { GamePlaySection } from './components/GameplaySection';

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

      if (
        currentMatchup &&
        currentMatchup.gameInProgress &&
        !currentMatchup.gameInProgress.viewed
      ) {
        soundService.play(SOUND_KEYS.COLLECT_POINTS);
      }

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
            <TeamDetailsSection
              teams={delayedTeamDetails}
              matchup={currentMatchup}
            />
            <GamePlaySection
              matchup={currentMatchup}
              startGame={() => matchupId && startGameForMatchup(matchupId)}
              playGame={() => {
                if (matchupId) {
                  setShowScoreUpdate(false);
                  playGameForMatchup(matchupId);
                }
              }}
              onGameFinished={onGameViewFinished}
            />
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
