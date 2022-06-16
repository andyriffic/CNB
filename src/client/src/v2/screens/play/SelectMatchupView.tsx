import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { RouteComponentProps, Link } from '@reach/router';
import { usePlayer } from './hooks/usePlayer';
import { PlayerInvitationAcknowledgement } from './components/PlayerInvitationAcknowledgement';
import { GameScreen } from '../../components/ui/GameScreen';
import { MainHeading } from '../../../uplift/components/Heading';
import { useInvitationsProvider } from '../../providers/InvitationsProvider';
import { SelectBonusChoice } from './components/SelectBonusChoice';
import { DebugBonusChoice } from './components/DebugBonusChoice';
import {
  isFeatureEnabled,
  isPersistantFeatureEnabled,
} from '../../../featureToggle';
import { MobSelectionList } from './components/MobSelectionList';
import { PlayerSettings } from './components/PlayerSettings';
import { GasGameSelectionList } from './components/GasGameSelectionList';
import { usePlayerMatchups } from './hooks/usePlayerMatchups';

type Props = {
  playerId: string;
} & RouteComponentProps;

export const SelectMatchupView = ({ playerId, navigate }: Props) => {
  const { invitations, acceptInvitation } = useInvitationsProvider();
  const player = usePlayer(playerId);
  const playerMatchups = usePlayerMatchups(playerId);

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
          {player && <SelectBonusChoice playerId={playerId} />}
          {player && isPersistantFeatureEnabled('cnb-debug') && (
            <DebugBonusChoice playerId={playerId} />
          )}
          <div>
            <PlayerInvitationAcknowledgement
              player={player}
              invitations={invitations}
              acceptInvitation={invitation => {
                acceptInvitation(invitation.id, player);
              }}
            />
          </div>
        </>
      )}
      <GasGameSelectionList
        playerId={playerId}
        onGameSelected={gameId => navigate && navigate(`gas/${gameId}`)}
      />
      <MobSelectionList
        playerId={playerId}
        onMobSelected={mobGameId => navigate && navigate(`mob/${mobGameId}`)}
      />
      {player && <PlayerSettings player={player} />}
      {playerMatchups && (
        <>
          <p>Matchups</p>
          {playerMatchups.map(pmu => (
            <div key={pmu.id}>
              <Link to={`matchup/${pmu.id}`}>{pmu.id}</Link>
            </div>
          ))}
        </>
      )}
    </GameScreen>
  );
};
