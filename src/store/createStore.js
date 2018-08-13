// @flow
import type { Store } from './StoreType';
import type { Reducer } from '../state/ReducerType';
import type { Game } from '../types/GameType';

import initialState from '../state/initialState';

const createStore = (reducer: Reducer, defaultState: Game = initialState): Store => {
  const store = {};
  store.state = defaultState;
  store.listeners = [];

  store.getState = () => store.state;

  store.subscribe = listener => {
    store.listeners.push(listener);
  };

  store.dispatch = action => {
    store.state = reducer(store.state, action);
    store.listeners.forEach(listener => listener());
  };

  return store;
};

export default createStore;
