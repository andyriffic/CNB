import React, { useState, useEffect, ReactNode } from 'react';
import socketIOClient from 'socket.io-client';
import { SOCKETS_ENDPOINT } from '../../environment';
import { createSocket } from '../services/sockets';
import { Player } from './PlayersProvider';

enum INVITATION_EVENTS {
  SUBSCRIBE_TO_INVITATIONS = 'SUBSCRIBE_TO_INVITATIONS',
  CREATE_INVITATION = 'CREATE_INVITATION',
  REPLACE_PLAYER_ON_INVITATION = 'REPLACE_PLAYER_ON_INVITATION',
  ACCEPT_INVITATION = 'ACCEPT_INVITATION',
  INVITATIONS_UPDATE = 'INVITATIONS_UPDATE',
  USE_INVITATION = 'USE_INVITATION',
}

export type PlayerInvitation = {
  player: Player;
  status: 'WAITING' | 'ACCEPTED';
  joinedOrder: number;
};

export type Invitation = {
  id: string;
  matchupId?: string;
  playerInvitations: [PlayerInvitation, PlayerInvitation];
};

export type InvitationsService = {
  invitations: Invitation[] | undefined;
  createInvitation: (
    players: [Player, Player],
    onCreated: (invitation: Invitation) => void
  ) => void;
  replacePlayerOnInvitation: (
    invitationId: string,
    existingPlayer: Player,
    newPlayer: Player,
    onComplete: () => void
  ) => void;
  acceptInvitation: (invitationId: string, player: Player) => void;
  confirmInvitation: (
    invitationId: string,
    matchupId: string,
    onComplete: () => void
  ) => void;
};

export const InvitationsContext = React.createContext<
  InvitationsService | undefined
>(undefined);

const socket = createSocket('invitations');

export const InvitationsProvider = ({ children }: { children: ReactNode }) => {
  const [_invitations, setInvitations] = useState<Invitation[] | undefined>();

  useEffect(() => {
    socket.on(
      INVITATION_EVENTS.INVITATIONS_UPDATE,
      (invitations: Invitation[]) => {
        // console.log('Invitations', invitations);
        setInvitations(invitations);
      }
    );
    socket.emit(INVITATION_EVENTS.SUBSCRIBE_TO_INVITATIONS);

    return () => {
      console.log('Invitations', 'DISCONNECT');
      socket.disconnect();
    };
  }, []);

  return (
    <InvitationsContext.Provider
      value={{
        invitations: _invitations,
        createInvitation: (players, onCreated) => {
          socket.emit(INVITATION_EVENTS.CREATE_INVITATION, players, onCreated);
        },
        replacePlayerOnInvitation: (
          invitationId,
          existingPlayer,
          newPlayer,
          onComplete
        ) => {
          socket.emit(
            INVITATION_EVENTS.REPLACE_PLAYER_ON_INVITATION,
            invitationId,
            existingPlayer,
            newPlayer,
            onComplete
          );
        },
        acceptInvitation: (invitationId, player) => {
          socket.emit(
            INVITATION_EVENTS.ACCEPT_INVITATION,
            invitationId,
            player
          );
        },
        confirmInvitation: (invitationId, matchupId, onComplete) => {
          socket.emit(
            INVITATION_EVENTS.USE_INVITATION,
            invitationId,
            matchupId,
            onComplete
          );
        },
      }}
    >
      {children}
    </InvitationsContext.Provider>
  );
};

export function useInvitationsProvider() {
  const context = React.useContext(InvitationsContext);
  if (context === undefined) {
    throw new Error(
      'useInvitationsProvider must be used within a InvitationsProvider'
    );
  }
  return context;
}
