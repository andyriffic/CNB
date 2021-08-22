import React, { useContext, useState, useEffect } from 'react';
import { useMemo } from 'react';
import { useRef } from 'react';
import styled from 'styled-components';
import { selectRandomOneOf } from '../../../../uplift/utils/random';
import { SubHeading } from '../../../components/ui/Atoms';
import { usePlayerChoiceProvider } from '../../../providers/PlayerChoiceProvider';
import { Player } from '../../../providers/PlayersProvider';
import { useSoundProvider } from '../../../providers/SoundProvider';

const Container = styled.div`
  border: 5px solid ${({ theme }) => theme.color.border01};
  border-radius: 10px;
  background-color: #ccc;
  position: absolute;
  width: 50vw;
  top: 10vh;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${({ theme }) => theme.color.background03};
  z-index: 1;
  padding: 20px;
  box-shadow: 6px 2px 17px 0px rgba(0, 0, 0, 0.35);
`;

const Emoji = styled.div<{ selected: boolean }>`
  font-size: 3rem;
  padding: 8px;
  background-color: ${({ theme, selected }) =>
    selected ? theme.color.background02 : 'transparent'};
  border-radius: 10px;
`;

const ChoiceList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: 20px;
  justify-items: center;
  align-items: center;
  margin-top: 30px;
`;

const ChoiceItem = styled.div``;
const PlayerName = styled.div`
  text-align: center;
  text-transform: uppercase;
  font-size: ${({ theme }) => theme.fontSize.extraSmall};
  margin-top: 10px;
`;

enum ChoiceState {
  Intro = 0,
  ShowingChoice = 1,
  PlayerSelectedChoice = 2,
  RevealChoices = 3,
  ApplyResult = 4,
}

type Props = {
  playersAtEnd: Player[];
  onComplete: (result: {
    winningPlayers: Player[];
    losingPlayers: Player[];
  }) => void;
};

const TOTAL_BARRELS = 6;
const BARREL_CHOICE_TAG = 'donkey-barrel-choice';

const renderChoices = (
  cherryIndex: number,
  selectedItems: number[],
  reveal: boolean
) => {
  const items = [];

  for (let i = 0; i < TOTAL_BARRELS; i++) {
    if (reveal && i === cherryIndex) {
      items.push(<Emoji selected={selectedItems.includes(i)}>🍒</Emoji>);
    } else {
      items.push(<Emoji selected={selectedItems.includes(i)}>🛢</Emoji>);
    }
  }

  return items;
};

export const WinnerDonkeyChoice = ({ playersAtEnd, onComplete }: Props) => {
  const [choiceState, setChoiceState] = useState(ChoiceState.Intro);
  const cherryIndex = useRef(Math.floor(Math.random() * TOTAL_BARRELS));
  const {
    createChoice,
    deletePlayerChoice,
    allPlayerChoices,
  } = usePlayerChoiceProvider();
  const { play } = useSoundProvider();

  console.log('CHERRY BARREL', cherryIndex);

  const answeredChoices = useMemo(() => {
    if (!allPlayerChoices) {
      return [];
    }

    const allBarrelChoices = allPlayerChoices.filter(
      c => c.tag === BARREL_CHOICE_TAG
    );
    return allBarrelChoices.filter(c => !!c.selectedChoiceId);
  }, [allPlayerChoices]);

  const allChoicesSelected = useMemo<boolean>(() => {
    return answeredChoices.length === playersAtEnd.length;
  }, [answeredChoices, playersAtEnd]);

  const selectedBarrels = useMemo<number[]>(() => {
    return answeredChoices.map(c => parseInt(c.selectedChoiceId!));
  }, [answeredChoices]);

  useEffect(() => {
    if (allChoicesSelected) {
      setTimeout(() => {
        setChoiceState(ChoiceState.RevealChoices);
      }, 2000);
    }
  }, [allChoicesSelected]);

  useEffect(() => {
    if (choiceState === ChoiceState.RevealChoices) {
      const result = {
        winningPlayers: answeredChoices
          .filter(c => c.selectedChoiceId === cherryIndex.current.toString())
          .map(c => playersAtEnd.find(p => c.playerId === p.id)!),
        losingPlayers: answeredChoices
          .filter(c => c.selectedChoiceId !== cherryIndex.current.toString())
          .map(c => playersAtEnd.find(p => c.playerId === p.id)!),
      };

      if (result.winningPlayers.length === 1) {
        play('SelectPrizePoints');
      } else if (result.winningPlayers.length > 1) {
        play('Draw');
      } else {
        play('SelectPrizeEmpty');
      }

      setTimeout(() => {
        onComplete(result);
      }, 2000);
    }
  }, [choiceState, answeredChoices]);

  useEffect(() => {
    const barrelChoices = [...Array(TOTAL_BARRELS)].map((_, i) => i);
    playersAtEnd.forEach(player => {
      createChoice({
        playerId: player.id,
        tag: BARREL_CHOICE_TAG,
        choices: barrelChoices.map(i => ({
          id: i.toString(),
          label: '🛢',
        })),
      });
    });

    return () => {
      console.log('DELETING PLAYER CHOICE');

      playersAtEnd.forEach(p => deletePlayerChoice(p.id));
    };
  }, []);

  return (
    <Container>
      <SubHeading>Find the Cherry!</SubHeading>
      <ChoiceList>
        {renderChoices(
          cherryIndex.current,
          selectedBarrels,
          allChoicesSelected && choiceState >= ChoiceState.RevealChoices
        ).map((item, index) => (
          <ChoiceItem key={index}>
            {item}
            {answeredChoices.map(ac =>
              parseInt(ac.selectedChoiceId!) === index ? (
                <PlayerName key={ac.playerId}>{ac.playerId}</PlayerName>
              ) : null
            )}
          </ChoiceItem>
        ))}
      </ChoiceList>
    </Container>
  );
};
