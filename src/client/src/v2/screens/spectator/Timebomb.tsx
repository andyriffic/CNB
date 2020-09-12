import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 5vw;
  height: 5vw;
  font-size: 3rem;
`;

type TimebombProps = {
  triggerFuse: boolean;
  onComplete: () => void;
};

export const Timebomb = ({ triggerFuse, onComplete }: TimebombProps) => {
  useEffect(() => {
    if (triggerFuse) {
      setTimeout(() => {
        onComplete();
      }, 3000);
    }
  }, [triggerFuse]);

  return <Container>💣 {triggerFuse && '⏰'}</Container>;
};
