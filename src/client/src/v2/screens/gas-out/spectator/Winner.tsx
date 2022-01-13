import React, { useMemo } from 'react';
import styled from 'styled-components';
import { fadeInDownAnimation } from '../../../../uplift/components/animations';
import { FeatureText } from '../../../components/ui/Atoms';
import { GasGame, GasPlayer } from '../../../providers/GasProvider';

const TextContainer = styled.div`
  margin-top: 30px;
  animation: ${fadeInDownAnimation} 1500ms ease-in-out 0s 1 both;
`;

type Props = {
  game: GasGame;
};

export function Winner({ game }: Props): JSX.Element | null {
  const winningPlayer = useMemo<GasPlayer | undefined>(() => {
    if (!game.winningPlayerId) {
      return;
    }

    return game.allPlayers.find(p => p.status === 'winner');
  }, [game]);

  return winningPlayer ? (
    <TextContainer>
      <FeatureText>{winningPlayer.player.name} wins 🥳</FeatureText>
    </TextContainer>
  ) : null;
}
