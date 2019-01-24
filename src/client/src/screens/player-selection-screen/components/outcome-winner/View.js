import React from 'react';
import SelectedMove from '../selected-move';

const View = ({ selectedMove }) => {
  return (
    <SelectedMove title="Great move! 幹得漂亮" selectedMove={selectedMove} />
  );
};

export default View;
