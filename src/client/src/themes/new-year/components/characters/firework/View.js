/* @flow */
import React from 'react';

import Winner from './Winner';

type Props = {
  height: number,
  width: number,
  loser?: boolean,
}

const View = ( { height, width, loser }: Props ) => {
  return (
    <Winner />
  );
}

export default View;
