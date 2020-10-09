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
      {playerInvitation.status === 'ACCEPTED' ? (
        <>
          <RainbowText>
            <p style={{ fontSize: '2rem' }}>Waiting for your opponent</p>
          </RainbowText>
        </>
      ) : (
        <Button onClick={acceptInvitation}>Play</Button>
      )}
    </div>
  );
};
