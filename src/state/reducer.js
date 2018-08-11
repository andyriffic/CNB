import initialState from './initialState';
import { ALLOCATE_SLOT_ACTION } from './actions/slotActions';

const reducer = (state = initialState, action) => {

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
