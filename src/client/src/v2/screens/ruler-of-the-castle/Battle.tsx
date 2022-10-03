import React, { useEffect, useState } from 'react';
import styled, {
  css,
  FlattenSimpleInterpolation,
  keyframes,
} from 'styled-components';
import { FancyLink } from '../../../components/FancyLink';
import RainbowText from '../../../components/rainbow-text';
import { PlayerAvatar } from '../../components/player-avatar';
import { Button } from '../../components/ui/buttons';
import { useMatchupProvider } from '../../providers/MatchupProvider';

const BattleText = styled.div`
  cursor: pointer;
  font-size: 3rem;
`;

type Props = {
  attackingPlayerId: string;
  defendingPlayerId: string;
};

export const Battle = ({ attackingPlayerId, defendingPlayerId }: Props) => {
  const { addInstantMatchup } = useMatchupProvider();

  const startBattle = () => {
    addInstantMatchup(
      attackingPlayerId,
      defendingPlayerId,
      2,
      'rock-paper-scissors-classic',
      matchupId => {
        window.location.href = `/spectator/${matchupId}?winnerKey=castle_battle_winner`;
      }
    );
  };

  return (
    <BattleText onClick={startBattle}>
      <RainbowText>BATTLE!!!</RainbowText>
    </BattleText>
  );
};
