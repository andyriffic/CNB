import React, { useEffect, useMemo } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { isFeatureEnabled } from '../../../../featureToggle';
import { spinAwayAnimationUp } from '../../../../uplift/components/animations';
import { PlayerAvatar } from '../../../components/player-avatar';
import { GasGame, GasPlayer } from '../../../providers/GasProvider';
import { useSoundProvider } from '../../../providers/SoundProvider';

const Container = styled.div``;

export const explodeAnimation = keyframes`
  0% { transform: translate(0, 0) rotate(0deg); }
  30% { transform: translate(0, -2000px) rotate(-1080deg); }
  100% { transform: translate(0, -2000px) rotate(-1080deg); }
`;

const PlayerAvatarContainer = styled.div<{ exploded: boolean }>`
  /* display: flex;
  justify-content: center;
  width: 100%; */
  visibility: ${({ exploded }) => (exploded ? 'visible' : 'hidden')};
  /* visibility: hidden; */
  /* opacity: ${({ exploded }) => (exploded ? '1' : '0.3')}; */
  ${({ exploded }) =>
    exploded &&
    css`
      animation: ${explodeAnimation} 2000ms ease-in-out 0s 1 backwards;
    `}
`;

const Boomerang = styled.div`
  font-size: 3rem;
  animation: ${spinAwayAnimationUp} 2s ease-in-out both;
`;

type Props = {
  game: GasGame;
};

export function ExplodingPlayer({ game }: Props): JSX.Element {
  const { play } = useSoundProvider();
  const currentPlayer = useMemo(
    () => game.allPlayers.find(p => p.player.id === game.currentPlayer.id)!,
    [game]
  );

  useEffect(() => {
    if (currentPlayer.killedBy === 'boomerang') {
      play('GasBoomerang');
    }
  }, [currentPlayer.killedBy]);

  return (
    <Container>
      <PlayerAvatarContainer exploded={currentPlayer.status === 'dead'}>
        <PlayerAvatar
          player={currentPlayer.player}
          size="medium"
          showBadges={false}
          showZodiac={false}
        />
      </PlayerAvatarContainer>
      <Boomerang></Boomerang>

      {currentPlayer.killedBy === 'boomerang' && <Boomerang>🪃</Boomerang>}
    </Container>
  );
}
