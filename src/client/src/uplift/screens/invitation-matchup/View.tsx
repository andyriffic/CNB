import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { RouteComponentProps } from '@reach/router';
import { PlayersProvider, Player } from '../../contexts/PlayersProvider';
import { FullPageScreenLayout } from '../../components/layouts/FullPageScreenLayout';
import { MatchupContext } from '../../contexts/MatchupProvider';
import { RandomPlayers } from './RandomPlayers';
import { GameSettingsDrawer } from '../../../game-settings';
import { SoundService } from '../../contexts/types';
import GameSoundContext from '../../../contexts/GameSoundContext';
import { PrimaryButton } from '../../components/PrimaryButton';
import { MainHeading } from '../../components/Heading';
import JungleBackgroundImg from '../../../images/jungle.jpg';
import {
  useInvitationsProvider,
  Invitation,
} from '../../contexts/InvitationsProvider';

const MatchupsContainer = styled.div`
  width: 1200px;
  margin: 0 auto;
  display: flex;
`;

const JungleBackground = styled.div`
  background-image: url(${JungleBackgroundImg});
  background-size: 100% 100%;
  height: 100vh;
`;

export default ({ navigate }: RouteComponentProps) => {
  const { addInstantMatchup } = useContext(MatchupContext);
  const soundService = useContext<SoundService>(GameSoundContext);
  const [player1, setPlayer1] = useState<Player>();
  const [player2, setPlayer2] = useState<Player>();
  const invitationsContext = useInvitationsProvider();
  const [invitationReady, setInvitationReady] = useState(false);

  useEffect(() => {
    soundService.load();
  }, []);

  useEffect(() => {
    if (!!(player1 && player2)) {
      invitationsContext.createInvitation([player1, player2], _invitation => {
        console.log('INVITATION CREATED', _invitation);
        setInvitationReady(true);
      });
    }
  }, [player1, player2]);

  useEffect(() => {
    if (!(player1 && player2)) {
      return;
    }
    if (
      !(invitationsContext.invitations && invitationsContext.invitations.length)
    ) {
      return;
    }

    const invitation = invitationsContext.invitations[0];

    const acceptedInvitations = invitation.playerInvitations.filter(
      pi => pi.status === 'ACCEPTED'
    );

    if (acceptedInvitations.length === 2) {
      invitationsContext.useInvitation(invitation.id, () => {
        addInstantMatchup(
          player1.id,
          player2.id,
          2,
          'jungle-snakes-and-ladders',
          matchupId => {
            navigate && navigate(`/matchup/${matchupId}`);
          }
        );
      });
    }
  }, [player1, player2, invitationsContext.invitations]);

  return (
    <PlayersProvider>
      <FullPageScreenLayout title="" alignTop={true}>
        <GameSettingsDrawer />
        <MainHeading>Select your players</MainHeading>
        <MatchupsContainer className="margins-off">
          <RandomPlayers
            player1={player1}
            setPlayer1={setPlayer1}
            player2={player2}
            setPlayer2={setPlayer2}
            invitation={
              (invitationReady ? true : undefined) &&
              invitationsContext.invitations &&
              invitationsContext.invitations[0]
            }
          />
        </MatchupsContainer>
      </FullPageScreenLayout>
    </PlayersProvider>
  );
};
