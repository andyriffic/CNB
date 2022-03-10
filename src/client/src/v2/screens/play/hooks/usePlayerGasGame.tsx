import { useCallback, useMemo } from 'react';
import {
  GasGame,
  GasPlayer,
  useGasProvider,
} from '../../../providers/GasProvider';
import { useGasGame } from '../../gas-out/spectator/hooks/useGasGame';

type UsePlayerGasGame = {
  game: GasGame | undefined;
  gasPlayer: GasPlayer | undefined;
  playersTurn: boolean;
  playPlayersCard: (cardIndex: number) => void;
  pressesRemaining: number;
  pressCloud: () => void;
  timeOut: () => void;
  statusText: string;
  guessNextPlayerOut: (guessPlayerId: string) => void;
};

function getPlayerStatusText(
  playersTurn: boolean,
  game: GasGame | undefined,
  gasPlayer: GasPlayer | undefined
): string {
  if (!(game && gasPlayer)) {
    return '';
  }

  if (gasPlayer.status === 'dead') {
    return 'You dead ☠️';
  }

  if (gasPlayer.status === 'winner') {
    return 'You won 🎉';
  }

  if (!playersTurn) {
    return 'Waiting for your turn';
  }

  if (!game.currentPlayer.cardPlayed) {
    return 'Select a card';
  }

  if (game.currentPlayer.pressesRemaining) {
    return 'Press the button 😅';
  }

  if (
    game.currentPlayer.pressesRemaining === 0 &&
    gasPlayer.status === 'alive'
  ) {
    return 'You survived 🥳';
  }

  return '¯\_(ツ)_/¯';
}

export function usePlayerGasGame(
  playerId: string,
  gameId: string
): UsePlayerGasGame {
  const {
    playCard,
    pressGas,
    guessNextOutPlayer,
    timeoutPlayer,
  } = useGasProvider();

  const { game } = useGasGame(gameId);

  const gasPlayer = useMemo(() => {
    return game && game.allPlayers.find(p => p.player.id === playerId);
  }, [game]);

  const playersTurn = useMemo(() => {
    if (!game) {
      return false;
    }
    return game.currentPlayer.id === playerId;
  }, [game]);

  const pressesRemaining = useMemo(() => {
    if (!game) {
      return 0;
    }
    return game.currentPlayer.id === playerId
      ? game.currentPlayer.pressesRemaining
      : 0;
  }, [game]);

  const playPlayersCard = useCallback(
    (cardIndex: number) => {
      playCard(gameId, playerId, cardIndex);
    },
    [gameId, playerId]
  );

  const timeOut = useCallback(() => {
    timeoutPlayer(gameId, playerId);
  }, [gameId, playerId]);

  const guessNextPlayerOut = useCallback(
    (guessPlayerId: string) => {
      guessNextOutPlayer(gameId, playerId, guessPlayerId);
    },
    [gameId, playerId]
  );

  const pressCloud = useCallback(() => {
    pressGas(gameId);
  }, []);

  return {
    game,
    gasPlayer,
    playersTurn,
    playPlayersCard,
    pressesRemaining,
    pressCloud,
    timeOut,
    statusText: getPlayerStatusText(playersTurn, game, gasPlayer),
    guessNextPlayerOut,
  };
}
