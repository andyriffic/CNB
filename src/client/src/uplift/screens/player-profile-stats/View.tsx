import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { RouteComponentProps } from '@reach/router';
import { FullPageScreenLayout } from '../../components/layouts/FullPageScreenLayout';
import { selectRandomOneOf } from '../../utils/random';
import { PlayerStatsProfile } from './PlayerStatsProfile';
import { useGroupedStatsWithRanking } from '../../hooks/useGroupedStatsWithRanking';
import { PlayerStatsRecordWithRanking } from '../../types';
import { usePlayerStatsAllTime } from '../../hooks/usePlayerStatsAllTIme';

const MatchupsContainer = styled.div`
  /* width: 790px; */
  margin: 0 auto;
  display: flex;
  justify-content: center;
`;

type Props = {
  playerName?: string;
} & RouteComponentProps;

export default ({ playerName }: Props) => {
  const [groupedStatsWithRanking] = useGroupedStatsWithRanking(
    usePlayerStatsAllTime
  );
  const [randomPlayerStats, setRandomPlayerStats] = useState<
    PlayerStatsRecordWithRanking | undefined
  >();
  const [playerPosition, setPlayerPosition] = useState<number | undefined>();

  useEffect(() => {
    if (groupedStatsWithRanking && !randomPlayerStats) {
      //const snakesAndLaddersPlayers = getBoardPlayers(allPlayers);
      if (!playerName) {
        const randomPositionGroup = selectRandomOneOf(groupedStatsWithRanking);
        const position = groupedStatsWithRanking.indexOf(randomPositionGroup);
        const randomStats = selectRandomOneOf(randomPositionGroup);
        setRandomPlayerStats(randomStats);
        setPlayerPosition(position + 1);
      } else {
        const playerPosition = groupedStatsWithRanking.findIndex(g =>
          g.find(r => r.player_name === playerName)
        );
        const playerStats = groupedStatsWithRanking[playerPosition].find(
          s => s.player_name === playerName
        );
        setRandomPlayerStats(playerStats);
        setPlayerPosition(playerPosition + 1);
      }
    }
  }, [groupedStatsWithRanking, randomPlayerStats]);

  return (
    <FullPageScreenLayout title="" alignTop={false}>
      <MatchupsContainer>
        {randomPlayerStats && (
          <PlayerStatsProfile
            playerStats={randomPlayerStats}
            position={playerPosition}
          />
        )}
      </MatchupsContainer>
    </FullPageScreenLayout>
  );
};
