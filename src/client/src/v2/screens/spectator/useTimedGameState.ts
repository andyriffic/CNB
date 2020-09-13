import { useEffect, useState } from 'react';
import { Game, Matchup } from '../../../uplift/contexts/MatchupProvider';
import { GamePhase, useGamePhaseTiming } from './useGamePhaseTiming';

type UseTimedGameStateProps = {
  matchup: Matchup;
};

type UseTimedGameStateResult = {
  game?: Game;
  gamePhase: GamePhase;
  bonusPoints: number;
};

export const useTimedGameState = (
  matchup: Matchup
): UseTimedGameStateResult => {
  const [currentGame, setCurrentGame] = useState(matchup.gameInProgress);
  const [bonusPoints, setBonusPoints] = useState(matchup.bonusPoints);
  const gamePhase = useGamePhaseTiming(currentGame);

  useEffect(() => {
    if (!currentGame && matchup.gameInProgress) {
      setCurrentGame(matchup.gameInProgress);
    }
  }, [matchup, currentGame]);

  return {
    game: currentGame,
    bonusPoints,
    gamePhase,
  };
};
