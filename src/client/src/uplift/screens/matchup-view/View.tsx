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
import { GameThemeContext } from '../../contexts/ThemeProvider';
import { TrophyAward } from './components/TrophyAward';

const MatchupsContainer = styled.div`
  width: 95%;
  padding: 40px 0;
  margin: 0 auto;
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

  const { setTheme } = useContext(GameThemeContext);

  const [showScoreUpdate, setShowScoreUpdate] = useState(false);
  const [showTrophyAward, setShowTrophyAward] = useState(false);
  const [showNewGame, setShowNewGame] = useState(false);
  const [delayedTeamDetails, setDelayedTeamDetails] = useState();
  const soundService = useContext<SoundService>(GameSoundContext);

  useEffect(() => {
    soundService.load();
  }, []);

  useEffect(() => {
    console.log('SET THEME (Matchup-View)');

    setTheme('rock-paper-scissors');
  }, []);

  const onGameViewFinished = () => {
    setTimeout(() => {
      currentMatchup && setGameViewed(currentMatchup.id);
      setShowScoreUpdate(true);

      if (
        currentMatchup &&
        currentMatchup.gameInProgress &&
        currentMatchup.gameInProgress.result &&
        currentMatchup.gameInProgress.result.winnerIndex !== undefined &&
        !currentMatchup.gameInProgress.viewed
      ) {
        soundService.play(SOUND_KEYS.COLLECT_POINTS);
      }

      if (currentMatchup!.gameInProgress!.trophyWon) {
        // TODO: replace with test to see if trophy was won
        setTimeout(() => {
          soundService.play(SOUND_KEYS.AWARD_TROPHY);
          setShowTrophyAward(true);

          setTimeout(() => {
            setShowNewGame(true);
          }, 7000); // Wait this long after showing trophy
        }, 2000); // Wait this long after points updated
      } else {
        setTimeout(() => {
          setShowNewGame(true);
        }, 2000); // Wait this long after points updated
      }
    }, 3000); // Wait this long after game finished to show points update
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
              showTrophy={showTrophyAward}
            />
            {showNewGame && (
              <div style={{ textAlign: 'center' }}>
                <Button
                  onClick={() => {
                    if (matchupId) {
                      startGameForMatchup(matchupId);
                      setShowNewGame(false);
                      setShowTrophyAward(false);
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
