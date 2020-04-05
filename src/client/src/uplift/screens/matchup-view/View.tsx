import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { LoadingSpinner } from '../../components/loading-spinner';
import { RouteComponentProps, Link } from '@reach/router';
import { MatchupContext, GAME_STATUS } from '../../contexts/MatchupProvider';
import { SoundService, SOUND_KEYS } from '../../../sounds/SoundService';
import GameSoundContext from '../../../contexts/GameSoundContext';
import { TeamDetailsSection } from './components/TeamDetailSection';
import { GamePlaySection } from './components/GameplaySection';
import { GameThemeContext } from '../../contexts/ThemeProvider';
import { GameSettingsDrawer } from '../../../game-settings';
import { ThemeInfoView } from '../components/theme-info';
import {
  FullPageScreenLayout,
  featureFontFamily,
} from '../../components/layouts/FullPageScreenLayout';
import { ConfettiProvider } from '../../contexts/ConfettiProvider';
import { PrimaryButton } from '../../components/PrimaryButton';
import JungleBackgroundMatchupImg from '../../../images/jungle-cgi.jpg';

const MatchupsContainer = styled.div`
  width: 1200px;
  padding: 0;
  margin: 0 auto;
`;

type MatchupViewProps = {
  matchupId?: string;
} & RouteComponentProps;

const JungleBackground2 = styled.div`
  background-image: url(${JungleBackgroundMatchupImg});
  background-size: 100% 100%;
  height: 100vh;
  color: #f25973;
`;
const NewGameButton = styled(PrimaryButton)`
  background-color: #ff9d76;
`;

const LinkButton = styled(PrimaryButton)`
  a {
    text-decoration: none;
    color: inherit;
  }
`;

export default ({ matchupId }: MatchupViewProps) => {
  const {
    subscribeToMatchup,
    currentMatchup,
    clearCurrentMatchup,
    startGameForMatchup,
    playGameForMatchup,
    setGameViewed,
  } = useContext(MatchupContext);

  const { setTheme, theme } = useContext(GameThemeContext);

  const [showScoreUpdate, setShowScoreUpdate] = useState(false);
  const [showTrophyAward, setShowTrophyAward] = useState(false);
  const [showNewGame, setShowNewGame] = useState(false);
  const [delayedTeamDetails, setDelayedTeamDetails] = useState();
  const soundService = useContext<SoundService>(GameSoundContext);

  useEffect(() => {
    soundService.load();
  }, []);

  useEffect(() => {
    return () => {
      soundService.stop(SOUND_KEYS.INTENSE_MUSIC);
    };
  }, []);

  useEffect(() => {
    console.log('SET THEME (Matchup-View)');

    setTheme(currentMatchup ? currentMatchup.themeId : '');
  }, [currentMatchup]);

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
          soundService.stop(SOUND_KEYS.ANOTHER_ONE_BITES_THE_DUST);
          soundService.play(SOUND_KEYS.AWARD_TROPHY);
          setShowTrophyAward(true);

          setTimeout(() => {
            setShowNewGame(true);
          }, 3000); // Wait this long after showing trophy
        }, 1000); // Wait this long after points updated
      } else {
        setTimeout(() => {
          setShowNewGame(true);
        }, 1000); // Wait this long after points updated
      }
    }, 2000); // Wait this long after game finished to show points update
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
    <FullPageScreenLayout title="" alignTop>
      <ConfettiProvider>
        <GameSettingsDrawer />
        <MatchupsContainer>
          {!(currentMatchup && delayedTeamDetails) ? (
            <LoadingSpinner text="Loading matchup..." />
          ) : (
            <React.Fragment>
              <TeamDetailsSection
                playMode={
                  (currentMatchup &&
                    currentMatchup.gameInProgress &&
                    currentMatchup.gameInProgress.playMode) ||
                  ''
                }
                teams={delayedTeamDetails}
                matchup={currentMatchup}
              />
              <GamePlaySection
                matchup={currentMatchup}
                startGame={(playMode: string = 'Standard') => {
                  if (matchupId) {
                    startGameForMatchup(matchupId, playMode);
                  }
                }}
                playGame={() => {
                  if (matchupId) {
                    setShowScoreUpdate(false);
                    playGameForMatchup(matchupId);
                  }
                }}
                onGameFinished={onGameViewFinished}
                showTrophy={showTrophyAward}
              />
              {currentMatchup &&
                currentMatchup.gameInProgress &&
                currentMatchup.gameInProgress.status ===
                  GAME_STATUS.WaitingPlayerMoves && (
                  <ThemeInfoView theme={theme} />
                )}
              {showNewGame && (
                <div style={{ textAlign: 'center' }}>
                  {!currentMatchup!.gameInProgress!.trophyWon ? (
                    <NewGameButton
                      onClick={() => {
                        if (matchupId) {
                          const samePlayMode =
                            currentMatchup &&
                            currentMatchup.gameInProgress &&
                            currentMatchup.gameInProgress.playMode;
                          startGameForMatchup(matchupId, samePlayMode);
                          setShowNewGame(false);
                          setShowTrophyAward(false);
                        }
                      }}
                    >
                      New Game
                    </NewGameButton>
                  ) : (
                    <LinkButton>
                      <Link
                        to="/snakes-and-ladders"
                        onClick={() => {
                          soundService.play(SOUND_KEYS.RATTLE);
                        }}
                      >
                        TO THE JUNGLE!
                      </Link>
                    </LinkButton>
                  )}
                </div>
              )}
            </React.Fragment>
          )}
        </MatchupsContainer>
      </ConfettiProvider>
    </FullPageScreenLayout>
  );
};
