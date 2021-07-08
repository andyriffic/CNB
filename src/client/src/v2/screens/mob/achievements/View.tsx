import React from 'react';
import styled from 'styled-components';
import { LoadingSpinner } from '../../../../uplift/components/loading-spinner';
import { GameScreen } from '../../../components/ui/GameScreen';
import {
  getMostPlayersEliminated,
  useMobStats,
} from '../../../hooks/useMobHistory';
import { usePlayersProvider } from '../../../providers/PlayersProvider';

const Container = styled.div`
  margin: 0 auto 50px auto;
`;

export default () => {
  const { loading, stats } = useMobStats();
  const { allPlayers } = usePlayersProvider();

  if (loading || !allPlayers.length) {
    return <LoadingSpinner text="Loading Stats..." />;
  }

  const bestRound3 = stats && getMostPlayersEliminated(3, stats.mainPlayer);
  const bestRound2 = stats && getMostPlayersEliminated(2, stats.mainPlayer);
  const bestRound1 = stats && getMostPlayersEliminated(1, stats.mainPlayer);

  return (
    <GameScreen scrollable={true}>
      <Container>
        <h1>Main Player</h1>
        <h3>Most players eliminated</h3>
        {/* {stats &&
          stats.mainPlayer.map(s => {
            const player = allPlayers.find(p => p.id === s.playerId);
            return player ? (
              <dl key={player.id}>
                <dt>{player.name}</dt>
                {s.bestRounds.map(br => (
                  <dd key={br.roundNumber}>
                    [{br.roundNumber}, {br.playersEliminated}]
                  </dd>
                ))}
              </dl>
            ) : null;
          })} */}
        {bestRound3 && (
          <div>
            <h3>Knocked out in 3 rounds</h3>
            {bestRound3.map(s => (
              <p key={s.playerId}>
                {s.playerId}: {s.bestRounds[0].playersEliminated}
              </p>
            ))}
          </div>
        )}
        {bestRound2 && (
          <div>
            <h3>Knocked out in 2 rounds</h3>
            {bestRound2.map(s => (
              <p key={s.playerId}>
                {s.playerId}: {s.bestRounds[0].playersEliminated}
              </p>
            ))}
          </div>
        )}
        {bestRound1 && (
          <div>
            <h3>Knocked out in 1 round</h3>
            {bestRound1.map(s => (
              <p key={s.playerId}>
                {s.playerId}: {s.bestRounds[0].playersEliminated}
              </p>
            ))}
          </div>
        )}
      </Container>
    </GameScreen>
  );
};
