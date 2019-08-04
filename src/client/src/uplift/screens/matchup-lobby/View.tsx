import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import FullPageLayout from '../../../components/page-layout/FullPage';
import { LoadingSpinner } from '../../components/loading-spinner';
import { MatchupContext, MatchupService } from '../../contexts/MatchupProvider';
import { MatchupSummaryView } from '../components/matchup-summary';
import { RouteComponentProps } from '@reach/router';
import { GameSettingsDrawer } from '../../../game-settings';
import GameSoundContext from '../../../contexts/GameSoundContext';
import { SOUND_KEYS } from '../../../sounds/SoundService';

type SoundService = {
  load: () => void;
  stopAll: () => void;
  play: (soundKey: string) => void;
};

const MatchupsContainer = styled.div`
  width: 80%;
  padding: 40px 0;
  margin: 0 auto;
`;

export default ({ navigate }: RouteComponentProps) => {
  const { allMatchups, loadingAllMatchups } = useContext(MatchupContext);
  const soundService = useContext<SoundService>(GameSoundContext);

  useEffect(() => {
    soundService.load();
    soundService.play(SOUND_KEYS.ELEVATOR_MUSIC);

    return () => {
      soundService.stopAll();
    }
  }, []);

  return (
    <FullPageLayout pageTitle="Matchup Lobby" alignTop={true}>
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
    </FullPageLayout>
  );
};
