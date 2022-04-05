import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { isFeatureEnabled } from '../../../featureToggle';
import gameBoardBackground from './assets/pac-man-board.png';
import { boardConfig, generateTestBoard } from './boardConfig';
import { BoardPlayer } from './BoardPlayer';
import { BoardSquare } from './BoardSquare';
import { getCoordinatesForOffset } from './coordinateOffsets';
import { PacManUiState } from './hooks/usePacman/reducer';
import { PacMan } from './PacMan';
import { Coordinates } from './types';

const debug = isFeatureEnabled('debug');

const BoardBackground = styled.div`
  width: 80vw;
  height: 90vh;
  position: relative;
`;

const BoardBackgroundImage = styled.img.attrs({ src: gameBoardBackground })`
  width: 100%;
  height: 100%;
`;

const PositionedPlayer = styled.div<{
  position: Coordinates;
  offset: Coordinates;
  moveSpeedMs: number;
}>`
  position: absolute;
  top: ${({ position, offset }) =>
    boardConfig.gridCoordinates.y[position.y] + offset.y}%;
  left: ${({ position, offset }) =>
    boardConfig.gridCoordinates.x[position.x] + offset.x}%;
  width: 5%;
  height: 5%;
  text-align: center;
  transition: top linear ${({ moveSpeedMs }) => moveSpeedMs}ms,
    left linear ${({ moveSpeedMs }) => moveSpeedMs}ms;
`;

type Props = {
  uiState: PacManUiState;
};

export function Board({ uiState }: Props): JSX.Element {
  return (
    <BoardBackground>
      <BoardBackgroundImage />
      {boardConfig.playerPath.map((s, i) => (
        <BoardSquare
          key={i}
          square={s}
          color="white"
          content={
            <span style={{ transform: 'translate3d(0.6rem, -0.2rem, 0)' }}>
              {debug ? i : <span style={{ fontSize: '2rem' }}>.</span>}
            </span>
          }
        />
      ))}
      {debug &&
        boardConfig.pacManPath.map((s, i) => (
          <BoardSquare
            key={i}
            square={s}
            color="red"
            content={
              <span style={{ transform: 'translateY(1vw)' }}>
                <br />
                {i}
              </span>
            }
          />
        ))}
      {uiState.allPacPlayers.map(p => {
        const square = boardConfig.playerPath[p.pathIndex];
        const playerPosition =
          p.jailTurnsCount > 0
            ? uiState.board.jailLocation
            : square.coordinates;
        const moveSpeed = p.jailTurnsCount > 0 ? 1000 : 240;
        return (
          <PositionedPlayer
            key={p.player.id}
            position={playerPosition}
            offset={getCoordinatesForOffset(p.offset)}
            moveSpeedMs={moveSpeed}
          >
            <BoardPlayer pacPlayer={p} />
          </PositionedPlayer>
        );
      })}
      <PositionedPlayer
        moveSpeedMs={240}
        offset={{ x: 0, y: 0 }}
        position={boardConfig.pacManPath[uiState.pacMan.pathIndex].coordinates}
      >
        <PacMan state={uiState} />
      </PositionedPlayer>
    </BoardBackground>
  );
}
