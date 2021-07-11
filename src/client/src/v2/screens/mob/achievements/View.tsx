import React from 'react';
import styled from 'styled-components';
import { LoadingSpinner } from '../../../../uplift/components/loading-spinner';
import { PlayerAvatar } from '../../../components/player-avatar';
import { GameScreen } from '../../../components/ui/GameScreen';
import {
  getMostPlayersEliminated,
  useMobStats,
} from '../../../hooks/useMobHistory';
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

const MainPlayerRound = styled.div``;

export default () => {
  const { loading, stats } = useMobStats();
  const { allPlayers } = usePlayersProvider();

  if (loading || !stats || !allPlayers.length) {
    return <LoadingSpinner text="Loading Stats..." />;
  }

  return (
    <GameScreen scrollable={true}>
      <Container>
        <MainPlayerRoundContainer>
          <MainPlayerRound>
            <PodiumPlacedPlayers round={2} mainPlayerStats={stats.mainPlayer} />
          </MainPlayerRound>
          <MainPlayerRound>
            <PodiumPlacedPlayers round={1} mainPlayerStats={stats.mainPlayer} />
          </MainPlayerRound>
          <MainPlayerRound>
            <PodiumPlacedPlayers round={3} mainPlayerStats={stats.mainPlayer} />
          </MainPlayerRound>
        </MainPlayerRoundContainer>
      </Container>
    </GameScreen>
  );
};
