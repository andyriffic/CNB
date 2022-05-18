import { pipe } from '@mobily/ts-belt';

type State = {
  something: boolean;
};

export function doSomething(state: State) {
  return pipe(state, setTrue);
}

function setTrue(state: State): State {
  return { ...state, something: true };
}
