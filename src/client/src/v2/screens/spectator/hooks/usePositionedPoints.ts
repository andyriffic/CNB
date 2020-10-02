import { useState, useEffect } from 'react';
import { Game } from '../../../../uplift/contexts/MatchupProvider';
import { RelativePosition } from '../../../components/PositionedArea';
import { GamePhase } from './useGamePhaseTiming';

export const pointsPositions: {
  game: RelativePosition;
  bonus: RelativePosition;
  player: [RelativePosition, RelativePosition];
} = {
  game: { top: 30, left: 48 },
  bonus: { top: 5, left: 48 },
  player: [{ top: 70, left: 0 }, { top: 70, left: 93 }],
};

export const usePositionedGamePoints = (gamePhase: GamePhase, game: Game) => {
  const [gamePointsPosition, setGamePointsPosition] = useState(
    pointsPositions.game
  );

  useEffect(() => {
    if (!game.result) {
      setGamePointsPosition(pointsPositions.game);
      return;
    }

    if (gamePhase === GamePhase.givePointsToPlayer) {
      if (game.attributes.exploded) {
        setGamePointsPosition(
          pointsPositions.player[game.attributes.playerIndexNotHoldingTimebomb]
        );
      } else if (game.result.winnerIndex !== undefined) {
        setGamePointsPosition(pointsPositions.player[game.result.winnerIndex]);
      }
    } else if (gamePhase === GamePhase.givePointsToBonus) {
      setGamePointsPosition(pointsPositions.bonus);
    }
  }, [game, gamePhase]);

  return gamePointsPosition;
};

export const usePositionedBonusPoints = (gamePhase: GamePhase) => {
  const [bonusPointsPosition, setBonusPointsPosition] = useState(
    pointsPositions.bonus
  );

  useEffect(() => {
    if (gamePhase === GamePhase.applyBonusPoints) {
      setBonusPointsPosition(pointsPositions.game);
    } else if (gamePhase === GamePhase.readyToPlay) {
      setBonusPointsPosition(pointsPositions.bonus);
    }
  }, [gamePhase]);

  return bonusPointsPosition;
};
