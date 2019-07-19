import React from 'react';
import styled from 'styled-components';
import { SpinAnimation } from './animations';

const LoadingContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const LoadingConstrain = styled.div`
  height: 80px;
  width: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loader = styled.div`
  animation: ${SpinAnimation} 1s linear infinite;
  height: 10px;
  width: 10px;
`;

const LoadingText = styled.p`
  font-size: 0.8rem;
`;

export default ({ text }: { text?: string }) => {
  return (
    <LoadingContainer>
      <LoadingConstrain>
        <Loader />
      </LoadingConstrain>
      {text && <LoadingText>{text}</LoadingText>}
    </LoadingContainer>
  );
};
