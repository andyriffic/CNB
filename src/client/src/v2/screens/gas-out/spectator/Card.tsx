import React, { useEffect } from 'react';
import styled from 'styled-components';
import { slideInUpAnimation } from '../../../../uplift/components/animations';
import { GasCard } from '../../../providers/GasProvider';
import { useSoundProvider } from '../../../providers/SoundProvider';

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  border: 3px solid ${({ theme }) => theme.color.gasGame.cardBorderColor};
  border-radius: 10px;
  width: 40px;
  height: 60px;
  background-color: ${({ theme }) => theme.color.gasGame.cardBackgroundColor};
  animation: ${slideInUpAnimation} 300ms ease-out 0s both;
  color: ${({ theme }) => theme.color.gasGame.cardTextColor01};
`;

const CardNumber = styled.div`
  font-size: 1rem;
  font-family: ${({ theme }) => theme.fontFamily.numbers};
`;

const CardText = styled.div`
  font-size: 0.8rem;
  font-family: ${({ theme }) => theme.fontFamily.feature};
`;

const CardIcon = styled.div`
  font-size: 1.2rem;
`;

type Props = {
  card: GasCard;
  pressesRemaining: number;
};

function renderCard(
  card: GasCard,
  pressesRemaining: number
): JSX.Element | null {
  switch (card.type) {
    case 'press':
      return <CardNumber>{pressesRemaining}</CardNumber>;
    case 'skip':
      return <CardText>skip</CardText>;
    case 'reverse':
      return <CardIcon>↔</CardIcon>;
    default:
      throw 'card type not configured';
  }
}

export function Card({ card, pressesRemaining }: Props): JSX.Element | null {
  const { play } = useSoundProvider();

  useEffect(() => {
    switch (card.type) {
      case 'press':
        play('GasPlayNumberCard');
        break;
      case 'reverse':
        play('GasPlayReverseCard');
        break;
      case 'skip':
        play('GasPlaySkipCard');
        break;

      default:
        break;
    }
  }, [card.type]);

  if (card.type === 'press' && pressesRemaining === 0) {
    return null;
  }
  return <CardContainer>{renderCard(card, pressesRemaining)}</CardContainer>;
}
