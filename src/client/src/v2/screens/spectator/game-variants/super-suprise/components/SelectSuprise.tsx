import React, { useEffect, useRef, useState } from 'react';
import tinyColor from 'tinycolor2';
import styled from 'styled-components';
import {
  selectWeightedRandomOneOf,
  WeightedItem,
} from '../../../../../../uplift/utils/random';
import { SubHeading } from '../../../../../components/ui/Atoms';
import {
  Choice,
  usePlayerChoiceProvider,
  CreatedPlayerChoice,
} from '../../../../../providers/PlayerChoiceProvider';
import {
  Player,
  usePlayersProvider,
} from '../../../../../providers/PlayersProvider';

const Container = styled.div`
  position: absolute;
  width: 50vw;
  top: 10vh;
  left: 25vw;
  border: 2px solid ${({ theme }) => theme.color.border01};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.color.background03};
  z-index: 1;
  padding: 20px;
  box-shadow: 6px 2px 17px 0px rgba(0, 0, 0, 0.35);
`;

const ChoiceList = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 15px;
`;

const ChoiceItem = styled.div<{ selected: boolean }>`
  padding: 10px;
  border-radius: 8px;
  background-color: ${({ selected, theme }) =>
    selected
      ? tinyColor(theme.color.background03)
          .darken(15)
          .toString()
      : 'transparent'};
  text-align: center;
`;

const ChoiceItemIcon = styled.div`
  font-size: ${({ theme }) => theme.fontSize.extraLarge};
`;

const ChoiceItemLabel = styled.div`
  font-family: ${({ theme }) => theme.fontFamily.feature};
  font-size: ${({ theme }) => theme.fontSize.medium};
  color: ${({ theme }) => theme.color.text02};
  text-align: center;
`;

type Props = {
  playerId: string;
  onComplete: (gameOver: boolean) => void;
  gameCount: number;
};

const generateChoices = (gameCount: number): Choice[] => {
  const weightedChoices: WeightedItem<ChoiceOutcome>[] = [
    { weight: 6, item: 'Empty' },
    { weight: 3, item: '+1' },
    { weight: 2, item: '+2' },
    { weight: gameCount, item: 'Game Over' },
  ];

  return [
    { id: 'A', label: selectWeightedRandomOneOf(weightedChoices) },
    { id: 'B', label: selectWeightedRandomOneOf(weightedChoices) },
    { id: 'C', label: selectWeightedRandomOneOf(weightedChoices) },
  ];
};

type ChoiceStates = 'waitingSelection' | 'madeChoice' | 'revealAll';
type ChoiceOutcome = 'Empty' | '+1' | '+2' | 'Game Over';

const ChoiceOutcomeIcons: { [key in ChoiceOutcome]: string } = {
  Empty: '😭',
  '+1': '🙂',
  '+2': '😄',
  'Game Over': '💩',
};

export const SelectSuprise = ({ playerId, onComplete, gameCount }: Props) => {
  const { giveSnakesAndLaddersMoves } = usePlayersProvider();
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
      const selectedChoice = choicesRef.current.find(
        c => c.id === playerChoice.selectedChoiceId
      );
      if (selectedChoice) {
        const choiceOptionOutcome = selectedChoice.label as ChoiceOutcome;

        switch (choiceOptionOutcome) {
          case '+1':
            giveSnakesAndLaddersMoves(playerId, 1, () =>
              setChoiceState('madeChoice')
            );
            break;
          case '+2':
            giveSnakesAndLaddersMoves(playerId, 2, () =>
              setChoiceState('madeChoice')
            );
            break;
          default:
            setChoiceState('madeChoice');
            break;
        }
      }
    }
  }, [playerChoice, choiceState, playerId]);

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
        onComplete(
          !!selectedOutcome &&
            (selectedOutcome.label as ChoiceOutcome) === 'Game Over'
        );
      }, 2000);
    }
  }, [choiceState, playerChoice]);

  return (
    <Container>
      <SubHeading>Choose your prize</SubHeading>
      <ChoiceList>
        {playerChoice &&
          playerChoice.choices.map(c => {
            const revealItem =
              choiceState === 'revealAll' ||
              (choiceState === 'madeChoice' &&
                playerChoice.selectedChoiceId === c.id);
            return (
              <ChoiceItem
                key={c.id}
                selected={playerChoice.selectedChoiceId === c.id}
              >
                <ChoiceItemIcon>
                  {revealItem
                    ? ChoiceOutcomeIcons[c.label as ChoiceOutcome]
                    : '🎁'}
                </ChoiceItemIcon>
                <ChoiceItemLabel>
                  {revealItem ? c.label : <span>&nbsp;</span>}
                </ChoiceItemLabel>
              </ChoiceItem>
            );
          })}
      </ChoiceList>
    </Container>
  );
};
