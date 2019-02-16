import React from 'react';
import Switch from '../switch';

import DoublePoints from './DoublePoints';

const View = ({ type }) => {
  return <DoublePoints showIf={type === 'DOUBLE'} />;
};

export default View;
