import { Player } from '../../services/player/types';
import {
  selectRandomOneOf,
  selectWeightedRandomOneOf,
  WeightedItem,
} from '../../utils/random';
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
    alivePlayersIds: players.map((p) => p.id),
    deadPlayerIds: [],
    direction: 'right',
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

export function moveToNextAlivePlayer(game: GasGame): GasGame {
  if (game.allPlayers.every((p) => p.status === 'dead')) {
    //Guard just in case for now
    return game;
  }

  if (!!game.winningPlayerId) {
    // Game already has a winner
    return game;
  }

  let updatedGame = game;
  let currentPlayer = getPlayerOrThrow(game, game.currentPlayer.id);

  do {
    updatedGame = moveToNextPlayer(updatedGame);
    currentPlayer = getPlayerOrThrow(updatedGame, updatedGame.currentPlayer.id);
  } while (currentPlayer.status === 'dead');

  return updatedGame;
}

export function moveToNextPlayer(game: GasGame): GasGame {
  if (game.currentPlayer.pressesRemaining > 0) {
    // throw 'Game still has presses remaining'
    return game;
  }

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

export function resetCloud(game: GasGame): GasGame {
  if (!game.gasCloud.exploded) {
    // throw 'Resetting cloud but cloud has not exploded';
    return game;
  }

  return {
    ...game,
    currentPlayer: {
      ...game.currentPlayer,
      pressesRemaining: 0,
      cardPlayed: undefined,
    },
    gasCloud: {
      pressed: 0,
      exploded: false,
    },
  };
}

function assignWinner(game: GasGame): GasGame {
  if (!!game.winningPlayerId) {
    //Winner already assigned
    return game;
  }

  const allAlivePlayers = game.allPlayers.filter((p) => p.status === 'alive');

  if (allAlivePlayers.length > 1) {
    // No winner yet
    return game;
  }

  if (allAlivePlayers.length === 0) {
    // This shouldn't happen
    throw 'No alive players when trying to find winner :(';
  }

  const winningPlayer: GasPlayer = {
    ...allAlivePlayers[0],
    status: 'winner',
  };

  return {
    ...game,
    winningPlayerId: winningPlayer.player.id,
    allPlayers: updatePlayerInList(game.allPlayers, winningPlayer),
  };
}

export function press(game: GasGame): GasGame {
  if (game.currentPlayer.pressesRemaining === 0 || game.gasCloud.exploded) {
    return game;
  }

  const explodedWeights: WeightedItem<boolean>[] = [
    { weight: game.gasCloud.pressed + 1, item: true },
    { weight: game.allPlayers.length * 4, item: false },
  ];

  const exploded = selectWeightedRandomOneOf(explodedWeights);

  const deadPlayerIds = exploded
    ? [...game.deadPlayerIds, game.currentPlayer.id]
    : game.deadPlayerIds;
  const alivePlayersIds = exploded
    ? game.alivePlayersIds.filter((id) => id !== game.currentPlayer.id)
    : game.alivePlayersIds;

  const currentPlayer = getPlayerOrThrow(game, game.currentPlayer.id);
  const updatedCurrentPlayer: GasPlayer = {
    ...currentPlayer,
    status: exploded ? 'dead' : 'alive',
  };

  return assignWinner({
    ...game,
    allPlayers: updatePlayerInList(game.allPlayers, updatedCurrentPlayer),
    alivePlayersIds,
    deadPlayerIds,
    currentPlayer: {
      ...game.currentPlayer,
      pressesRemaining: game.currentPlayer.pressesRemaining - 1,
    },
    gasCloud: {
      ...game.gasCloud,
      pressed: game.gasCloud.pressed + 1,
      exploded: exploded,
    },
  });
}

export function playCard(
  game: GasGame,
  playerId: string,
  cardIndex: number
): GasGame {
  if (playerId !== game.currentPlayer.id) {
    // throw `Player ${playerId} is not the current player ${game.currentPlayer.id}`;
    return game;
  }

  if (game.currentPlayer.pressesRemaining > 0) {
    // throw `Still ${game.currentPlayer.pressesRemaining} presses remaining`;
    return game;
  }

  const { player, card } = getPlayerAndCardOrThrow(game, playerId, cardIndex);

  const updatedCards = player.cards.filter((c, i) => i !== cardIndex);
  const updatedPlayer: GasPlayer = {
    ...player,
    cards: [...updatedCards, createCard()],
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
    cards: [createCard(), createCard(), createCard()],
  };
}

function createCard(): GasCard {
  const cardWeights: WeightedItem<GasCard>[] = [
    {
      weight: 1,
      item: {
        type: 'skip',
        presses: 0,
      },
    },
    {
      weight: 1,
      item: {
        type: 'reverse',
        presses: 0,
      },
    },
    {
      weight: 8,
      item: {
        type: 'press',
        presses: selectRandomOneOf([1, 2, 3, 4, 5]),
      },
    },
  ];

  return selectWeightedRandomOneOf(cardWeights);
}
