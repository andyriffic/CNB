import { useEffect, useState } from 'react';
import {
  Invitation,
  useInvitationsProvider,
} from '../../../../uplift/contexts/InvitationsProvider';
import { UseSelectedPlayerState } from './useSelectedPlayerState';

export type UsePlayerStateWithInvitation = {
  invitation: Invitation | undefined;
  switchPlayer: [() => void, () => void];
  playerConfirmed: [boolean, boolean];
  bothPlayersReady: boolean;
};

export const usePlayerStateWithInvitation = ({
  players,
  nextPlayer,
}: UseSelectedPlayerState): UsePlayerStateWithInvitation => {
  const {
    createInvitation,
    invitations,
    replacePlayerOnInvitation,
  } = useInvitationsProvider();
  const [currentInvitation, setCurrentInvitation] = useState<
    Invitation | undefined
  >(undefined);

  // Create invitation
  useEffect(() => {
    if (currentInvitation) {
      return;
    }
    if (players.every(p => !!p)) {
      createInvitation([players[0]!, players[1]!], (invitation: Invitation) => {
        setCurrentInvitation(invitation);
      });
    }
  }, [players, currentInvitation]);

  // Keep invitation up-to-date
  useEffect(() => {
    if (!currentInvitation) {
      return;
    }
    const updatedInvitation =
      invitations && invitations.find(i => i.id === currentInvitation.id);
    if (updatedInvitation) {
      setCurrentInvitation(updatedInvitation);
    }
  }, [invitations, currentInvitation]);

  const getPlayerConfirmed = (index: 0 | 1): boolean => {
    const playerInvitation =
      currentInvitation &&
      currentInvitation.playerInvitations.find(
        p => p.player.id === players[index]!.id
      );
    return !!playerInvitation && playerInvitation.status === 'ACCEPTED';
  };

  return {
    invitation: currentInvitation,
    switchPlayer: [
      () => {
        const player = nextPlayer[0]();
        replacePlayerOnInvitation(
          currentInvitation!.id,
          players[0]!,
          player!,
          () => console.log('replaced player 1')
        );
      },
      () => {
        const player = nextPlayer[1]();
        replacePlayerOnInvitation(
          currentInvitation!.id,
          players[1]!,
          player!,
          () => console.log('replaced player 2')
        );
      },
    ],
    playerConfirmed: [getPlayerConfirmed(0), getPlayerConfirmed(1)],
    bothPlayersReady:
      !!currentInvitation &&
      currentInvitation.playerInvitations.every(p => p.status === 'ACCEPTED'),
  };
};
