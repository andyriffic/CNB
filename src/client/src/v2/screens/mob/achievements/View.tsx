import React from 'react';
import styled from 'styled-components';
import { LoadingSpinner } from '../../../../uplift/components/loading-spinner';
import { PlayerAvatar } from '../../../components/player-avatar';
import { GameScreen } from '../../../components/ui/GameScreen';
import {
  getMostPlayersEliminated,
  useMobStats,
} from '../../../hooks/useMobHistory';
import { useMobLeaderboard } from '../../../providers/MobLeaderboardProvider';
import { usePlayersProvider } from '../../../providers/PlayersProvider';
import { PodiumPlacedPlayers } from './PodiumPlacedPlayers';
import { PodiumPosition } from './PodiumPosition';

const Container = styled.div`
  margin: 0 auto 50px auto;
`;

const MainPlayerRoundContainer = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  justify-content: center;
`;

const MainPlayerRound = styled.div`
  width: 33%;
`;

export default () => {
  const { allPlayers } = usePlayersProvider();
  const { topMainPlayerStats } = useMobLeaderboard();

  if (!topMainPlayerStats || !allPlayers.length) {
    return <LoadingSpinner text="Loading Stats..." />;
  }

  return (
    <GameScreen scrollable={true}>
      <Container>
        <MainPlayerRoundContainer>
          <MainPlayerRound>
            <PodiumPlacedPlayers
              round={2}
              mainPlayerStats={topMainPlayerStats.mobMainBestPlayers.round2}
            />
          </MainPlayerRound>
          <MainPlayerRound>
            <PodiumPlacedPlayers
              round={1}
              mainPlayerStats={topMainPlayerStats.mobMainBestPlayers.round1}
            />
          </MainPlayerRound>
          <MainPlayerRound>
            <PodiumPlacedPlayers
              round={3}
              mainPlayerStats={topMainPlayerStats.mobMainBestPlayers.round3}
            />
          </MainPlayerRound>
        </MainPlayerRoundContainer>
      </Container>
    </GameScreen>
  );
};
