/* @flow */
// flow:disable no typedefs for useState, useEffect yet
import React, { useContext } from 'react';
import ServerMessagesContext from '../../contexts/ServerMessagesContext';

const View = () => {
  const serverMessages = useContext(ServerMessagesContext);

  return (
    <React.Fragment>
      <h2>Are you sure?</h2>
      <button onClick={ serverMessages.resetGame }>Reset Game</button>
    </React.Fragment>
  )
};

export default View;
