import { Player } from '../../services/player/types';
import { Direction, GasCard, GasGame, GasPlayer } from './types';

export function createGame({
  id,
  players,
}: {
  id: string;
  players: Player[];
}): GasGame {
  return {
    id,
    allPlayers: players.map(createGasPlayer),
    alivePlayersIds: [],
    deadPlayerIds: [],
    direction: 'left',
    currentPlayer: {
      id: players[0].id,
      pressesRemaining: 0,
    },
    gasCloud: {
      pressed: 0,
      exploded: false,
    },
  };
}

export function nextPlayer(game: GasGame): GasGame {
  const currentPlayerIndex = game.allPlayers.findIndex(
    (p) => p.player.id === game.currentPlayer.id
  );
  const unvalidatedNextPlayerIndex =
    game.direction === 'left' ? currentPlayerIndex - 1 : currentPlayerIndex + 1;

  const maxPlayerIndex = game.allPlayers.length - 1;

  let nextPlayerId: string | undefined;

  switch (game.direction) {
    case 'right': {
      if (unvalidatedNextPlayerIndex > maxPlayerIndex) {
        nextPlayerId = game.allPlayers[0].player.id;
      }
      break;
    }
    case 'left': {
      if (unvalidatedNextPlayerIndex < 0) {
        nextPlayerId = game.allPlayers[maxPlayerIndex].player.id;
      }
      break;
    }
  }

  if (!nextPlayerId) {
    nextPlayerId = game.allPlayers[unvalidatedNextPlayerIndex].player.id;
  }

  return {
    ...game,
    currentPlayer: {
      id: nextPlayerId,
      pressesRemaining: 0,
    },
  };
}

export function press(game: GasGame): GasGame {
  if (game.currentPlayer.pressesRemaining === 0 || game.gasCloud.exploded) {
    return game;
  }

  return {
    ...game,
    currentPlayer: {
      ...game.currentPlayer,
      pressesRemaining: game.currentPlayer.pressesRemaining - 1,
    },
    gasCloud: {
      ...game.gasCloud,
      pressed: game.gasCloud.pressed + 1,
    },
  };
}

export function playCard(
  game: GasGame,
  playerId: string,
  cardIndex: number
): GasGame {
  const { player, card } = getPlayerAndCardOrThrow(game, playerId, cardIndex);

  const updatedCards = player.cards.filter((c, i) => i !== cardIndex);
  const updatedPlayer: GasPlayer = {
    ...player,
    cards: updatedCards,
  };

  return {
    ...game,
    allPlayers: updatePlayerInList(game.allPlayers, updatedPlayer),
    currentPlayer: {
      ...game.currentPlayer,
      cardPlayed: card,
      pressesRemaining: card.presses,
    },
    direction:
      card.type === 'reverse' ? getReverseDirection(game) : game.direction,
  };
}

export function giveCardToPlayer(game: GasGame, playerId: string): GasGame {
  const player = getPlayerOrThrow(game, playerId);
  // TODO: fill this in
  return game;
}

function updatePlayerInList(
  allPlayers: GasPlayer[],
  player: GasPlayer
): GasPlayer[] {
  return allPlayers.map((p) => (p.player.id === player.player.id ? player : p));
}

function getReverseDirection(game: GasGame): Direction {
  return game.direction === 'left' ? 'right' : 'left';
}

function getPlayerOrThrow(game: GasGame, playerId: string): GasPlayer {
  const player = game.allPlayers.find((p) => p.player.id === playerId);
  if (!player) {
    throw `Player ${playerId} not found`;
  }

  return player;
}

function getPlayerAndCardOrThrow(
  game: GasGame,
  playerId: string,
  cardIndex: number
): { player: GasPlayer; card: GasCard } {
  const player = getPlayerOrThrow(game, playerId);

  const card = player.cards[cardIndex];
  if (!card) {
    throw `Card ${cardIndex} not found`;
  }

  return { player, card };
}

function createGasPlayer(player: Player): GasPlayer {
  return {
    player,
    status: 'alive',
    cards: [],
  };
}
