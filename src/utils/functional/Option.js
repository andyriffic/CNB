// @flow

export class Some<U> {
  _value: U;

  constructor(value: U) {
    this._value = value;
  }

  map<V>(f: (value: U) => V): Some<V> {
    return new Some(f(this._value));
  }

  fold<V>(ifEmpty: () => V, f: (value: U) => V): V {
    return f(this._value);
  }

  /* eslint-disable no-unused-vars */
  getOrElse(defaultVal: U): U {
    return this._value;
  }
  /* eslint-enable no-unused-vars */
}

export class None<U> {
  /* eslint-disable no-unused-vars */
  map<V>(f: (value: U) => V): None<V> {
    return none;
  }
  /* eslint-enable no-unused-vars */

  /* eslint-disable no-unused-vars */
  fold<V>(ifEmpty: () => V, f: (value: U) => V): V {
    return ifEmpty();
  }
  /* eslint-enable no-unused-vars */

  getOrElse(defaultVal: U): U {
    return defaultVal;
  }
}

export function some<U>(value: U): Some<U> {
  return new Some(value);
}

export const none: None<any> = new None();

export function option<U>(value: ?U): Option<U> {
  if (value === null || value === undefined) {
    return none;
  }

  return new Some(value);
}

export type Option<U> = Some<U> | None<U>;
