import React from 'react';
import styled, { css } from 'styled-components';
import { useSpring, animated, config } from 'react-spring';
import { Keyframes } from 'react-spring/renderprops';
import { SOCKETS_ENDPOINT } from '../../../../environment';
import { superSaiyanAnimation } from '../../../../uplift/components/animations';
import { ZodiacSign } from '../../../components/player-avatar/ZodiacSign';

const PlayerImage = styled.img<{ flipX: boolean }>`
  width: 20vw;
  height: 25vw;
  ${({ flipX }) => flipX && 'transform: scaleX(-1);'}
`;

const AnimatedFilter = styled(animated.div)<{ hue: number }>`
  /* filter: ${props => css`hue-rotate(${props.hue}turn)`}; */
    filter: hue-rotate(-0.75turn);

`;

// Will fade children in and out in a loop
const Thing = Keyframes.Spring(async (next: any) => {
  while (true)
    await next({
      opacity: 1,
      hue: -0.75,
      from: { opacity: 0, hue: -0.1 },
      reset: true,
    });
});

type Props = {
  imageUrl: string;
  flipX?: boolean;
  poweredUp?: boolean;
  tags?: string[];
};

export const GamePlayer = ({
  imageUrl,
  flipX = false,
  poweredUp = false,
  tags = [],
}: Props) => {
  // const props = useSpring({
  //   hue: 0,
  //   opacity: 1,
  //   from: { opacity: 1, hue: 0 },
  //   to: async (next: (arg0: object) => void) => {
  //     while (1) {
  //       await next({ opacity: 0, hue: poweredUp ? -0.75 : 0 });
  //       await next({ opacity: 1, hue: 0 });
  //     }
  //   },
  //   config: config.wobbly,
  //   delay: 500,
  // });

  return (
    // <animated.div
    //   style={{
    //     filter: props.hue.interpolate(h => `hue-rotate(${h}turn)`),
    //   }}
    // >
    <div style={{ position: 'relative' }}>
      <PlayerImage flipX={flipX} src={`${SOCKETS_ENDPOINT}${imageUrl}`} />
      <div
        style={{
          position: 'absolute',
          top: '20%',
          width: '10vw',
          height: '10vw',
        }}
      >
        <ZodiacSign tags={tags} />
      </div>
    </div>
    // </animated.div>
  );
};
