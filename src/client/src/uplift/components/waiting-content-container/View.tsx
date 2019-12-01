import React from 'react';
import styled, { keyframes, CSSProperties } from 'styled-components';
import wreathImage from './wreath.gif';

const SpinAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const SpinningBorderContent = styled.div`
  width: 24vmin;
  height: 24vmin;
  position: relative;
`;

const LoadingCircle = styled.svg<{ loaded: boolean }>`
  z-index: 1;
  animation: ${SpinAnimation} 2s linear infinite;
  #track {
    transition: fill 1s ease-in-out;
    fill: ${props => (props.loaded ? '#4F8A10' : '#BDE5F8')};
  }

  #section {
    transition: fill 1s ease-in-out;
    fill: ${props => (props.loaded ? '#4F8A10' : '#00529B')};
  }
`;

const LoadingContent = styled.div<{ loaded: boolean }>`
  background-color: ${props => (props.loaded ? '#378b29' : '#378b29')};
  position: absolute;
  top: 1px;
  left: 1px;
  right: 1px;
  bottom: 1px;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: background-color 1s ease-in-out;
  text-align: center;
  font-size: 0.5rem;
`;

const Wreath = styled.img`
  z-index: 1;
  width: 40vmin;
  height: 40vmin;
  position: absolute;
  top: -8vmin;
  left: -8vmin;
`;

type WaitingContentContainerProps = {
  loaded: boolean;
  children: React.ReactNode;
  style?: CSSProperties;
};

const View = ({ loaded, children, style }: WaitingContentContainerProps) => {
  return (
    <SpinningBorderContent className="margins-off" style={style}>
      <Wreath src={wreathImage} />
      <LoadingContent loaded={loaded}>{children}</LoadingContent>
    </SpinningBorderContent>
  );
};

export default View;
