import React, { useEffect, useState, useContext } from 'react';
import styled, { css } from 'styled-components';
import { Player } from '../../contexts/PlayersProvider';
import {
  fadeInDownAnimation,
  fadeOutDownAnimation,
  shakeAnimationLeft,
  jackInTheBoxAnimation,
  fadeInAnimation,
} from '../../components/animations';
import {
  PlayerAvatar,
  PlayerAvatarPosition,
} from '../../components/PlayerAvatar';
import { SoundService, SOUND_KEYS } from '../../../sounds/SoundService';
import GameSoundContext from '../../../contexts/GameSoundContext';
import { SecondaryButton } from '../../components/SecondaryButton';
import { PlayerInvitation } from '../../contexts/InvitationsProvider';
import { useDoOnce } from '../../hooks/useDoOnce';
import { StatusIndicator, STATUS_TYPE } from './StatusIndicator';
import { RainbowText } from '../../components/RainbowText';

type AnimationState = 'enter' | 'exit';
const ENTER_ANIMATION_TIMEOUT_MS = 800;
const EXIT_ANIMATION_TIMEOUT_MS = 500;

const enterAnimationCss = css`
  animation: ${fadeInAnimation} ${ENTER_ANIMATION_TIMEOUT_MS}ms ease-in-out 0s 1
    forwards;
`;

const exitAnimationCss = css`
  animation: ${fadeOutDownAnimation} ${EXIT_ANIMATION_TIMEOUT_MS}ms ease-in-out
    0s 1 forwards;
`;

const Container = styled.div`
  padding: 50px 0 30px;
  font-size: 2rem;
`;

const PlayerCharacter = styled.div<{ state: AnimationState }>`
  ${props => props.state === 'enter' && enterAnimationCss};
  ${props => props.state === 'exit' && exitAnimationCss};
`;

const StatusIndicatorContainer = styled.div`
  width: 50%;
  margin: 0 auto;
  margin-bottom: 40px;
`;

const PlayerName = styled.h2`
  margin: 0;
  padding: 0;
  font-size: 0.9rem;
  color: #135e46;
  text-shadow: 0 0 5px #fff;
`;

const PlayerAnimationContainer = styled.div<{ waiting: boolean }>`
  opacity: ${props => (props.waiting ? 0.7 : 1)};
  ${props =>
    props.waiting
      ? css`
          animation: ${shakeAnimationLeft} 4s ease-in-out infinite;
        `
      : css`
          animation: ${jackInTheBoxAnimation} 1s ease-in-out;
        `}
`;

const getPlayerInvitationStatusText = (
  invitation?: PlayerInvitation
): React.ReactNode => {
  if (!invitation) {
    return <>Waiting</>;
  }

  switch (invitation.status) {
    case 'ACCEPTED':
      return <RainbowText>Ready ✅</RainbowText>;
    case 'WAITING':
      return <>Waiting</>;
  }
};

type RandomPlayerSelectorProps = {
  selectedPlayer?: Player;
  playerPosition?: PlayerAvatarPosition;
  reroll: () => void;
  playerInvitation?: PlayerInvitation;
};

export const RandomPlayerSelector = ({
  selectedPlayer,
  playerPosition = 'left',
  reroll,
  playerInvitation,
}: RandomPlayerSelectorProps) => {
  const soundService = useContext<SoundService>(GameSoundContext);
  const [state, setState] = useState<AnimationState>('enter');

  const onNewPlayer = () => {
    soundService.play(SOUND_KEYS.SLIDE_FALL_WHISTLE, true);
    setState('exit');
    setTimeout(() => {
      reroll();
      setState('enter');
    }, EXIT_ANIMATION_TIMEOUT_MS);
  };

  useDoOnce(
    !!(playerInvitation && playerInvitation.status === 'ACCEPTED'),
    () => {
      soundService.play(SOUND_KEYS.PLAYER_SELECT_PLAYER_JOINED, true);
    }
  );

  return (
    <Container>
      <PlayerCharacter state={state} className="margins-off">
        <StatusIndicatorContainer>
          <StatusIndicator
            status={
              playerInvitation && playerInvitation.status === 'ACCEPTED'
                ? STATUS_TYPE.READY
                : STATUS_TYPE.WAITING
            }
          >
            {getPlayerInvitationStatusText(playerInvitation)}
          </StatusIndicator>
        </StatusIndicatorContainer>
        {selectedPlayer && (
          <React.Fragment>
            <PlayerAnimationContainer
              waiting={
                !!(playerInvitation && playerInvitation.status === 'WAITING')
              }
            >
              <PlayerAvatar
                player={selectedPlayer}
                position={playerPosition}
                overrideStyle="width: 36vmin; height: 48vmin;"
              />
            </PlayerAnimationContainer>
            <PlayerName>{selectedPlayer.name}</PlayerName>
          </React.Fragment>
        )}
      </PlayerCharacter>
      {selectedPlayer &&
        (!playerInvitation ? true : playerInvitation.status === 'WAITING') && (
          <SecondaryButton onClick={onNewPlayer}>Someone else</SecondaryButton>
        )}
    </Container>
  );
};
