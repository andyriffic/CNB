import React, { useEffect, useReducer, useState } from 'react';
import { useMemo } from 'react';
import styled, { css } from 'styled-components';
import { slideInUpAnimation } from '../../../../uplift/components/animations';
import { RainbowText } from '../../../../uplift/components/RainbowText';
import {
  RoundResult,
  useMobLeaderboard,
} from '../../../providers/MobLeaderboardProvider';
import { Player } from '../../../providers/PlayersProvider';

const Container = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  padding: 10px 20px;
  border: 2px solid white;
  border-left: 0;
  border-bottom: 0;
  border-radius: 0 10px 0 0;
  background-color: ${({ theme }) => theme.color.background01};
  animation: ${slideInUpAnimation} 600ms ease-in 0s 1 both;
`;

const NewRecordText = styled.h2`
  font-size: 1.2rem;
`;

const NumberText = styled.span`
  font-family: ${({ theme }) => theme.fontFamily.numbers};
  /* font-size: 1.8rem; */
  /* color: white; */
`;

const Text = styled.p`
  color: ${({ theme }) => theme.color.text02};
`;

type Props = {
  player: Player;
  lookupNewResult: boolean;
};

export function NewRecord({
  player,
  lookupNewResult,
}: Props): JSX.Element | null {
  const { topMainPlayerStats, refresh } = useMobLeaderboard();

  useEffect(() => {
    if (lookupNewResult) {
      refresh();
    }
  }, [lookupNewResult]);

  const record = useMemo<RoundResult | undefined>(() => {
    if (!lookupNewResult || !topMainPlayerStats) return undefined;

    if (
      topMainPlayerStats.mobMainBestPlayers.round1.playerIds.includes(player.id)
    ) {
      return {
        roundNumber: 1,
        playersEliminated:
          topMainPlayerStats.mobMainBestPlayers.round1.playersEliminated,
      };
    }

    if (
      topMainPlayerStats.mobMainBestPlayers.round2.playerIds.includes(player.id)
    ) {
      return {
        roundNumber: 2,
        playersEliminated:
          topMainPlayerStats.mobMainBestPlayers.round2.playersEliminated,
      };
    }

    if (
      topMainPlayerStats.mobMainBestPlayers.round3.playerIds.includes(player.id)
    ) {
      return {
        roundNumber: 3,
        playersEliminated:
          topMainPlayerStats.mobMainBestPlayers.round3.playersEliminated,
      };
    }
  }, [lookupNewResult, topMainPlayerStats]);

  if (!record) return null;

  return (
    <Container>
      <NewRecordText>
        <RainbowText>New Record!</RainbowText>
      </NewRecordText>
      <Text>
        Beat <NumberText>{record.playersEliminated}</NumberText> players in{' '}
        <NumberText>{record.roundNumber}</NumberText> round
        {record.roundNumber > 1 && 's'}
      </Text>
    </Container>
  );
}
