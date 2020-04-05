import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { RouteComponentProps, Link } from '@reach/router';
import { FullPageScreenLayout } from '../../components/layouts/FullPageScreenLayout';
import { usePlayer } from './usePlayer';
import { usePlayerMatchups } from './usePlayerMatchups';
import { useInvitationsProvider } from '../../contexts/InvitationsProvider';
import { PlayerInvitationAcknowledgement } from './components/PlayerInvitationAcknowledgement';

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
    <FullPageScreenLayout
      title="Select Matchup"
      alignTop={true}
      scrollable={true}
    >
      {player && (
        <>
          <p>Player: {player.name}</p>
        </>
      )}
      {playerInvitations && player && (
        <>
          <PlayerInvitationAcknowledgement
            player={player}
            invitations={invitations}
            acceptInvitation={() => {
              acceptInvitation(playerInvitations[0].id, player);
            }}
          />
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
    </FullPageScreenLayout>
  );
};
