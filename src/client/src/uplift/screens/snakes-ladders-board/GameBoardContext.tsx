import React, { useState, useEffect, ReactNode, useContext } from 'react';
import { Player, PlayersContext } from '../../contexts/PlayersProvider';
import { getPlayerAttributeValue } from '../../utils/player';
import { GameBoard } from './board';

type GameBoardPlayer = {
  player: Player;
  boardCellIndex: number;
  movesRemaining: number;
};

type GameBoardService = {
  players: GameBoardPlayer[];
  movePlayer: (gameBoardPlayer: GameBoardPlayer) => void;
  onArrivedInCell: (
    gameBoardPlayer: GameBoardPlayer,
    gameBoard: GameBoard
  ) => void;
};

const initialValue: GameBoardService = {
  players: [],
  movePlayer: () => {},
  onArrivedInCell: () => {},
};

export const GameBoardContext = React.createContext<GameBoardService>(
  initialValue
);

export const GameBoardProvider = ({ children }: { children: ReactNode }) => {
  const { allPlayers, updatePlayer } = useContext(PlayersContext);
  const [boardPlayers, setBoardPlayers] = useState<GameBoardPlayer[]>([]);

  useEffect(() => {
    console.log('---GameBoardContext---', allPlayers);

    if (allPlayers.length) {
      const eligiblePlayers = allPlayers.filter(player =>
        player.tags.includes('sl_participant')
      );
      setBoardPlayers(
        eligiblePlayers.map(player => ({
          player,
          boardCellIndex: parseInt(
            getPlayerAttributeValue(player.tags, 'sl_cell', '0')
          ),
          movesRemaining: parseInt(
            getPlayerAttributeValue(player.tags, 'sl_moves', '0')
          ),
        }))
      );
    }
  }, [allPlayers]);

  return (
    <GameBoardContext.Provider
      value={{
        ...initialValue,
        players: boardPlayers,
        movePlayer: gameBoardPlayer => {
          if (!gameBoardPlayer.movesRemaining) {
            return;
          }
          const destinationCellIndex =
            gameBoardPlayer.boardCellIndex + gameBoardPlayer.movesRemaining;
          const playerTags = gameBoardPlayer.player.tags
            .filter(t => !t.startsWith('sl_moves:'))
            .filter(t => !t.startsWith('sl_cell:'));

          updatePlayer(gameBoardPlayer.player.id, [
            ...playerTags,
            'sl_moves:0',
            `sl_cell:${destinationCellIndex}`,
          ]);
        },
        onArrivedInCell: (gameBoardPlayer, gameBoard) => {
          const cell = gameBoard.cells[gameBoardPlayer.boardCellIndex];
          if (!cell.linkedCellIndex) {
            return;
          }

          const destinationCellIndex = cell.linkedCellIndex;
          const playerTags = gameBoardPlayer.player.tags.filter(
            t => !t.startsWith('sl_cell:')
          );

          updatePlayer(gameBoardPlayer.player.id, [
            ...playerTags,
            `sl_cell:${destinationCellIndex}`,
          ]);
        },
      }}
    >
      {children}
    </GameBoardContext.Provider>
  );
};
