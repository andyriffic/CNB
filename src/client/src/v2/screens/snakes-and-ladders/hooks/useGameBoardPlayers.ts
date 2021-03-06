import { useState, useEffect } from 'react';
import { getPlayerAttributeValue } from '../../../../uplift/utils/player';
import { selectRandomOneOf } from '../../../../uplift/utils/random';
import { Player, usePlayersProvider } from '../../../providers/PlayersProvider';
import { PlaySound, useSoundProvider } from '../../../providers/SoundProvider';
import { GameBoardPlayer } from '../providers/GameBoardProvider';
import { BOARD_CELL_TYPE, GameBoardCell } from '../types';

const getBoardPlayers = (allPlayers: Player[]): GameBoardPlayer[] => {
  const eligiblePlayers = allPlayers.filter(player =>
    player.tags.includes('sl_participant')
  );

  const boardPlayers: GameBoardPlayer[] = eligiblePlayers.map(player => {
    const boardCellIndex = parseInt(
      getPlayerAttributeValue(player.tags, 'sl_cell', '0')
    );
    return {
      player,
      positionOffset: 0,
      boardCellIndex,
      movesRemaining: parseInt(
        getPlayerAttributeValue(player.tags, 'sl_moves', '0')
      ),
      inLead: false,
      isWinner: player.tags.includes('sl_winner'),
      moving: player.tags.includes('sl_moving'),
    };
  });
  return boardPlayers;
};

const movePlayerOneSquare = (
  gameBoardPlayer: GameBoardPlayer
): GameBoardPlayer => {
  if (gameBoardPlayer.movesRemaining === 0) {
    return gameBoardPlayer;
  }

  return {
    ...gameBoardPlayer,
    movesRemaining: gameBoardPlayer.movesRemaining - 1,
    boardCellIndex: gameBoardPlayer.boardCellIndex + 1,
  };
};

const landedInCell = (
  gameBoardPlayer: GameBoardPlayer,
  cell: GameBoardCell,
  play: PlaySound
): GameBoardPlayer => {
  if (gameBoardPlayer.movesRemaining > 0) {
    return gameBoardPlayer;
  }

  if (cell.type === BOARD_CELL_TYPE.NORMAL) {
    return gameBoardPlayer;
  }

  if (
    cell.type === BOARD_CELL_TYPE.LADDER &&
    typeof cell.linkedCellIndex === 'number'
  ) {
    play('SnakesAndLaddersLadder');

    return {
      ...gameBoardPlayer,
      boardCellIndex: cell.linkedCellIndex,
    };
  }

  if (
    cell.type === BOARD_CELL_TYPE.SNAKE &&
    typeof cell.linkedCellIndex === 'number'
  ) {
    play('SnakesAndLaddersSnake');

    return {
      ...gameBoardPlayer,
      boardCellIndex: cell.linkedCellIndex,
    };
  }

  if (
    cell.type === BOARD_CELL_TYPE.WORMHOLE &&
    typeof cell.linkedCellIndex === 'object'
  ) {
    const wormholeDestination = selectRandomOneOf(cell.linkedCellIndex);

    return {
      ...gameBoardPlayer,
      boardCellIndex: wormholeDestination,
    };
  }

  return gameBoardPlayer;
};

export const useGameBoardPlayers = (): {
  gameBoardPlayers: GameBoardPlayer[];
  movePlayerToNextSquare: (gameBoardPlayer: GameBoardPlayer) => void;
  landedInCell: (
    gameBoardPlayer: GameBoardPlayer,
    cell: GameBoardCell
  ) => GameBoardPlayer;
} => {
  const { allPlayers } = usePlayersProvider();
  const [gameBoardPlayers, setGameBoardPlayers] = useState<GameBoardPlayer[]>(
    []
  );
  const { play } = useSoundProvider();

  useEffect(() => {
    setGameBoardPlayers(getBoardPlayers(allPlayers));
  }, [allPlayers]);

  return {
    gameBoardPlayers,
    movePlayerToNextSquare: gameBoardPlayer => {
      const updatedGameBoardPlayer = movePlayerOneSquare(gameBoardPlayer);
      const updatedGameBoardPlayers = gameBoardPlayers.map(gp => {
        if (gp.player.id === gameBoardPlayer.player.id) {
          return updatedGameBoardPlayer;
        }
        return gp;
      });
      setGameBoardPlayers(updatedGameBoardPlayers);
    },
    landedInCell: (gameBoardPlayer, cell) => {
      const updatedGameBoardPlayer = landedInCell(gameBoardPlayer, cell, play);
      const updatedGameBoardPlayers = gameBoardPlayers.map(gp => {
        if (gp.player.id === gameBoardPlayer.player.id) {
          return updatedGameBoardPlayer;
        }
        return gp;
      });
      setGameBoardPlayers(updatedGameBoardPlayers);
      return updatedGameBoardPlayer;
    },
  };
};
