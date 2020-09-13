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
  showPoints = 'showPoints',
  givePointsToBonus = 'givePointsToBonus',
  givePointsToPlayer = 'givePointsToPlayer',
  timebombFuse = 'timebombFuse',
  timebombResolution = 'timebombResolution',
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
        setGamePhase(to);
      }, timeoutMilliseconds);
    }
  }, [gamePhase]);
};

export const useGamePhaseTiming = (game?: Game) => {
  const [gamePhase, setGamePhase] = useState(GamePhase.waitingMoves);

  useEffect(() => {
    if (!(game && game.result)) {
      setGamePhase(GamePhase.waitingMoves);
    } else {
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
    to:
      game.result && game.result.draw
        ? GamePhase.highlightDraw
        : GamePhase.highlightWinner,
    timeoutMilliseconds: 2000,
  });

  useGameTiming(gamePhase, setGamePhase, {
    from: GamePhase.highlightWinner,
    to: GamePhase.showPoints,
    timeoutMilliseconds: 2000,
  });

  useGameTiming(gamePhase, setGamePhase, {
    from: GamePhase.highlightDraw,
    to: GamePhase.showPoints,
    timeoutMilliseconds: 2000,
  });

  useGameTiming(gamePhase, setGamePhase, {
    from: GamePhase.showPoints,
    to:
      game.result && game.result.draw
        ? GamePhase.givePointsToBonus
        : GamePhase.givePointsToPlayer,
    timeoutMilliseconds: 2000,
  });

  useGameTiming(gamePhase, setGamePhase, {
    from: GamePhase.givePointsToPlayer,
    to: GamePhase.timebombFuse,
    timeoutMilliseconds: 2000,
  });

  useGameTiming(gamePhase, setGamePhase, {
    from: GamePhase.givePointsToBonus,
    to: GamePhase.timebombFuse,
    timeoutMilliseconds: 2000,
  });

  useGameTiming(gamePhase, setGamePhase, {
    from: GamePhase.timebombFuse,
    to: GamePhase.timebombResolution,
    timeoutMilliseconds: 2000,
  });

  return gamePhase;
};
