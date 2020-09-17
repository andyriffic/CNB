import { useEffect, useState } from 'react';
import { Game } from '../../../uplift/contexts/MatchupProvider';

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
  showBasePoints = 'showBasePoints',
  applyBonusPoints = 'applyBonusPoints',
  bonusPointsApplied = 'bonusPointsApplied',
  givePointsToBonus = 'givePointsToBonus',
  givePointsToPlayer = 'givePointsToPlayer',
  applyPointsUpdate = 'applyPointsUpdate',
  timebombFuse = 'timebombFuse',
  timebombResolution = 'timebombResolution',
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

export const useGamePhaseTiming = (game?: Game) => {
  const [gamePhase, setGamePhase] = useState(
    allPlayersMoved(game) ? GamePhase.readyToPlay : GamePhase.waitingMoves
  );

  useEffect(() => {
    if (!(game && game.result)) {
      setGamePhase(GamePhase.waitingMoves);
    } else if (gamePhase === GamePhase.waitingMoves) {
      setGamePhase(GamePhase.readyToPlay);
    }
  }, [game, gamePhase]);

  useGameTiming(gamePhase, setGamePhase, {
    from: GamePhase.readyToPlay,
    to: GamePhase.showResult,
    timeoutMilliseconds: 3000,
  });

  useGameTiming(gamePhase, setGamePhase, {
    from: GamePhase.showResult,
    to:
      game && game.result && game.result.draw
        ? GamePhase.highlightDraw
        : GamePhase.highlightWinner,
    timeoutMilliseconds: 3000,
  });

  useGameTiming(gamePhase, setGamePhase, {
    from: GamePhase.highlightWinner,
    to: GamePhase.showBasePoints,
    timeoutMilliseconds: 2000,
  });

  useGameTiming(gamePhase, setGamePhase, {
    from: GamePhase.highlightDraw,
    to: GamePhase.showBasePoints,
    timeoutMilliseconds: 2000,
  });

  useGameTiming(gamePhase, setGamePhase, {
    from: GamePhase.showBasePoints,
    to:
      game && game.result && game.result.draw
        ? GamePhase.givePointsToBonus
        : GamePhase.applyBonusPoints,
    timeoutMilliseconds: 2000,
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
    to: GamePhase.timebombFuse,
    timeoutMilliseconds: 2000,
  });

  useGameTiming(gamePhase, setGamePhase, {
    from: GamePhase.timebombFuse,
    to: GamePhase.timebombResolution,
    timeoutMilliseconds: 2000,
  });

  useGameTiming(gamePhase, setGamePhase, {
    from: GamePhase.timebombResolution,
    to: GamePhase.readyForNextGame,
    timeoutMilliseconds: 2000,
  });

  return gamePhase;
};
