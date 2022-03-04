import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { isFeatureEnabled } from '../../../featureToggle';
import gameBoardBackground from './assets/pac-man-board.png';
import { boardConfig, generateTestBoard } from './boardConfig';
import { BoardPlayer } from './BoardPlayer';
import { BoardSquare } from './BoardSquare';
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

const PositionedPlayer = styled.div<{ position: Coordinates }>`
  position: absolute;
  top: ${({ position }) => boardConfig.gridCoordinates.y[position.y]}%;
  left: ${({ position }) => boardConfig.gridCoordinates.x[position.x]}%;
  width: 5%;
  height: 5%;
  text-align: center;
  transition: top linear 240ms, left linear 240ms;
`;

type Props = {
  uiState: PacManUiState;
};

export function Board({ uiState }: Props): JSX.Element {
  return (
    <BoardBackground>
      <BoardBackgroundImage />
      {debug &&
        boardConfig.playerPath.map((s, i) => (
          <BoardSquare key={i} square={s} color="white" />
        ))}
      {debug &&
        boardConfig.pacManPath.map((s, i) => (
          <BoardSquare key={i} square={s} color="red" />
        ))}
      {uiState.allPacPlayers.map(p => {
        const square = boardConfig.playerPath[p.pathIndex];
        return (
          <PositionedPlayer key={p.player.id} position={square.coordinates}>
            <BoardPlayer pacPlayer={p} />
          </PositionedPlayer>
        );
      })}
      <PositionedPlayer
        position={boardConfig.pacManPath[uiState.pacMan.pathIndex].coordinates}
      >
        <PacMan />
      </PositionedPlayer>
    </BoardBackground>
  );
}
