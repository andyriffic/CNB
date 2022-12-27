import { Player } from '../../services/player/types';
import {
  selectRandomOneOf,
  selectWeightedRandomOneOf,
  WeightedItem,
} from '../../utils/random';
import {
  CardHistory,
  CardType,
  CurseType,
  DeathType,
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
      moveHistory: [],
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

export function moveToNextAlivePlayerWithReverseDeath(game: GasGame): GasGame {
  const gameWithNextPlayer = applyCursesToCurrentPlayer(
    moveToNextAlivePlayer(game)
  );

  if (gameWithNextPlayer.alivePlayersIds.length === 2) {
    return gameWithNextPlayer;
  }

  if (gameWithNextPlayer.moveHistory.length < 2) {
    return gameWithNextPlayer;
  }

  const lastCardMove = gameWithNextPlayer.moveHistory[0];
  const secondLastCarMove = gameWithNextPlayer.moveHistory[1];

  if (
    lastCardMove.cardPlayed.type === 'reverse' &&
    secondLastCarMove.cardPlayed.type === 'reverse' &&
    secondLastCarMove.playerId === gameWithNextPlayer.currentPlayer.id
  ) {
    return explode(gameWithNextPlayer, 'boomerang');
  }

  return gameWithNextPlayer;
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

function applyCursesToCurrentPlayer(game: GasGame): GasGame {
  if (game.alivePlayersIds.length === 2) {
    return game;
  }

  if (game.moveHistory.length < 1) {
    return game;
  }

  const lastCardMove = game.moveHistory[0];

  if (
    lastCardMove.cardPlayed.type === 'risky' &&
    game.alivePlayersIds.includes(lastCardMove.playerId)
  ) {
    const currentPlayer = getPlayerOrThrow(game, game.currentPlayer.id);
    const cursedPlayer: GasPlayer = {
      ...currentPlayer,
      curse: 'double-press',
    };

    return {
      ...game,
      allPlayers: updatePlayerInList(game.allPlayers, cursedPlayer),
    };
  }

  return game;
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

function assignMvps(game: GasGame): GasGame {
  if (!game.winningPlayerId) {
    return game;
  }

  return {
    ...game,
    mvpPlayerIds: {
      mostCorrectGuesses: getMostCorrectGuessesPlayerId(game),
      mostPresses: getMostPressesPlayerId(game),
    },
  };
}

function getMostPressesPlayerId(game: GasGame): string[] {
  const mostPressesCount = Math.max(
    ...game.allPlayers.map((p) => p.totalPresses)
  );

  if (mostPressesCount === 0) {
    return [];
  }

  return game.allPlayers
    .filter((p) => p.totalPresses === mostPressesCount)
    .map((p) => p.player.id);
}

function getMostCorrectGuessesPlayerId(game: GasGame): string[] {
  const mostCorrectGuessesCount = Math.max(
    ...game.allPlayers.map((p) => p.guesses.correctGuessCount)
  );

  if (mostCorrectGuessesCount === 0) {
    return [];
  }

  return game.allPlayers
    .filter((p) => p.guesses.correctGuessCount === mostCorrectGuessesCount)
    .map((p) => p.player.id);
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
    points: maxPointsByOtherPlayers + 3,
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
    { weight: 100, item: false },
  ];

  const exploded = selectWeightedRandomOneOf(explodedWeights);

  return assignMvps(
    assignWinner(
      resetPlayerGuessesAndGivePoints(
        takeOnePressFromCurrentPlayer(
          exploded ? explode(game, 'balloon') : game
        )
      )
    )
  );
}

function explode(game: GasGame, killedBy: DeathType | undefined): GasGame {
  const deadPlayerIds = [...game.deadPlayerIds, game.currentPlayer.id];
  const alivePlayersIds = game.alivePlayersIds.filter(
    (id) => id !== game.currentPlayer.id
  );
  const currentPlayer = getPlayerOrThrow(game, game.currentPlayer.id);

  const updatedCurrentPlayer: GasPlayer = {
    ...currentPlayer,
    status: 'dead',
    killedBy,
    finishedPosition: game.allPlayers.length - (deadPlayerIds.length - 1),
    totalPresses: currentPlayer.totalPresses + 1,
    points: game.pointsMap[deadPlayerIds.length - 1],
  };

  return assignMvps(
    assignWinner(
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
    )
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

function addCardToHistory(
  history: CardHistory[],
  playerId: string,
  card: GasCard
): CardHistory[] {
  return [{ playerId, cardPlayed: card }, ...history];
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

  const cursedCard = getCursedCard(card, player.curse);

  const updatedCards = player.cards.filter((c, i) => i !== cardIndex);
  const updatedPlayer: GasPlayer = {
    ...player,
    curse: undefined, // Curse automatically removed after card is played
    cards: [
      ...updatedCards,
      createRandomCard(game.alivePlayersIds.length === 2),
    ],
  };

  return {
    ...game,
    allPlayers: updatePlayerInList(game.allPlayers, updatedPlayer),
    currentPlayer: {
      ...game.currentPlayer,
      cardPlayed: card,
      pressesRemaining: applyEffectToCardPresses(
        cursedCard,
        game.globalEffect,
        playerId
      ),
    },
    direction:
      card.type === 'reverse' ? getReverseDirection(game) : game.direction,
    moveHistory: addCardToHistory(game.moveHistory, playerId, card),
  };
}

function getCursedCard(card: GasCard, curse: CurseType | undefined): GasCard {
  if (card.type !== 'press') {
    return card;
  }

  switch (curse) {
    case 'double-press':
      return { ...card, presses: card.presses * 2 };
    default:
      return card;
  }
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

  return explode(game, 'timeout');
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
    cards: [createRandomCard(), createRandomCard(), createRandomCard()],
    totalPresses: 0,
    points: 0,
    guesses: {
      correctGuessCount: 0,
      nominatedCount: 0,
    },
    pointsAllocation: {
      base: 0,
      correctGuesses: 0,
      mostCorrectGuesses: 0,
      mostPresses: 0,
    },
  };
}

function getWeightedRandomCardType(isFinalRound: boolean): CardType {
  const cardWeights: WeightedItem<CardType>[] = [
    { weight: 1, item: 'skip' },
    { weight: 2, item: 'risky' },
    { weight: 3, item: 'reverse' },
    { weight: 14, item: 'press' },
  ];

  return selectWeightedRandomOneOf(
    isFinalRound ? cardWeights.filter((w) => w.item !== 'risky') : cardWeights
  );
}

function createCard(cardType: CardType): GasCard {
  switch (cardType) {
    case 'skip':
    case 'reverse':
      return { type: cardType, presses: 0 };
    case 'risky':
      return { type: 'risky', presses: 6 };
    case 'press':
      return { type: 'press', presses: selectRandomOneOf([1, 2, 3, 4, 5]) };
  }
}

function createRandomCard(isFinalRound: boolean = false): GasCard {
  const nextCardType = getWeightedRandomCardType(isFinalRound);
  const card = createCard(nextCardType);

  return card;
}
