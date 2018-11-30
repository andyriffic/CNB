/* @flow */
import React from 'react';

import Switch from '../../../../../components/switch';
import Winner from './Winner';
import Loser from './Loser';

type Props = {
  height: number,
  width: number,
  loser?: boolean,
}

const View = ( { height, width, loser }: Props ) => {
  return (
    <Switch>
      <Winner showIf={ !loser } height={height} width={width} />
      <Loser showIf={ loser } height={height} width={width} />
    </Switch>
  );
}

export default View;
