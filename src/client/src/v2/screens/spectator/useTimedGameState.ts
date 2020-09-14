import { useEffect, useState } from 'react';
import { Game, Matchup } from '../../../uplift/contexts/MatchupProvider';
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
};

export const useTimedGameState = (
  matchup: Matchup,
  playerPointsState: [number, number]
): UseTimedGameStateResult => {
  const [currentGame, setCurrentGame] = useState(matchup.gameInProgress);
  const [bonusPoints, setBonusPoints] = useState(matchup.bonusPoints);
  const [playerPoints, setPlayerPoints] = useState(playerPointsState);
  const [timebomb, setTimebomb] = useState<TimebombTimedState>({
    exploded: false,
    playerIndexHoldingTimebomb: currentGame
      ? currentGame.attributes.playerIndexHoldingTimebomb
      : 0,
  });
  const gamePhase = useGamePhaseTiming(currentGame);

  useEffect(() => {
    if (gamePhase === GamePhase.givePointsToBonus) {
    }
  }, [gamePhase, matchup]);

  useEffect(() => {
    if (gamePhase === GamePhase.applyPointsUpdate) {
      setPlayerPoints(playerPointsState);
      setBonusPoints(matchup.bonusPoints);
    }
  }, [gamePhase, playerPointsState, matchup]);

  useEffect(() => {
    setCurrentGame(matchup.gameInProgress);
  }, [matchup]);

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
  };
};
