import React from 'react';
import styled from 'styled-components';
import { GasCard } from '../../../providers/GasProvider';

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  border: 3px solid white;
  border-radius: 10px;
  width: 100px;
  height: 160px;
  background-color: white;
`;

const CardText = styled.div`
  font-size: 3rem;
  color: steelblue;
  font-family: ${({ theme }) => theme.fontFamily.numbers};
`;

type Props = {
  card?: GasCard;
};

export function CurrentCard({ card }: Props): JSX.Element {
  return (
    <CardContainer>{card && <CardText>{card.presses}</CardText>}</CardContainer>
  );
}
