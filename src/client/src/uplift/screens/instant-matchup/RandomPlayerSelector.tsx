import React, { useEffect, useState, useContext } from 'react';
import styled, { css } from 'styled-components';
import { Player } from '../../contexts/PlayersProvider';
import {
  fadeInDownAnimation,
  fadeInAnimation,
  fadeOutDownAnimation,
} from '../../components/animations';
import {
  PlayerAvatar,
  PlayerAvatarPosition,
} from '../../components/PlayerAvatar';
import { SoundService, SOUND_KEYS } from '../../../sounds/SoundService';
import GameSoundContext from '../../../contexts/GameSoundContext';
import { selectRandomOneOf } from '../../utils/random';

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
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const PlayerCharacter = styled.div<{ state: AnimationState }>`
  ${props => props.state === 'enter' && enterAnimationCss};
  ${props => props.state === 'exit' && exitAnimationCss};
`;

const PlayerName = styled.h2`
  margin: 0;
  padding: 0;
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
    setState('exit');
    soundService.play(
      selectRandomOneOf([
        SOUND_KEYS.SCREAM_01,
        SOUND_KEYS.SCREAM_02,
        SOUND_KEYS.SCREAM_03,
        SOUND_KEYS.SCREAM_04,
      ]),
      true
    );
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
      {selectedPlayer && <button onClick={onNewPlayer}>Someone else</button>}
    </Container>
  );
};
