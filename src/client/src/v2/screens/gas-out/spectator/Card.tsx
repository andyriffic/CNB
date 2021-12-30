import React from 'react';
import styled from 'styled-components';
import { slideInUpAnimation } from '../../../../uplift/components/animations';
import { GasCard } from '../../../providers/GasProvider';

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  border: 3px solid white;
  border-radius: 10px;
  width: 40px;
  height: 60px;
  background-color: white;
  animation: ${slideInUpAnimation} 300ms ease-out 0s both;
`;

const CardNumber = styled.div`
  font-size: 1rem;
  color: steelblue;
  font-family: ${({ theme }) => theme.fontFamily.numbers};
`;

const CardText = styled.div`
  font-size: 0.8rem;
  color: crimson;
  font-family: ${({ theme }) => theme.fontFamily.numbers};
`;

type Props = {
  card: GasCard;
};

function renderCard(card: GasCard): JSX.Element {
  switch (card.type) {
    case 'press':
      return <CardNumber>{card.presses}</CardNumber>;
    case 'skip':
      return <CardText>skip</CardText>;
    default:
      throw 'card type not configured';
  }
}

export function Card({ card }: Props): JSX.Element {
  return <CardContainer>{renderCard(card)}</CardContainer>;
}
