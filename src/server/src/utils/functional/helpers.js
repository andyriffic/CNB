// @flow

import { prop, compose } from 'ramda';
import type { Option } from './Option';
import { option } from './Option';

export { prop, compose };

export const safeProp = (propName: string, obj: Object): Option<any> => {
  const unSafeProp = prop(propName, obj);

  return option(unSafeProp);
};
