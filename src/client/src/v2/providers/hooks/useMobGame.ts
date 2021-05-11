import { useMemo } from 'react';
import { MobGame, useMobProvider } from '../MobProvider';

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
