// @flow
import type { Game } from '../types/GameType';
import type { Action } from './actions/ActionType';

import initialState from './initialState';
import { ALLOCATE_SLOT_ACTION, MAKE_MOVE_ACTION } from './actions/slotActions';
import { RESET_GAME } from './actions/resetGameAction';
import { UPDATE_GAME_STATUS } from './actions/updateGameStatusAction';
import { UPDATE_GAME_RESULT } from './actions/updateGameResultAction';


const reducer = (state: Game = initialState, action: Action): Game => {

  switch (action.type) {
    case ALLOCATE_SLOT_ACTION: {
      const assignedSlot = { ...state[action.slot], name: action.playerName, clientId: action.clientId };
      const newState = {...state};
      newState[action.slot] = assignedSlot;
      return newState;
    }

    case MAKE_MOVE_ACTION: {
      //TODO: better?
      const newState = {...state};
      newState[action.slot] = { ...newState[action.slot], move: action.move, powerUp: action.powerUp };
      return newState;
    }

    case UPDATE_GAME_STATUS: {
      return {
        ...state,
        status: action.gameStatus,
      };
    }

    case UPDATE_GAME_RESULT: {
      return {
        ...state,
        result: action.result,
      };
    }

    case RESET_GAME: {
      return initialState;
    }

    default:
      return state;
  }

};

export default reducer;
