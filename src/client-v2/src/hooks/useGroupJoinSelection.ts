import { useCallback, useMemo, useState } from 'react';
import { usePlayerChoice } from '../contexts/PlayerChoiceContext';
import { usePlayers } from '../contexts/PlayersContext';
import { Player } from '../types/Player';

type Status = '' | 'invitations-sent';

type UseMobSelection = {
  joinedPlayers: Player[];
  sendInvites: () => void;
  cleanup: () => void;
  status: Status;
};

export function useGroupJoinSelection(
  label: string,
  choiceId: string
): UseMobSelection {
  const { allPlayerChoices, createChoice, deletePlayerChoice } =
    usePlayerChoice();
  const { activePlayers } = usePlayers();

  const joinedPlayers = useMemo<Player[]>(() => {
    if (!allPlayerChoices) {
      return [];
    }
    const acceptedPlayersIds = Array.from(
      new Set(
        allPlayerChoices
          .filter((choice) => choice.selectedChoiceId === choiceId)
          .map((choice) => choice.playerId)
      )
    );

    return acceptedPlayersIds.map(
      (playerId) => activePlayers.find((p) => p.id === playerId)!
    );
  }, [allPlayerChoices, activePlayers, choiceId]);

  const status = useMemo<Status>(() => {
    if (allPlayerChoices?.length) {
      return 'invitations-sent';
    }

    return '';
  }, [allPlayerChoices]);

  // const [status, setStatus] = useState<Status>(
  //   joinedPlayers.length ? 'invitations-sent' : ''
  // );

  const sendInvites = useCallback(() => {
    activePlayers.forEach((player) => {
      createChoice({
        playerId: player.id,
        choices: [{ id: choiceId, label }],
      });
    });
  }, [activePlayers, choiceId, createChoice, label]);

  const cleanup = useCallback(() => {
    activePlayers.forEach((p) => {
      deletePlayerChoice(p.id);
    });
  }, [activePlayers, deletePlayerChoice]);

  // useEffect(() => {
  //   console.log('useGroupJoinSelection cleanup');

  //   return cleanup;
  // }, [cleanup]);

  return {
    joinedPlayers,
    sendInvites,
    cleanup,
    status,
  };
}
