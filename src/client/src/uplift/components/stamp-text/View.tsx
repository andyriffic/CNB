import React from 'react';
import styled from 'styled-components';

import grungeImage from './grunge.png';
import { stampAnimation } from '../animations';

type StampTextProps = {
  text: string | React.ReactNode;
  show: boolean;
};

const Container = styled.div`
`;

const Text = styled.p`
  animation: ${stampAnimation} 500ms ease-in 1s 1 both;
  transform: rotate(12deg);
  font-size: 1.2rem;
  font-weight: 700;
  display: inline-block;
  padding: 0.25rem 1rem;
  text-transform: uppercase;
  font-family: 'Courier';
  mask-image: url(${grungeImage});
  mask-size: 944px 604px;
  mix-blend-mode: multiply;

  color: #0a9928;
  border: 10px solid #0a9928;
  mask-position: 13rem 6rem;
  transform: rotate(-14deg);
`;

export default ({ text, show }: StampTextProps) => {
  return (
    <Container className="margins-off">{show && <Text>{text}</Text>}</Container>
  );
};
