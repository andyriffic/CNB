import React, { useEffect, useState, useContext } from 'react';
import styled, { css } from 'styled-components';
import { Player } from '../../contexts/PlayersProvider';
import {
  fadeInDownAnimation,
  fadeOutDownAnimation,
} from '../../components/animations';
import {
  PlayerAvatar,
  PlayerAvatarPosition,
} from '../../components/PlayerAvatar';
import { SoundService, SOUND_KEYS } from '../../../sounds/SoundService';
import GameSoundContext from '../../../contexts/GameSoundContext';
import { SecondaryButton } from '../../components/SecondaryButton';

type AnimationState = 'enter' | 'exit';
const ENTER_ANIMATION_TIMEOUT_MS = 300;
const EXIT_ANIMATION_TIMEOUT_MS = 500;

const enterAnimationCss = css`
  animation: ${fadeInDownAnimation} ${ENTER_ANIMATION_TIMEOUT_MS}ms ease-in-out
    0s 1 forwards;
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

const PlayerName = styled.h2`
  margin: 0;
  padding: 0;
  font-size: 0.9rem;
`;

type RandomPlayerSelectorProps = {
  selectedPlayer?: Player;
  playerPosition?: PlayerAvatarPosition;
  reroll: () => void;
};

export const RandomPlayerSelector = ({
  selectedPlayer,
  playerPosition = 'left',
  reroll,
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

  return (
    <Container>
      <PlayerCharacter state={state} className="margins-off">
        {selectedPlayer && (
          <React.Fragment>
            <PlayerAvatar player={selectedPlayer} position={playerPosition} />
            <PlayerName>{selectedPlayer.name}</PlayerName>
          </React.Fragment>
        )}
      </PlayerCharacter>
      {selectedPlayer && (
        <SecondaryButton onClick={onNewPlayer}>Someone else</SecondaryButton>
      )}
    </Container>
  );
};
