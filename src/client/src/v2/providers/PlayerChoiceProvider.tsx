import React, { useState, useEffect, ReactNode } from 'react';
import socketIOClient from 'socket.io-client';
import { SOCKETS_ENDPOINT } from '../../environment';
import { createSocket } from '../services/sockets';

enum PLAYER_CHOICE_EVENTS {
  SUBSCRIBE_TO_ALL_CHOICES = 'SUBSCRIBE_TO_ALL_CHOICES',
  INITIATE_CHOICE = 'INITIATE_CHOICE',
  SELECT_CHOICE = 'SELECT_CHOICE',
  PLAYER_CHOICE_UPDATE = 'PLAYER_CHOICE_UPDATE',
}

type Choice = {
  id: string;
  label: string;
};

type InitiatePlayerChoice = {
  playerId: string;
  choices: Choice[];
};

type CreatedPlayerChoice = {
  id: string;
  selectedChoiceId: string | undefined;
} & InitiatePlayerChoice;

export type PlayerChoiceService = {
  allPlayerChoices: CreatedPlayerChoice[] | undefined;
  createChoice: (initiateChoice: InitiatePlayerChoice) => void;
  selectChoice: (choiceId: string, selectionId: string) => void;
};

const PlayerChoiceContext = React.createContext<
  PlayerChoiceService | undefined
>(undefined);

const socket = createSocket('player-choice');

export const PlayerChoiceProvider = ({ children }: { children: ReactNode }) => {
  const [allChoices, setAllChoices] = useState<
    CreatedPlayerChoice[] | undefined
  >();

  useEffect(() => {
    socket.on(
      PLAYER_CHOICE_EVENTS.PLAYER_CHOICE_UPDATE,
      (choices: CreatedPlayerChoice[]) => {
        console.log('Player choices', choices);
        setAllChoices(choices);
      }
    );
    socket.emit(PLAYER_CHOICE_EVENTS.SUBSCRIBE_TO_ALL_CHOICES);

    return () => {
      console.log('player-choice', 'DISCONNECT');
      socket.disconnect();
    };
  }, []);

  return (
    <PlayerChoiceContext.Provider
      value={{
        allPlayerChoices: allChoices,
        createChoice: (initiateChoice: InitiatePlayerChoice) => {
          socket.emit(PLAYER_CHOICE_EVENTS.INITIATE_CHOICE, initiateChoice);
        },
        selectChoice: (choiceId: string, selectionId: string) => {
          socket.emit(
            PLAYER_CHOICE_EVENTS.SELECT_CHOICE,
            choiceId,
            selectionId
          );
        },
      }}
    >
      {children}
    </PlayerChoiceContext.Provider>
  );
};

export function usePlayerChoiceProvider() {
  const context = React.useContext(PlayerChoiceContext);
  if (context === undefined) {
    throw new Error(
      'usePlayerChoiceProvider must be used within a PlayerChoiceProvider'
    );
  }
  return context;
}

const unselectedPlayerChoice = (
  choices: CreatedPlayerChoice[],
  playerId: string
): CreatedPlayerChoice | undefined => {
  const playerUnselectedChoices = choices
    .filter(c => c.playerId === playerId)
    .filter(c => !c.selectedChoiceId);

  return playerUnselectedChoices[0];
};

export function usePlayerChoiceForPlayer(playerId: string) {
  const { allPlayerChoices } = usePlayerChoiceProvider();
  const [playersChoice, setPlayersChoice] = useState<
    CreatedPlayerChoice | undefined
  >(allPlayerChoices && unselectedPlayerChoice(allPlayerChoices, playerId));

  useEffect(() => {
    if (!allPlayerChoices) {
      return;
    }
    setPlayersChoice(unselectedPlayerChoice(allPlayerChoices, playerId));
  }, [allPlayerChoices]);

  return playersChoice;
}
