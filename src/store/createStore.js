import initialState from '../state/initialState';

const createStore = (reducer, defaultState = initialState) => {
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
