import { Player } from '../player/types';

export enum InvitationStatus {
  WAITING = 'WAITING',
  READY = 'READY',
}

export enum PlayerInvitationStatus {
  WAITING = 'WAITING',
  ACCEPTED = 'ACCEPTED',
}

export type PlayerInvitation = {
  player: Player;
  status: PlayerInvitationStatus;
  joinedOrder: number;
};

export type Invitation = {
  id: string;
  quickReferenceId: string;
  matchupId?: string;
  playerInvitations: [PlayerInvitation, PlayerInvitation];
};

export const createInvitation = (
  id: string,
  quickReferenceId: string,
  players: [Player, Player]
): Invitation => {
  return {
    id,
    quickReferenceId,
    playerInvitations: [
      {
        player: players[0],
        status: PlayerInvitationStatus.WAITING,
        joinedOrder: 0,
      },
      {
        player: players[1],
        status: PlayerInvitationStatus.WAITING,
        joinedOrder: 0,
      },
    ],
  };
};

export const useInvitation = (invitation: Invitation, matchupId: string) => {
  return {
    ...invitation,
    matchupId,
  };
};

export const replacePlayerInvitation = (
  invitation: Invitation,
  existingPlayer: Player,
  newPlayer: Player
): Invitation => {
  return {
    ...invitation,
    playerInvitations: [
      invitation.playerInvitations.find(
        (i) => i.player.id !== existingPlayer.id
      )!,
      {
        player: newPlayer,
        status: PlayerInvitationStatus.WAITING,
        joinedOrder: 0,
      },
    ],
  };
};

export const getInvitationStatus = (
  invitation: Invitation
): InvitationStatus => {
  return invitation.playerInvitations.some(
    (pi) => pi.status === PlayerInvitationStatus.WAITING
  )
    ? InvitationStatus.WAITING
    : InvitationStatus.READY;
};

export const acceptPlayerInvitation = (
  invitation: Invitation,
  player: Player
): Invitation => {
  const otherInvitationsAlreadyAccepted = invitation.playerInvitations
    .filter((pi) => pi.player.id !== player.id)
    .filter((pi) => pi.status === PlayerInvitationStatus.ACCEPTED);

  const joinedOrder = otherInvitationsAlreadyAccepted.length + 1;

  return {
    ...invitation,
    playerInvitations: [
      invitation.playerInvitations.find((i) => i.player.id !== player.id)!,
      {
        player,
        status: PlayerInvitationStatus.ACCEPTED,
        joinedOrder,
      },
    ],
  };
};
