import React, { useEffect } from 'react';
import styled from 'styled-components';
import { slideInUpAnimation } from '../../../../uplift/components/animations';
import { GasCard } from '../../../providers/GasProvider';
import { useSoundProvider } from '../../../providers/SoundProvider';

const CardContainer = styled.div<{ special: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  border: 5px solid ${({ theme }) => theme.color.gasGame.cardBorderColor};
  border-radius: 10px;
  width: 70px;
  height: 100px;
  background-color: ${({ theme, special }) =>
    special
      ? theme.color.gasGame.cardBackgroundColorSpecial
      : theme.color.gasGame.cardBackgroundColor};
  animation: ${slideInUpAnimation} 300ms ease-out 0s both;
  color: ${({ theme, special }) =>
    special
      ? theme.color.gasGame.cardTextColorSpecial
      : theme.color.gasGame.cardTextColor01};
  box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px,
    rgba(6, 24, 44, 0.65) 0px 4px 6px -1px,
    rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
`;

const CardNumber = styled.div`
  font-size: 2rem;
  font-family: ${({ theme }) => theme.fontFamily.numbers};
`;

const CardText = styled.div`
  font-size: 1.2rem;
  font-family: ${({ theme }) => theme.fontFamily.feature};
`;

const CardIcon = styled.div`
  font-size: 2rem;
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
    case 'risky':
      return <CardNumber>{pressesRemaining}</CardNumber>;
    case 'skip':
      return <CardText>skip</CardText>;
    case 'reverse':
      return <CardIcon>↔</CardIcon>;
    default:
      return <CardText>{card.type}</CardText>;
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
      case 'risky':
        play('GasPlayRiskCard');
        break;
      default:
        break;
    }
  }, [card.type]);

  if (card.type === 'press' && pressesRemaining === 0) {
    return null;
  }
  return (
    <CardContainer special={card.type === 'risky'}>
      {renderCard(card, pressesRemaining)}
    </CardContainer>
  );
}
