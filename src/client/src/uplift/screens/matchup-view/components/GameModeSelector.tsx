import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { PrimaryButton } from '../../../components/PrimaryButton';
import { useDoOnce } from '../../../hooks/useDoOnce';

const Container = styled.div`
  text-align: center;
`;

const ModeButton = styled(PrimaryButton)`
  background-color: #ff9d76;
`;

export const GameModeSelector = ({
  startGame,
}: {
  startGame: (playMode?: string) => void;
}) => {
  useDoOnce(true, () => {
    console.log('AUTO START GAME...');

    startGame('Timebomb');
  });
  return (
    <Container>
      <PrimaryButton onClick={() => startGame('Timebomb')}>
        Timebomb 💣
      </PrimaryButton>
    </Container>
  );
};
