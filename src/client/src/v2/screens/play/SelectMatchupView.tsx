import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { RouteComponentProps, Link } from '@reach/router';
import { usePlayer } from './hooks/usePlayer';
import { PlayerInvitationAcknowledgement } from './components/PlayerInvitationAcknowledgement';
import { GameScreen } from '../../components/ui/GameScreen';
import { MainHeading } from '../../../uplift/components/Heading';
import { useInvitationsProvider } from '../../providers/InvitationsProvider';

type Props = {
  playerId: string;
} & RouteComponentProps;

export const SelectMatchupView = ({ playerId, navigate }: Props) => {
  const { invitations, acceptInvitation } = useInvitationsProvider();
  const player = usePlayer(playerId);
  //const playerMatchups = usePlayerMatchups(playerId);

  const [playerInvitations, setPlayerInvitations] = useState(
    invitations &&
      player &&
      invitations.filter(i =>
        i.playerInvitations.find(pi => pi.player.id === player.id)
      )
  );

  useEffect(() => {
    console.log('invitations', player, invitations);

    if (!(player && invitations)) {
      return;
    }
    setPlayerInvitations(
      invitations.filter(i =>
        i.playerInvitations.find(pi => pi.player.id === player.id)
      )
    );
  }, [player, invitations]);

  useEffect(() => {
    if (!playerInvitations) {
      return;
    }

    const readyInvitation = playerInvitations.find(i => !!i.matchupId);
    if (readyInvitation) {
      navigate && navigate(`matchup/${readyInvitation.matchupId}`);
    }
  }, [playerInvitations]);

  return (
    <GameScreen scrollable={true} showGameSettings={false}>
      {playerInvitations && player && (
        <>
          <h3 style={{ textAlign: 'center' }}>{player.name}</h3>
          <div>
            <PlayerInvitationAcknowledgement
              player={player}
              invitations={invitations}
              acceptInvitation={() => {
                acceptInvitation(playerInvitations[0].id, player);
              }}
            />
          </div>
        </>
      )}
      {/* {playerMatchups && (
        <>
          <p>Matchups</p>
          {playerMatchups.map(pmu => (
            <div key={pmu.id}>
              <Link to={`matchup/${pmu.id}`}>{pmu.id}</Link>
            </div>
          ))}
        </>
      )} */}
    </GameScreen>
  );
};
