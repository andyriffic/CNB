import React, { useMemo, useRef } from 'react';
import styled from 'styled-components';
import { isFeatureEnabled } from '../../../../featureToggle';
import { GasGame } from '../../../providers/GasProvider';
import { RotatingPlayerCarousel } from './RotatingPlayerCarousel';

const transparentCarousel = isFeatureEnabled('transparent');

const PlayerListContainer = styled.div``;

type Props = {
  game: GasGame;
  gameOver: boolean;
};

export function PlayerCarousel({ game, gameOver }: Props): JSX.Element {
  const indexRef = useRef(
    game.alivePlayersIds.findIndex(pid => pid === game.currentPlayer.id)
  );
  const lastPlayerIdRef = useRef(game.currentPlayer.id);

  const displayIndex = useMemo(() => {
    // if (game.currentPlayer.pressesRemaining > 0) {
    //   return indexRef.current;
    // }

    if (lastPlayerIdRef.current === game.currentPlayer.id) {
      return indexRef.current;
    }

    if (game.deadPlayerIds.includes(lastPlayerIdRef.current)) {
      indexRef.current = game.alivePlayersIds.findIndex(
        pid => pid === game.currentPlayer.id
      );
    } else {
      indexRef.current =
        indexRef.current + (game.direction === 'right' ? 1 : -1);
    }
    lastPlayerIdRef.current = game.currentPlayer.id;

    return indexRef.current;
  }, [game]);

  return (
    <PlayerListContainer>
      <RotatingPlayerCarousel
        game={game}
        gameOver={gameOver}
        displayIndex={displayIndex}
        transparent={transparentCarousel}
      />
    </PlayerListContainer>
  );
}
