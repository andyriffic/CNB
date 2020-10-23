import React from 'react';
import {
  Invitation,
  useInvitationsProvider,
} from '../../../providers/InvitationsProvider';
import { Player } from '../../../providers/PlayersProvider';

type Props = {
  player: Player;
  invitationId: string;
};

const DebugPlayer = ({ player, invitationId }: Props) => {
  const { acceptInvitation } = useInvitationsProvider();
  return (
    <div>
      <div>{player.name}</div>
      <button
        onClick={() => {
          acceptInvitation(invitationId, player);
        }}
      >
        Join
      </button>
    </div>
  );
};

export const DebugJoinPlayers = ({
  invitation,
}: {
  invitation: Invitation;
}) => {
  return (
    <div style={{ display: 'flex' }}>
      {invitation.playerInvitations.map(pi => (
        <DebugPlayer
          key={pi.player.id}
          invitationId={invitation.id}
          player={pi.player}
        />
      ))}
    </div>
  );
};
