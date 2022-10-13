import React, { useEffect } from 'react';
import styled, { css, keyframes } from 'styled-components';

const fillAnimation = keyframes`
  from { width: 0%; background-color: darkred }
  to {width 100%; background-color: red }
`;

const Container = styled.div`
  margin-top: 30px;
  border-radius: 10px;
  background-color: gray;
`;

const ProgressFill = styled.div<{ timeOutMilliseconds: number }>`
  ${({ timeOutMilliseconds }) =>
    css`
      animation: ${fillAnimation} ${timeOutMilliseconds}ms linear 1 0s both;
    `}
  border-radius: 10px;
  padding: 8px;
  text-align: center;
  overflow: visible;
  white-space: nowrap;
  color: white;
`;

type Props = {
  onTimedOut: () => void;
  timeOutMilliseconds: number;
};

export const PlayerGasTimeoutTimer = ({
  onTimedOut,
  timeOutMilliseconds,
}: Props): JSX.Element => {
  // useEffect(() => {
  //   const timeout = setTimeout(onTimedOut, timeOutMilliseconds);

  //   return () => {
  //     clearTimeout(timeout);
  //   };
  // }, []);

  return (
    <Container>
      <ProgressFill timeOutMilliseconds={timeOutMilliseconds}>
        Hurry! 匆忙
      </ProgressFill>
    </Container>
  );
};
