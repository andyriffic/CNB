import { Player } from '../player/types';

export enum InvitationStatus {
  WAITING = 0,
  READY = 1,
}

export enum PlayerInvitationStatus {
  WAITING = 0,
  ACCEPTED = 1,
}

export type PlayerInvitation = {
  player: Player;
  status: PlayerInvitationStatus;
};

export type Invitation = {
  id: string;
  playerInvitations: [PlayerInvitation, PlayerInvitation];
};

export const createInvitation = (
  id: string,
  players: [Player, Player]
): Invitation => {
  return {
    id,
    playerInvitations: [
      { player: players[0], status: PlayerInvitationStatus.WAITING },
      { player: players[1], status: PlayerInvitationStatus.WAITING },
    ],
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
        i => i.player.id !== existingPlayer.id
      )!,
      { player: newPlayer, status: PlayerInvitationStatus.WAITING },
    ],
  };
};

export const getInvitationStatus = (
  invitation: Invitation
): InvitationStatus => {
  return invitation.playerInvitations.some(
    pi => pi.status === PlayerInvitationStatus.WAITING
  )
    ? InvitationStatus.WAITING
    : InvitationStatus.READY;
};

export const acceptPlayerInvitation = (
  invitation: Invitation,
  player: Player
): Invitation => {
  return {
    ...invitation,
    playerInvitations: [
      invitation.playerInvitations.find(i => i.player.id !== player.id)!,
      { player, status: PlayerInvitationStatus.ACCEPTED },
    ],
  };
};
