import React, { FC, useEffect } from 'react';
import styled from 'styled-components';
import { superSaiyanAnimation } from '../../../../../../uplift/components/animations';
import { useSoundProvider } from '../../../../../providers/SoundProvider';

const Text = styled.div`
  animation: ${superSaiyanAnimation} 1.5s infinite;
  font-family: ${({ theme }) => theme.fontFamily.feature};
  font-size: 2rem;
  text-transform: uppercase;
  color: ${({ theme }) => theme.color.text01};
`;

export const PowerMode: FC = () => {
  const { play } = useSoundProvider();

  useEffect(() => {
    play('PowerMode');
  }, []);

  return <Text>Power Mode !!</Text>;
};
