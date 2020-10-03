import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { RouteComponentProps } from '@reach/router';
import { Player, PlayersContext } from '../../contexts/PlayersProvider';
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
import { SOUND_KEYS } from '../../../sounds/SoundService';
import { SplashText } from '../../components/SplashText';
import { getPlayerAttributeValue } from '../../utils/player';
import { isFeatureEnabled } from '../../../featureToggle';

const MatchupsContainer = styled.div`
  width: 1200px;
  margin: 0 auto;
`;

const JungleBackground = styled.div`
  background-image: url(${JungleBackgroundImg});
  background-size: 100% 100%;
  height: 100vh;
`;

type ViewState = {
  shownTitle: boolean;
  bothPlayersSelected: boolean;
};

export default ({ navigate }: RouteComponentProps) => {
  const { addInstantMatchup } = useContext(MatchupContext);
  const soundService = useContext<SoundService>(GameSoundContext);
  const [player1, setPlayer1] = useState<Player>();
  const [player2, setPlayer2] = useState<Player>();
  const invitationsContext = useInvitationsProvider();
  const [invitationReady, setInvitationReady] = useState(false);
  const [viewState, setViewState] = useState<ViewState>({
    shownTitle: false,
    bothPlayersSelected: false,
  });
  const { updatePlayer } = useContext(PlayersContext);

  const updateViewState = (updatedViewState: Partial<ViewState>) => {
    setViewState({ ...viewState, ...updatedViewState });
  };

  const v2FeatureEnabled = isFeatureEnabled('v2');
  const spectatorBaseUrl = v2FeatureEnabled ? '/spectator' : '/matchup';
  const gameTheme = v2FeatureEnabled
    ? 'rock-paper-scissors-classic'
    : 'candyland';

  useEffect(() => {
    soundService.load();
  }, []);

  useEffect(() => {
    soundService.play(SOUND_KEYS.PLAYER_SELECT_INTRO);
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
    if (!invitationReady) {
      return;
    }
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
      updateViewState({ bothPlayersSelected: true });
      // invitationsContext.useInvitation(invitation.id, () => {
      //   addInstantMatchup(
      //     player1.id,
      //     player2.id,
      //     2,
      //     'jungle-snakes-and-ladders',
      //     matchupId => {
      //       navigate && navigate(`/matchup/${matchupId}`);
      //     }
      //   );
      // });
    }
  }, [player1, player2, invitationsContext.invitations, invitationReady]);

  return (
    <FullPageScreenLayout title="" alignTop={true}>
      <GameSettingsDrawer />
      <SplashText
        onComplete={() => {
          updateViewState({ shownTitle: true });
          soundService.play(SOUND_KEYS.PLAYER_SELECT_MUSIC);
        }}
      >
        Today's Players...
      </SplashText>

      {viewState.shownTitle && (
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
      )}
      {viewState.bothPlayersSelected && (
        <SplashText
          onComplete={() => {
            soundService.stop(SOUND_KEYS.PLAYER_SELECT_MUSIC);
            updatePlayer(player1!.id, [
              ...player1!.tags.filter(t => !t.startsWith('sl_moves')),
              `sl_moves:${parseInt(
                getPlayerAttributeValue(player1!.tags, 'sl_moves', '0')
              ) + 1}`,
            ]);
            updatePlayer(player2!.id, [
              ...player2!.tags.filter(t => !t.startsWith('sl_moves')),
              `sl_moves:${parseInt(
                getPlayerAttributeValue(player2!.tags, 'sl_moves', '0')
              ) + 1}`,
            ]);

            addInstantMatchup(
              player1!.id,
              player2!.id,
              2,
              gameTheme,
              matchupId => {
                invitationsContext.confirmInvitation(
                  invitationsContext.invitations![0].id,
                  matchupId,
                  () => {
                    navigate && navigate(`${spectatorBaseUrl}/${matchupId}`);
                  }
                );
              }
            );
          }}
        >
          Let's go!
        </SplashText>
      )}
    </FullPageScreenLayout>
  );
};
