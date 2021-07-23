import React from 'react';
import styled from 'styled-components';
import { PlayerAvatar } from '../../../components/player-avatar';
import {
  getMostPlayersEliminated,
  MainPlayerHistoryStats,
} from '../../../hooks/useMobHistory';
import { TopMainPlayerRound } from '../../../providers/MobLeaderboardProvider';
import { Player, usePlayersProvider } from '../../../providers/PlayersProvider';
import { PodiumPosition } from './PodiumPosition';

const Container = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
`;

const PlayerContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;

  > * {
    width: 60px;
  }
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
  mainPlayerStats: TopMainPlayerRound;
};

export function PodiumPlacedPlayers({
  round,
  mainPlayerStats,
}: Props): JSX.Element | null {
  const { allPlayers } = usePlayersProvider();

  return (
    <>
      <PlayerContainer>
        {mainPlayerStats &&
          mainPlayerStats.playerIds.map(playerId => {
            const player = allPlayers.find(p => p.id === playerId);
            return (
              player && (
                <Container key={playerId}>
                  <PlayerAvatar player={player} size="medium" />
                  {/* {s.bestRounds[0].playersEliminated} */}
                </Container>
              )
            );
          })}
        <PlayersEliminated>
          {mainPlayerStats.playersEliminated}
        </PlayersEliminated>
      </PlayerContainer>
      <PodiumPosition position={round} />
    </>
  );
}
