import React from 'react';
import styled from 'styled-components';
import { Button } from '../../../components/ui/buttons';
import { GasCard } from '../../../providers/GasProvider';

const Container = styled.div`
  display: flex;
`;

const CloudPressButton = styled(Button)`
  width: 100%;
  min-height: 20vw;
  font-size: 2rem;
  font-family: ${({ theme }) => theme.fontFamily.feature};
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
