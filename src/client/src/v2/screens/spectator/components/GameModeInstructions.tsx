import React, { useEffect } from 'react';
import styled from 'styled-components';
import { inOutAnimation } from '../../../../uplift/components/animations';
import { GameModeType } from '..';

const ANIMATION_DURATION_MILLISECONDS = 3000;

const gameModeTypeInstructions: {
  [key in GameModeType]: { title: string; subtitle: string };
} = {
  'Super-suprise': {
    title: 'Pick-a-Prize',
    subtitle: 'Keep playing until someone opens the "game over" prize',
  },
  'Tug-o-war': {
    title: 'Tug-o-war',
    subtitle: 'Win twice in a row',
  },
  Timebomb: {
    title: 'Timebomb',
    subtitle: 'Keep playing until bomb explodes',
  },
};

const Container = styled.div`
  position: absolute;
  text-align: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  /* z-index: 100; */
  animation: ${inOutAnimation} ${ANIMATION_DURATION_MILLISECONDS}ms ease-in-out
    both;
`;

const Title = styled.div`
  font-family: ${({ theme }) => theme.fontFamily.feature};
  font-size: 5rem;
  color: ${({ theme }) => theme.color.text01};
  -webkit-text-stroke-width: 4px;
  -webkit-text-stroke-color: ${({ theme }) => theme.color.border01};
`;
const SummaryText = styled.div``;

type Props = {
  gameModeType: GameModeType;
  onComplete?: () => void;
};

export const GameModeInstructions = ({ gameModeType, onComplete }: Props) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onComplete && onComplete();
    }, ANIMATION_DURATION_MILLISECONDS);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  if (!gameModeType) {
    return null;
  }

  return (
    <Container>
      <Title>{gameModeTypeInstructions[gameModeType].title}</Title>
      {/* <SummaryText>
        {gameModeTypeInstructions[gameModeType].subtitle}
      </SummaryText> */}
    </Container>
  );
};
