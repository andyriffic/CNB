import { useEffect, useState } from 'react';
import { Game, Matchup } from '../../../uplift/contexts/MatchupProvider';
import { GamePhase, useGamePhaseTiming } from './useGamePhaseTiming';

type UseTimedGameStateResult = {
  game?: Game;
  gamePhase: GamePhase;
  bonusPoints: number;
  playerPoints: [number, number];
};

export const useTimedGameState = (
  matchup: Matchup,
  playerPointsState: [number, number]
): UseTimedGameStateResult => {
  const [currentGame, setCurrentGame] = useState(matchup.gameInProgress);
  const [bonusPoints, setBonusPoints] = useState(matchup.bonusPoints);
  const [playerPoints, setPlayerPoints] = useState(playerPointsState);
  const gamePhase = useGamePhaseTiming(currentGame);

  useEffect(() => {
    if (gamePhase === GamePhase.givePointsToBonus) {
      setBonusPoints(matchup.bonusPoints);
    }
  }, [gamePhase, matchup]);

  useEffect(() => {
    if (gamePhase === GamePhase.givePointsToPlayer) {
      setPlayerPoints(playerPointsState);
    }
  }, [gamePhase, playerPointsState]);

  useEffect(() => {
    setCurrentGame(matchup.gameInProgress);
  }, [matchup]);

  return {
    game: currentGame,
    bonusPoints,
    gamePhase,
    playerPoints,
  };
};
