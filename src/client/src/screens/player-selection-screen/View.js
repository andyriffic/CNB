/* @flow */
import React from 'react';

type Props = {
  //todo: do better than this
  playerKey: 'XIAN'|'MELB',
};

const View = ( { playerKey }: Props ) => {
  return (
    <h2>Player selection screen for { playerKey }</h2>
  )
}

export default View;
