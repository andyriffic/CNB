import { useEffect, useRef, useState } from 'react';
import { Game } from '../../../../../providers/MatchupProvider';
import { GamePhase } from '../../../hooks/useGamePhaseTiming';

const useGameTiming = (
  gamePhase: GamePhase,
  setGamePhase: (gamePhase: GamePhase) => void,
  {
    from,
    to,
    timeoutMilliseconds,
  }: { from: GamePhase; to: GamePhase; timeoutMilliseconds: number }
) => {
  useEffect(() => {
    if (gamePhase === from) {
      setTimeout(() => {
        if (gamePhase === from) {
          setGamePhase(to);
        }
      }, timeoutMilliseconds);
    }
  }, [gamePhase]);
};

const allPlayersMoved = (game?: Game): boolean => {
  return !!game && game.moves.every(m => m.moved);
};

const gameIsDraw = (game?: Game): boolean => {
  return !!game && !!game.result && !!game.result.draw;
};

const gameIsFinished = (game?: Game): boolean => {
  return !!game && !!game.attributes.exploded;
};

const winnerUsedPowerup = (game?: Game): boolean => {
  return (
    !!game &&
    !!game.result &&
    game.result.winnerIndex !== undefined &&
    game.result.moves[game.result.winnerIndex].powerUpId !== 'NONE'
  );
};

export const useGamePhaseTiming = (
  game: Game | undefined,
  bonusPoints: number
) => {
  const currentGame = useRef(game);
  const [gamePhase, setGamePhase] = useState(
    allPlayersMoved(game) ? GamePhase.readyToPlay : GamePhase.waitingMoves
  );

  useEffect(() => {
    console.log('GAMEPHASE', GamePhase[gamePhase]);
  }, [gamePhase]);

  useEffect(() => {
    currentGame.current = game;
    if (!(game && game.result)) {
      setGamePhase(GamePhase.waitingMoves);
    }
  }, [game]);

  useEffect(() => {
    if (allPlayersMoved(game) && gamePhase === GamePhase.waitingMoves) {
      setGamePhase(GamePhase.readyToPlay);
    }
  }, [game]);

  useGameTiming(gamePhase, setGamePhase, {
    from: GamePhase.readyToPlay,
    to: GamePhase.showResult,
    timeoutMilliseconds: 3000,
  });

  useGameTiming(gamePhase, setGamePhase, {
    from: GamePhase.showResult,
    to: gameIsDraw(game) ? GamePhase.highlightDraw : GamePhase.highlightWinner,
    timeoutMilliseconds: 3000,
  });

  useGameTiming(gamePhase, setGamePhase, {
    from: GamePhase.highlightWinner,
    to: GamePhase.giveTimebombToPlayer,
    timeoutMilliseconds: 2000,
  });

  useGameTiming(gamePhase, setGamePhase, {
    from: GamePhase.highlightDraw,
    to: gameIsDraw(game)
      ? GamePhase.timebombFuse
      : GamePhase.giveTimebombToPlayer,
    timeoutMilliseconds: 2000,
  });

  useGameTiming(gamePhase, setGamePhase, {
    from: GamePhase.giveTimebombToPlayer,
    to: GamePhase.timebombFuse,
    timeoutMilliseconds: 1000,
  });

  useGameTiming(gamePhase, setGamePhase, {
    from: GamePhase.timebombFuse,
    to: GamePhase.timebombResolution,
    timeoutMilliseconds: 2000,
  });

  useGameTiming(gamePhase, setGamePhase, {
    from: GamePhase.timebombResolution,
    to: GamePhase.showBasePoints,
    timeoutMilliseconds: 500,
  });

  useGameTiming(gamePhase, setGamePhase, {
    from: GamePhase.showBasePoints,
    to:
      gameIsDraw(game) && !gameIsFinished(game)
        ? GamePhase.givePointsToBonus
        : !gameIsDraw(game) && bonusPoints
        ? GamePhase.applyBonusPoints
        : GamePhase.givePointsToPlayer,
    timeoutMilliseconds: 2000,
  });

  useGameTiming(gamePhase, setGamePhase, {
    from: GamePhase.applyBonusPoints,
    to: GamePhase.bonusPointsApplied,
    timeoutMilliseconds: 500,
  });

  useGameTiming(gamePhase, setGamePhase, {
    from: GamePhase.bonusPointsApplied,
    to: GamePhase.givePointsToPlayer,
    timeoutMilliseconds: 1000,
  });

  useGameTiming(gamePhase, setGamePhase, {
    from: GamePhase.givePointsToPlayer,
    to: GamePhase.applyPointsUpdate,
    timeoutMilliseconds: 500,
  });

  useGameTiming(gamePhase, setGamePhase, {
    from: GamePhase.givePointsToBonus,
    to: GamePhase.applyPointsUpdate,
    timeoutMilliseconds: 500,
  });

  useGameTiming(gamePhase, setGamePhase, {
    from: GamePhase.applyPointsUpdate,
    to:
      game && game.trophyWon ? GamePhase.gameOver : GamePhase.readyForNextGame,
    timeoutMilliseconds: 1000,
  });

  return gamePhase;
};
