import React from 'react';
import styled from 'styled-components';

import grungeImage from './grunge.png';
import { stampAnimation } from '../animations';

type StampTextProps = {
  text: string | React.ReactNode;
  show: boolean;
};

const Container = styled.div`
  padding: 30px;
`;

const Text = styled.p`
  animation: ${stampAnimation} 500ms ease-in 1s 1 both;
  transform: rotate(12deg);
  color: #555;
  font-size: 3rem;
  font-weight: 700;
  border: 0.25rem solid #555;
  display: inline-block;
  padding: 0.25rem 1rem;
  text-transform: uppercase;
  border-radius: 1rem;
  font-family: 'Courier';
  mask-image: url(${grungeImage});
  mask-size: 944px 604px;
  mix-blend-mode: multiply;

  color: #0a9928;
  border: 0.5rem solid #0a9928;
  mask-position: 13rem 6rem;
  transform: rotate(-14deg);
  border-radius: 0;
`;

export default ({ text, show }: StampTextProps) => {
  return (
    <Container className="margins-off">{show && <Text>{text}</Text>}</Container>
  );
};
