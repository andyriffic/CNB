import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import FullPageLayout from '../../../components/page-layout/FullPage';
import { LoadingSpinner } from '../../components/loading-spinner';
import { MatchupContext, MatchupService } from '../../contexts/MatchupProvider';
import { MatchupSummaryView } from '../components/matchup-summary';
import { RouteComponentProps } from '@reach/router';
import { GameSettingsDrawer } from '../../../game-settings';
import GameSoundContext from '../../../contexts/GameSoundContext';
import { SOUND_KEYS, SoundService } from '../../../sounds/SoundService';
import { FullPageScreenLayout } from '../../components/layouts/FullPageScreenLayout';
import { GameThemeContext } from '../../contexts/ThemeProvider';

const MatchupsContainer = styled.div`
  width: 80%;
  padding: 40px 0;
  margin: 0 auto;
`;

export default ({ navigate }: RouteComponentProps) => {
  const { setTheme } = useContext(GameThemeContext);
  const { allMatchups, loadingAllMatchups } = useContext(MatchupContext);
  const soundService = useContext<SoundService>(GameSoundContext);

  useEffect(() => {
    setTheme('');
  }, []);

  useEffect(() => {
    soundService.load();
    soundService.play(SOUND_KEYS.ELEVATOR_MUSIC);

    return () => {
      soundService.stopAll();
    };
  }, []);

  return (
    <FullPageScreenLayout title="Matchup Lobby" alignTop={true}>
      <GameSettingsDrawer />
      <MatchupsContainer>
        {loadingAllMatchups ? (
          <LoadingSpinner text="loading matchups..." />
        ) : (
          allMatchups.map(matchup => (
            <MatchupSummaryView
              key={matchup.id}
              matchup={matchup}
              onSelected={() =>
                navigate && navigate(`/matchup/${matchup.id}?feature=uplift`)
              }
            />
          ))
        )}
      </MatchupsContainer>
    </FullPageScreenLayout>
  );
};
