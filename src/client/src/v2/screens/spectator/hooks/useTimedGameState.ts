import { useEffect, useRef, useState } from 'react';
import { Game, Matchup } from '../../../../uplift/contexts/MatchupProvider';
import { GamePhase, useGamePhaseTiming } from './useGamePhaseTiming';

export type TimebombTimedState = {
  exploded: boolean;
  playerIndexHoldingTimebomb: 0 | 1;
};

export type UseTimedGameStateResult = {
  game?: Game;
  gamePhase: GamePhase;
  bonusPoints: number;
  playerPoints: [number, number];
  timebomb: TimebombTimedState;
  pointsThisGame: number;
};

export const useTimedGameState = (
  matchup: Matchup,
  playerPointsState: [number, number],
  startNewGame: () => void,
  resolveGame: () => void,
  triggerPlayerPointsUpdate: () => void
): UseTimedGameStateResult => {
  const currentGameResolved = useRef(false);
  const [currentGame, setCurrentGame] = useState(matchup.gameInProgress);
  const [bonusPoints, setBonusPoints] = useState(matchup.bonusPoints);
  const [playerPoints, setPlayerPoints] = useState(playerPointsState);
  const [timebomb, setTimebomb] = useState<TimebombTimedState>({
    exploded: false,
    playerIndexHoldingTimebomb: currentGame
      ? currentGame.attributes.playerIndexHoldingTimebomb
      : 0,
  });

  const [pointsThisGame, setPointsThisGame] = useState(0);
  const gamePhase = useGamePhaseTiming(currentGame);

  useEffect(() => {
    setCurrentGame(matchup.gameInProgress);
  }, [matchup]);

  useEffect(() => {
    if (gamePhase === GamePhase.readyToPlay) {
      currentGameResolved.current = true;
      resolveGame();
    }
  }, [gamePhase]);

  useEffect(() => {
    if (
      gamePhase === GamePhase.readyForNextGame &&
      currentGame &&
      !currentGame.attributes.exploded &&
      currentGameResolved.current
    ) {
      //RESET
      console.log('STARTING NEW GAME!', currentGame.attributes.gameCount);
      currentGameResolved.current = false;

      setPointsThisGame(0);
      // startNewGame();
    }
  }, [gamePhase, currentGame]);

  useEffect(() => {
    if (gamePhase === GamePhase.showResult) {
      // Hack to make sure player points are updated for later when they're shown
      triggerPlayerPointsUpdate();
    }
  }, [gamePhase]);

  useEffect(() => {
    if (gamePhase === GamePhase.showBasePoints) {
      const basePoints = currentGame && currentGame.trophyWon ? 2 : 1;
      setPointsThisGame(basePoints);
    }
  }, [gamePhase, currentGame]);

  useEffect(() => {
    if (gamePhase === GamePhase.bonusPointsApplied) {
      setBonusPoints(0);
      setPointsThisGame(pointsThisGame + bonusPoints);
    }
  }, [gamePhase, bonusPoints, pointsThisGame]);

  useEffect(() => {
    if (gamePhase === GamePhase.applyPointsUpdate) {
      setPlayerPoints(playerPointsState);
      setBonusPoints(matchup.bonusPoints);
    }
  }, [gamePhase, playerPointsState, matchup]);

  useEffect(() => {
    if (!currentGame) {
      return;
    }
    if (gamePhase === GamePhase.giveTimebombToPlayer) {
      setTimebomb({
        exploded: false,
        playerIndexHoldingTimebomb:
          currentGame.attributes.playerIndexHoldingTimebomb,
      });
    }
  }, [gamePhase, currentGame]);

  useEffect(() => {
    if (!currentGame) {
      return;
    }
    if (gamePhase === GamePhase.timebombResolution) {
      setTimebomb({
        exploded: !!currentGame.attributes.exploded,
        playerIndexHoldingTimebomb:
          currentGame.attributes.playerIndexHoldingTimebomb,
      });
    }
  }, [gamePhase, currentGame]);

  return {
    game: currentGame,
    bonusPoints,
    gamePhase,
    playerPoints,
    timebomb,
    pointsThisGame,
  };
};
