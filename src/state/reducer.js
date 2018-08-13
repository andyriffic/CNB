// @flow
import type { Game } from '../types/GameType';
import type { Action } from './actions/ActionType';

import initialState from './initialState';
import { ALLOCATE_SLOT_ACTION } from './actions/slotActions';


const reducer = (state: Game = initialState, action: Action): Game => {

  console.log('REDUCER', action);

  switch (action.type) {
    case ALLOCATE_SLOT_ACTION: {
      const assignedSlot = { ...state[action.slot], name: action.playerName };
      const newState = {...state};
      newState[action.slot] = assignedSlot;
      return newState;
    }
    default:
      return state;
  }

};

export default reducer;
