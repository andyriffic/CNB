import { useEffect, useRef, useState } from 'react';
import { Game, Matchup } from '../../../../../providers/MatchupProvider';
import { GamePhase } from '../../../hooks/useGamePhaseTiming';
import { useGamePhaseTiming } from './useGamePhaseTiming';

export type UseTimedGameStateResult = {
  game?: Game;
  gamePhase: GamePhase;
  bonusPoints: number;
  playerPoints: [number, number];
  pointsThisGame: number;
  setGamePhase: React.Dispatch<React.SetStateAction<GamePhase>>;
};

const doublePowerupActive = (game?: Game) => {
  return (
    !!game &&
    !!game.result &&
    game.result.winnerIndex !== undefined &&
    game.result.moves[game.result.winnerIndex].powerUpId === 'DOUBLE_POINTS'
  );
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

  const [pointsThisGame, setPointsThisGame] = useState(0);
  const [gamePhase, setGamePhase] = useGamePhaseTiming(
    currentGame,
    bonusPoints
  );

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
      currentGameResolved.current
    ) {
      //RESET
      console.log('STARTING NEW GAME!', currentGame.attributes.gameCount);
      currentGameResolved.current = false;

      setPointsThisGame(0);
      startNewGame(); //TODO: UNCOMMENT THIS LINE TO AUTO-MOVE TO NEXT GAME
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
      let basePoints = 1;
      if (doublePowerupActive(currentGame)) {
        basePoints *= 2;
        setBonusPoints(bonusPoints * 2);
      }
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
    if (
      gamePhase === GamePhase.applyPointsUpdate ||
      gamePhase === GamePhase.readyForNextGame
    ) {
      setPlayerPoints(playerPointsState);
      setBonusPoints(matchup.bonusPoints);
    }
  }, [gamePhase, playerPointsState, matchup]);

  return {
    game: currentGame,
    bonusPoints,
    gamePhase,
    playerPoints,
    pointsThisGame,
    setGamePhase,
  };
};
