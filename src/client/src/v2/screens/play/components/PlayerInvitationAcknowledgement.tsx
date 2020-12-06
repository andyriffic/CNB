import React from 'react';
import { RainbowText } from '../../../../uplift/components/RainbowText';
import { Button } from '../../../components/ui/buttons';
import { Invitation } from '../../../providers/InvitationsProvider';
import { Player } from '../../../providers/PlayersProvider';

export const PlayerInvitationAcknowledgement = ({
  invitations,
  player,
  acceptInvitation,
}: {
  invitations?: Invitation[];
  player: Player;
  acceptInvitation: (invitation: Invitation) => void;
}) => {
  if (!(invitations && invitations.length)) {
    return null;
  }

  const playerInvitations = invitations.filter(i =>
    i.playerInvitations.find(pi => pi.player.id === player.id)
  );

  if (!playerInvitations.length) {
    return null;
  }
  return (
    <div style={{ fontSize: '1.2rem', textAlign: 'center' }}>
      {playerInvitations.map(invite => {
        const playerInvitation = invite.playerInvitations.find(
          pi => pi.player.id === player.id
        );
        if (!playerInvitation) {
          return null;
        }

        return (
          <div key={invite.id}>
            {playerInvitation.status === 'ACCEPTED' ? (
              <RainbowText>
                <p style={{ fontSize: '2rem' }}>Waiting for your opponent</p>
              </RainbowText>
            ) : (
              <div style={{ marginBottom: '20px' }}>
                <Button onClick={() => acceptInvitation(invite)}>
                  Play: <strong>{invite.quickReferenceId}</strong>
                </Button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
