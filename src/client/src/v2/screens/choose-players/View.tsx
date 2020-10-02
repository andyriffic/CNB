import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useInvitationsProvider } from '../../../uplift/contexts/InvitationsProvider';
import { GameScreen } from '../../components/ui/GameScreen';
import { usePlayerSelector } from './hooks/usePlayerSelector';

const View = () => {
  // const { createInvitation } = useInvitationsProvider();
  const playerSelector = usePlayerSelector();
  const [player1, setPlayer1] = useState(() => playerSelector.getNextPlayer());
  const [player2, setPlayer2] = useState(() => playerSelector.getNextPlayer());

  useEffect(() => {
    console.log('UseEffect', playerSelector.hasLoaded, player1);

    if (!playerSelector.hasLoaded) {
      return;
    }
    if (!player1) {
      console.log('Choose Players, get next player');

      setPlayer1(playerSelector.getNextPlayer());
    }
    if (!player2) {
      setPlayer2(playerSelector.getNextPlayer());
    }
  }, [playerSelector.hasLoaded, player1]);

  return (
    <GameScreen scrollable={false}>
      <p>
        Player1: {player1 && player1.name}{' '}
        <button onClick={() => setPlayer1(playerSelector.getNextPlayer())}>
          next
        </button>
      </p>
      <p>
        Player2: {player2 && player2.name}
        <button onClick={() => setPlayer2(playerSelector.getNextPlayer())}>
          next
        </button>
      </p>
    </GameScreen>
  );
};

export default View;
