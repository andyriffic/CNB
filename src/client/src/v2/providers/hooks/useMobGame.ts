import { useMemo } from 'react';
import { MoveKeys } from '../../themes';
import { MobGame, MobPlayer, MugPlayer, useMobProvider } from '../MobProvider';

type UseMobGame = {
  mobGame?: MobGame;
};

export const useMobGame = (id: string): UseMobGame => {
  const { mobGames } = useMobProvider();

  const mobGame = useMemo(() => {
    return mobGames && mobGames.find(mg => mg.id === id);
  }, [mobGames]);

  return { mobGame };
};

type UseMobGamePlayer = {
  mobGame?: MobGame;
  mobPlayer?: MobPlayer;
  makeMove: (moveId: MoveKeys) => void;
};

export const useMobGamePlayer = (
  mobGameId: string,
  playerId: string
): UseMobGamePlayer => {
  const { mobGames, makeMobPlayerMove } = useMobProvider();

  const mobGame = useMemo(() => {
    return mobGames && mobGames.find(mg => mg.id === mobGameId);
  }, [mobGames]);

  const mobPlayer = useMemo(() => {
    return mobGame && mobGame.mobPlayers.find(mp => mp.player.id === playerId);
  }, [mobGame]);

  return {
    mobGame,
    mobPlayer,
    makeMove: moveId => {
      mobGame && makeMobPlayerMove(mobGameId, playerId, moveId);
    },
  };
};

type UseMugGamePlayer = {
  mobGame?: MobGame;
  mugPlayer?: MugPlayer;
  makeMove: (moveId: MoveKeys) => void;
};

export const useMugGamePlayer = (
  mobGameId: string,
  playerId: string
): UseMugGamePlayer => {
  const { mobGames, makeMugPlayerMove } = useMobProvider();

  const mobGame = useMemo(() => {
    return mobGames && mobGames.find(mg => mg.id === mobGameId);
  }, [mobGames]);

  const mugPlayer = useMemo(() => {
    return (
      mobGame &&
      (mobGame.mugPlayer.player.id === playerId ? mobGame.mugPlayer : undefined)
    );
  }, [mobGame]);

  return {
    mobGame,
    mugPlayer,
    makeMove: moveId => {
      mobGame && mugPlayer && makeMugPlayerMove(mobGameId, moveId);
    },
  };
};
