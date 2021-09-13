import React, { ReactNode, useCallback, useMemo, useReducer } from 'react';
import { getPlayerIntegerAttributeValue } from '../../../../uplift/utils/player';
import { Player, usePlayersProvider } from '../../../providers/PlayersProvider';
import { GameBoard, GamePlayer } from '../types';
import { createInitialState, reducer } from './gameBoardReducer';

export type GameBoardService = {
  gameBoard: GameBoard;
  gamePlayers: GamePlayer[];
  startGame: () => void;
  allPlayersMoved: boolean;
  autoMovePlayer: () => void;
};

const GameBoardContext = React.createContext<GameBoardService | undefined>(
  undefined
);

export const GameBoardProvider = ({
  children,
  gameBoard,
  participatingPlayers,
}: {
  children: ReactNode;
  gameBoard: GameBoard;
  participatingPlayers: Player[];
}) => {
  const [gameState, dispatch] = useReducer(
    reducer,
    createInitialState(gameBoard, participatingPlayers)
  );

  return (
    <GameBoardContext.Provider
      value={{
        gameBoard,
        gamePlayers: gameState.gamePlayers,
        startGame: () => dispatch({ type: 'START' }),
        autoMovePlayer: () => dispatch({ type: 'AUTO_MOVE_PLAYER' }),
        allPlayersMoved: gameState.allPlayersMoved,
      }}
    >
      {children}
    </GameBoardContext.Provider>
  );
};

export function useGameBoard() {
  const context = React.useContext(GameBoardContext);
  if (context === undefined) {
    throw new Error('useGameBoard must be used within a GameBoardContext');
  }
  return context;
}
