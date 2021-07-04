import { customAlphabet } from 'nanoid';

import { Player } from '../../services/player/types';
import {
  MobGame,
  MobPlayer,
  MugPlayer,
  MoveId,
  MobGameSpectatorView,
  MoveResult,
} from './types';

const idGenerator = customAlphabet('BCDFGHJKLMNPQRSTVWXZ', 6);

export function createMobGameSpectatorView(
  mobGame: MobGame
): MobGameSpectatorView {
  return {
    ...mobGame,
    ready: isMobGameReady(mobGame),
    gameOver:
      mobGame.mugPlayer.lives === 0 ||
      mobGame.mobPlayers.every((mp) => !mp.active),
  };
}

export function createMobGame(
  mugPlayer: Player,
  mobPlayers: Player[]
): MobGame {
  return {
    id: idGenerator(),
    round: 1,
    roundState: 'waiting-moves',
    resolved: false,
    mugPlayer: createMugPlayer(mugPlayer),
    mobPlayers: mobPlayers.map(createMobPlayer),
  };
}

function updateReadyState(mobGame: MobGame): MobGame {
  if (mobGame.roundState !== 'waiting-moves' || !isMobGameReady(mobGame)) {
    return mobGame;
  }

  return {
    ...mobGame,
    roundState: 'ready-to-play',
  };
}

export function makeMobPlayerMove(
  mobGame: MobGame,
  playerId: string,
  moveId: MoveId
): MobGame {
  if (mobGame.roundState !== 'waiting-moves') return mobGame;
  return updateReadyState({
    ...mobGame,
    mobPlayers: mobGame.mobPlayers.map((mobPlayer) => {
      if (mobPlayer.player.id === playerId) {
        return {
          ...mobPlayer,
          lastMoveId: moveId,
        };
      }
      return mobPlayer;
    }),
  });
}

export function makeMugPlayerMove(mobGame: MobGame, moveId: MoveId): MobGame {
  if (mobGame.roundState !== 'waiting-moves') return mobGame;

  return updateReadyState({
    ...mobGame,
    mugPlayer: {
      ...mobGame.mugPlayer,
      lastMoveId: moveId,
    },
  });
}

export function markMobGameAsViewed(mobGame: MobGame): MobGame {
  if (mobGame.roundState !== 'resolved-results') return mobGame;
  return {
    ...mobGame,
    roundState: 'viewed',
  };
}

export function resolveMobGame(
  mobGame: MobGame,
  onResolved?: (resolvedGame: MobGame) => void
): MobGame {
  if (!isMobGameReady(mobGame)) {
    return mobGame;
  }

  const winningMobPlayerIds = mobGame.mobPlayers
    .filter((mobPlayer) =>
      playerWins(mobPlayer.lastMoveId, mobGame.mugPlayer.lastMoveId)
    )
    .map((p) => p.player.id);

  const resolvedGame: MobGame = {
    ...mobGame,
    resolved: true,
    roundState: 'resolved-results',
    mobPlayers: mobGame.mobPlayers.map((p) => {
      const active = winningMobPlayerIds.includes(p.player.id);
      return {
        ...p,
        active: winningMobPlayerIds.includes(p.player.id),
        lastMoveResult: getPlayResult(
          p.lastMoveId,
          mobGame.mugPlayer.lastMoveId
        ),
      };
    }),
    mugPlayer: {
      ...mobGame.mugPlayer,
      lives: Math.max(
        mobGame.mugPlayer.lives - (winningMobPlayerIds.length ? 1 : 0),
        0
      ),
    },
  };

  onResolved && onResolved(resolvedGame);
  return resolvedGame;
}

export function resetForNextRoundMobGame(mobGame: MobGame): MobGame {
  if (
    !isMobGameReady(mobGame) ||
    !mobGame.resolved ||
    mobGame.mugPlayer.lives === 0
  ) {
    return mobGame;
  }

  return {
    ...mobGame,
    resolved: false,
    round: mobGame.round + 1,
    roundState: 'waiting-moves',
    mobPlayers: mobGame.mobPlayers.map((p) => ({
      ...p,
      lastMoveId: undefined,
      lastMoveResult: undefined,
      lastRound: p.active ? mobGame.round + 1 : p.lastRound,
    })),
    mugPlayer: {
      ...mobGame.mugPlayer,
      lastMoveId: undefined,
    },
  };
}

function playerWins(playerMove?: MoveId, opponentMove?: MoveId): boolean {
  if (!(playerMove && opponentMove)) {
    return false;
  }
  const beats: { [key in MoveId]: MoveId } = {
    A: 'B',
    B: 'C',
    C: 'A',
  };

  return beats[playerMove] === opponentMove;
}

function getPlayResult(
  playerMove?: MoveId,
  opponentMove?: MoveId
): MoveResult | undefined {
  if (!(playerMove && opponentMove)) {
    return;
  }
  if (playerMove === opponentMove) {
    return 'draw';
  }

  const beats: { [key in MoveId]: MoveId } = {
    A: 'B',
    B: 'C',
    C: 'A',
  };

  return beats[playerMove] === opponentMove ? 'won' : 'lost';
}

export function isMobGameReady(mobGame: MobGame): boolean {
  return (
    mobGame.mobPlayers.every(
      (mobPlayer) => !!mobPlayer.lastMoveId || !mobPlayer.active
    ) && !!mobGame.mugPlayer.lastMoveId
  );
}

function createMobPlayer(player: Player): MobPlayer {
  return {
    player,
    lastRound: 1,
    active: true,
  };
}

function createMugPlayer(player: Player): MugPlayer {
  const TOTAL_STARTING_LIVES = 3;
  return {
    player,
    lives: TOTAL_STARTING_LIVES,
  };
}
