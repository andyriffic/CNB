/* @flow */
import React from 'react';
import styled from 'styled-components';

import PlayerStatus from '../player-status';

type Props = {
  player1: Object,
  player2: Object,
  playGame: () => void,
}

const ReadyView = styled.div`
  display: flex;
`

const PlayGameButton = styled.button`
  margin-left: 10px;
  margin-right: 10px;
  border-radius: 50%;
  height: 50px;
  width: 50px;
  cursor: pointer;

  &:hover {
    color: white;
    background-color: black;
  }
`;

const View = ( {player1, player2, playGame }: Props ) => {
  return (
    <React.Fragment>
      <h2>Ready</h2>
      <ReadyView>
        <PlayerStatus { ...player1 } />
        <PlayGameButton onClick={playGame}>
        PLAY
        </PlayGameButton>
        <PlayerStatus { ...player2 } />
      </ReadyView>
    </React.Fragment>
  );
}

export default View;
