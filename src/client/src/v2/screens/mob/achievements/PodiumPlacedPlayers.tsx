import React from 'react';
import styled from 'styled-components';
import { PlayerAvatar } from '../../../components/player-avatar';
import {
  getMostPlayersEliminated,
  MainPlayerHistoryStats,
} from '../../../hooks/useMobHistory';
import { Player, usePlayersProvider } from '../../../providers/PlayersProvider';
import { PodiumPosition } from './PodiumPosition';

const Container = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
`;

const PlayersEliminated = styled.div`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  font-family: ${({ theme }) => theme.fontFamily.numbers};
  font-size: ${({ theme }) => theme.fontSize.large};
  background-color: white;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  border-radius: 8px;
  padding: 4px;
  text-align: center;
  min-width: 60px;
`;

type Props = {
  round: 1 | 2 | 3;
  mainPlayerStats: MainPlayerHistoryStats[];
};

export function PodiumPlacedPlayers({
  round,
  mainPlayerStats,
}: Props): JSX.Element | null {
  const { allPlayers } = usePlayersProvider();

  const bestPlayerStatsForRound = getMostPlayersEliminated(
    round,
    mainPlayerStats
  );

  if (!bestPlayerStatsForRound) return null;

  const playersEliminated =
    bestPlayerStatsForRound[0].bestRounds[0].playersEliminated;

  return (
    <>
      {bestPlayerStatsForRound.map(s => {
        const player = allPlayers.find(p => p.id === s.playerId);
        return (
          player && (
            <Container key={s.playerId}>
              <PlayerAvatar player={player} size="medium" />
              <PlayersEliminated>{playersEliminated}</PlayersEliminated>
              {/* {s.bestRounds[0].playersEliminated} */}
            </Container>
          )
        );
      })}
      <PodiumPosition position={round} />
    </>
  );
}
