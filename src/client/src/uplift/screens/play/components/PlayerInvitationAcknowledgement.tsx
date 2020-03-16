import React from 'react';
import {
  PlayerInvitation,
  Invitation,
} from '../../../contexts/InvitationsProvider';
import { Player } from '../../../contexts/PlayersProvider';
import { PrimaryButton } from '../../../components/PrimaryButton';

export const PlayerInvitationAcknowledgement = ({
  invitations,
  player,
  acceptInvitation,
}: {
  invitations?: Invitation[];
  player: Player;
  acceptInvitation: () => void;
}) => {
  if (!(invitations && invitations.length)) {
    return null;
  }

  const playerInvitation = invitations[0].playerInvitations.find(
    pi => pi.player.id === player.id
  );

  if (!playerInvitation) {
    return null;
  }
  return (
    <div style={{ fontSize: '1.2rem', textAlign: 'center' }}>
      {playerInvitation.status}
      <PrimaryButton onClick={acceptInvitation}>JOIN</PrimaryButton>
    </div>
  );
};
