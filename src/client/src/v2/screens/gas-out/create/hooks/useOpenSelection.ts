import { useMemo } from 'react';
import { usePlayerChoiceProvider } from '../../../../providers/PlayerChoiceProvider';
import {
  Player,
  usePlayersProvider,
} from '../../../../providers/PlayersProvider';

type UseMobSelection = {
  joinedPlayers: Player[];
  sendInvites: () => void;
  cleanup: () => void;
};

export const JOINED_CHOICE_ID = 'join-gas-out';

export const useOpenPlayerSelection = (): UseMobSelection => {
  const {
    allPlayerChoices,
    createChoice,
    deletePlayerChoice,
  } = usePlayerChoiceProvider();
  const { allPlayers } = usePlayersProvider();

  const joinedPlayers = useMemo<Player[]>(() => {
    if (!allPlayerChoices) {
      return [];
    }
    const acceptedPlayersIds = Array.from(
      new Set(
        allPlayerChoices
          .filter(choice => choice.selectedChoiceId === JOINED_CHOICE_ID)
          .map(choice => choice.playerId)
      )
    );

    return acceptedPlayersIds.map(
      playerId => allPlayers.find(p => p.id === playerId)!
    );
  }, [allPlayerChoices]);

  const sendInvites = () => {
    allPlayers
      .filter(p => !p.tags.includes('retired'))
      .forEach(player => {
        createChoice({
          playerId: player.id,
          choices: [{ id: JOINED_CHOICE_ID, label: 'JOIN GAME' }],
        });
      });
  };

  const cleanup = () => {
    allPlayers.forEach(p => {
      deletePlayerChoice(p.id);
    });
  };

  return {
    joinedPlayers,
    sendInvites,
    cleanup,
  };
};
