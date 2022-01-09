import React from 'react';
import styled from 'styled-components';
import { PressableButton } from '../../../components/ui/PressableButton';

const Container = styled.div`
  display: flex;
`;

const CloudPressButton = styled(PressableButton)`
  width: 100%;
  font-size: 2.5rem;
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
