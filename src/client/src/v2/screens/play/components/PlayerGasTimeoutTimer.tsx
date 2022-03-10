import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const fillAnimation = keyframes`
  from { width: 0%; background-color: darkred }
  to {width 100%; background-color: red }
`;

const TIMEOUT_MS = 3000;

const Container = styled.div`
  margin-top: 30px;
  border-radius: 10px;
  background-color: gray;
`;

const ProgressFill = styled.div`
  height: 20px;
  animation: ${fillAnimation} ${TIMEOUT_MS}ms linear 1 0s both;
  border-radius: 10px;
`;

type Props = {
  onTimedOut: () => void;
};

export const PlayerGasTimeoutTimer = ({ onTimedOut }: Props): JSX.Element => {
  useEffect(() => {
    const timeout = setTimeout(onTimedOut, TIMEOUT_MS);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <Container>
      <ProgressFill />
    </Container>
  );
};
