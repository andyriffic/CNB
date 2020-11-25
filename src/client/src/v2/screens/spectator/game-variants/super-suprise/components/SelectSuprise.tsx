import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import {
  selectWeightedRandomOneOf,
  WeightedItem,
} from '../../../../../../uplift/utils/random';
import {
  Choice,
  usePlayerChoiceProvider,
  CreatedPlayerChoice,
} from '../../../../../providers/PlayerChoiceProvider';
import { Player } from '../../../../../providers/PlayersProvider';

const Container = styled.div`
  position: absolute;
  width: 50vw;
  left: 25vw;
  border: 2px solid ${({ theme }) => theme.color.border01};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.color.background02};
  z-index: 1;
  padding: 20px;
`;

const ChoiceList = styled.div`
  display: flex;
  justify-content: space-around;
`;

const ChoiceItem = styled.div``;

const ChoiceItemIcon = styled.div`
  font-size: ${({ theme }) => theme.fontSize.extraLarge};
`;

const ChoiceItemLabel = styled.div``;

type Props = {
  playerId: string;
  onComplete: (gameOver: boolean) => void;
  gameCount: number;
};

const generateChoices = (gameCount: number): Choice[] => {
  const weightedChoices: WeightedItem<ChoiceOutcome>[] = [
    { weight: 8, item: 'none' },
    { weight: 3, item: '+1' },
    { weight: 2, item: '+2' },
    { weight: gameCount, item: 'gameover' },
  ];

  return [
    { id: 'A', label: selectWeightedRandomOneOf(weightedChoices) },
    { id: 'B', label: selectWeightedRandomOneOf(weightedChoices) },
    { id: 'C', label: selectWeightedRandomOneOf(weightedChoices) },
  ];
};

type ChoiceStates = 'waitingSelection' | 'madeChoice' | 'revealAll';
type ChoiceOutcome = 'none' | '+1' | '+2' | 'gameover';

export const SelectSuprise = ({ playerId, onComplete, gameCount }: Props) => {
  const choicesRef = useRef(generateChoices(gameCount));
  const [choiceId, setChoiceId] = useState('');
  const [playerChoice, setPlayerChoice] = useState<
    CreatedPlayerChoice | undefined
  >();
  const { createChoice, allPlayerChoices } = usePlayerChoiceProvider();
  const [choiceState, setChoiceState] = useState<ChoiceStates>(
    'waitingSelection'
  );

  useEffect(() => {
    createChoice({ choices: choicesRef.current, playerId }, choiceId => {
      setChoiceId(choiceId);
    });
  }, []);

  useEffect(() => {
    if (!allPlayerChoices) {
      return;
    }

    setPlayerChoice(allPlayerChoices.find(c => c.id === choiceId));
  }, [allPlayerChoices, choiceId, playerChoice]);

  useEffect(() => {
    if (!playerChoice) {
      setChoiceState('waitingSelection');
      return;
    }

    if (choiceState === 'waitingSelection' && !!playerChoice.selectedChoiceId) {
      setChoiceState('madeChoice');
      return;
    }
  }, [playerChoice, choiceState]);

  useEffect(() => {
    if (choiceState === 'madeChoice') {
      setTimeout(() => {
        setChoiceState('revealAll');
      }, 3000);
    }
  }, [choiceState]);

  useEffect(() => {
    if (choiceState === 'revealAll') {
      setTimeout(() => {
        const selectedOutcome =
          !!playerChoice &&
          !!playerChoice.selectedChoiceId &&
          choicesRef.current.find(c => c.id === playerChoice.selectedChoiceId);
        onComplete(!!selectedOutcome && selectedOutcome.label === 'gameover');
      }, 2000);
    }
  }, [choiceState, playerChoice]);

  return (
    <Container>
      Select choice for: {playerId} ({choiceId})
      <ChoiceList>
        {playerChoice &&
          playerChoice.choices.map(c => (
            <ChoiceItem key={c.id}>
              <ChoiceItemIcon>
                {choiceState === 'waitingSelection' && '🎁'}
                {choiceState === 'madeChoice' &&
                  playerChoice.selectedChoiceId === c.id &&
                  '⭐️'}
                {choiceState === 'madeChoice' &&
                  playerChoice.selectedChoiceId !== c.id &&
                  '🎁'}
                {choiceState === 'revealAll' && '⭐️'}
              </ChoiceItemIcon>
              <ChoiceItemLabel>
                {choiceState === 'waitingSelection' && ''}
                {choiceState === 'madeChoice' &&
                  playerChoice.selectedChoiceId === c.id &&
                  c.label}
                {choiceState === 'madeChoice' &&
                  playerChoice.selectedChoiceId !== c.id &&
                  ''}
                {choiceState === 'revealAll' && c.label}
              </ChoiceItemLabel>
            </ChoiceItem>
          ))}
      </ChoiceList>
    </Container>
  );
};
