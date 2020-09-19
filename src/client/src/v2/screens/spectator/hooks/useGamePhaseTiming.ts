import { useEffect, useRef, useState } from 'react';
import { Game } from '../../../../uplift/contexts/MatchupProvider';

/*
  introduce players
  assign bomb

  waiting player moves   <-----
  ready to play               |
  show result                 |
  highlight winner            |
  show game points            |
  apply bonus points          |
  apply powerup points        |
  update points to player     |
  apply powerups              |
  timebomb fuse               |
  no explosion ----------------

  explode
  final points
  game summary

 */

export enum GamePhase {
  waitingMoves = 'waitingMoves',
  readyToPlay = 'readyToPlay',
  showResult = 'showResult',
  highlightWinner = 'highlightWinner',
  highlightDraw = 'highlightDraw',
  giveTimebombToPlayer = 'giveTimebombToPlayer',
  timebombFuse = 'timebombFuse',
  timebombResolution = 'timebombResolution',
  showBasePoints = 'showBasePoints',
  applyBonusPoints = 'applyBonusPoints',
  applyPowerupPoints_start = 'applyPowerupPoints_start',
  applyPowerupPoints_end = 'applyPowerupPoints_end',
  bonusPointsApplied = 'bonusPointsApplied',
  givePointsToBonus = 'givePointsToBonus',
  givePointsToPlayer = 'givePointsToPlayer',
  applyPointsUpdate = 'applyPointsUpdate',
  readyForNextGame = 'readyForNextGame',
}

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

export const useGamePhaseTiming = (game?: Game) => {
  const currentGame = useRef(game);
  const [gamePhase, setGamePhase] = useState(
    allPlayersMoved(game) ? GamePhase.readyToPlay : GamePhase.waitingMoves
  );

  useEffect(() => {
    console.log('GAMEPHASE', gamePhase);
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
    timeoutMilliseconds: 2000,
  });

  useGameTiming(gamePhase, setGamePhase, {
    from: GamePhase.showBasePoints,
    to: winnerUsedPowerup(game)
      ? GamePhase.applyPowerupPoints_start
      : gameIsFinished(game)
      ? GamePhase.applyBonusPoints
      : gameIsDraw(game)
      ? GamePhase.givePointsToBonus
      : GamePhase.applyBonusPoints,
    timeoutMilliseconds: 2000,
  });

  useGameTiming(gamePhase, setGamePhase, {
    from: GamePhase.applyPowerupPoints_start,
    to: GamePhase.applyPowerupPoints_end,
    timeoutMilliseconds: 1000,
  });

  useGameTiming(gamePhase, setGamePhase, {
    from: GamePhase.applyPowerupPoints_end,
    to: GamePhase.applyBonusPoints,
    timeoutMilliseconds: 500,
  });

  useGameTiming(gamePhase, setGamePhase, {
    from: GamePhase.applyBonusPoints,
    to: GamePhase.bonusPointsApplied,
    timeoutMilliseconds: 1000,
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
    to: GamePhase.readyForNextGame,
    timeoutMilliseconds: 2000,
  });

  return gamePhase;
};
