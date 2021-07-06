import React from 'react';
import styled from 'styled-components';
import { LoadingSpinner } from '../../../../uplift/components/loading-spinner';
import { GameScreen } from '../../../components/ui/GameScreen';
import { useMobStats } from '../../../hooks/useMobHistory';
import { usePlayersProvider } from '../../../providers/PlayersProvider';

const Container = styled.div`
  width: 790px;
  margin: 0 auto 50px auto;
`;

export default () => {
  const { loading, stats } = useMobStats();
  const { allPlayers } = usePlayersProvider();

  if (loading || !allPlayers.length) {
    return <LoadingSpinner text="Loading Stats..." />;
  }

  return (
    <GameScreen scrollable={true}>
      <Container>
        <h1>Main Player</h1>
        <h3>Most players eliminated</h3>
        {stats &&
          stats.mainPlayer.map(s => {
            const player = allPlayers.find(p => p.id === s.playerId);
            return player ? (
              <div>
                {player.name}: {s.mostPlayersEliminated}
              </div>
            ) : null;
          })}
      </Container>
    </GameScreen>
  );
};
