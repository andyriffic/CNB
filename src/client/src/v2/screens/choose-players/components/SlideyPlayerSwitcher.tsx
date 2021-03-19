import React, { useEffect, useRef, useState } from 'react';
import { useTrail, animated, useSpring, config } from 'react-spring';
import styled from 'styled-components';
import { enterTopAnimation } from '../../../../uplift/components/animations';
import { Player } from '../../../../uplift/contexts/PlayersProvider';
import { useSoundProvider } from '../../../providers/SoundProvider';
import { ChoosePlayerAvatar } from './ChoosePlayerAvatar';

const Container = styled(animated.div)`
  position: absolute;
  top: 10%;
`;

const FacingDirection = styled.div<{ faceLeft: boolean }>`
  ${({ faceLeft }) => faceLeft && 'transform: scaleX(-1);'}
`;

const FastestFinger = styled.div`
  opacity: 0;
  position: absolute;
  padding: 5px 8px;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSize.medium};
  font-weight: bold;
  top: 0;
  left: 20%;
  color: ${({ theme }) => theme.color.text01};
  background-color: white;
  animation: ${enterTopAnimation} 1s ease-in 0s forwards;
  border-radius: 10px;
`;

const SubText = styled.div`
  font-weight: normal;
  padding-top: 3px;
  font-size: ${({ theme }) => theme.fontSize.extraSmall};
`;

type SlideState = 'in' | 'out';

type SlideyPlayerSwitcher = {
  player: Player | undefined;
  pos: 'left' | 'right';
  confirmed: boolean;
  fastestFinger: boolean;
};

export const SlideyPlayerSwitcher = ({
  player,
  pos,
  confirmed,
  fastestFinger,
}: SlideyPlayerSwitcher) => {
  const currentPlayer = useRef(player);
  const { play } = useSoundProvider();
  const [slideState, setSlideState] = useState<SlideState>('in');
  const [displayPlayer, setDisplayPlayer] = useState(player);

  const springProps = useSpring({
    [pos]: slideState === 'in' ? '0%' : '-100%',
    config: config.stiff,
    onRest: () => {
      if (slideState === 'out') {
        setSlideState('in');
        setDisplayPlayer(currentPlayer.current);
      }
    },
  });

  useEffect(() => {
    if (player !== currentPlayer.current) {
      currentPlayer.current = player;
      setSlideState('out');
    }
  }, [player]);

  useEffect(() => {
    if (fastestFinger) {
      play('FastestFinger');
    }
  }, [fastestFinger]);

  return (
    <Container style={springProps}>
      <FacingDirection faceLeft={pos === 'right'}>
        {displayPlayer && (
          <ChoosePlayerAvatar player={displayPlayer} confirmed={confirmed} />
        )}
      </FacingDirection>
      {fastestFinger && (
        <FastestFinger>
          +1 pt <SubText>Joined first!</SubText>
        </FastestFinger>
      )}
    </Container>
  );
};
