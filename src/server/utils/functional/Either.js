// @flow

class Left<L, R> {
  _value: L;

  constructor(value: L) {
    this._value = value;
  }

  /* eslint-disable no-unused-vars */
  fold<A>(ifLeft: (value: L) => A, ifRight: (value: R) => A): A {
    return ifLeft(this._value);
  }
  /* eslint-enable no-unused-vars */

  /* eslint-disable no-unused-vars */
  map(f: (value: R) => R): Either<L, R> {
    return this;
  }
  /* eslint-enable no-unused-vars */
}

class Right<L, R> {
  _value: R;

  constructor(value: R) {
    this._value = value;
  }

  /* eslint-disable no-unused-vars */
  fold<A>(ifLeft: (value: L) => A, ifRight: (value: R) => A): A {
    return ifRight(this._value);
  }
  /* eslint-enable no-unused-vars */

  map<R1>(f: (value: R) => R1): Either<L, R1> {
    return right(f(this._value));
  }
}

export function left<L, R>(x: L): Left<L, R> {
  return new Left(x);
}

export function right<L, R>(x: R): Right<L, R> {
  return new Right(x);
}

export type Either<L, R> = Left<L, R> | Right<L, R>;
