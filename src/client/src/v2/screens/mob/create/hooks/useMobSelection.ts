import { useEffect, useState } from 'react';
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

export const MOB_JOINED_CHOICE_ID = 'join-mob';

export const useMobSelection = (): UseMobSelection => {
  const {
    allPlayerChoices,
    createChoice,
    deletePlayerChoice,
  } = usePlayerChoiceProvider();
  const { allPlayers } = usePlayersProvider();
  const [joinedPlayers, setJoinedPlayers] = useState<Player[]>([]);

  useEffect(() => {
    if (!allPlayerChoices) {
      return;
    }
    const acceptedPlayersIds = Array.from(
      new Set(
        allPlayerChoices
          .filter(choice => choice.selectedChoiceId === MOB_JOINED_CHOICE_ID)
          .map(choice => choice.playerId)
      )
    );

    setJoinedPlayers(
      acceptedPlayersIds.map(
        playerId => allPlayers.find(p => p.id === playerId)!
      )
    );
  }, [allPlayerChoices]);

  const sendInvites = () => {
    allPlayers
      .filter(p => !p.tags.includes('retired'))
      .forEach(player => {
        createChoice({
          playerId: player.id,
          choices: [{ id: MOB_JOINED_CHOICE_ID, label: 'JOIN MOB' }],
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
