import React, { useMemo } from 'react';
import styled, { css } from 'styled-components';
import { PlayerAvatar } from '../../../components/player-avatar';
import { GasGame } from '../../../providers/GasProvider';
import { ExplodingPlayer } from './ExplodingPlayer';
import { PlayerCarouselPlayer } from './PlayerCarouselPlayer';

const TILE_WIDTH_PX = 400;
const TILE_GAP_PX = 20;

const Container = styled.div`
  /* width: 100%;
  border: 2px solid black; */
  pointer-events: none;
  position: relative;
`;

const CarouselContainer = styled.div`
  padding: 20px;

  perspective: 2000px;
  overflow: hidden;

  display: flex;
  flex-direction: column;
  align-items: center;

  > * {
    flex: 0 0 auto;
  }
`;

const CarouselItem = styled.div<{ apothem: number; rotate: number }>`
  margin: 0;

  width: ${TILE_WIDTH_PX}px;
  transform-style: preserve-3d;
  transition: transform 0.5s;
  /* flex: 0 0 auto; */
  ${({ apothem, rotate }) =>
    css`
      transform-origin: 50% 50% ${-apothem}px;
      transform: rotateY(${rotate}rad);
    `}
`;

const CarouselContent = styled.div<{
  apothem: number;
  rotate: number;
  showing: boolean;
  transparent: boolean;
}>`
  width: 100%;
  box-sizing: border-box;
  padding: 0;
  backface-visibility: ${({ transparent }) =>
    transparent ? 'visbile' : 'hidden'};
  display: flex;
  justify-content: center;

  position: relative;
  ${({ showing }) =>
    showing &&
    css`
      z-index: 1;
    `}

  ${({ apothem, rotate }) =>
    css`
      transform-origin: 50% 50% ${-apothem}px;
      transform: rotateY(${rotate}rad);
    `}

  &:not(:first-of-type) {
    position: absolute;
    left: 0;
    top: 0;
  }
`;

type Props = {
  displayIndex: number;
  game: GasGame;
  gameOver: boolean;
  transparent?: boolean;
};

export const RotatingPlayerCarousel = ({
  game,
  displayIndex,
  gameOver,
  transparent = true,
}: Props) => {
  const theta = useMemo(() => (2 * Math.PI) / game.alivePlayersIds.length, [
    game.alivePlayersIds,
  ]);
  const apothem = useMemo(
    () => TILE_WIDTH_PX / (2 * Math.tan(Math.PI / game.alivePlayersIds.length)),
    [game.alivePlayersIds]
  );

  return (
    <Container>
      <CarouselContainer>
        <CarouselItem apothem={apothem} rotate={displayIndex * -theta}>
          {game.alivePlayersIds.map((playerId, index) => {
            const player = game.allPlayers.find(p => p.player.id === playerId)!;
            return (
              <CarouselContent
                key={player.player.id}
                apothem={apothem}
                rotate={index * theta}
                showing={
                  index ===
                  displayIndex -
                    Math.floor(displayIndex / game.alivePlayersIds.length) *
                      game.alivePlayersIds.length
                }
                transparent={transparent}
              >
                <PlayerCarouselPlayer
                  game={game}
                  player={player}
                  gameOver={gameOver}
                />
                {/* <PlayerAvatar
                  player={player.player}
                  size="medium"
                  showZodiac={false}
                /> */}
              </CarouselContent>
            );
          })}
        </CarouselItem>
      </CarouselContainer>
      <div
        style={{
          position: 'absolute',
          left: '50%',
          bottom: '0',
          transform: 'translateX(-50%)',
        }}
      >
        <ExplodingPlayer game={game} />
      </div>
    </Container>
  );
};
