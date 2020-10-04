import React, { useEffect, useRef, useState } from 'react';
import { useTrail, animated, useSpring, config } from 'react-spring';
import styled from 'styled-components';
import { Player } from '../../../../uplift/contexts/PlayersProvider';
import { PlayerAvatar } from './PlayerAvatar';

const Container = styled(animated.div)<{ flip: boolean }>`
  position: absolute;
  top: 10%;
  ${({ flip }) => flip && 'transform: scaleX(-1);'}
`;

type SlideState = 'in' | 'out';

type SlideyPlayerSwitcher = {
  player: Player | undefined;
  pos: 'left' | 'right';
};

export const SlideyPlayerSwitcher = ({ player, pos }: SlideyPlayerSwitcher) => {
  const currentPlayer = useRef(player);
  const [slideState, setSlideState] = useState<SlideState>('in');
  const [displayPlayer, setDisplayPlayer] = useState(player);

  const springProps = useSpring({
    [pos]: slideState === 'in' ? 0 : -1000,
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

  return (
    <Container style={springProps} flip={pos === 'right'}>
      {displayPlayer && (
        <PlayerAvatar player={displayPlayer} confirmed={false} />
      )}
    </Container>
  );
};
