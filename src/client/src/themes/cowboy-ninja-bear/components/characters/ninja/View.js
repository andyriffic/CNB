import React from 'react';

import Switch from '../../../../../components/switch';
import Winner from './Winner';
import Loser from './Loser';

const View = ({ height, width, loser }) => {
  return (
    <Switch>
      <Winner showIf={!loser} height={height} width={width} />
      <Loser showIf={loser} height={height} width={width} />
    </Switch>
  );
};

export default View;
