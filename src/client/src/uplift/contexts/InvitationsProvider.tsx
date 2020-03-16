import React, { useState, useEffect, ReactNode } from 'react';
import socketIOClient from 'socket.io-client';
import { SOCKETS_ENDPOINT } from '../../environment';
import { Player } from './PlayersProvider';

enum INVITATION_EVENTS {
  SUBSCRIBE_TO_INVITATIONS = 'SUBSCRIBE_TO_INVITATIONS',
  CREATE_INVITATION = 'CREATE_INVITATION',
  ACCEPT_INVITATION = 'ACCEPT_INVITATION',
  INVITATIONS_UPDATE = 'INVITATIONS_UPDATE',
  USE_INVITATION = 'USE_INVITATION',
}

export type PlayerInvitation = {
  player: Player;
  status: 'WAITING' | 'ACCEPTED';
};

export type Invitation = {
  id: string;
  playerInvitations: [PlayerInvitation, PlayerInvitation];
};

export type InvitationsService = {
  invitations: Invitation[] | undefined;
  createInvitation: (
    players: [Player, Player],
    onCreated: (invitation: Invitation) => void
  ) => void;
  acceptInvitation: (invitationId: string, player: Player) => void;
  useInvitation: (invitationId: string, onComplete: () => void) => void;
};

export const InvitationsContext = React.createContext<
  InvitationsService | undefined
>(undefined);

const socket = socketIOClient(`${SOCKETS_ENDPOINT}/invitations`);

export const InvitationsProvider = ({ children }: { children: ReactNode }) => {
  const [_invitations, setInvitations] = useState<Invitation[] | undefined>();

  useEffect(() => {
    socket.on(
      INVITATION_EVENTS.INVITATIONS_UPDATE,
      (invitations: Invitation[]) => {
        console.log('Invitations', invitations);
        setInvitations(invitations);
      }
    );
    socket.emit(INVITATION_EVENTS.SUBSCRIBE_TO_INVITATIONS);
  }, []);

  return (
    <InvitationsContext.Provider
      value={{
        invitations: _invitations,
        createInvitation: (players, onCreated) => {
          socket.emit(INVITATION_EVENTS.CREATE_INVITATION, players, onCreated);
        },
        acceptInvitation: (invitationId, player) => {
          socket.emit(
            INVITATION_EVENTS.ACCEPT_INVITATION,
            invitationId,
            player
          );
        },
        useInvitation: (invitationId, onComplete) => {
          socket.emit(
            INVITATION_EVENTS.USE_INVITATION,
            invitationId,
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
