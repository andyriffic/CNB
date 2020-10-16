import { useState, useEffect } from 'react';
import { Game } from '../../../../../providers/MatchupProvider';
import { RelativePosition } from '../../../../../components/PositionedArea';
import { GamePhase } from '../../../hooks/useGamePhaseTiming';

export const positions: [
  [RelativePosition, RelativePosition, RelativePosition],
  [RelativePosition, RelativePosition, RelativePosition]
] = [
  [{ bottom: 0, left: 40 }, { bottom: 0, left: 20 }, { bottom: 0, left: 0 }],
  [{ bottom: 0, right: 40 }, { bottom: 0, right: 20 }, { bottom: 0, right: 0 }],
];

export const usePositionedPlayers = (gamePhase: GamePhase, game: Game) => {
  const [playerPositions, setPlayerPositions] = useState<
    [RelativePosition, RelativePosition]
  >([
    positions[0][game.attributes.playerPositions[0]],
    positions[1][game.attributes.playerPositions[1]],
  ]);

  useEffect(() => {
    if (gamePhase === GamePhase.tugoWarYankPlayer) {
      setPlayerPositions([
        positions[0][game.attributes.playerPositions[0]],
        positions[1][game.attributes.playerPositions[1]],
      ]);
    }
  }, [game, gamePhase]);

  return playerPositions;
};
