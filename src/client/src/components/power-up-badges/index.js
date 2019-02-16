import React from 'react';
import Switch from '../switch';

import BaseBadge from './BaseBadge';
import DoublePoints from './DoublePoints';

const View = ({ type }) => {
  return (
    <Switch>
      <BaseBadge
        showIf={type === 'HIDDEN'}
        text="!"
        backgroundColor="#000000"
      />
      <DoublePoints showIf={type === 'DOUBLE'} />
    </Switch>
  );
};

export default View;
