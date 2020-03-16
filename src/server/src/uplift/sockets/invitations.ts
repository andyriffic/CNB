import { Socket, Server } from 'socket.io';
import { LOG_NAMESPACE, createLogger } from '../../utils/debug';
import {
  Invitation,
  createInvitation,
  acceptPlayerInvitation,
} from '../services/invitation';
import { Player } from '../services/player/types';
import shortid from 'shortid';

const SUBSCRIBE_TO_INVITATIONS = 'SUBSCRIBE_TO_INVITATIONS';
const INVITATIONS_UPDATE = 'INVITATIONS_UPDATE';
const CREATE_INVITATION = 'CREATE_INVITATION';
const ACCEPT_INVITATION = 'ACCEPT_INVITATION';
const USE_INVITATION = 'USE_INVITATION';

const log = createLogger('invitations', LOG_NAMESPACE.socket);

let invitations: Invitation[] = [];

const init = (socketServer: Server, path: string) => {
  const namespace = socketServer.of(path);

  namespace.on('connection', function(socket: Socket) {
    log('someone connected to invitations', socket.id);

    socket.on(SUBSCRIBE_TO_INVITATIONS, () => {
      socket.emit(INVITATIONS_UPDATE, invitations);
    });

    socket.on(
      CREATE_INVITATION,
      (
        players: [Player, Player],
        confirmation: (invitation: Invitation) => void
      ) => {
        const newInvitation = createInvitation(shortid.generate(), players);
        invitations = [newInvitation];
        namespace.emit(INVITATIONS_UPDATE, invitations);
        confirmation(newInvitation);
      }
    );

    socket.on(ACCEPT_INVITATION, (invitationId: string, player: Player) => {
      const invitation = invitations.find(i => i.id === invitationId);
      if (!invitation) {
        return;
      }
      const updatedInvitation = acceptPlayerInvitation(invitation, player);
      invitations = [
        ...invitations.filter(i => i.id !== invitation.id),
        updatedInvitation,
      ];
      namespace.emit(INVITATIONS_UPDATE, invitations);
    });

    socket.on(
      USE_INVITATION,
      (invitationId: string, onComplete: () => void) => {
        log('Removing invitation', invitationId);
        invitations = invitations.filter(i => i.id !== invitationId);
        namespace.emit(INVITATIONS_UPDATE, invitations);
        onComplete();
      }
    );
  });
};

export default init;
