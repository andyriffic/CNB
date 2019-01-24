import React from 'react';
import SelectedMove from '../selected-move';

const View = ({ selectedMove }) => {
  return (
    <SelectedMove
      title="Awww, too bad ;( 太糟糕了"
      loser
      selectedMove={selectedMove}
    />
  );
};

export default View;
