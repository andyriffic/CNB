import { customAlphabet } from 'nanoid';

import { Player } from '../../services/player/types';
import { MobGame, MobPlayer, MugPlayer, MoveId } from './types';

const idGenerator = customAlphabet('BCDFGHJKLMNPQRSTVWXZ', 6);

export function createMobGame(
  mugPlayer: Player,
  mobPlayers: Player[]
): MobGame {
  return {
    id: idGenerator(),
    mugPlayer: createMugPlayer(mugPlayer),
    mobPlayers: mobPlayers.map(createMobPlayer),
  };
}

export function makeMobPlayerMove(
  mobGame: MobGame,
  playerId: string,
  moveId: MoveId
): MobGame {
  return {
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
  };
}

export function makeMugPlayerMove(mobGame: MobGame, moveId: MoveId): MobGame {
  return {
    ...mobGame,
    mugPlayer: {
      ...mobGame.mugPlayer,
      lastMoveId: moveId,
    },
  };
}

export function resolveMobGame(mobGame: MobGame): MobGame {
  if (!isMobGameReady(mobGame)) {
    return mobGame;
  }

  const winningMobPlayerIds = mobGame.mobPlayers
    .filter((mobPlayer) =>
      playerWins(mobPlayer.lastMoveId, mobGame.mugPlayer.lastMoveId)
    )
    .map((p) => p.player.id);

  return {
    ...mobGame,
    mobPlayers: mobGame.mobPlayers.map((p) => ({
      ...p,
      active: winningMobPlayerIds.includes(p.player.id),
      lastMoveId: undefined,
    })),
    mugPlayer: {
      ...mobGame.mugPlayer,
      lastMoveId: undefined,
      lives: mobGame.mugPlayer.lives - (winningMobPlayerIds.length ? 1 : 0),
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

export function isMobGameReady(mobGame: MobGame): boolean {
  return (
    mobGame.mobPlayers.every((mobPlayer) => !!mobPlayer.lastMoveId) &&
    !!mobGame.mugPlayer.lastMoveId
  );
}

function createMobPlayer(player: Player): MobPlayer {
  return {
    player,
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
