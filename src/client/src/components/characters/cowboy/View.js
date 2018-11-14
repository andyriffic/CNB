/* @flow */
import React from 'react';
import styled from 'styled-components';

import Switch from '../../switch';
import Winner from './Winner';
import Loser from './Winner';

const StyledBear = styled.svg`
  height: ${props=> props.height}%;
  width: ${props=> props.width}%;
`;

type Props = {
  height: number,
  width: number,
  loser?: boolean,
}

const View = ( { height, width, loser }: Props ) => {
  return (
    <Switch>
      <Winner showIf={ !loser } />
      <Loser showIf={ loser } />
    </Switch>
  );
}

export default View;
