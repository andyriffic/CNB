/* @flow */
import React from 'react';

import Switch from '../../../../../components/switch';
import Winner from './Winner';

type Props = {
  height: number,
  width: number,
  loser?: boolean,
}

const View = ( { height, width, loser }: Props ) => {
  return (
    <Winner showIf={ !loser } height={height} width={width} />
  );
}

export default View;
