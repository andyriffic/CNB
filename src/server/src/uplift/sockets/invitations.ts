import { Socket, Server } from 'socket.io';
import { LOG_NAMESPACE, createLogger } from '../../utils/debug';
import {
  Invitation,
  createInvitation,
  acceptPlayerInvitation,
  replacePlayerInvitation,
  useInvitation,
} from '../services/invitation';
import { Player } from '../services/player/types';
import shortid from 'shortid';
import { customAlphabet } from 'nanoid';

const SUBSCRIBE_TO_INVITATIONS = 'SUBSCRIBE_TO_INVITATIONS';
const INVITATIONS_UPDATE = 'INVITATIONS_UPDATE';
const CREATE_INVITATION = 'CREATE_INVITATION';
const REPLACE_PLAYER_ON_INVITATION = 'REPLACE_PLAYER_ON_INVITATION';
const ACCEPT_INVITATION = 'ACCEPT_INVITATION';
const USE_INVITATION = 'USE_INVITATION';

const log = createLogger('invitations', LOG_NAMESPACE.socket);

let invitations: Invitation[] = [];

const invitationQuickReferenceIdGenerator = customAlphabet(
  'BCDFGHJKLMNPQRSTVWXZ',
  4
);

const init = (socketServer: Server, path: string) => {
  const namespace = socketServer.of(path);

  namespace.on('connection', function (socket: Socket) {
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
        const newInvitation = createInvitation(
          shortid.generate(),
          invitationQuickReferenceIdGenerator(),
          players
        );
        log('Created invitation', newInvitation);
        invitations = [...invitations, newInvitation];
        namespace.emit(INVITATIONS_UPDATE, invitations);
        confirmation(newInvitation);
      }
    );

    socket.on(
      REPLACE_PLAYER_ON_INVITATION,
      (
        invitationId: string,
        existingPlayer: Player,
        newPlayer: Player,
        confirmation: () => void
      ) => {
        const invitation = invitations.find((i) => i.id === invitationId);
        if (!invitation) {
          log('Invitation not found', invitationId);
          return;
        }
        const newInvitation = replacePlayerInvitation(
          invitation,
          existingPlayer,
          newPlayer
        );
        invitations = [
          ...invitations.filter((i) => i.id !== invitationId),
          newInvitation,
        ];
        namespace.emit(INVITATIONS_UPDATE, invitations);
        confirmation();
      }
    );

    socket.on(ACCEPT_INVITATION, (invitationId: string, player: Player) => {
      const invitation = invitations.find((i) => i.id === invitationId);
      if (!invitation) {
        return;
      }
      const updatedInvitation = acceptPlayerInvitation(invitation, player);
      invitations = [
        ...invitations.filter((i) => i.id !== invitation.id),
        updatedInvitation,
      ];
      namespace.emit(INVITATIONS_UPDATE, invitations);
    });

    socket.on(
      USE_INVITATION,
      (invitationId: string, matchupId: string, onComplete: () => void) => {
        log('using invitation', invitationId, matchupId);
        const invitation = invitations.find((i) => i.id === invitationId);
        if (!invitation) {
          log('invitation does not exist', invitationId);
          return;
        }

        const updatedInvitation = useInvitation(invitation, matchupId);

        invitations = [updatedInvitation]; //Getting rid of all other invitations (could revisit this later)
        namespace.emit(INVITATIONS_UPDATE, invitations);
        onComplete();
      }
    );
  });
};

export default init;
