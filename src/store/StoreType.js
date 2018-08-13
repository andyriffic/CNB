// @flow
import type { Game } from '../types/GameType';

type ListenerFn = () => void;

export type Store = {
  getState: () => Game,
  subscribe: (ListenerFn) => void,
  dispatch: (Object) => void,
  state: Game,
  listeners: Array<ListenerFn>,
};
