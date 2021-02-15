import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useGroupedStatsWithRanking } from '../../../uplift/hooks/useGroupedStatsWithRanking';
import { PlayerStatsRecordWithRanking } from '../../../uplift/types';
import { selectRandomOneOf } from '../../../uplift/utils/random';
import { GameScreen } from '../../components/ui/GameScreen';
import { usePlayerStatsAllTime } from '../../providers/hooks/usePlayerStatsAllTIme';
import { Player, usePlayersProvider } from '../../providers/PlayersProvider';
import { PlayerStatsProfile } from './PlayerStatsProfile';

const Container = styled.div`
  margin: 0 auto;
`;

type Props = {
  playerName?: string;
};

const View = ({ playerName }: Props) => {
  const [groupedStatsWithRanking] = useGroupedStatsWithRanking(
    usePlayerStatsAllTime
  );
  const [randomPlayerStats, setRandomPlayerStats] = useState<
    PlayerStatsRecordWithRanking | undefined
  >();
  const [playerPosition, setPlayerPosition] = useState<number | undefined>();
  const { allPlayers } = usePlayersProvider();
  const [player, setPlayer] = useState<Player | undefined>(
    allPlayers.find(p => p.name === playerName)
  );

  useEffect(() => {
    if (player) {
      return;
    }

    setPlayer(allPlayers.find(p => p.name === playerName));
  }, [allPlayers, player]);

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

  console.log('Player stats', groupedStatsWithRanking);

  return (
    <GameScreen scrollable={false}>
      <Container>
        {randomPlayerStats && player && (
          <PlayerStatsProfile
            player={player}
            playerStats={randomPlayerStats}
            position={playerPosition}
          />
        )}
      </Container>
    </GameScreen>
  );
};

export default View;
