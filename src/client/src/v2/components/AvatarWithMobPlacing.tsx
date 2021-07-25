import React from 'react';
import { useMemo } from 'react';
import styled from 'styled-components';
import { useMobLeaderboard } from '../providers/MobLeaderboardProvider';
import { Player } from '../providers/PlayersProvider';
import { PodiumPositionType } from '../screens/mob/achievements/PodiumPosition';
import { PlayerAvatar } from './player-avatar';
import { AvatarSizeStyles } from './player-avatar/AvatarImage';
import crownSvg from './Simple_gold_crown.svg';

const Container = styled.div`
  position: relative;
  padding-bottom: 30px;
`;

type PodiumStyle = { backgroundColor: string };

type PlacingStyles = {
  [key in PodiumPositionType]: PodiumStyle;
};

const podiumStyles: PlacingStyles = {
  1: { backgroundColor: 'goldenrod' },
  2: { backgroundColor: 'silver' },
  3: { backgroundColor: 'chocolate' },
};

const BestPlacing = styled.div<{ custom: PodiumStyle }>`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${({ custom }) => custom.backgroundColor};

  border: 2px solid black;
  border-radius: 9px;
  padding: 4px 8px;
  font-size: 0.5rem;
  text-align: center;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em,
    rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em,
    rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
`;

const BestPlacingPlayersEliminated = styled.div`
  font-family: ${({ theme }) => theme.fontFamily.numbers};
  font-size: 0.8rem;
`;

const BestPlacingRound = styled.div``;

const Crown = styled.img.attrs({ src: crownSvg })`
  width: 80px;
  height: 80px;
`;

type Placing = {
  round: 1 | 2 | 3;
  playersEliminated: number;
};

type Props = {
  player: Player;
  size: keyof AvatarSizeStyles;
};

export const PlayerAvatarWithMobPlacing = ({ player, size }: Props) => {
  const { topMainPlayerStats } = useMobLeaderboard();

  const playerBestPlacing = useMemo<Placing | undefined>(() => {
    if (!topMainPlayerStats) {
      return undefined;
    }

    const playerPlacing = topMainPlayerStats.mobMainPlayerSummary.find(
      s => s.playerId === player.id
    );

    if (!playerPlacing) {
      return undefined;
    }

    const bestRoundNumber = playerPlacing.bestRounds.reduce(
      (acc, br) => Math.min(br.roundNumber, acc),
      playerPlacing.bestRounds[0] ? playerPlacing.bestRounds[0].roundNumber : 0
    );

    const bestRound = playerPlacing.bestRounds.find(
      br => br.roundNumber === bestRoundNumber
    );
    if (!bestRound) {
      return undefined;
    }

    return {
      round: bestRound.roundNumber,
      playersEliminated: bestRound.playersEliminated,
    };

    // if (
    //   topMainPlayerStats.mobMainBestPlayers.round1.playerIds.includes(player.id)
    // ) {
    //   return {
    //     round: 1,
    //     playersEliminated:
    //       topMainPlayerStats.mobMainBestPlayers.round1.playersEliminated,
    //   };
    // }

    // if (
    //   topMainPlayerStats.mobMainBestPlayers.round2.playerIds.includes(player.id)
    // ) {
    //   return {
    //     round: 2,
    //     playersEliminated:
    //       topMainPlayerStats.mobMainBestPlayers.round2.playersEliminated,
    //   };
    // }

    // if (
    //   topMainPlayerStats.mobMainBestPlayers.round3.playerIds.includes(player.id)
    // ) {
    //   return {
    //     round: 3,
    //     playersEliminated:
    //       topMainPlayerStats.mobMainBestPlayers.round3.playersEliminated,
    //   };
    // }

    return undefined;
  }, [topMainPlayerStats, player]);

  return (
    <Container>
      <PlayerAvatar player={player} size={size} showZodiac={false} />

      {playerBestPlacing && (
        <BestPlacing custom={podiumStyles[playerBestPlacing.round]}>
          Beat
          <BestPlacingPlayersEliminated>
            {playerBestPlacing.playersEliminated}
          </BestPlacingPlayersEliminated>
          players
        </BestPlacing>
      )}
    </Container>
  );
};
