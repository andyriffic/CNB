import React from 'react';

import Winner from './Winner';

const View = ({ height, width, loser }) => {
  return <Winner showIf={!loser} height={height} width={width} />;
};

export default View;
