import React from 'react';
import styled from 'styled-components';
import { GasCard } from '../../../providers/GasProvider';

const Container = styled.div`
  display: flex;
`;

const CloudPressButton = styled.button`
  border: 2px solid white;
  border-radius: 50%;
  width: 80vw;
  height: 80vw;
  font-size: 2rem;
  font-family: ${({ theme }) => theme.fontFamily.feature};
  color: ${({ theme }) => theme.color.gasGame.cardTextColor01};
`;

const SubText = styled.div`
  font-size: 0.8rem;
`;

type Props = {
  pressesRemaining: number;
  press: () => void;
};

export const PlayerGasCloudPresser = ({
  pressesRemaining,
  press,
}: Props): JSX.Element => {
  return (
    <Container>
      <CloudPressButton onClick={press}>
        Press me
        <br />
        😬
        <SubText>
          {pressesRemaining} more time{pressesRemaining > 1 && 's'}
        </SubText>
      </CloudPressButton>
    </Container>
  );
};
