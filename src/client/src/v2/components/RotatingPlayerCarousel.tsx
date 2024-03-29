import React, { useMemo } from 'react';
import styled, { css } from 'styled-components';
import { Player } from '../providers/PlayersProvider';
import { PlayerAvatar } from './player-avatar';

// Taken from: https://www.sitepoint.com/building-3d-rotating-carousel-css-javascript/

const DISPLAY_ITEMS_COUNT = 5;
const TILE_WIDTH_PX = 400;
const TILE_GAP_PX = 20;

const Container = styled.div`
  /* width: 100%;
  border: 2px solid black; */
`;

const CarouselContainer = styled.div`
  padding: 20px;

  perspective: 3000px;
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
  transition: transform 0.5s;
  position: relative;
  ${({ showing }) =>
    showing &&
    css`
      z-index: 1;
    `}

  ${({ apothem, rotate, showing }) =>
    css`
      transform-origin: 50% 50% ${-apothem}px;
      transform: rotateY(${rotate}rad);
      /* background-color: ${showing ? 'red' : 'blue'}; */
    `}

  &:not(:first-of-type) {
    position: absolute;
    left: 0;
    top: 0;
  }
`;

type Props = {
  displayIndex: number;
  players: Player[];
  transparent: boolean;
};

export const RotatingPlayerCarousel = ({
  players,
  displayIndex,
  transparent,
}: Props) => {
  //   const displayPlayers = useMemo(() => {
  //     const highlightedPlayer = players[displayIndex];
  //     const nextPlayers = players.splice(displayIndex + 1, players.length - 1);
  //     const prevPlayers = nextPlayers.reverse();
  //     return [...prevPlayers, highlightedPlayer, ...nextPlayers];
  //   }, [players]);

  const theta = useMemo(() => (2 * Math.PI) / players.length, [players]);
  const apothem = useMemo(
    () => TILE_WIDTH_PX / (2 * Math.tan(Math.PI / players.length)),
    [players]
  );

  console.log('theta', theta);
  console.log('apothem', apothem);
  console.log('displayIndex', displayIndex);

  return (
    <Container>
      <CarouselContainer>
        <CarouselItem apothem={apothem} rotate={displayIndex * -theta}>
          {players.map((player, index) => {
            return (
              <CarouselContent
                key={player.id}
                apothem={apothem}
                rotate={index * theta}
                showing={
                  index ===
                  displayIndex -
                    Math.floor(displayIndex / players.length) * players.length
                }
                transparent={transparent}
              >
                <PlayerAvatar
                  player={player}
                  size="medium"
                  showZodiac={false}
                />
              </CarouselContent>
            );
          })}
        </CarouselItem>
      </CarouselContainer>
    </Container>
  );
};
