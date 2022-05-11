import { Player } from '../../services/player/types';
import {
  selectRandomOneOf,
  selectWeightedRandomOneOf,
  WeightedItem,
} from '../../utils/random';
import {
  Direction,
  EffectType,
  GasCard,
  GasGame,
  GasPlayer,
  GlobalEffect,
} from './types';

export function createGame({
  id,
  players,
}: {
  id: string;
  players: Player[];
}): GasGame {
  const randomPlayer = selectRandomOneOf(players);
  return giveEffectPowerToPlayer(
    {
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
      pointsMap: createPointsMap(players.length),
    },
    randomPlayer.id,
    'double'
  );
}

function createPointsMap(totalPlayerCount: number): number[] {
  const POINTS_BRACKETS = 3;
  const WINNER_POINTS = 5;

  const pointsStep = Math.round(totalPlayerCount / POINTS_BRACKETS);

  return [...Array(totalPlayerCount)].map((_, i) => {
    if (i === totalPlayerCount - 1) {
      return WINNER_POINTS;
    }
    const points = Math.trunc(i / pointsStep + 1);

    return points;
  });
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

function giveEffectPowerToPlayer(
  game: GasGame,
  playerId: string,
  effect: EffectType
): GasGame {
  const player = getPlayerOrThrow(game, playerId);

  return {
    ...game,
    allPlayers: updatePlayerInList(game.allPlayers, {
      ...player,
      effectPower: effect,
    }),
  };
}

function removeEffectPowerFromPlayer(game: GasGame, playerId: string): GasGame {
  const player = getPlayerOrThrow(game, playerId);

  return {
    ...game,
    allPlayers: updatePlayerInList(game.allPlayers, {
      ...player,
      effectPower: undefined,
    }),
  };
}

function activateEffect(game: GasGame, effect: GlobalEffect): GasGame {
  return {
    ...game,
    globalEffect: effect,
  };
}

export function playEffect(game: GasGame, effect: GlobalEffect): GasGame {
  return removeEffectPowerFromPlayer(
    activateEffect(game, effect),
    effect.playedByPlayerId
  );
}

function deactivateEffect(game: GasGame): GasGame {
  return {
    ...game,
    globalEffect: undefined,
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

  const maxPointsByOtherPlayers = Math.max(
    ...game.allPlayers.map<number>((p) => p.points)
  );

  const winningPlayer: GasPlayer = {
    ...allAlivePlayers[0],
    status: 'winner',
    finishedPosition: 1,
    points: maxPointsByOtherPlayers + 2,
  };

  return {
    ...game,
    winningPlayerId: winningPlayer.player.id,
    allPlayers: updatePlayerInList(game.allPlayers, winningPlayer),
  };
}

export function makeNextPlayerOutGuess(
  game: GasGame,
  playerId: string,
  guessPlayerId: string
): GasGame {
  const guessingPlayer = getPlayerOrThrow(game, playerId);
  const updatedGuessingPlayer: GasPlayer = {
    ...guessingPlayer,
    guesses: {
      ...guessingPlayer.guesses,
      nextPlayerOutGuess: guessPlayerId,
    },
  };

  const updatedPlayers = updatePlayerInList(
    game.allPlayers,
    updatedGuessingPlayer
  );

  return {
    ...game,
    allPlayers: updatedPlayers.map((p) => {
      return {
        ...p,
        guesses: {
          ...p.guesses,
          nominatedCount: totalOutNominationsCount(updatedPlayers, p.player.id),
        },
      };
    }),
  };
}

function totalOutNominationsCount(
  allPlayers: GasPlayer[],
  playerId: string
): number {
  return allPlayers.filter((p) => p.guesses.nextPlayerOutGuess === playerId)
    .length;
}

export function press(game: GasGame): GasGame {
  if (game.currentPlayer.pressesRemaining === 0 || game.gasCloud.exploded) {
    return game;
  }

  const explodedWeights: WeightedItem<boolean>[] = [
    { weight: game.gasCloud.pressed + 1, item: true },
    { weight: game.allPlayers.length * 5, item: false },
  ];

  const exploded = selectWeightedRandomOneOf(explodedWeights);

  return assignWinner(
    resetPlayerGuessesAndGivePoints(
      takeOnePressFromCurrentPlayer(exploded ? explode(game, false) : game)
    )
  );
}

function explode(game: GasGame, timedOut: boolean): GasGame {
  const deadPlayerIds = [...game.deadPlayerIds, game.currentPlayer.id];
  const alivePlayersIds = game.alivePlayersIds.filter(
    (id) => id !== game.currentPlayer.id
  );
  const currentPlayer = getPlayerOrThrow(game, game.currentPlayer.id);

  const updatedCurrentPlayer: GasPlayer = {
    ...currentPlayer,
    status: 'dead',
    timedOut,
    finishedPosition: game.allPlayers.length - (deadPlayerIds.length - 1),
    totalPresses: currentPlayer.totalPresses + 1,
    points: game.pointsMap[deadPlayerIds.length - 1],
  };

  return assignWinner(
    resetPlayerGuessesAndGivePoints({
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
        exploded: true,
      },
    })
  );
}

function takeOnePressFromCurrentPlayer(game: GasGame): GasGame {
  const currentPlayer = getPlayerOrThrow(game, game.currentPlayer.id);

  return {
    ...game,
    allPlayers: updatePlayerInList(game.allPlayers, {
      ...currentPlayer,
      totalPresses: currentPlayer.totalPresses + 1,
    }),
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

function resetPlayerGuessesAndGivePoints(game: GasGame): GasGame {
  if (!game.gasCloud.exploded) {
    return game;
  }

  return {
    ...game,
    allPlayers: game.allPlayers.map<GasPlayer>((p) => {
      const guessedCorrectly =
        p.guesses.nextPlayerOutGuess === game.currentPlayer.id;
      return {
        ...p,
        points: p.points + (guessedCorrectly ? 1 : 0),
        guesses: {
          nextPlayerOutGuess: undefined,
          nominatedCount: 0,
          correctGuessCount:
            p.guesses.correctGuessCount + (guessedCorrectly ? 1 : 0),
        },
      };
    }),
  };
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
      pressesRemaining: applyEffectToCardPresses(
        card,
        game.globalEffect,
        playerId
      ),
    },
    direction:
      card.type === 'reverse' ? getReverseDirection(game) : game.direction,
  };
}

function applyEffectToCardPresses(
  card: GasCard,
  effect: GlobalEffect | undefined,
  playerId: string
): number {
  if (!effect || effect.playedByPlayerId === playerId) {
    return card.presses;
  }

  switch (effect.type) {
    case 'double': {
      return card.presses * 2;
    }
    default: {
      return card.presses;
    }
  }
}

export function playerTimedOut(game: GasGame, playerId: string): GasGame {
  if (game.currentPlayer.id !== playerId) {
    return game;
  }

  return explode(game, true);
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
    totalPresses: 0,
    points: 0,
    timedOut: false,
    guesses: {
      correctGuessCount: 0,
      nominatedCount: 0,
    },
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
      weight: 12,
      item: {
        type: 'press',
        presses: selectRandomOneOf([1, 2, 3, 4, 5]),
      },
    },
  ];

  return selectWeightedRandomOneOf(cardWeights);
}
