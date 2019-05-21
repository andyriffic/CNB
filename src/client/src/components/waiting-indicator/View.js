import React from 'react';
import styled, { keyframes } from 'styled-components';

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

const LoadingCircle = styled.svg`
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

const LoadingContent = styled.div`
  background-color: ${props => (props.loaded ? 'white' : 'white')};
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

const View = ({ loaded, children }) => {
  return (
    <SpinningBorderContent loaded={loaded}>
      <LoadingContent loaded={loaded}>{children}</LoadingContent>
      <LoadingCircle
        loaded={loaded}
        id="loading-spinner"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
      >
        <g fill="none">
          <path
            id="track"
            d="M24,48 C10.745166,48 0,37.254834 0,24 C0,10.745166 10.745166,0 24,0 C37.254834,0 48,10.745166 48,24 C48,37.254834 37.254834,48 24,48 Z M24,44 C35.045695,44 44,35.045695 44,24 C44,12.954305 35.045695,4 24,4 C12.954305,4 4,12.954305 4,24 C4,35.045695 12.954305,44 24,44 Z"
          />
          <path
            id="section"
            d="M24,0 C37.254834,0 48,10.745166 48,24 L44,24 C44,12.954305 35.045695,4 24,4 L24,0 Z"
          />
        </g>
      </LoadingCircle>
    </SpinningBorderContent>
  );
};

export default View;
