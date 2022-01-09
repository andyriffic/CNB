import React from 'react';
import styled from 'styled-components';
import { GasCard } from '../../../providers/GasProvider';

const Container = styled.div`
  display: flex;
  gap: 10vw;
  transition: opacity 300ms ease-out;
`;

const Card = styled.button`
  border: 5px solid ${({ theme }) => theme.color.gasGame.cardBorderColor};
  border-radius: 5px;
  width: 20vw;
  height: 25vw;
  font-size: 2rem;
  text-transform: uppercase;
  color: ${({ theme }) => theme.color.gasGame.cardTextColor01};
  background-color: ${({ theme }) => theme.color.gasGame.cardBackgroundColor};
  font-family: ${({ theme }) => theme.fontFamily.numbers};
`;

const CardNumber = styled.div`
  font-size: 1rem;
`;

const CardText = styled.div`
  font-size: 0.8rem;
`;

type Props = {
  cards: GasCard[];
  enabled: boolean;
  playCard: (cardIndex: number) => void;
};

export const PlayerGasCards = ({
  cards,
  enabled,
  playCard,
}: Props): JSX.Element => {
  return (
    <Container style={{ opacity: enabled ? 1 : 0.6 }}>
      {cards.map((c, i) => (
        <Card key={i} disabled={!enabled} onClick={() => playCard(i)}>
          {c.type === 'press' && <CardNumber>{c.presses}</CardNumber>}
          {c.type === 'skip' && <CardText>Skip</CardText>}
          {c.type === 'reverse' && <CardText>↩</CardText>}
        </Card>
      ))}
    </Container>
  );
};
