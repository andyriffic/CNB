import React from 'react';
import styled, { keyframes } from 'styled-components';

// const Rainbow = keyframes`
//   0% {color: orange;}
//   10% {color: purple;}
// 	20% {color: red;}
//   30% {color: CadetBlue;}
// 	40% {color: yellow;}
//   50% {color: coral;}
// 	60% {color: green;}
//   70% {color: cyan;}
//   80% {color: DeepPink;}
//   90% {color: DodgerBlue;}
//   100% {color: orange;}
// `;

export const Rainbow = keyframes`
  0% {color: #fea3aa;}	
  20% {color: #f8b88b;}	
	40% {color: #faf884;}
  60% {color: #baed91;}
	80% {color: #b2cefe;}
  100% {color: #f2a2e8;}
`;

const Container = styled.span`
  text-shadow: 2px 2px #000000;
  animation: ${Rainbow} 8s infinite;
`;

const View = ({ children }) => {
  return <Container>{children}</Container>;
};

export default View;
