import React from 'react';
import styled from 'styled-components';
import { SubHeading } from '../../../components/ui/Atoms';
import { Button } from '../../../components/ui/buttons';

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  gap: 20px;
`;

type Props = {
  onPlayClick: () => void;
};

export function ProbablyWantPlayScreen({ onPlayClick }: Props): JSX.Element {
  return (
    <Container>
      <SubHeading>You probably want the play screen?</SubHeading>
      <Button onClick={onPlayClick}>Play</Button>
    </Container>
  );
}
