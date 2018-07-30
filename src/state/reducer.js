import initialState from './initialState';

const reducer = (state = initialState, action) => {

  switch (action.type) {
    case "ALLOCATE": {
      return { foo: 'bar' }
    }
    default:
      return state;
  }

};

export default reducer;
